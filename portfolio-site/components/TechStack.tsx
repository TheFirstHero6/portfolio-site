"use client";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiSvelte,
  SiGithub,
  SiVercel,
  SiPrisma,
  SiPostgresql,
  SiPython,
} from "react-icons/si";
import LogoLoop from "./LogoLoop";
import { motion } from "framer-motion";

const techLogos = [
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiNextdotjs className="text-black" />{" "}
      </span>
    ),
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiReact className="text-black" />{" "}
      </span>
    ),
    title: "React",
    href: "https://react.dev",
  },
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiTypescript className="text-black" />{" "}
      </span>
    ),
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiPrisma className="text-black" />{" "}
      </span>
    ),
    title: "Prisma",
    href: "https://prisma.io",
  },
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiTailwindcss className="text-black" />{" "}
      </span>
    ),
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiSvelte className="text-black" />{" "}
      </span>
    ),
    title: "Svelte",
    href: "https://svelte.dev",
  },
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiGithub className="text-black" />{" "}
      </span>
    ),
    title: "GitHub",
    href: "https://github.com",
  },
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiVercel className="text-black" />{" "}
      </span>
    ),
    title: "Vercel",
    href: "https://vercel.com",
  },
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiJavascript className="text-black" />{" "}
      </span>
    ),
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiPostgresql className="text-black" />{" "}
      </span>
    ),
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  {
    node: (
      <span className="glass rounded-2xl border-white/90 px-4 py-2 inline-flex items-center gap-2 text-black/90">
        <SiPython className="text-black" />{" "}
      </span>
    ),
    title: "Python",
    href: "https://www.python.org",
  },
];

export default function TechStack() {
  return (
    <div className="relative max-w-full overflow-hidden px-3 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-6 sm:mb-8 px-2"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 text-balance max-w-[90vw] mx-auto">
          Technology Proficiencies
        </h3>
        <p className="text-white/70 text-base sm:text-lg text-balance max-w-[90vw] sm:max-w-2xl mx-auto">
          Modern tools and frameworks I've worked with to build high-quality web
          applications
        </p>
      </motion.div>

      <div className="relative overflow-hidden w-full max-w-full">
        <div className="rounded-2xl p-3 sm:p-4 min-h-[64px] w-full max-w-full">
          <LogoLoop
            logos={techLogos}
            speed={70}
            direction="left"
            logoHeight={36}
            gap={20}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="transparent"
            ariaLabel="Technology stack"
            className="py-1 sm:py-2 w-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
