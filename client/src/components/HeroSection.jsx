import React, { useState } from "react";
import { HyperText } from "./ui/hyper-text";
import { MorphingText } from "./ui/morphing-text";
import Spinner from "./Spinner";
import { Send2 } from "iconsax-reactjs";
import FollowMeRail from "./FollowMeRail";
import Modal from "@/components/Modal";
import PDFViewer from "./PDFViewer";
import useIsSmallScreen from "@/hooks/useIsSmallScreen";

const RESUME_URL = "/assets/resume.pdf";

const HeroSection = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const isSmall = useIsSmallScreen();

  const handleResumeClick = () => {
    if (isSmall) {
      window.open(RESUME_URL, "_blank", "noopener,noreferrer");
    } else {
      setResumeOpen(true);
    }
  };

  return (
    // prevent any child from causing horizontal scroll
    <section className="relative h-screen w-screen  flex items-center justify-center overflow-x-hidden overflow-y-visible ">
      {/* Bounded container to keep content inside viewport width */}
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between mt-20 px-4 sm:px-6 lg:px-10 pb-20 gap-12 md:gap-8">
        {/* Left */}
        <div className="flex flex-col items-center md:items-start min-w-0">
          {/* Tech chips */}
          <div className="flex items-center gap-1 text-xs rounded-full px-3 py-1 mb-6 border text-gray-600 bg-transparent border-primary/20 dark:border-pretty/30 dark:text-slate-300">
            <img className="size-7 rounded-full border-2 bg-white border-slate-100" src="/assets/node.svg" alt="Node.js" />
            <img className="size-7 rounded-full border-2 -translate-x-3 bg-white border-slate-100" src="/assets/react.svg" alt="React" />
            <img className="size-7 rounded-full border-2 -translate-x-6 bg-white border-slate-100" src="/assets/python.svg" alt="Python" />
            <img className="size-7 rounded-full border-2 -translate-x-9 bg-white border-slate-100" src="/assets/mongo.svg" alt="MongoDB" />
            <span className="-translate-x-3">From UI to deploy—end-to-end</span>
          </div>

          <h1 className="text-center md:text-left text-xl md:text-2xl font-medium leading-tight text-slate-900 dark:text-slate-100">
            — Hello There
          </h1>

          <HyperText className="text-primary text-center md:text-left text-5xl md:text-6xl font-medium leading-tight dark:text-pretty">
            Vikraman G
          </HyperText>

          <MorphingText
            texts={[
              "Fullstack Developer",
              "Software Developer",
              "Frontend Developer",
              "Backend Developer",
              "WebGIS Developer",
              "MERN Stack Developer",
              "Freelancer",
            ]}
          />

          <p className="text-center md:text-left text-slate-700 dark:text-slate-300 mt-4 max-w-lg">
            Crafting dynamic websites, from UI design to deployment, with a knack for seamless user experiences.
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleResumeClick}
              className="inline-flex items-center justify-center bg-pretty dark:bg-primary hover:bg-pretty/90 dark:hover:bg-primary/90 text-white rounded-md px-7 h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-pretty/50"
              aria-label="Open my resume"
            >
              My Resume
            </button>

            <a
              href="#contact"
              className="flex items-center gap-2 border border-slate-600 dark:border-slate-400 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] rounded-md px-6 h-11 text-slate-700 dark:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
              aria-label="Contact me"
            >
              <Send2 size="23" className="text-slate-600 dark:text-slate-200" variant="Broken" />
              Contact me
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="hero-right relative min-w-0">
          {/* keep spinner inside container bounds */}
          <div className="absolute -top-6 right-2 z-20">
            <Spinner />
          </div>
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-4.png"
            alt="Showcase preview of projects and UI"
            className="block max-w-full w-[min(90vw,420px)] drop-shadow-xl rounded-lg"
            loading="eager"
          />
        </div>
      </div>

      {/* Modal only on desktop */}
      {!isSmall && (
        <Modal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
          className="p-0 overflow-hidden max-w-4xl md:max-w-5xl w-[92vw]"
        >
          <PDFViewer />
        </Modal>
      )}

      <FollowMeRail />
    </section>
  );
};

export default HeroSection;
