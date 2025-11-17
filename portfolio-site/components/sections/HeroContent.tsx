"use client";

import { motion } from "framer-motion";
import { Terminal, Mail, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const codeLines = [
  "const developer = 'Klaus Chamberlain';",
  "const passion = ['React', 'Next.js', 'TypeScript'];",
  "const mission = 'Building the future';",
  "console.log('Welcome to my portfolio');",
];

interface HeroContentProps {
  onNavigate?: (section: 'hero' | 'about' | 'projects' | 'skills' | 'contact') => void;
}

export function HeroContent({ onNavigate }: HeroContentProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      if (displayText.length < codeLines[currentLine].length) {
        const timeout = setTimeout(() => {
          setDisplayText(codeLines[currentLine].slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentLine((prev) => (prev + 1) % codeLines.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentLine]);

  return (
    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
      >
        {/* Code Terminal */}
        <div 
          className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-black/80 backdrop-blur-2xl border-2 font-mono relative"
          style={{
            borderColor: '#3b82f660',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 0 30px rgba(59, 130, 246, 0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <Terminal className="text-blue-400 ml-auto" size={16} />
          </div>
          <div className="text-xs sm:text-sm text-blue-400 min-h-[20px] sm:min-h-[24px]">
            <span className="text-purple-400">❯</span> {displayText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-blue-400 ml-1"
            />
          </div>
        </div>

        {/* Main Content */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 sm:mb-8 md:mb-10"
          >
            <span className="block text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">I'm</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Klaus Chamberlain
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6 md:mb-8"
          >
            Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 md:mb-12 font-medium"
          >
            I craft exceptional digital experiences with modern web technologies. 
            Specialized in React, Next.js, and TypeScript, building applications 
            that deliver phenomenal user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white flex items-center gap-2 group text-sm sm:text-base"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('projects');
                }
              }}
            >
              <span>View My Work</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </motion.button>

            <motion.button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('contact');
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-xl border-2 border-white/30 text-white hover:bg-black/80 transition-all flex items-center gap-2 text-sm sm:text-base"
              style={{
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
              }}
            >
              <Mail size={20} />
              <span>Contact</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap gap-2 sm:gap-3"
        >
          {["React", "Next.js", "TypeScript", "Tailwind", "Node.js"].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 backdrop-blur-xl border border-blue-500/40 text-white text-xs sm:text-sm"
              style={{
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
              }}
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right side - Stats Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hidden lg:block"
      >
        <div 
          className="p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl bg-black/70 backdrop-blur-2xl border-2 space-y-4 sm:space-y-5 md:space-y-6 relative"
          style={{
            borderColor: '#3b82f660',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.15)',
          }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4"
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              👨‍💻
            </motion.div>
            <h3 className="text-white mb-1 sm:mb-2 text-base sm:text-lg">Full Stack Developer</h3>
            <p className="text-white/60 text-xs sm:text-sm">Building modern web experiences</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              { label: "Years Experience", value: "4+", color: "from-blue-500 to-cyan-500" },
              { label: "GPA", value: "4.0", color: "from-purple-500 to-pink-500" },
              { label: "Lines of Code", value: "9990+", color: "from-indigo-500 to-purple-500" },
              { label: "Coffee Consumed", value: "∞", color: "from-orange-500 to-red-500" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ x: 8 }}
                className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-between group"
                style={{
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)',
                }}
              >
                <span className="text-white/70 text-xs sm:text-sm">{stat.label}</span>
                <span className={`text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform`}>
                  {stat.value}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2"
            style={{
              borderColor: '#3b82f660',
              boxShadow: '0 0 25px rgba(59, 130, 246, 0.3)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-white text-xs sm:text-sm text-center">
              💡 <span className="text-white">Tip:</span> Use the orbital menu to navigate between sections
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

