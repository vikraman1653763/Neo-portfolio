import React from "react";
import { GiGraduateCap, GiMedal, GiStarFormation, GiTrophyCup } from "react-icons/gi";
import { FaAward } from "react-icons/fa";
import { BorderBeam } from "./ui/border-beam";

const bgIcons = [
  { Comp: GiGraduateCap, baseSize: 50 },
  { Comp: FaAward,       baseSize: 40 },
  { Comp: GiMedal,       baseSize: 60 },
  { Comp: GiTrophyCup,   baseSize: 30 },
  { Comp: GiStarFormation, baseSize: 30 },
];

const AcademicJourney = () => {
  const education = [
    {
      degree: "B.Sc. in Computer Science",
      logo: "/assets/egs.webp",
      alt: "University of Madras Logo",
      college: "E.G.S. Pillay Arts and Science College",
      period: "2019 – 2022",
    },
    {
      logo: "/assets/unom.webp",
      period: "2022 – 2024",
      degree: "M.Sc. in Computer Science",
      college: "University of Madras",
      alt: "E.G.S. Pillay College Logo",
    },
  ];

  // utils for non-overlapping random placement
  const REF = 320;              // reference px for percent conversion (card inner area)
  const GAP_PX = 12;            // extra breathing room between icons (px)
  const MIN_PCT = 10, MAX_PCT = 90; // keep inside edges
  const dist = (a, b) => Math.hypot(a.left - b.left, a.top - b.top);

  const genPlacements = (icons) => {
    const placed = [];
    for (let i = 0; i < icons.length; i++) {
      const sizeFactor = 0.8 + Math.random() * 0.6; // 0.8..1.4
      const halfPx = (icons[i].baseSize * sizeFactor) / 2 + GAP_PX;
      const rPct = (halfPx / REF) * 100;

      let cand, ok = false, attempts = 0;
      while (!ok && attempts < 40) {
        attempts++;
        cand = {
          top:  MIN_PCT + Math.random() * (MAX_PCT - MIN_PCT),
          left: MIN_PCT + Math.random() * (MAX_PCT - MIN_PCT),
          rotate: Math.random() * 100 - 50, // -50..50deg
          sizeFactor,
          rPct,
        };
        ok = placed.every(p => dist(p, cand) > (p.rPct + cand.rPct));
      }
      // fallback: if many failures, nudge from center with small random offset
      if (!ok) {
        cand = {
          top: 50 + (Math.random() - 0.5) * 30,
          left: 50 + (Math.random() - 0.5) * 30,
          rotate: Math.random() * 100 - 50,
          sizeFactor,
          rPct,
        };
      }
      placed.push(cand);
    }
    return placed;
  };

  return (
    <section className="w-full py-12 ">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary dark:text-white mb-12">
          My Academic Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((item, index) => {
            // fresh random positions every render (and per card)
            const placements = genPlacements(bgIcons);

            return (
              <div key={index} className="relative rounded-xl overflow-hidden">
                <div className="relative flex items-center gap-6 p-6 bg-[#f9f3ed] dark:bg-primary/10">
                  {/* Non-overlapping background icons */}
                  {bgIcons.map(({ Comp, baseSize }, i) => {
                    const p = placements[i];
                    const size = Math.round(baseSize * p.sizeFactor);
                    return (
                      <Comp
                        key={i}
                        size={size}
                        className="absolute text-primary dark:text-pretty opacity-20 dark:opacity-20 pointer-events-none"
                        style={{
                          top: `${p.top}%`,
                          left: `${p.left}%`,
                          transform: `translate(-50%, -50%) rotate(${p.rotate}deg)`,
                        }}
                      />
                    );
                  })}

                  {/* Logo left */}
                  <div className="flex-shrink-0 w-28 h-28 rounded-full border border-pretty dark:border-primary bg-white flex items-center justify-center overflow-hidden relative z-10">
                    <img
                      src={item.logo}
                      alt={item.alt}
                      className="object-contain w-24 h-24"
                    />
                  </div>

                  {/* Text right */}
                  <div className="flex flex-col relative z-10">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-300 mb-1">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-1">
                      {item.degree}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      {item.college}
                    </p>
                  </div>
                </div>

                {/* Beam around the same container */}
                <BorderBeam
                  size={200}
                  initialOffset={10}
                  className="from-transparent via-primary to-transparent dark:via-pretty"
                />
                <BorderBeam
                  size={200}
                  initialOffset={60}
                  className="from-transparent via-primary to-transparent dark:via-pretty"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademicJourney;
