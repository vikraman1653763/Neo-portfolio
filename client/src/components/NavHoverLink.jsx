import React from "react";
import { Link } from "react-router-dom";

/**
 * NavHoverLink – smooth slide-up hover effect.
 * Works like <Link> from react-router-dom but animated.
 */
export default function NavHoverLink({ to = "/", children, className = "" }) {
  return (
    <Link
      to={to}
      className={`relative overflow-hidden h-6 group inline-block ${className}`}
    >
      <span className="block transition-transform duration-300 group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span className="block absolute top-full left-0 transition-transform duration-300 group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
    </Link>
  );
}
