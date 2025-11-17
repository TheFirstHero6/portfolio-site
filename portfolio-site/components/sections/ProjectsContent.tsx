"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { projects } from "../../lib/projects";
import { getSectionColor } from "../../lib/sectionColors";

export function ProjectsContent() {
  // Use existing projects data
  const displayProjects = projects.length > 0 ? projects : [
    {
      id: "war-of-the-elector",
      title: "War of the Elector",
      subtitle: "Strategy experience site",
      description: "A real-time strategy game website with complex game mechanics and immersive design.",
      image: "/image.png",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL"],
      link: "https://www.waroftheelector.space/",
    },
  ];
  
  // Ensure we have projects to display
  if (displayProjects.length === 0) {
    return (
      <div className="text-center text-white/60">
        <p>No projects to display</p>
      </div>
    );
  }

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
            borderColor: '#6366f160',
            boxShadow: '0 0 40px rgba(99, 102, 241, 0.3), 0 0 80px rgba(99, 102, 241, 0.15)',
          }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
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
              Featured Projects
            </span>
          </h2>
          <p className="relative z-10 text-white/80 text-xs sm:text-sm">
            A selection of projects showcasing my expertise in modern web development
          </p>
        </motion.div>
      </motion.div>

      {/* Projects Grid */}
      <div className={`grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 ${displayProjects.length === 2 ? 'sm:grid-cols-2 max-w-4xl mx-auto' : 'sm:grid-cols-2 md:grid-cols-3'}`}>
        {displayProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: [0, -4, 0],
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.2 + index * 0.1 },
              y: {
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            whileHover={{ y: -16, scale: 1.02 }}
            className="group relative"
          >
            <div 
              className="h-full rounded-xl sm:rounded-2xl bg-black/70 backdrop-blur-2xl border-2 overflow-hidden transition-all relative"
              style={{
                borderColor: '#6366f160',
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.15)',
              }}
            >
              {/* Image */}
              <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                {project.image ? (
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-white/50">{project.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000510] via-transparent to-transparent" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, transparent 100%)`,
                  }}
                />

                {/* Stats */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-2">
                    <Star className="text-yellow-400" size={14} fill="currentColor" />
                    <span className="text-white text-sm">Featured</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="mb-1 sm:mb-2 text-white group-hover:text-indigo-300 transition-colors text-base sm:text-lg font-semibold">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-white/50 text-[10px] sm:text-xs mb-1 sm:mb-2">{project.subtitle}</p>
                )}
                <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.technologies.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/50 border border-indigo-500/40 text-white text-[10px] sm:text-xs"
                      style={{
                        boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 sm:gap-2">
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-1.5 sm:py-2 rounded-md sm:rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2"
                    >
                      <ExternalLink size={14} />
                      <span>{project.id === "navi-ai-desktop" ? "Install now!" : "View Live"}</span>
                    </motion.a>
                  )}
                  {project.repo && (
                    <motion.a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                    >
                      <Github size={16} />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl -z-10 transition-opacity"
                style={{
                  background: `radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center"
      >
        <motion.a
          href="https://github.com/TheFirstHero6"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3 rounded-lg sm:rounded-xl bg-white/8 backdrop-blur-xl border border-white/15 text-white/90 hover:bg-white/10 hover:border-white/25 transition-all inline-block text-xs sm:text-sm"
        >
          View All Projects on GitHub
        </motion.a>
      </motion.div>
    </div>
  );
}

