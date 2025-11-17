"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HeroContent } from "./sections/HeroContent";
import { AboutContent } from "./sections/AboutContent";
import { ProjectsContent } from "./sections/ProjectsContent";
import { SkillsContent } from "./sections/SkillsContent";
import { ContactContent } from "./sections/ContactContent";
import { projects } from "../lib/projects";
import { getSectionColor, type Section } from "../lib/sectionColors";

interface ContentOverlayProps {
  currentSection: Section;
  isTransitioning: boolean;
  onNavigate?: (section: Section) => void;
}

export function ContentOverlay({ currentSection, isTransitioning, onNavigate }: ContentOverlayProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images on mount
  useEffect(() => {
    const imageUrls: string[] = [];
    
    // Collect all image URLs from projects
    projects.forEach(project => {
      if (project.image) {
        imageUrls.push(project.image);
      }
    });

    // Preload all images
    const loadPromises = imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to not block
        img.src = url;
      });
    });

    Promise.all(loadPromises).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  // Pre-render all content components (hidden) for instant switching
  const allContent = {
    hero: <HeroContent onNavigate={onNavigate} />,
    about: <AboutContent />,
    projects: <ProjectsContent />,
    skills: <SkillsContent />,
    contact: <ContactContent />,
  };

  const sectionColor = getSectionColor(currentSection);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 touch-auto">
      {/* Section-specific background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isTransitioning ? 0.3 : 0.5,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(circle at center, ${sectionColor}15 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-start justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-y-auto overscroll-contain"
          >
            <motion.div
              className="max-w-7xl w-full pointer-events-auto py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12"
            >
              {allContent[currentSection]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

