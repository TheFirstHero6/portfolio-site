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
];
