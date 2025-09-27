import React, { useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

export default function RiveMan() {
  const { theme } = useAppContext(); // "light" | "dark"

  const src = theme === "dark" ? "/assets/work-dark.riv" : "/assets/work-light.riv";

  // (optional) keep the Layout instance stable
  const layout = useMemo(
    () => new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    []
  );

  const { RiveComponent } = useRive({
    src,
    animations: "Timeline 1", // must exist in BOTH .riv files
    autoplay: true,
    layout,
  });

  // key forces unmount/mount when src changes
  return (
    <div className="w-full h-full">
      <RiveComponent key={src} />
    </div>
  );
}
