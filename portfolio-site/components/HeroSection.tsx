"use client";

import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";

interface HeroSectionProps {
  onViewProjects: () => void;
}

export default function HeroSection({ onViewProjects }: HeroSectionProps) {
  const typewriterTexts = [
    "It's dangerous to ship alone.",
    "import Klaus from './developers'",
  ];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        {/* Typewriter Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <TypewriterText
            texts={typewriterTexts}
            speed={80}
            delay={2000}
            className="leading-relaxed"
          />
        </motion.div>

        {/* Name and Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            Klaus
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg md:text-xl text-white/80">
            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              Next.js Developer
            </span>
            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              React Specialist
            </span>
            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              TypeScript Expert
            </span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onViewProjects}
          className="group relative px-8 py-4 bg-linear-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/30 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:border-white/50 overflow-hidden"
        >
          <span className="relative z-10">View My Projects</span>

          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
