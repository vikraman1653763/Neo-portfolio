import React from "react";

const ButtonGradient = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center
        px-6 py-2 rounded-full font-semibold text-white text-sm
        bg-gradient-to-r from-pretty to-pretty
        hover:from-pretty/50 hover:to-pretty/70
        shadow-md hover:shadow-lg
        transition-all duration-300 ease-in-out
       
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default ButtonGradient;
