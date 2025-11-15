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
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <motion.div
          className="mb-8 p-6 rounded-2xl bg-black/70 backdrop-blur-2xl border-2 relative overflow-hidden"
          style={{
            borderColor: '#a855f760',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.3), 0 0 80px rgba(168, 85, 247, 0.15)',
          }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
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
          <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              About Me
            </span>
          </h2>
          <p className="relative z-10 text-white/80 text-sm">
            Exploring the galaxy of development
          </p>
        </motion.div>
        <div className="space-y-4 text-white leading-relaxed text-lg font-medium bg-black/60 backdrop-blur-xl p-6 rounded-2xl border-2" style={{ borderColor: '#a855f760', boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)' }}>
          <p className="text-white">
            Hi, I'm <span className="text-purple-300 font-semibold">Klaus</span>! I'm a full-stack developer who specializes in{" "}
            <span className="text-white font-semibold bg-purple-500/30 px-2 py-0.5 rounded">React/Next.js</span> with a focus on
            building practical, high-performing applications that deliver phenomenal user experiences.
          </p>
          <p className="text-white">
            At the time of writing, RTS game{" "}
            <span className="text-white font-semibold bg-blue-500/30 px-2 py-0.5 rounded">War of the Elector V 1.4</span> is out
            now. I built this with my favorite tech stack,{" "}
            <span className="text-blue-300 font-semibold">Next/Tailwind</span> and{" "}
            <span className="text-purple-300 font-semibold">Prisma/PostgreSQL</span>. I'm something of a JS framework generalist - I like to build in{" "}
            <span className="text-green-300 font-semibold">Vue.js</span> and adore{" "}
            <span className="text-orange-300 font-semibold">Svelte</span> whenever I get to use it.
          </p>
          <p className="text-white">
            I also have a strong interest/background in{" "}
            <span className="text-white font-semibold bg-pink-500/30 px-2 py-0.5 rounded">QA and testing</span>. Having built my own
            full-stack projects, I'm passionate about software quality, reliability, and creating intuitive user interfaces that users actually enjoy using.
          </p>
        </div>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6">
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
              className="p-8 rounded-2xl bg-black/70 backdrop-blur-2xl border-2 hover:border-white/50 transition-all h-full relative"
              style={{
                borderColor: '#a855f760',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(168, 85, 247, 0.15)',
              }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[2px]`}
              >
                <div className="w-full h-full rounded-2xl bg-[#000510] flex items-center justify-center">
                  <feature.icon className="text-white" size={28} />
                </div>
              </motion.div>

              <h3 className="mb-3 text-white">{feature.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed">
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
        className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-2xl border-2"
        style={{
          borderColor: '#a855f760',
          boxShadow: '0 0 40px rgba(168, 85, 247, 0.3), 0 0 80px rgba(168, 85, 247, 0.15)',
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
            <Award className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-white mb-2">My Approach</h3>
            <p className="text-white/90 leading-relaxed">
              I believe in creating practical, user-focused solutions that deliver phenomenal experiences. 
              Every project is an opportunity to solve real problems with clean, efficient code. 
              From intuitive interfaces to smooth animations and thoughtful interactions, 
              I'm committed to building applications that users love to use.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

