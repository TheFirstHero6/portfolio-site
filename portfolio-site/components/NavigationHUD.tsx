"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Code2, Mail, Orbit, Navigation } from "lucide-react";

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

export function NavigationHUD({ currentSection, hoveredSection, onNavigate, navigationMode, onModeChange }: NavigationHUDProps) {
  return (
    <>
      {/* Floating Dock - Bottom Center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <div className="glass-card rounded-2xl px-4 py-3 md:px-6 md:py-4 flex items-center gap-2 md:gap-4 pointer-events-auto shadow-2xl">
          {/* Navigation Links */}
          {(['hero', 'about', 'projects', 'skills', 'contact'] as Section[]).map((section) => {
            const isActive = section === currentSection;
            const info = sectionInfo[section];
            const Icon = info.icon;

            return (
              <motion.button
                key={section}
                onClick={() => onNavigate(section)}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 md:p-3 rounded-xl transition-all group"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDockItem"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${info.color}40, ${info.color}20)`,
                      border: `1px solid ${info.color}60`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <Icon 
                    size={20} 
                    className="md:w-6 md:h-6 transition-colors"
                    style={{ 
                      color: isActive ? info.color : 'rgba(255, 255, 255, 0.6)'
                    }}
                  />
                  <span 
                    className="text-[10px] md:text-xs font-medium hidden sm:block transition-colors"
                    style={{ 
                      color: isActive ? info.color : 'rgba(255, 255, 255, 0.6)'
                    }}
                  >
                    {info.label}
                  </span>
                </div>
              </motion.button>
            );
          })}

          {/* Divider */}
          <div className="w-px h-8 md:h-10 bg-white/10 mx-1" />

          {/* Explore Mode Toggle */}
          <motion.button
            onClick={() => onModeChange(navigationMode === 'default' ? 'exploration' : 'default')}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 md:p-3 rounded-xl transition-all group"
          >
            {navigationMode === 'exploration' && (
              <motion.div
                layoutId="activeDockToggle"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.2))',
                  border: '1px solid rgba(59, 130, 246, 0.6)',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="relative z-10 flex flex-col items-center gap-1">
              {navigationMode === 'default' ? (
                <>
                  <Orbit 
                    size={20} 
                    className="md:w-6 md:h-6 transition-colors"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}
                  />
                  <span 
                    className="text-[10px] md:text-xs font-medium hidden sm:block transition-colors"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}
                  >
                    Explore
                  </span>
                </>
              ) : (
                <>
                  <Navigation 
                    size={20} 
                    className="md:w-6 md:h-6 transition-colors"
                    style={{ 
                      color: '#3b82f6'
                    }}
                  />
                  <span 
                    className="text-[10px] md:text-xs font-medium hidden sm:block transition-colors"
                    style={{ 
                      color: '#3b82f6'
                    }}
                  >
                    Default
                  </span>
                </>
              )}
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Exploration Mode Instructions - Only show in exploration mode */}
      {navigationMode === 'exploration' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
          className="fixed top-1/2 left-4 md:left-8 -translate-y-1/2 z-50 max-w-[280px] sm:max-w-xs pointer-events-none"
        >
          <div className="glass-card rounded-2xl p-4 md:p-6 pointer-events-auto">
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-white font-semibold text-base md:text-lg flex items-center gap-2">
                <Orbit size={18} className="text-[#3b82f6]" />
                <span>Exploration Mode</span>
              </h3>
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <p className="text-white/80">Drag to rotate the solar system</p>
                <p className="text-white/80">Click planets to navigate sections</p>
                <p className="text-white/60">All sections are visible as planets</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hover Tooltip - Center (only in default mode) */}
      {navigationMode === 'default' && hoveredSection && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none hidden md:block"
        >
          <div className="glass-card rounded-2xl px-6 py-4 md:px-8 md:py-5 relative overflow-hidden">
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
            <div className="relative z-10 flex items-center gap-3 md:gap-4">
              {(() => {
                const Icon = sectionInfo[hoveredSection].icon;
                return (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon size={24} className="md:w-8 md:h-8" style={{ color: sectionInfo[hoveredSection].color }} />
                  </motion.div>
                );
              })()}
              <p 
                className="text-lg md:text-2xl font-semibold"
                style={{ color: sectionInfo[hoveredSection].color }}
              >
                {sectionInfo[hoveredSection].label}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
