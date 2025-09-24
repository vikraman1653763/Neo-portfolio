import React from "react";
import { ScrollVelocityRow } from "./ui/scroll-based-velocity";

const VelocityBanner = () => {
  const line =
    "Dashboards • Admin • E-Commerce • Product Pages • Portfolios • CRM • Analytics • Real-time Chat • Secure Payments • Image Optimization • Task Manager • Expense Tracker • Business Sites • UI/UX • Hosting & Domains • Interactive Maps • On-Page SEO • ";

  return (
    <div className="relative w-full overflow-hidden">
      {/* MOBILE (xs) */}
      <div className="sm:hidden relative w-full h-24 overflow-hidden">
        <ScrollVelocityRow
          baseVelocity={1.2}
          direction={1}
          className="
            pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-[240vw] rotate-0
            py-1.5
            text-lg font-semibold leading-none
            rounded-lg
            bg-primary text-white
            dark:bg-primary/90 dark:text-white
            drop-shadow-lg shadow-black/20 dark:shadow-black/40
            ring-1 ring-black/10 dark:ring-white/10
          "
          /* Soft edge fade so text doesn't hard-cut at sides */
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {line}
        </ScrollVelocityRow>
      </div>

      {/* DESKTOP/TABLET (sm+) — your existing design */}
      <div className="hidden sm:block relative w-full bg-transparent h-[220px] md:h-[320px]">
        {/* strip 1 */}
        <ScrollVelocityRow
          baseVelocity={2}
          direction={1}
          className="
            pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            rotate-6
            w-[180vw] md:w-[160vw]
            py-3
            text-3xl md:text-4xl font-bold leading-none rounded-xl
            bg-primary text-white
            dark:bg-primary/90 dark:text-white
            drop-shadow-xl shadow-xl shadow-black/20 dark:shadow-black/40
            ring-1 ring-black/10 dark:ring-white/10
          "
        >
          {line}
        </ScrollVelocityRow>

        {/* strip 2 */}
        <ScrollVelocityRow
          baseVelocity={2}
          direction={-1}
          className="
            pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            -rotate-6
            w-[180vw] md:w-[160vw]
            py-3
            text-3xl md:text-4xl font-bold leading-none rounded-xl
            bg-primary text-white
            dark:bg-primary/90 dark:text-white
            drop-shadow-xl shadow-xl shadow-black/20 dark:shadow-black/40
            ring-1 ring-black/10 dark:ring-white/10
          "
        >
          {line}
        </ScrollVelocityRow>
      </div>
    </div>
  );
};

export default VelocityBanner;
