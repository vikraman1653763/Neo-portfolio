import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaStackOverflow, FaGithub } from "react-icons/fa";

export default function FollowMeRail({
  links = {
    linkedin: "https://www.linkedin.com/in/your-handle",
    stackoverflow: "https://stackoverflow.com/users/your-id",
    github: "https://github.com/your-handle",
  },
  className = "",
  position = "sticky", // "sticky" keeps it within the hero bounds
}) {
  const btn =
    "p-2 rounded-full border border-slate-300 bg-white text-primary hover:text-pretty " +
    "transition hover:scale-110 hover:border-slate-500 shadow-sm hover:shadow-md " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 " +
    "dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:border-slate-500";

  const line = "block h-16 w-px bg-slate-300 dark:bg-slate-700";

  return (
    <>
      {/* Desktop / tablet: sticky vertical rail constrained to hero */}
      <div
        // Container is pinned to hero's right edge; sticky element lives inside it
        style={{ right: 100 }} // you can override via className (e.g., right-3 md:right-8)
        className={`hidden sm:block absolute  inset-y-0 ${className} z-30`}
        role="complementary"
        aria-label="Social links"
      >
        <div
          className={
            position === "sticky"
              ? "sticky top-1/2 -translate-y-1/2"
              : "absolute top-1/2 -translate-y-1/2"
          }
        >
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-3">
              <span className={line} aria-hidden="true" />

              <nav className="flex flex-col items-center gap-3" aria-label="Profiles">
                <Link to={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={btn} title="LinkedIn">
                  <FaLinkedinIn className="w-5 h-5" />
                </Link>
                <Link to={links.stackoverflow} target="_blank" rel="noreferrer" aria-label="Stack Overflow" className={btn} title="Stack Overflow">
                  <FaStackOverflow className="w-5 h-5" />
                </Link>
                <Link to={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={btn} title="GitHub">
                  <FaGithub className="w-5 h-5" />
                </Link>
              </nav>

              <span className={line} aria-hidden="true" />
            </div>

            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 select-none
                             [writing-mode:vertical-rl] [text-orientation:upright]">
              Follow me on
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: bottom pill inside hero (not global) */}
      <div className="sm:hidden absolute inset-x-0 bottom-4 z-30 flex justify-center">
        <nav
          aria-label="Profiles"
          className="flex items-center gap-4 px-4 py-2 rounded-full border bg-white/80 dark:bg-slate-900/80
                     border-slate-200 dark:border-slate-700 backdrop-blur shadow-lg"
        >
          <Link to={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={btn} title="LinkedIn">
            <FaLinkedinIn className="w-5 h-5" />
          </Link>
          <Link to={links.stackoverflow} target="_blank" rel="noreferrer" aria-label="Stack Overflow" className={btn} title="Stack Overflow">
            <FaStackOverflow className="w-5 h-5" />
          </Link>
          <Link to={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={btn} title="GitHub">
            <FaGithub className="w-5 h-5" />
          </Link>
        </nav>
      </div>
    </>
  );
}
