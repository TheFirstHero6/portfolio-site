"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import { useParallax } from "../hooks/useParallax";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("./Silk"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800" />
  ),
});

export default function ClientPage() {
  const [showCarousel, setShowCarousel] = useState(false);
  const silkRef = useRef<{ updateColor: (newColor: string) => void }>(null);

  // Parallax effects for different layers
  const backgroundParallax = useParallax({ speed: 0.1, direction: "both" });
  const heroParallax = useParallax({ speed: 0.3, direction: "both" });

  const handleViewProjects = () => {
    setShowCarousel(true);
    // Example color change when viewing projects
    if (silkRef.current) {
      silkRef.current.updateColor("#8B5CF6"); // Purple for projects
    }
  };

  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      {/* Animated Silk Background with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${backgroundParallax.transform.x * 0.5}px, ${
            backgroundParallax.transform.y * 0.5
          }px)`,
        }}
      >
        <Silk
          ref={silkRef}
          speed={3}
          scale={1.2}
          color="#2c22b4"
          noiseIntensity={1.2}
          rotation={0.1}
        />
      </motion.div>

      {/* Hero Section with Parallax */}
      <motion.div
        style={{
          transform: `translate(${heroParallax.transform.x * 0.3}px, ${
            heroParallax.transform.y * 0.3
          }px)`,
        }}
      >
        <HeroSection onViewProjects={handleViewProjects} />
      </motion.div>

      {/* Projects Carousel Placeholder */}
      {showCarousel && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-20 flex items-center justify-center p-8"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Projects Coming Soon
            </h2>
            <p className="text-white/80 text-center mb-6">
              The 3D carousel with glass morphism is being built. This will
              showcase your projects with smooth animations and color morphing
              effects.
            </p>
            <button
              onClick={() => setShowCarousel(false)}
              className="w-full py-3 px-6 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition-colors"
            >
              Back to Hero
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
