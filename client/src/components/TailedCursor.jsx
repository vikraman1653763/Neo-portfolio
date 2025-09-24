// TailedCursor.jsx
import React, { useEffect } from "react";
import { Renderer, Transform, Polyline, Vec3, Color } from "ogl";

/**
 * Full-viewport OGL ribbon cursor (fixed alignment)
 * - Maps mouse using canvas.getBoundingClientRect() => no Y-offset drift
 * - Canvas is a transparent, click-through overlay
 * - Optional exact head lock (no lag) via lockHead prop
 */
const TailedCursor = ({
  colors = ["#ffffff"],        // e.g., ["#2d545e", "#e1b382"]
  baseSpring = 0.03,
  baseFriction = 0.9,
  baseThickness = 30,
  offsetFactor = 0.05,
  maxAge = 500,
  pointCount = 70,
  speedMultiplier = 0.6,
  enableFade = false,
  enableShaderEffect = false,
  effectAmplitude = 2,
  backgroundColor = [0, 0, 0, 0], // RGBA [0..1]
  lockHead = false,               // true => ribbon tip locked to cursor
}) => {
  useEffect(() => {
    // Renderer & canvas
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    const canvas = gl.canvas;

    // Overlay styling
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "99998";
    canvas.style.pointerEvents = "none"; // do not block clicks
    document.body.appendChild(canvas);

    // Clear color
    if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {
      gl.clearColor(...backgroundColor);
    } else {
      gl.clearColor(0, 0, 0, 0);
    }

    // Scene
    const scene = new Transform();

    // Shaders
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

        // keep thickness consistent across aspect
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 nextScreen = next.xy * aspect;
        vec2 prevScreen = prev.xy * aspect;

        vec2 tangent = normalize(nextScreen - prevScreen);
        vec2 normal = vec2(-tangent.y, tangent.x);
        normal /= aspect;

        // taper
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

    // Build ribbon lines
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

    // Resize (keep GL + CSS in sync)
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      const c = gl.canvas;
      c.style.position = "fixed";
      c.style.inset = "0";
      c.style.width = "100%";
      c.style.height = "100%";
      lines.forEach((l) => l.polyline.resize());
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse in clip space using canvas rect (fixes offset/scroll/zoom)
    const mouse = new Vec3(0, 0, 0);

    const toClipFromEvent = (e) => {
      const rect = gl.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      // map [0..1] → [-1..1], flip Y
      mouse.set(x * 2 - 1, (1 - y) * 2 - 1, 0);
    };

    const onMove = (e) => toClipFromEvent(e);
    const onTouch = (e) => {
      const t = e.changedTouches?.[0];
      if (!t) return;
      toClipFromEvent({ clientX: t.clientX, clientY: t.clientY });
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
        if (lockHead) {
          // EXACT head lock: no lag at tip
          line.points[0].copy(mouse).add(line.mouseOffset);
        } else {
          // Spring to cursor for a nice lead/lag feel
          tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
          line.mouseVelocity.add(tmp).multiply(line.friction);
          line.points[0].add(line.mouseVelocity);
        }

        // Tail follow
        for (let i = 1; i < line.points.length; i++) {
          if (isFinite(maxAge) && maxAge > 0) {
            const segmentDelay = maxAge / (line.points.length - 1);
            const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);
            line.points[i].lerp(line.points[i - 1], alpha);
          } else {
            line.points[i].lerp(line.points[i - 1], 0.9);
          }
        }

        // Time uniform
        const uTime = line.polyline.mesh.program.uniforms.uTime;
        if (uTime) uTime.value = now * 0.001;

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
    lockHead,
  ]);

  return null; // canvas is attached to <body>
};

export default TailedCursor;
