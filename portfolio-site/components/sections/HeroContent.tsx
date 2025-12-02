"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Download,
  Code2,
  Briefcase,
  Award,
  Coffee,
  Code,
  GraduationCap,
} from "lucide-react";

interface HeroContentProps {
  onNavigate?: (
    section: "hero" | "about" | "projects" | "skills" | "contact"
  ) => void;
}

export function HeroContent({ onNavigate }: HeroContentProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {/* Card 1: Large - Name & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2 md:row-span-2 glass-card rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <p className="text-white/60 text-sm md:text-base mb-2">I'm</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
              <span className="text-gradient">Klaus Chamberlain</span>
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-semibold mb-4">
              Full Stack Developer
            </p>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              I craft exceptional digital experiences with modern web
              technologies. Specialized in React, Next.js, and TypeScript,
              building applications that deliver phenomenal user experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.("projects")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white flex items-center gap-2 text-sm md:text-base font-semibold"
            >
              <span>View My Work</span>
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.("contact")}
              className="px-6 py-3 rounded-xl glass-card text-white flex items-center gap-2 text-sm md:text-base font-semibold"
            >
              <Mail size={18} />
              <span>Contact</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Card 2: Small - Years Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-3"
          >
            <Award className="w-8 h-8 md:w-10 md:h-10 text-[#06b6d4]" />
          </motion.div>
          <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            2+
          </p>
          <p className="text-white/70 text-sm md:text-base">Years Experience</p>
        </motion.div>

        {/* Card 3: Small - GPA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="mb-3"
          >
            <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-[#8b5cf6]" />
          </motion.div>
          <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            4.0
          </p>
          <p className="text-white/70 text-sm md:text-base">GPA</p>
        </motion.div>

        {/* Card 4: Small - Lines of Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
            className="mb-3"
          >
            <Code className="w-8 h-8 md:w-10 md:h-10 text-[#6366f1]" />
          </motion.div>
          <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            9990+
          </p>
          <p className="text-white/70 text-sm md:text-base">Lines of Code</p>
        </motion.div>

        {/* Card 5: Small - Coffee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
            }}
            className="mb-3"
          >
            <Coffee className="w-8 h-8 md:w-10 md:h-10 text-[#ec4899]" />
          </motion.div>
          <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">∞</p>
          <p className="text-white/70 text-sm md:text-base">Cups of Coffee</p>
        </motion.div>

        {/* Card 6: Wide - Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="md:col-span-2 glass-card rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-6 h-6 text-[#6366f1]" />
            <h3 className="text-white font-semibold text-lg md:text-xl">
              Tech Stack
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {["React", "Next.js", "TypeScript", "Tailwind", "Node.js"].map(
              (tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-card text-white text-xs md:text-sm font-medium"
                >
                  {tech}
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Card 7: Resume Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="md:col-span-2 glass-card rounded-2xl p-6 md:p-8 flex items-center justify-between group cursor-pointer"
        >
          <div>
            <h3 className="text-white font-semibold text-lg md:text-xl mb-2">
              Resume
            </h3>
            <p className="text-white/60 text-sm">Download my latest resume</p>
          </div>
          <motion.a
            href="/Klaus_Chamberlain.pdf"
            download="Klaus_Chamberlain_Resume.pdf"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl glass-card flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:to-[#06b6d4] transition-all"
          >
            <Download className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
