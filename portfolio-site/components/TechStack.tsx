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

const techLogos = [
  {
    node: <SiNextdotjs className="text-white" />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <SiReact className="text-white" />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <SiTypescript className="text-white" />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiPrisma className="text-white" />,
    title: "Prisma",
    href: "https://prisma.io",
  },
  {
    node: <SiTailwindcss className="text-white" />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiSvelte className="text-white" />,
    title: "Svelte",
    href: "https://svelte.dev",
  },
  {
    node: <SiGithub className="text-white" />,
    title: "GitHub",
    href: "https://github.com",
  },
  {
    node: <SiVercel className="text-white" />,
    title: "Vercel",
    href: "https://vercel.com",
  },
  {
    node: <SiJavascript className="text-white" />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    node: <SiPostgresql className="text-white" />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  {
    node: <SiPython className="text-white" />,
    title: "Python",
    href: "https://www.python.org",
  },
];

export default function TechStack() {
  return (
    <div className="relative py-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Technology Proficiencies
        </h3>
        <p className="text-white/70 text-lg">
          Modern tools and frameworks I've worked with to build high-quality web
          applications
        </p>
      </div>

      <div className="relative overflow-hidden">
        <LogoLoop
          logos={techLogos}
          speed={70}
          direction="left"
          logoHeight={60}
          gap={48}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="rgba(0,0,0,0.8)"
          ariaLabel="Technology stack"
          className="py-4"
        />
      </div>
    </div>
  );
}
