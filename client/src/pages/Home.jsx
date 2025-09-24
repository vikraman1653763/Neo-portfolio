import React from "react";
import HeroSection from "../components/HeroSection";
import VelocityBanner from "@/components/SlantedVelocityBanner";
import HeroBgSvg from "@/components/HeroBgSvg";
import Orbit from "@/components/Orbit";
import TechStackGrid from "@/components/TechStackGrid";
import TechArsenalOrbit from "@/components/TechArsenal";

const Home = () => {
  return (
    <div className="relative sm:w-full overflow-hidden ">
        <HeroSection />
        <VelocityBanner />
         <HeroBgSvg />
        <TechArsenalOrbit/>
        <TechStackGrid/>

    </div>
  );
};

export default Home;
