// useIsSmallScreen.ts
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768; // px

const useIsSmallScreen = () => {
  const getInitial = () =>
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : false;

  const [isSmall, setIsSmall] = useState(getInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => setIsSmall(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    // also handle orientation changes on mobile
    window.addEventListener("orientationchange", onResize);

    // set once on mount in case SSR mismatch
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return isSmall;
};

export default useIsSmallScreen;
