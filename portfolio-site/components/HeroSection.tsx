"use client";

import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";
import TypewriterText from "./TypewriterText";
import TechStack from "./TechStack";
import DecryptedText from "./ui/TextPressure";
import TextPressure from "./ui/TextPressure";

interface HeroSectionProps {
  onViewProjects: () => void;
  onContactClick?: () => void;
}

const HeroSection = memo(function HeroSection({
  onViewProjects,
  onContactClick,
}: HeroSectionProps) {
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string }>
  >([]);
  const [isClient, setIsClient] = useState(false);

  const typewriterTexts = [
    "It's dangerous to ship alone.",
    "import Klaus from './developers'",
  ];

  // Generate particles only on client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const generatedParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-svh px-3 sm:px-4 md:px-8 text-center overflow-hidden">
      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
        data-foreground
      >
        {/* Typewriter Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-4 md:mb-6 h-16 md:h-32 lg:h-36 flex items-center justify-center"
        >
          <TypewriterText
            texts={typewriterTexts}
            speed={60}
            delay={2000}
            className="leading-relaxed"
          />
        </motion.div>

        {/* Name and Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-6 md:mb-12 overflow-visible"
        >
          <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 overflow-visible">
            Klaus Chamberlain
            <br />
            <div className="flex justify-center">
              <span className="inline-block mx-auto w-fit leading-none overflow-visible tracking-[0.2em] md:tracking-[0.5em] max-w-[92vw] sm:max-w-none sm:whitespace-pre">
                <TextPressure
                  text="Full Stack Developer"
                  flex={false}
                  alpha={false}
                  stroke={false}
                  width={false}
                  weight={true}
                  italic={false}
                  textColor="#ffffff"
                  strokeColor="#ff0000"
                  minFontSize={36}
                />
              </span>
            </div>
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm md:text-xl text-white/80">
            <span className="px-3 py-2 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              Next.js Developer
            </span>
            <span className="px-3 py-2 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              React Specialist
            </span>
            <span className="px-3 py-2 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              Skilled in TypeScript
            </span>
          </div>
        </motion.div>

        {/* CTA Dock (glass) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="glass glass-border rounded-2xl px-2 py-1 shadow-lg">
            <div className="flex items-center gap-1">
              <button
                onClick={onViewProjects}
                className="glass glass-border rounded-xl px-4 md:px-5 py-2 text-white/90 hover:text-white hover:bg-white/15 active:scale-[0.98] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 shadow-sm hover:shadow-lg hover:translate-y-px cursor-pointer"
              >
                View My Projects
              </button>
              <button
                onClick={onContactClick}
                className="glass glass-border rounded-xl px-4 md:px-5 py-2 text-white/90 hover:text-white hover:bg-white/15 active:scale-[0.98] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 shadow-sm hover:shadow-lg hover:translate-y-px cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
        </motion.div>
        {/* TechStack moved out of flow to avoid affecting centering */}
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
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

      {/* TechStack anchored near bottom, not part of centered group */}
      <div className="hidden md:block absolute inset-x-0 bottom-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* <TechStack /> */}
        </motion.div>
      </div>

      {/* Floating particles effect */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
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
      )}
    </div>
  );
});

export default HeroSection;
