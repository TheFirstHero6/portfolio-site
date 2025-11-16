"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Code2, Mail, Orbit, Navigation, MousePointerClick, Hand } from "lucide-react";

type Section = 'hero' | 'about' | 'projects' | 'skills' | 'contact';

type NavigationMode = 'default' | 'exploration';

interface NavigationHUDProps {
  currentSection: Section;
  hoveredSection: Section | null;
  onNavigate: (section: Section) => void;
  navigationMode: NavigationMode;
  onModeChange: (mode: NavigationMode) => void;
}

const sectionInfo: { [key in Section]: { icon: any; label: string; color: string } } = {
  hero: { icon: Home, label: 'Home', color: '#3b82f6' },
  about: { icon: User, label: 'About', color: '#a855f7' },
  projects: { icon: Briefcase, label: 'Projects', color: '#6366f1' },
  skills: { icon: Code2, label: 'Skills', color: '#8b5cf6' },
  contact: { icon: Mail, label: 'Contact', color: '#ec4899' },
};

// Fixed positions for radar (normalized) - updated to match actual planet positions
// Planets orbit in a circle: about (top), projects (right), skills (bottom), contact (left)
// Hero is at center
const radarPositions: { [key in Section]: { x: number; y: number } } = {
  hero: { x: 50, y: 50 }, // Center
  about: { x: 50, y: 20 }, // Top (angle: -π/2)
  projects: { x: 80, y: 50 }, // Right (angle: 0)
  skills: { x: 50, y: 80 }, // Bottom (angle: π/2)
  contact: { x: 20, y: 50 }, // Left (angle: π)
};

