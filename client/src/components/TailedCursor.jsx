// TailedCursor.jsx
import React, { useEffect, useMemo } from "react";
import { Renderer, Transform, Polyline, Vec3, Color } from "ogl";
import { useAppContext } from "@/context/AppContext";

const TailedCursor = ({
  baseSpring = 0.03,
  baseFriction = 0.9,
  baseThickness = 30,
  maxAge = 600,
  pointCount = 70,
  speedMultiplier = 0.6,
  enableFade = true,
  enableShaderEffect = false,
  effectAmplitude = 2,
  backgroundColor = [0, 0, 0, 0],
  lockHead = false,
}) => {
  const { theme } = useAppContext();

  // choose one main color depending on theme
  const mainColor = useMemo(() => {
    return theme === "dark" ? "#e1b382" : "#2d545e";
  }, [theme]);

  useEffect(() => {
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "99998",
      pointerEvents: "none",
    });
    document.body.appendChild(canvas);

    if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {
      gl.clearColor(...backgroundColor);
    } else gl.clearColor(0, 0, 0, 0);

    const scene = new Transform();

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
        if (uEnableShaderEffect > 0.5)
          current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
        return current;
      }
      void main() { vUV = uv; gl_Position = getPosition(); }
    `;

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity, uEnableFade;
      varying vec2 vUV;
      void main() {
        float fadeFactor = 1.0;
        if (uEnableFade > 0.5) fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
        gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `;

    // single line (one tail)
    const points = Array.from({ length: Math.max(2, pointCount) }, () => new Vec3());
    const polyline = new Polyline(gl, {
      points,
      vertex,
      fragment,
      uniforms: {
        uColor: { value: new Color(mainColor) },
        uThickness: { value: baseThickness },
        uOpacity: { value: 1.0 },
        uTime: { value: 0.0 },
        uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
        uEffectAmplitude: { value: effectAmplitude },
        uEnableFade: { value: enableFade ? 1.0 : 0.0 },
      },
    });
    polyline.mesh.setParent(scene);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      polyline.resize();
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = new Vec3(0, 0, 0);
    const toClip = (e) => {
      const rect = gl.canvas.getBoundingClientRect();
      mouse.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        (1 - (e.clientY - rect.top) / rect.height) * 2 - 1,
        0
      );
    };
    const onMove = (e) => toClip(e);
    const onTouch = (e) => {
      const t = e.changedTouches?.[0];
      if (t) toClip(t);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    const velocity = new Vec3();
    const tmp = new Vec3();
    let last = performance.now();
    let rafId;

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      const now = performance.now();
      const dt = now - last;
      last = now;

      if (lockHead) {
        points[0].copy(mouse);
      } else {
        tmp.copy(mouse).sub(points[0]).multiply(baseSpring);
        velocity.add(tmp).multiply(baseFriction);
        points[0].add(velocity);
      }

      for (let i = 1; i < points.length; i++) {
        if (isFinite(maxAge) && maxAge > 0) {
          const delay = maxAge / (points.length - 1);
          const alpha = Math.min(1, (dt * speedMultiplier) / delay);
          points[i].lerp(points[i - 1], alpha);
        } else {
          points[i].lerp(points[i - 1], 0.9);
        }
      }

      const uTime = polyline.mesh.program.uniforms.uTime;
      if (uTime) uTime.value = now * 0.001;

      polyline.updateGeometry();
      renderer.render({ scene });
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(rafId);
      if (canvas.parentNode === document.body) document.body.removeChild(canvas);
    };
  }, [
    theme,
    mainColor,
    baseSpring,
    baseFriction,
    baseThickness,
    maxAge,
    pointCount,
    speedMultiplier,
    enableFade,
    enableShaderEffect,
    effectAmplitude,
    backgroundColor,
    lockHead,
  ]);

  return null;
};

export default TailedCursor;
