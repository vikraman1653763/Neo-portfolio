// GithubCalendarSection.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import GitHubCalendar from "react-github-calendar";
import { useAppContext } from "@/context/AppContext";
import { BorderBeam } from "./ui/border-beam";

const GithubCalendarSection = ({
  username = "vikraman1653763",
  startYear = 2023,
  initialYear,
}) => {
  const { theme } = useAppContext();
  const currentYear = new Date().getFullYear();

  // years: current → startYear (descending)
  const years = useMemo(() => {
    const list = [];
    for (let y = currentYear; y >= startYear; y--) list.push(y);
    return list;
  }, [currentYear, startYear]);

  const [year, setYear] = useState(
    initialYear && initialYear >= startYear && initialYear <= currentYear
      ? initialYear
      : currentYear
  );

  const index = years.indexOf(year);
  const scheme = theme === "dark" ? "dark" : "light";

  // brand colors (unchanged)
  const light = {
    bg: "#ffffff",
    chipBg: "#e1b382",
    text: "#e1b382",
    accent: "white",
    shadow: "0 0 1px rgba(24,94,224,.15), 0 6px 12px rgba(24,94,224,.15)",
  };
  const dark = {
    bg: "#0d1117",
    chipBg: "#2d545e",
    text: "",
    accent: "#fff",
    shadow: "0 0 1px rgba(59,130,246,.9), 0 6px 12px rgba(255,255,255,.2)",
  };
  const c = scheme === "dark" ? dark : light;

  // --- Responsiveness only ---
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Calendar sizing by viewport (no color changes)
  const blockSize = vw < 400 ? 8 : vw < 640 ? 9 : vw < 1024 ? 11 : 12;
  const blockMargin = vw < 640 ? 3 : 4;
  const blockRadius = vw < 640 ? 2 : 3;
  const fontSize = vw < 400 ? 9 : vw < 640 ? 10 : 12;

  return (
    <section className="relative  mx-auto my-10 sm:my-20 max-sm:m-4">
      <div className="relative mx-auto max-w-[1120px] flex w-11/12 flex-col lg:flex-row items-start justify-between gap-12">
        {/* Left: heading + graph */}
        <div className="flex-1 w-full">
          <p className="text-sm uppercase tracking-wider text-primary dark:text-white">
            — Contributions
          </p>

          <div className="flex items-center justify-between sm:gap-3 max-sm:flex-col max-sm:items-start">
            <h2 className="flex-1/2 text-4xl md:text-5xl font-extrabold text-primary dark:text-pretty max-sm:text-3xl">
              Days I Code
            </h2>

            {/* Tabs become horizontally scrollable on mobile */}
            <div className="yc-container w-full max-sm:w-full">
              <div className="yc-tabs bg-white dark:bg-transparent overflow-x-auto no-scrollbar ">
                <BorderBeam
                  size={70}
                  initialOffset={10}
                  className="from-transparent via-primary to-transparent dark:via-pretty"
                />

                <BorderBeam
                  size={70}
                  initialOffset={60}
                  className="from-transparent via-primary to-transparent dark:via-pretty"
                />
                {/* GLIDER uses your original % translate */}
                <span
                  className="yc-glider bg-pretty dark:bg-primary"
                  style={{ transform: `translateX(${index * 110}%)` }}
                />
                <div className="flex gap-2">
                  {years.map((y, i) => {
                    const checked = i === index;
                    return (
                      <button
                        key={y}
                        type="button"
                        className={`yc-tab ${
                          checked ? "is-active" : ""
                        } dark:text-white flex-shrink-0`}
                        onClick={() => setYear(y)}
                        aria-pressed={checked}
                        style={{ color: checked ? c.accent : c.text }}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-6  rounded-2xl border p-4 border-pretty dark:border-primary bg-pretty/10 dark:bg-primary/10"
            style={{ boxShadow: c.shadow }}
          >
            <div className=" mx-auto  rounded-xl border p-4 border-pretty dark:border-primary bg-pretty/10 dark:bg-primary/10">
              <div className="mb-3 text-sm font-medium text-slate-700 dark:text-white w-full sm:w-[80%] mx-auto ">
                {`Contributions in ${year}`}
              </div>

              {/* Horizontal scroll on very small screens */}
              <div className="w-fit mx-auto overflow-x-auto no-scrollbar">
                <div className="inline-block ">
                  <GitHubCalendar
                    username={username}
                    colorScheme={scheme}
                    year={year}
                    blockMargin={blockMargin}
                    blockRadius={blockRadius}
                    blockSize={blockSize}
                    fontSize={fontSize}
                    hideColorLegend={vw < 480}
                    hideMonthLabels={vw < 400}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubCalendarSection;
