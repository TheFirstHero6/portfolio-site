"use client";

import { motion } from "framer-motion";
import { Code2, Sparkles, Target, Award } from "lucide-react";
import { getSectionColor } from "../../lib/sectionColors";

const features = [
  {
    icon: Code2,
    title: "React Specialist",
    description: "Expert in modern React patterns, hooks, and Next.js framework.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "Performance-Focused",
    description: "Building lightning-fast, optimized applications.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Quality Driven",
    description: "Passionate about testing and end-to-end reliability.",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export function AboutContent() {
  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 xl:space-y-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <motion.div
          className="mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 rounded-2xl glass-card relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
            <span className="text-gradient">
              About Me
            </span>
          </h2>
          <p className="relative z-10 text-white/80 text-xs sm:text-sm">
            Exploring the galaxy of development
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 md:p-8 lg:p-10"
        >
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-white/95 leading-relaxed text-base sm:text-lg md:text-xl">
            <p>
              Hi, I'm <span className="text-purple-400 font-semibold">Klaus</span>! I'm a full-stack developer who specializes in{" "}
              <span className="text-white font-semibold bg-purple-500/30 px-2 py-1 rounded-md">React/Next.js</span> with a focus on
              modern, high-performing frontends.
            </p>
            <p>
              At the time of writing, RTS game{" "}
              <span className="text-white font-semibold bg-blue-500/30 px-2 py-1 rounded-md">War of the Elector V 1.4</span> is out
              now. I built this with my favorite tech stack,{" "}
              <span className="text-blue-400 font-medium">Next/Tailwind</span> and{" "}
              <span className="text-purple-400 font-medium">Prisma/PostgreSQL</span>. I'm something of a JS framework generalist - I like to build in{" "}
              <span className="text-green-400 font-medium">Vue.js</span> and adore{" "}
              <span className="text-orange-400 font-medium">Svelte</span> whenever I get to use it.
            </p>
            <p>
              I also have a strong interest/background in{" "}
              <span className="text-white font-semibold bg-pink-500/30 px-2 py-1 rounded-md">QA and testing</span>. Having built my own
              full-stack projects, I'm passionate about software quality and end-to-end
              reliability.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="relative group"
          >
            <div 
              className="p-5 sm:p-6 md:p-8 rounded-2xl glass-card hover:border-white/30 transition-all h-full relative"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`mb-4 sm:mb-5 md:mb-6 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} p-[2px]`}
              >
                <div className="w-full h-full rounded-2xl bg-[#000510] flex items-center justify-center">
                  <feature.icon className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
              </motion.div>

              <h3 className="mb-2 sm:mb-3 text-white text-base sm:text-lg">{feature.title}</h3>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 blur-xl -z-10 transition-opacity`}
                style={{
                  filter: 'blur(20px)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="p-5 sm:p-6 md:p-8 rounded-2xl glass-card"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
            <Award className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-white mb-1 sm:mb-2 text-base sm:text-lg">My Approach</h3>
            <p className="text-white/90 leading-relaxed text-sm sm:text-base">
              I believe in creating not just functional, but delightful user experiences. 
              Every project is an opportunity to push the boundaries of what's possible on 
              the web. From pixel-perfect designs to smooth animations and immersive 3D 
              experiences, I'm committed to delivering excellence.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

