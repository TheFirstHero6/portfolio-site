"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSectionColor } from "../../lib/sectionColors";

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95, color: "from-cyan-400 to-blue-500" },
      { name: "Next.js", level: 95, color: "from-blue-500 to-indigo-500" },
      { name: "TypeScript", level: 95, color: "from-indigo-500 to-purple-500" },
      { name: "Tailwind CSS", level: 95, color: "from-purple-500 to-pink-500" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85, color: "from-green-400 to-emerald-500" },
      { name: "Prisma", level: 88, color: "from-emerald-500 to-teal-500" },
      { name: "PostgreSQL", level: 82, color: "from-teal-500 to-cyan-500" },
      { name: "REST APIs", level: 90, color: "from-cyan-500 to-blue-500" },
    ],
  },
  {
    category: "Other",
    skills: [
      { name: "Three.js", level: 78, color: "from-purple-400 to-pink-500" },
      { name: "Vue.js", level: 80, color: "from-green-400 to-emerald-400" },
      { name: "Svelte", level: 75, color: "from-orange-500 to-red-500" },
      { name: "Testing", level: 85, color: "from-blue-500 to-indigo-500" },
    ],
  },
];

const stats = [
  { value: 9990, label: "Lines of Code", suffix: "+" },
  { value: 4.0, label: "GPA", suffix: "" },
  { value: 4, label: "Years", suffix: "+" },
  { value: 99, label: "Satisfaction", suffix: "%" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        // Handle decimal values (like 4.0 for GPA)
        if (value % 1 !== 0) {
          setCount(Math.round(current * 10) / 10);
        } else {
          setCount(Math.floor(current));
        }
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function SkillsContent() {
  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 xl:space-y-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          className="mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-black/70 backdrop-blur-2xl border-2 relative overflow-hidden mx-auto max-w-2xl"
          style={{
            borderColor: '#8b5cf660',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.15)',
          }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Skills & Expertise
            </span>
          </h2>
          <p className="relative z-10 text-white/80 text-xs sm:text-sm">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl bg-black/70 backdrop-blur-2xl border-2 text-center group relative"
            style={{
              borderColor: '#8b5cf660',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15)',
            }}
          >
            <motion.div 
              className="mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 text-lg sm:text-xl md:text-2xl"
              whileHover={{ scale: 1.1 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </motion.div>
            <p className="text-white/90 text-xs sm:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
            className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-black/70 backdrop-blur-2xl border-2 relative"
            style={{
              borderColor: '#8b5cf660',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15)',
            }}
          >
            <h3 className="mb-4 sm:mb-5 md:mb-6 text-white font-semibold text-base sm:text-lg">{category.category}</h3>
            <div className="space-y-4 sm:space-y-5">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                          <span className="text-white text-xs sm:text-sm font-medium">{skill.name}</span>
                          <span className="text-white/80 text-[10px] sm:text-xs font-semibold">{skill.level}%</span>
                        </div>
                        <div className="relative h-2 sm:h-2.5 md:h-3 bg-black/50 rounded-full overflow-hidden border border-white/10">
                          <motion.div
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.1,
                              ease: "easeOut",
                            }}
                            style={{
                              boxShadow: `0 0 10px currentColor, 0 0 20px currentColor`,
                            }}
                          />
                          <motion.div
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full blur-md opacity-60`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center"
      >
        <p className="text-white/90 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6 font-medium">Technologies I work with</p>
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {[
            "React", "Next.js", "TypeScript", "Three.js", "Tailwind CSS",
            "Node.js", "Prisma", "PostgreSQL", "Vue.js", "Svelte",
            "Git", "Jest", "Playwright", "Figma",
          ].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.05,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.15, y: -8 }}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 backdrop-blur-xl border border-purple-500/40 text-white text-xs sm:text-sm transition-all"
              style={{
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)',
              }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

