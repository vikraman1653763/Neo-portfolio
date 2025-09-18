import React, { useEffect } from "react";
import { Renderer, Transform, Polyline, Vec3, Color } from "ogl";

/**
 * TailedCursor
 * - Full-viewport ribbons that follow the real cursor
 * - Attaches a transparent canvas to document.body (no container needed)
 * - Keeps default OS cursor visible (pointer-events: none)
 */
const TailedCursor = ({
  colors = ["#ffffff"],      // or ["#ff9346", "#7cff67", "#ffee51", "#00d8ff"]
  baseSpring = 0.03,
  baseFriction = 0.9,
  baseThickness = 30,
  offsetFactor = 0.05,
  maxAge = 500,
  pointCount = 50,
  speedMultiplier = 0.6,
  enableFade = false,
  enableShaderEffect = false,
  effectAmplitude = 2,
  backgroundColor = [0, 0, 0, 0], // RGBA in 0..1
}) => {
  useEffect(() => {
    // Create a detached canvas and renderer
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;

    // Style the canvas as a global overlay
    const canvas = gl.canvas;
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "99998";
    canvas.style.pointerEvents = "none"; // keep default cursor & clicks
    document.body.appendChild(canvas);

    // Clear color
    if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {
      gl.clearColor(...backgroundColor);
    } else {
      gl.clearColor(0, 0, 0, 0);
    }

    // Scene
    const scene = new Transform();

    // Shaders (ported from the Vue example)
    const vertex = `
      precision highp float;
      attribute vec3 position, next, prev;
      attribute vec2 uv;
      attribute float side;
      uniform vec2 uResolution;
      uniform float uDPR, uThickness, uTime, uEnableShaderEffect, uEffectAmplitude;
      varying vec2 vUV;
      vec4 getPosition() {
        vec4 current = vec4(position, 1.0);
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 nextScreen = next.xy * aspect;
        vec2 prevScreen = prev.xy * aspect;
        vec2 tangent = normalize(nextScreen - prevScreen);
        vec2 normal = vec2(-tangent.y, tangent.x);
        normal /= aspect;
        normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
        float dist = length(nextScreen - prevScreen);
        normal *= smoothstep(0.0, 0.02, dist);
        float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
        float pixelWidth = current.w * pixelWidthRatio;
        normal *= pixelWidth * uThickness;
        current.xy -= normal * side;
        if (uEnableShaderEffect > 0.5) {
          current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
        }
        return current;
      }
      void main() {
        vUV = uv;
        gl_Position = getPosition();
      }
    `;

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity, uEnableFade;
      varying vec2 vUV;
      void main() {
        float fadeFactor = 1.0;
        if (uEnableFade > 0.5) {
          fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
        }
        gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `;

    // Build ribbons
    const lines = [];
    const center = (colors.length - 1) / 2;

    const makePolyline = (hexColor) => ({
      points: Array.from({ length: Math.max(2, pointCount) }, () => new Vec3()),
      polyline: null,
      mouseVelocity: new Vec3(),
      spring: baseSpring + (Math.random() - 0.5) * 0.05,
      friction: baseFriction + (Math.random() - 0.5) * 0.05,
      thickness: baseThickness + (Math.random() - 0.5) * 3,
      mouseOffset: null,
      color: new Color(hexColor),
    });

    colors.forEach((c, i) => {
      const line = makePolyline(c);
      line.mouseOffset = new Vec3(
        (i - center) * offsetFactor + (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.1,
        0
      );
      line.polyline = new Polyline(gl, {
        points: line.points,
        vertex,
        fragment,
        uniforms: {
          uColor: { value: line.color },
          uThickness: { value: line.thickness },
          uOpacity: { value: 1.0 },
          uTime: { value: 0.0 },
          uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
          uEffectAmplitude: { value: effectAmplitude },
          uEnableFade: { value: enableFade ? 1.0 : 0.0 },
        },
      });
      line.polyline.mesh.setParent(scene);
      lines.push(line);
    });

    // Resize
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      lines.forEach((l) => l.polyline.resize());
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse → normalized clip-space coords across viewport
    const mouse = new Vec3(0, 0, 0);
    const toClip = (x, y) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mouse.set((x / w) * 2 - 1, (y / h) * -2 + 1, 0);
    };

    const onMove = (e) => toClip(e.clientX, e.clientY);
    const onTouch = (e) => {
      if (!e.changedTouches?.length) return;
      const t = e.changedTouches[0];
      toClip(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    // Animate
    const tmp = new Vec3();
    let last = performance.now();
    let rafId;

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      const now = performance.now();
      const dt = now - last;
      last = now;

      lines.forEach((line) => {
        // head follows mouse with spring + friction
        tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
        line.mouseVelocity.add(tmp).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);

        // tail follows head with age-based lerp
        for (let i = 1; i < line.points.length; i++) {
          if (isFinite(maxAge) && maxAge > 0) {
            const segmentDelay = maxAge / (line.points.length - 1);
            const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);
            line.points[i].lerp(line.points[i - 1], alpha);
          } else {
            line.points[i].lerp(line.points[i - 1], 0.9);
          }
        }

        // time uniform for optional wobble
        if (line.polyline.mesh.program.uniforms.uTime) {
          line.polyline.mesh.program.uniforms.uTime.value = now * 0.001;
        }
        line.polyline.updateGeometry();
      });

      renderer.render({ scene });
    };

    loop();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(rafId);
      try {
        if (canvas.parentNode === document.body) document.body.removeChild(canvas);
      } catch {}
    };
  }, [
    colors,
    baseSpring,
    baseFriction,
    baseThickness,
    offsetFactor,
    maxAge,
    pointCount,
    speedMultiplier,
    enableFade,
    enableShaderEffect,
    effectAmplitude,
    backgroundColor,
  ]);

  return null; // nothing to render; canvas is attached to <body>
};

export default TailedCursor;
