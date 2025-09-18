import React from "react";

const ButtonGradient = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center
        px-6 py-2 rounded-full font-semibold text-white text-sm
        bg-gradient-to-r from-pretty to-pretty
        hover:from-indigo-500 hover:to-primary
        shadow-md hover:shadow-lg
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default ButtonGradient;
