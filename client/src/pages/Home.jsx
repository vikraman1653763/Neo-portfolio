import React from "react";
import HeroSection from "../components/HeroSection";
import VelocityBanner from "@/components/SlantedVelocityBanner";
import HeroBgSvg from "@/components/HeroBgSvg";
import Orbit from "@/components/Orbit";
import TechArsenal from "@/components/TechArsenal";

const Home = () => {
  return (
    <div className="relative sm:w-full overflow-hidden ">
        <HeroSection />
        <VelocityBanner />
         <HeroBgSvg />
        <Orbit/>
        <TechArsenal
  slugs={["react", "nodejs", "tailwindcss", "postgresql"]}
/>

    </div>
  );
};

export default Home;
