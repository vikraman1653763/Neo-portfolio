import React from "react";
import { SpinningText } from "./ui/spinning-text";

const Spinner = () => {
  return (
    <div className="relative inline-grid place-items-center">
      <div className="w-24 h-24 md:w-30 md:h-30 rounded-full bg-white shadow-sm ring-1 ring-primary/10" />
      <SpinningText
        className="
          absolute inset-0
          animate-[spin_15s_linear_infinite]
          text-[10px] md:text-sm
           uppercase
          pointer-events-none
          text-slate-600
          tracking-wider
        "
      >
        Hire me • hire me • hire me •
      </SpinningText>
      <div className=" absolute grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-pretty/30 text-white ring-2 ring-white shadow-lg">
        <img
          src="/assets/handshake.svg"
          alt="Handshake"
          className="w-10 h-10"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default Spinner;
