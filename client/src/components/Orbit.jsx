import React from "react";
import { Code2, KeyRound, SlidersHorizontal } from "lucide-react";
import {
  CloudAdd,
  CodeCircle,
  CpuSetting,
  Data2,
  MonitorMobbile,
} from "iconsax-reactjs";
import { MdOutlineSecurity, MdWifiPassword } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { PiBracketsCurlyDuotone } from "react-icons/pi";
import { ImEye } from "react-icons/im";
/** Single ring of evenly spaced rotating icons */
function OrbitLayer({
  radius = 90,
  duration = 18,
  reverse = false,
  size = 600,
  iconBox = 35,
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
            cx="50%" cy="50%" r={radius}
            fill="none" stroke="currentColor" className="text-slate-300/40" strokeWidth="1"
          />
        </svg>
      )}

      {/* This element rotates the whole ring */}
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
                // Position the icon on the ring (keeps its local “north”)
                transform: `rotate(${theta}deg) translate(${radius}px) rotate(${-theta}deg)`,
                transformOrigin: "0 0",
              }}
            >
              {/* Counter-rotate to cancel the parent ring spin */}
              <div
                style={{
                  width: iconBox,
                  height: iconBox,
                  transform: "translate(-50%, -50%)",
                  transformOrigin: "50% 50%",
                  animation: `${
                    // If ring spins clockwise, icon spins counter; and vice-versa
                    reverse ? "counterOrbitReverse" : "counterOrbit"
                  } ${duration}s linear infinite`,
                }}
                className="flex items-center justify-center"
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
        /* These cancel the parent's spin so icons stay upright */
        @keyframes counterOrbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes counterOrbitReverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
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
      <OrbitLayer radius={80} duration={16} iconBox={35} >
        <MonitorMobbile size={32} variant="Broken" color="#FF6B6B" className={iconCls}  />
        <CodeCircle size={32} variant="Broken" color="#4ECDC4" className={iconCls}  />
        <SlidersHorizontal size={32} color="#118AB2"  className={iconCls} />
        <IoGlobeOutline size={32} color="#FFD93D" className={iconCls}  />
      </OrbitLayer>

      {/* Ring 2 – Middle (3 icons) */}
      <OrbitLayer radius={150} duration={22} reverse iconBox={35}>
        <Data2  className={iconCls} />
        <ImEye size={32} color="#8D99AE" className={iconCls}  />
        <MdWifiPassword size={32} color="#3D348B" />
        <PiBracketsCurlyDuotone size={32} color="#FF9F1C"  className={iconCls}/>
      </OrbitLayer>

      {/* Ring 3 – Outer (4 icons) */}
      <OrbitLayer radius={220} duration={28} iconBox={35}>
        <MdOutlineSecurity size={32} color="#6A4C93" />
        <Code2 size={32} className={`${iconCls} text-[#2D3142] dark:text-white`}  />
        <CloudAdd size={32} variant="Outline" color="#f43f5e" className={iconCls}  />
<KeyRound size={32} color="#90EE90" className={iconCls} />   
        <CpuSetting size={32} variant="Outline" color="#E71D36" className={iconCls}  />
      </OrbitLayer>
    </div>
  );
}
