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

      <div className=" relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-background blur-2xl   rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-background blur-2xl   rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-background blur-2xl   rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-background blur-2xl   rounded-full pointer-events-none" />
        <div className="absolute top-0 w-full h-20 bg-background  border-2 blur-2xl  rounded-full pointer-events-none" />
        <div className="absolute bottom-0 w-full h-20 bg-background  border-2 blur-2xl  rounded-full pointer-events-none" />
        <div className="absolute left-0 w-20 h-full bg-background  border-2 blur-2xl  rounded-full pointer-events-none" />
        <div className="absolute right-0 w-20 h-full bg-background  border-2 blur-2xl  rounded-full pointer-events-none" />
        <GridPattern />
        <Projects />
        <MiniProjects />
      </div>
    </div>
  );
};

export default Home;
