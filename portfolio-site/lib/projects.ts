export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  repo?: string;
  featured?: boolean;
  year?: string;
  category?: string;
  highlights?: string[];
};

export const projects: Project[] = [
  {
    id: "war-of-the-elector",
    title: "War of the Elector",
    subtitle: "Strategy experience site",
    description:
      "The official website for 'War of the Elector,' a grand Real-Time-Strategy game set in a richly detailed fantasy world. This site features complex state management, modern responsive UI/UX, and more!",
    technologies: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Prisma ORM",
      "PostgreSQL",
    ],
    image: "/image.png",
    link: "https://www.waroftheelector.space/",
    repo: "https://github.com/TheFirstHero6/War-of-The-Elector",
    featured: true,
    year: "2025",
    category: "Web Experience",
    highlights: [
      "Immersive thematic design",
      "Custom iconography system",
      "Atmospheric animations",
      "Mobile-first responsive",
      "Performance optimized",
    ],
  },
  {
    id: "navi-ai-desktop",
    title: "Navi AI",
    subtitle: "The AI-powered launcher for developers",
    description:
      "A cross-platform desktop AI assistant (built with Electron) that acts as an intelligent, system-wide command launcher. It combines an app launcher, file navigator, web search, and system commands with a natural language AI interface powered by Google Gemini.",
    technologies: [
      "Electron",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Gemini API",
      "Vite",
      "Electron Forge",
    ],
    image: "/navi.png",
    link: "https://github.com/TheFirstHero6/Navi",
    repo: "https://github.com/TheFirstHero6/Navi",
    featured: true,
    year: "2025",
    category: "Desktop Application",
    highlights: [
      "Hybrid architecture: Bundles a Node.js/Express.js backend server inside the Electron app.",
      "Global `Alt+Space` hotkey for instant system-wide access.",
      "Engineered a local Express API to securely manage and serve the Gemini API key.",
      "Features AI-powered commands, app launching, file search, and system controls.",
    ],
  },
];
