"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../components/LoadingScreen";

// Preload ThreeScene module immediately
const ThreeSceneModule = import("../components/ThreeScene");

// Dynamically import ThreeScene to avoid SSR issues with Three.js
const ThreeScene = dynamic(
  () =>
    ThreeSceneModule.then((mod) => ({
      default: mod.ThreeScene,
    })),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

// Preload all section content components
const preloadContent = () => {
  import("../components/sections/HeroContent");
  import("../components/sections/AboutContent");
  import("../components/sections/ProjectsContent");
  import("../components/sections/SkillsContent");
  import("../components/sections/ContactContent");
};

export default function Home() {
  useEffect(() => {
    // Preload all content components immediately
    preloadContent();
  }, []);

  return (
    <main
      id="main-content"
      className="w-full h-screen overflow-hidden bg-[#000510]"
    >
      <ThreeScene />
    </main>
  );
}
