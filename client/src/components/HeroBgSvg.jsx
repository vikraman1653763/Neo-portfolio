// components/HeroBgSvg.jsx
export default function HeroBgSvg() {
  return (
    <svg
      className=" absolute inset-0 w-screen h-full sm:h-[calc(100vh+60px)] -z-10 pointer-events-none text-slate-200/70 dark:text-slate-800/60"
      viewBox="0 0 1440 720"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path stroke="currentColor" d="M-15.227 702.342H1439.7" />
      <circle cx="711.819" cy="372.562" r="308.334" stroke="currentColor" />
      <circle cx="16.942" cy="20.834" r="308.334" stroke="currentColor" />
      <circle cx="161.942" cy="120.834" r="308.334" stroke="currentColor" />
      <path stroke="currentColor" d="M-15.227 573.66H1439.7M-15.227 147.029H1439.7" />
      <circle cx="782.595" cy="411.166" r="308.334" stroke="currentColor" />
      <circle cx="1482.595" cy="611.166" r="308.334" stroke="currentColor" />
    </svg>
  );
}
