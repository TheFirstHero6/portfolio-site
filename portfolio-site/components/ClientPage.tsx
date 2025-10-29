"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import TechStack from "./TechStack";

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

  const handleViewProjects = () => {
    setShowCarousel(true);
    // Example color change when viewing projects
    if (silkRef.current) {
      silkRef.current.updateColor("#8B5CF6"); // Purple for projects
    }
  };

  return (
    <div className="relative min-h-screen font-sans">
      {/* Animated Silk Background */}
      <div className="absolute inset-0 z-0">
        <Silk
          ref={silkRef}
          speed={3}
          scale={1.2}
          color="#2c22b4"
          noiseIntensity={1.2}
          rotation={0.1}
        />
      </div>

      {/* Hero Section */}
      <HeroSection onViewProjects={handleViewProjects} />

      {/* Additional content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Welcome to My Portfolio
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Clean, modern design with smooth animations and beautiful effects
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Feature {i}
                </h3>
                <p className="text-white/80">
                  This is some sample content showcasing the clean design and
                  smooth animations. The background provides a beautiful
                  animated backdrop.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
