import { useAppContext } from "@/context/AppContext";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

export default function RiveMan() {
  const { theme } = useAppContext();            // "light" | "dark"
  const src = theme === "dark"
    ? "/assets/work-dark.riv"
    : "/assets/work-light.riv";

  const { RiveComponent } = useRive({
    src,
    animations: "Timeline 1",                   // must match animation name inside each .riv
    autoplay: true,                             
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div className="w-[320px] h-[320px] border-2 border-red-500">
      <RiveComponent />
    </div>
  );
}
