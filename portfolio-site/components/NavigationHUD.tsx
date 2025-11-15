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

// Fixed positions for radar (normalized)
const radarPositions: { [key in Section]: { x: number; y: number } } = {
  hero: { x: 50, y: 50 },
  about: { x: 20, y: 35 },
  projects: { x: 75, y: 55 },
  skills: { x: 18, y: 70 },
  contact: { x: 78, y: 30 },
};

export function NavigationHUD({ currentSection, hoveredSection, onNavigate, navigationMode, onModeChange }: NavigationHUDProps) {
  return (
    <>
      {/* Section Label - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-8 left-8 z-50"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-14 h-14 rounded-2xl backdrop-blur-2xl border-2 flex items-center justify-center"
                style={{ 
                  backgroundColor: `${sectionInfo[currentSection].color}15`,
                  borderColor: `${sectionInfo[currentSection].color}60`,
                  boxShadow: `0 0 20px ${sectionInfo[currentSection].color}40`,
                }}
              >
                {(() => {
                  const Icon = sectionInfo[currentSection].icon;
                  return <Icon size={26} style={{ color: sectionInfo[currentSection].color }} />;
                })()}
              </motion.div>
            </AnimatePresence>
            
            <div className="p-4 rounded-xl bg-black/60 backdrop-blur-2xl border border-white/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <p className="text-white text-lg">{sectionInfo[currentSection].label}</p>
                  <p className="text-white/50 text-xs mt-0.5">Exploring 3D Space</p>
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
              className="px-6 py-3 rounded-xl bg-black/80 backdrop-blur-2xl border-2 border-white/30 flex items-center gap-3 text-white hover:bg-black/90 transition-all w-full relative overflow-hidden"
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
              
              <span className="relative z-10 flex items-center gap-3">
                {navigationMode === 'default' ? (
                  <>
                    <Orbit size={20} />
                    <span className="font-semibold">Explore Mode</span>
                  </>
                ) : (
                  <>
                    <Navigation size={20} />
                    <span className="font-semibold">Default Mode</span>
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
                className="mt-2 text-center"
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
              className="fixed bottom-8 right-8 z-50"
            >
              <div className="relative w-64 h-64 rounded-full bg-black/80 backdrop-blur-2xl border-2 border-white/40 p-6 shadow-2xl">
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
          >
            <div 
              className="px-10 py-6 rounded-3xl backdrop-blur-2xl border-2 relative overflow-hidden"
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

              <div className="relative z-10 flex items-center gap-4">
                {(() => {
                  const Icon = sectionInfo[hoveredSection].icon;
                  return (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon size={32} style={{ color: sectionInfo[hoveredSection].color }} />
                    </motion.div>
                  );
                })()}
                <div>
                  <p 
                    className="text-2xl font-semibold"
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
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-3 px-8 py-4 rounded-full bg-black/60 backdrop-blur-2xl border border-white/20">
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
                    isActive ? 'w-10 h-2.5' : 'w-2.5 h-2.5'
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
          className="fixed top-8 right-8 z-50"
        >
          <div className="p-4 rounded-xl bg-black/60 backdrop-blur-2xl border border-white/20 text-white/70 text-sm flex items-center gap-3">
            <div className="flex gap-2">
              <kbd className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/30 text-white text-xs">←</kbd>
              <kbd className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/30 text-white text-xs">→</kbd>
            </div>
            <span>Navigate Space</span>
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
          className="fixed top-1/2 left-8 -translate-y-1/2 z-50 max-w-xs"
        >
          <div className="p-6 rounded-2xl bg-black/80 backdrop-blur-2xl border-2 border-white/30 relative overflow-hidden"
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
            
            <div className="relative z-10 space-y-4">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Orbit size={20} className="text-blue-400" />
                Exploration Mode
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Hand className="text-blue-400 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-white text-sm font-medium">Drag to Rotate</p>
                    <p className="text-white/60 text-xs">Click and drag to orbit around the solar system</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MousePointerClick className="text-purple-400 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-white text-sm font-medium">Click Planets</p>
                    <p className="text-white/60 text-xs">Click any labeled planet to navigate to that section</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Navigation className="text-pink-400 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-white text-sm font-medium">View All Sections</p>
                    <p className="text-white/60 text-xs">All sections are visible as planets in orbit</p>
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

