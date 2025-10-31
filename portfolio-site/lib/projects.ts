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
      "A thematic experience with bold iconography and atmosphere. Features immersive UI flourishes, custom animations, and a cohesive design system that transports users into a strategic gaming world.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    image: "/globe.svg",
    link: "https://www.waroftheelector.space/",
    featured: true,
    year: "2024",
    category: "Web Experience",
    highlights: [
      "Immersive thematic design",
      "Custom iconography system",
      "Atmospheric animations",
      "Mobile-first responsive",
      "Performance optimized",
    ],
  },
];