export function NavigationHUD({ currentSection, hoveredSection, onNavigate, navigationMode, onModeChange }: NavigationHUDProps) {
  return (
    <>
      {/* Section Label - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-2 left-2 sm:top-4 sm:left-4 md:top-8 md:left-8 z-50"
      >
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl backdrop-blur-2xl border-2 flex items-center justify-center"
                style={{ 
                  backgroundColor: `${sectionInfo[currentSection].color}15`,
                  borderColor: `${sectionInfo[currentSection].color}60`,
                  boxShadow: `0 0 20px ${sectionInfo[currentSection].color}40`,
                }}
              >
                {(() => {
                  const Icon = sectionInfo[currentSection].icon;
                  return <Icon size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: sectionInfo[currentSection].color }} />;
                })()}
              </motion.div>
            </AnimatePresence>
            
            <div className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-2xl border border-white/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <p className="text-white text-sm sm:text-base md:text-lg">{sectionInfo[currentSection].label}</p>
                  <p className="text-white/50 text-[10px] sm:text-xs mt-0.5 hidden sm:block">Exploring 3D Space</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mode Toggle Button - Below section label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            <motion.button
              onClick={() => onModeChange(navigationMode === 'default' ? 'exploration' : 'default')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl bg-black/80 backdrop-blur-2xl border-2 border-white/30 flex items-center gap-2 sm:gap-3 text-white hover:bg-black/90 transition-all w-full relative overflow-hidden text-xs sm:text-sm"
              style={{
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Subtle pulsing glow for explore mode in default mode */}
              {navigationMode === 'default' && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                {navigationMode === 'default' ? (
                  <>
                    <Orbit size={16} className="sm:w-5 sm:h-5" />
                    <span className="font-semibold hidden sm:inline">Explore Mode</span>
                    <span className="font-semibold sm:hidden">Explore</span>
                  </>
                ) : (
                  <>
                    <Navigation size={16} className="sm:w-5 sm:h-5" />
                    <span className="font-semibold hidden sm:inline">Default Mode</span>
                    <span className="font-semibold sm:hidden">Default</span>
                  </>
                )}
              </span>
            </motion.button>
            
            {/* Subtle CTA hint - only in default mode */}
            {navigationMode === 'default' && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="mt-1 sm:mt-2 text-center hidden sm:block"
              >
                <motion.p
                  className="text-white/50 text-xs italic"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Discover all sections at once
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
            {/* 3D Radar - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-8 md:right-8 z-50 hidden sm:block"
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-black/80 backdrop-blur-2xl border-2 border-white/40 p-4 sm:p-5 md:p-6 shadow-2xl">
                {/* Radar grid circles - more visible */}
                <div className="absolute inset-6 rounded-full border-2 border-white/30" />
                <div className="absolute inset-12 rounded-full border border-white/20" />
                <div className="absolute inset-[72px] rounded-full border border-white/15" />
                
                {/* Crosshairs - more visible */}
                <div className="absolute top-1/2 left-6 right-6 h-px bg-white/20" />
                <div className="absolute top-6 bottom-6 left-1/2 w-px bg-white/20" />
          
          {/* Section dots on radar */}
          {(Object.keys(radarPositions) as Section[]).map((section) => {
            const pos = radarPositions[section];
            const isActive = section === currentSection;
            const isHovered = section === hoveredSection;
            const info = sectionInfo[section];

            return (
              <motion.button
                key={section}
                onClick={() => onNavigate(section)}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
              >
                        <motion.div
                          className="relative"
                          animate={{
                            scale: isActive ? [1, 1.5, 1] : isHovered ? 1.3 : 1,
                          }}
                          transition={{
                            duration: 2,
                            repeat: isActive ? Infinity : 0,
                          }}
                        >
                          {/* Glow ring for active - more prominent */}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{
                                backgroundColor: info.color,
                                filter: 'blur(12px)',
                              }}
                              animate={{
                                scale: [1, 2.5, 1],
                                opacity: [0.8, 0, 0.8],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                          )}
                          
                          <div
                            className={`rounded-full relative ${
                              isActive ? 'w-5 h-5 ring-2 ring-white ring-offset-2 ring-offset-black/60' : 'w-4 h-4'
                            }`}
                            style={{ 
                              backgroundColor: info.color,
                              boxShadow: isHovered || isActive ? `0 0 20px ${info.color}, 0 0 40px ${info.color}80` : `0 0 8px ${info.color}40`,
                            }}
                          />
                        </motion.div>

                       {/* Label on hover - more visible */}
                       <AnimatePresence>
                         {(isHovered || isActive) && (
                           <motion.div
                             initial={{ opacity: 0, scale: 0.8, y: 5 }}
                             animate={{ opacity: 1, scale: 1, y: 0 }}
                             exit={{ opacity: 0, scale: 0.8, y: 5 }}
                             className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-black/95 backdrop-blur-xl border-2 whitespace-nowrap text-sm font-semibold pointer-events-none"
                             style={{
                               borderColor: info.color,
                               color: info.color,
                               boxShadow: `0 0 20px ${info.color}60`,
                             }}
                           >
                             {info.label}
                           </motion.div>
                         )}
                       </AnimatePresence>
              </motion.button>
            );
          })}

                {/* Scanning line - more visible */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.6) 50deg, transparent 100deg)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Center pulse - larger and more visible */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400"
                  style={{
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)',
                  }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [1, 0.3, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
        </div>
      </motion.div>


      {/* Hover Tooltip - Center */}
      <AnimatePresence>
        {hoveredSection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none hidden sm:block"
          >
            <div 
              className="px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border-2 relative overflow-hidden"
              style={{
                backgroundColor: `${sectionInfo[hoveredSection].color}08`,
                borderColor: `${sectionInfo[hoveredSection].color}80`,
                boxShadow: `0 0 40px ${sectionInfo[hoveredSection].color}40`,
              }}
            >
              {/* Animated glow */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle, ${sectionInfo[hoveredSection].color}20 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                {(() => {
                  const Icon = sectionInfo[hoveredSection].icon;
                  return (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon size={24} className="sm:w-8 sm:h-8" style={{ color: sectionInfo[hoveredSection].color }} />
                    </motion.div>
                  );
                })()}
                <div>
                  <p 
                    className="text-lg sm:text-xl md:text-2xl font-semibold"
                    style={{ color: sectionInfo[hoveredSection].color }}
                  >
                    {sectionInfo[hoveredSection].label}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator - Bottom Center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 sm:bottom-4 md:bottom-8"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 px-3 py-2 sm:px-5 sm:py-3 md:px-8 md:py-4 rounded-full bg-black/60 backdrop-blur-2xl border border-white/20">
          {(['hero', 'about', 'projects', 'skills', 'contact'] as Section[]).map((section, index) => {
            const isActive = section === currentSection;
            const isHovered = section === hoveredSection;
            
            return (
              <motion.button
                key={section}
                onClick={() => onNavigate(section)}
                className="relative group"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={`rounded-full transition-all ${
                    isActive ? 'w-6 h-1.5 sm:w-8 sm:h-2 md:w-10 md:h-2.5' : 'w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5'
                  }`}
                  style={{
                    backgroundColor: isActive || isHovered 
                      ? sectionInfo[section].color 
                      : 'rgba(255, 255, 255, 0.3)',
                  }}
                  animate={{
                    opacity: isActive ? 1 : isHovered ? 0.8 : 0.5,
                  }}
                  layoutId={isActive ? "activeIndicator" : undefined}
                />
                
                {/* Pulsing glow for active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: sectionInfo[section].color,
                      filter: 'blur(8px)',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Keyboard Controls Hint - Top Right (only in default mode) */}
      {navigationMode === 'default' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="fixed top-2 right-2 sm:top-4 sm:right-4 md:top-8 md:right-8 z-50 hidden sm:flex"
        >
          <div className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-2xl border border-white/20 text-white/70 text-xs sm:text-sm flex items-center gap-2 sm:gap-3">
            <div className="flex gap-1 sm:gap-2">
              <kbd className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-white/10 border border-white/30 text-white text-[10px] sm:text-xs">←</kbd>
              <kbd className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-white/10 border border-white/30 text-white text-[10px] sm:text-xs">→</kbd>
            </div>
            <span className="hidden md:inline">Navigate Space</span>
            <span className="md:hidden">Nav</span>
          </div>
        </motion.div>
      )}

      {/* Exploration Mode Instructions */}
      {navigationMode === 'exploration' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
          className="fixed top-1/2 left-2 sm:left-4 md:left-8 -translate-y-1/2 z-50 max-w-[280px] sm:max-w-xs"
        >
          <div className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-black/80 backdrop-blur-2xl border-2 border-white/30 relative overflow-hidden"
            style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <div className="relative z-10 space-y-3 sm:space-y-4">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <Orbit size={18} className="sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-sm sm:text-base md:text-lg">Exploration Mode</span>
              </h3>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Hand className="text-blue-400 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-white text-xs sm:text-sm font-medium">Drag to Rotate</p>
                    <p className="text-white/60 text-[10px] sm:text-xs">Click and drag to orbit around the solar system</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <MousePointerClick className="text-purple-400 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-white text-xs sm:text-sm font-medium">Click Planets</p>
                    <p className="text-white/60 text-[10px] sm:text-xs">Click any labeled planet to navigate to that section</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <Navigation className="text-pink-400 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-white text-xs sm:text-sm font-medium">View All Sections</p>
                    <p className="text-white/60 text-[10px] sm:text-xs">All sections are visible as planets in orbit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

