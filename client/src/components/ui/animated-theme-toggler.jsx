// components/ui/animated-theme-toggler.jsx
import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export const AnimatedThemeToggler = ({ className }) => {
  const { theme, toggleTheme } = useAppContext();
  const buttonRef = useRef(null);

  const onClick = useCallback(async () => {
    // If View Transitions API is unavailable, just toggle.
    if (!document.startViewTransition || !buttonRef.current) {
      toggleTheme();
      return;
    }

    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    await document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme(); // <- single source of truth
      });
    }).ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [toggleTheme]);

  const isDark = theme === "dark";

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "h-8 w-8 flex items-center justify-center p-2 rounded-full transition " +
          "bg-white/60 backdrop-blur-md text-slate-700 hover:bg-white/80 " +
          "border border-white/30 shadow-[0_2px_10px_rgba(2,6,23,0.08)] " +
          "dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900/80 " +
          "dark:border-none dark:shadow-[0_6px_16px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
};
