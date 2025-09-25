import React from "react";
import { IconCloud } from "./ui/icon-cloud";
import { useAppContext } from "@/context/AppContext";
import Orbit from "./Orbit";



const TechArsenalOrbit = () => {
  const { theme } = useAppContext();

  return (
    <section className="relative w-full py-0 ">
      <div className="relative mx-auto flex w-11/12 max-w-7xl flex-col md:flex-row items-center justify-between gap-12">
        {/* Left side - tech icons */}
        <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden ">
         
            <Orbit/>
        </div>

        {/* Right side - Title and Description */}
        <div className="max-w-xl text-center md:text-left space-y-6">
          <p className="text-sm uppercase tracking-wider text-primary dark:text-white">
            — My Stack
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-pretty">
            Tech Arsenal
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            A selection of the tools and technologies I enjoy using to build
            modern, responsive, and performant applications. From elegant UI
            design to backend APIs, this is the toolkit I bring to each project.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center bg-pretty dark:bg-primary hover:bg-pretty/90 dark:hover:bg-primary/90 text-white rounded-md px-7 h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-pretty/50"
            >
              See My Work
            </a>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechArsenalOrbit;
