// AcademicJourney.jsx
import React from "react";
import { GiGraduateCap } from "react-icons/gi";
import { BorderBeam } from "./ui/border-beam";

const AcademicJourney = () => {
  const education = [
    {
      degree: "M.Sc. in Computer Science",
      college: "University of Madras",
      logo: "/assets/unom.webp",
      alt: "University of Madras Logo",
      period: "2019 – 2022",
    },
    {
      degree: "B.Sc. in Computer Science",
      college: "E.G.S. Pillay Arts and Science College",
      logo: "/assets/egs.webp",
      alt: "E.G.S. Pillay College Logo",
      period: "2022 – 2024",
    },
  ];

  return (
    <section className="w-full py-12 bg-white dark:bg-[#0d1117]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary dark:text-white mb-12">
          My Academic Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((item, index) => (
            // SINGLE container = where the beam draws
            <div key={index} className="relative rounded-xl overflow-hidden">
              <div className="relative flex items-center gap-6 p-6  ">
                {/* Background icon */}
                <GiGraduateCap
                  size={150}
                  className="-rotate-45 absolute right-0 -bottom-8 text-primary dark:text-pretty opacity-40 dark:opacity-20 pointer-events-none"
                />

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
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicJourney;
