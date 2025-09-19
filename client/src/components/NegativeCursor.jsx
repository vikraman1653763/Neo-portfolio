import { useEffect } from "react";

export default function NegativeCursor() {
  useEffect(() => {
    const cursor = document.querySelector(".neg-cursor-dot");
    const coords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMove = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };

    const animate = () => {
      cursor.style.left = `${coords.x - 15}px`;
      cursor.style.top = `${coords.y - 15}px`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    requestAnimationFrame(animate);

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] cursor-none">
      <div className="neg-cursor-dot absolute w-5 h-5 rounded-full bg-transparent backdrop-invert ring-2 ring-pretty" />
    </div>
  );
}
