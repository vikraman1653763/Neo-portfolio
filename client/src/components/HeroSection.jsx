import React from "react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border border-green-700 w-screen h-screen flex items-center justify-center">
      {/* Background pattern */}
      <svg
        className="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 1440 720"
        fill="none"
      >
        <path stroke="#E2E8F0" strokeOpacity=".7" d="M-15.227 702.342H1439.7" />
        <circle cx="711.819" cy="372.562" r="308.334" stroke="#E2E8F0" strokeOpacity=".7" />
        <circle cx="16.942" cy="20.834" r="308.334" stroke="#E2E8F0" strokeOpacity=".7" />
        <circle cx="161.942" cy="120.834" r="308.334" stroke="#E2E8F0" strokeOpacity=".7" />
        <path stroke="#E2E8F0" strokeOpacity=".7" d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7" />
        <circle cx="782.595" cy="411.166" r="308.334" stroke="#E2E8F0" strokeOpacity=".7" />
      </svg>

      {/* Hero Content */}
      <div className=" flex flex-col md:flex-row items-center justify-between mt-20 px-4 md:px-16 lg:px-24 xl:px-32 pb-20 gap-12 md:gap-0">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 border border-slate-400 text-gray-500 text-xs rounded-full px-3 py-1 mb-6">
            <img
              className="size-7 rounded-full border-2 border-white"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
              alt=""
            />
            <img
              className="size-7 rounded-full border-2 border-white -translate-x-3"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
              alt=""
            />
            <span className="-translate-x-3">Join community of 1m+ founders</span>
          </div>
          <h1 className="text-center md:text-left text-5xl md:text-6xl font-medium leading-tight text-slate-900">
            Intelligent AI tools built to help.
          </h1>
          <p className="text-center md:text-left text-slate-700 mt-4 max-w-lg">
            Unlock smarter workflows with AI tools designed to boost productivity, simplify tasks and help you do more with less effort.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="bg-pretty hover:bg-pretty text-white rounded-md px-7 h-11">
              Get started
            </button>
            <button className="flex items-center gap-2 border border-slate-600 hover:bg-white/10 rounded-md px-6 h-11">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 10.5" />
                <rect x="2" y="6" width="14" height="12" rx="2" />
              </svg>
              Watch demo
            </button>
          </div>
        </div>
        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-4.png"
          alt="hero"
          className="max-w-xs sm:max-w-sm lg:max-w-md"
        />
      </div>
    </section>
  );
};

export default HeroSection;
