import React from "react";
import {
  Monitor, Palette,
  Code2, Terminal, GitBranch,
  Server, Database, Shield, Settings
} from "lucide-react";

// import {
//   Monitor, Layout, Palette, PenTool,
//   Code2, Terminal, GitBranch, Braces,
//   Server, Database, CloudCog,
//   Settings, Wrench, Cog, SlidersHorizontal,
//   Shield, Eye, KeyRound, Lock, Cpu,Zap
// } from "lucide-react";

/** Single ring of evenly spaced rotating icons */
function OrbitLayer({
  radius = 90,
  duration = 18,
  reverse = false,
  size = 600,
  iconBox = 44,
  showRing = true,
  children,
}) {
  const items = React.Children.toArray(children);

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
    >
      {showRing && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          <circle
            cx="50%" cy="50%" r={radius} fill="none"
            stroke="currentColor" className="text-slate-300/40" strokeWidth="1"
          />
        </svg>
      )}

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          width: 2,
          height: 2,
          animation: `${reverse ? "orbitReverse" : "orbit"} ${duration}s linear infinite`,
          transformOrigin: "50% 50%",
        }}
      >
        {items.map((child, i) => {
          const theta = (i / items.length) * 360;
          return (
            <div
              key={i}
              className="absolute left-0 top-0"
              style={{
                transform: `rotate(${theta}deg) translate(${radius}px) rotate(${-theta}deg)`,
                transformOrigin: "0 0",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{ width: iconBox, height: iconBox, transform: "translate(-50%, -50%)" }}
              >
                {child}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateZ(0.001px); }
          to   { transform: rotate(360deg) translateZ(0.001px); }
        }
        @keyframes orbitReverse {
          from { transform: rotate(0deg) translateZ(0.001px); }
          to   { transform: rotate(-360deg) translateZ(0.001px); }
        }
      `}</style>
    </div>
  );
}

export default function Orbit() {
  const iconCls = "h-7 w-7 text-slate-800 dark:text-slate-200";

  return (
    <div className="relative mx-auto w-full max-w-[600px] aspect-square overflow-visible">
      {/* Ring 1 – Inner (2 icons) */}
      <OrbitLayer radius={80} duration={16} iconBox={44}>
        <Monitor className={iconCls} />
        <Palette className={iconCls} />
      </OrbitLayer>

      {/* Ring 2 – Middle (3 icons) */}
      <OrbitLayer radius={150} duration={22} reverse iconBox={44}>
        <Code2 className={iconCls} />
        <Terminal className={iconCls} />
        <GitBranch className={iconCls} />
      </OrbitLayer>

      {/* Ring 3 – Outer (4 icons) */}
      <OrbitLayer radius={220} duration={28} iconBox={44}>
        <Server className={iconCls} />
        <Database className={iconCls} />
        <Shield className={iconCls} />
        <Settings className={iconCls} />
      </OrbitLayer>
    </div>
  );
}
