import React from "react";
import { File, Settings, Search } from "lucide-react";

/** Perfectly centered orbit layer with icon centering + SVG rings */
function OrbitLayer({
  radius = 180,
  duration = 18,
  reverse = false,
  size = 520,
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
          <circle cx="50%" cy="50%" r={radius} fill="none" stroke="currentColor"
                  className="text-slate-300/40" strokeWidth="1" />
        </svg>
      )}

      {/* spinner carrying icons */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          width: 2,                      // tiny non-zero box
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

      {/* inline keyframes: define both from & to */}
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
  const iconCls = "h-7 w-7 text-slate-800 dark:text-slate-200"; // consistent size

  return (
    <div className="relative mx-auto w-full max-w-[560px] aspect-square overflow-visible">
      {/* inner ring */}
      <OrbitLayer radius={120} duration={14} iconBox={44}>
        <Search className={iconCls} />
        <Settings className={iconCls} />
        <File className={iconCls} />
        <Settings className={iconCls} />
      </OrbitLayer>

      {/* outer ring (reverse) */}
      <OrbitLayer radius={180} duration={18} reverse iconBox={44}>
        <File className={iconCls} />
        <Search className={iconCls} />
        <Settings className={iconCls} />
        <File className={iconCls} />
      </OrbitLayer>
    </div>
  );
}
