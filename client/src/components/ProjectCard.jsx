// ==========================
// ProjectCard.jsx (React + TailwindCSS)
// ==========================
import React from "react";
import { MdStars } from "react-icons/md";

export function ProjectCard({
  title,
  description,
  link,
  image,
  techBadges = [],
  isDemo = false,
  ctaLabel, // NEW: custom button text (e.g., View Certificate)
}) {
  const label = ctaLabel ?? (isDemo ? "Watch Demo" : "Visit Project");

  return (
    <article
      className="relative flex flex-col items-center justify-between
      bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-slate-700"
    >

      <a
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        className="relative block group"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-58 object-contain group-hover:scale-105 transition-transform duration-500 object-top"
          loading="lazy"
        />
        {isDemo && (
          <span className="absolute top-3 left-3 bg-pretty dark:bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
            Demo
          </span>
        )}
      </a>

      <div className="p-5 pt-0 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {description}
          </p>
        </div>

        {techBadges?.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-4 z-10">
            {techBadges.map((badge) => (
              <li
                key={badge}
                className="text-xs dark:font-semibold bg-pretty/10 text-pretty dark:bg-white dark:text-primary px-2 py-1 rounded-full"
              >
                {badge}
              </li>
            ))}
          </ul>
        )}

        <a
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          className=" w-fit mx-auto inline-block bg-pretty dark:bg-primary text-white px-4 py-2 rounded-lg font-medium text-sm hover:brightness-110 transition-colors duration-200"
        >
          {label}
        </a>
      </div>
      <MdStars className=" text-pretty opacity-40 dark:opacity-70  text-[150px] absolute bottom-50 left-50  translate-x-25 translate-y-55 rotate-45" />
    </article>
  );
}
