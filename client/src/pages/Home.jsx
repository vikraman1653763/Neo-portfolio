import React from "react";
import HeroSection from "../components/HeroSection";
import VelocityBanner from "@/components/SlantedVelocityBanner";
import HeroBgSvg from "@/components/HeroBgSvg";
import TechStackGrid from "@/components/TechStackGrid";
import TechArsenalOrbit from "@/components/TechArsenal";
import GithubCalendarSection from "@/components/GithubCalendar";
import AcademicJourney from "@/components/AcademicJourney";
import MiniProjects from "@/components/MiniProjects";
import { GridPattern } from "@/components/ui/grid-pattern";
import Projects from "@/components/projects";

const Home = () => {
  return (
    <div className="relative sm:w-full overflow-hidden ">
      <HeroSection />
      <VelocityBanner />
      <HeroBgSvg />
      <TechArsenalOrbit />
      <TechStackGrid />
      <GithubCalendarSection username="vikraman1653763" startYear={2023} />
      <AcademicJourney />
 <Projects/>
 
      <div className=" relative">
      <MiniProjects />
 <GridPattern/>
      </div>
    </div>
  );
};

export default Home;
