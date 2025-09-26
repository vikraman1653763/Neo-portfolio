import { useAppContext } from "@/context/AppContext";
import React from "react";
import { IoIosLink } from "react-icons/io";
import { BsGithub } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const MiniProjects = () => {
  const [openIndex, setOpenIndex] = React.useState(0);       // start at first project
  const [paused, setPaused] = React.useState(false);         // pause on hover
  const hasInteractedRef = React.useRef(false);              // stop auto after user click
  const { theme } = useAppContext();

  const miniProjects = [
    {
      title: "Weather Monitor",
      description:
        "Real-time weather dashboard using an external API, displaying temperature, humidity, and forecasts.",
      image: "/assets/weather.webp",
      git: "https://github.com/vikraman1653763/Weather.git",
    },
    {
      title: "Amazon Clone",
      description:
        "E-commerce clone with product listings, cart, and checkout, built with React and Firebase.",
      image: "/assets/amazon.webp",
      git: "https://github.com/vikraman1653763/Amazon.git",
    },
    {
      title: "Authentication System with Email Verification",
      description:
        "Secure user authentication with email OTP verification and password reset functionality.",
      image: "/assets/login.webp",
      git: "https://github.com/vikraman1653763/intern2024_2.git",
    },
    {
      title: "WebGIS Project",
      description:
        "Web-based GIS mapping platform for spatial data visualization and interactive layers.",
      image: "/assets/webgis.webp",
      git: "https://github.com/vikraman1653763/intern2024_2.git",
    },
    {
      title: "Network Traffic Monitor",
      description:
        "Monitors bandwidth usage and network packets in real time with data visualization charts.",
      image: "/assets/net.webp",
      git: "https://github.com/vikraman1653763/bandwidth-monitor.git",
    },
    {
      title: "PDF to Audio Converter",
      description:
        "Converts PDF documents into high-quality audio narration using text-to-speech.",
      image: "/assets/pdfmp3.webp",
      git: "https://github.com/vikraman1653763/pdf-to-Audio-Converter.git",
    },
  ];

  // Auto-rotate logic
  React.useEffect(() => {
    if (paused || hasInteractedRef.current) return;
    const id = setInterval(() => {
      setOpenIndex((prev) => (prev + 1) % miniProjects.length);
    }, 4000); // 4-second interval
    return () => clearInterval(id);
  }, [paused, miniProjects.length]);



  return (
    <div className="max-w-6xl mx-auto px-4 md:px-5 flex flex-col md:flex-row gap-8  z-high sm:h-120 backdrop-blur-[2px] bg-white/10 dark:bg-background/10 rounded-2xl p-5 ">
      {/* Left column : heading + image */}
      <div className="flex-1 flex flex-col items-start  z-high">
        <p className="text-sm uppercase tracking-wider text-primary dark:text-white">
          — Built with ❤️ 
        </p>

        <h2 className=" py-5 text-4xl md:text-5xl font-extrabold text-primary dark:text-pretty max-sm:text-3xl">
          Mini Projects
        </h2>

        <p className="text-base text-slate-500 mb-7 text-center md:text-left dark:text-slate-300 max-w-lg">
          A selection of small but meaningful projects I’ve built to explore new ideas and sharpen my skills—quick experiments that taught me a lot and were fun to create.
        </p>

        {/* Image container with AnimatePresence */}
      {/* Image container with AnimatePresence and skew motion */}
<div className="relative w-full max-w-md h-64 md:h-72 rounded-xl overflow-hidden">
  <AnimatePresence mode="wait" initial={false}>
    <motion.img
      key={openIndex} // triggers exit/enter
      src={miniProjects[openIndex].image}
      alt={miniProjects[openIndex].title}
      className=" border-2 border-primary dark:border-pretty absolute inset-0 w-full h-full object-cover rounded-xl"
      variants={{
        initial: { opacity: 0 , x:300 }, // enter from top with slight skew
        animate: { opacity: 1,x:0},
        exit: { opacity: 0,x:-300},      // exit down with opposite skew
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: "easeOut" }}
    />
  </AnimatePresence>
</div>

      </div>

      {/* Right column : projects list */}
      <div
        className="flex-1 flex flex-col justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {miniProjects.map((project, index) => (
          <div
            key={index}
            className="border-b border-slate-200 py-4 cursor-pointer"
            onClick={() => {
              hasInteractedRef.current = true; // stop auto-rotate after first user click
              setOpenIndex(index);
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">{project.title}</h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  openIndex === index
                    ? "rotate-180 border-x rounded-full border-primary dark:border-pretty"
                    : ""
                } transition-all duration-500 ease-in-out`}
              >
                <path
                  d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                  stroke="currentColor"
                  className="text-primary dark:text-pretty"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md ${
                openIndex === index
                  ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                  : "opacity-0 max-h-0 -translate-y-2"
              }`}
            >
              <p className="text-primary dark:text-slate-300">
                {project.description}
              </p>

              <a
                href={project.git}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-pretty dark:bg-primary hover:bg-pretty/90 dark:hover:bg-primary/90 text-white rounded-md px-3 py-2 mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-pretty/50 gap-2"
              >
                <BsGithub className="text-xl" />
                GitHub
                <IoIosLink className="text-lg" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniProjects;
