"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Sparkles, Code2, Zap } from "lucide-react";
import GlowingCard from "./ui/GlowingCard";

// Dynamically import Lanyard to avoid SSR issues with Three.js
const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-t-2xl">
      <div className="animate-pulse text-white/50">Loading...</div>
    </div>
  ),
});

export default function About() {
  const highlights = [
    {
      icon: Code2,
      title: "React Specialist",
      description: "Expert in modern React patterns and Next.js",
    },
    {
      icon: Zap,
      title: "Performance-Focused",
      description: "Building lightning-fast, optimized applications",
    },
    {
      icon: Sparkles,
      title: "Quality Driven",
      description: "Passionate about testing and reliability",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0% -10% 0%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-heading-xl mb-6 bg-gradient-to-r from-white via-brand-purple to-brand-blue bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-body-lg text-white/85 leading-relaxed">
              Hi, I'm Klaus! I'm a full-stack developer who specializes in{" "}
              <span className="text-white font-semibold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                React/Next.js&nbsp;
              </span>
              .with a focus on modern, high-performing frontends (like this
              one!).
            </p>
            <p className="text-body-lg text-white/85 leading-relaxed">
              At the time of writing, RTS game{" "}
              <span className="text-white font-semibold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                War of the Elector V 1.4&nbsp;
              </span>
              is out now. I built this with my favorite tech stack,{" "}
              <span className="text-white/95 font-medium">Next/Tailwind</span>{" "}
              and{" "}
              <span className="text-white/95 font-medium">
                Prisma/PostgreSQL
              </span>
              . Aside from my React specialty, I'm something of a JS framework
              generalist, and I like to build in{" "}
              <span className="text-white/95 font-medium">Vue.js</span> and
              adore{" "}
              <span className="text-white font-semibold bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                Svelte
              </span>{" "}
              whenever I get to use it.
            </p>
            <p className="text-body-lg text-white/85 leading-relaxed">
              I also have a strong interest/background in{" "}
              <span className="text-white/95 font-medium">QA and testing</span>.
              Having built my own full-stack projects, I'm passionate about
              software quality and end-to-end reliability, and thus put my apps
              through notable testing to ensure a positive UX.
            </p>
            <p className="text-body-lg text-white/85 leading-relaxed">
              Have an inquiry or project you'd like to discuss? Let's connect!
              Feel free to reach through the contact form below!
            </p>
          </motion.div>

          {/* Highlights */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass glass-border rounded-xl p-4 text-center group transition-all duration-300 hover:glass-medium"
                >
                  <div className="glass-medium glass-border rounded-lg p-2 w-fit mx-auto mb-2 group-hover:glass-strong transition-all duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {item.title}
                  </div>
                  <div className="text-xs text-white/70">
                    {item.description}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("projects");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="glass glass-border px-6 py-3 rounded-xl text-white/90 font-medium transition-all duration-300 hover:glass-medium hover:scale-105"
            >
              View projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="glass-medium glass-border px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:glass-strong hover:scale-105"
            >
              Let's connect
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Lanyard (3D) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, rotateX: 6 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-1 lg:order-2"
        >
          <GlowingCard className="glass-medium glass-border rounded-2xl overflow-hidden glass-shadow relative group">
            <div className="relative aspect-[4/3] w-full h-full">
              <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
            <motion.div
              className="absolute top-4 right-4 glass glass-border rounded-full p-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
            >
              <Sparkles className="w-4 h-4 text-brand-purple" />
            </motion.div>
          </GlowingCard>
        </motion.div>
      </div>
    </div>
  );
}
