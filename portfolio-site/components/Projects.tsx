"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../lib/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const featuredProjects = projects; // Only War of the Elector remains

  return (
    <div
      className="max-w-7xl mx-auto w-full px-3 sm:px-4 overflow-x-hidden"
      data-foreground
    >
      <div className="glass glass-border noise rounded-2xl p-4 md:p-8 border border-white/10 backdrop-blur-0 hover:backdrop-blur-0">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-white/70 text-lg mx-auto text-balance max-w-[90vw] sm:max-w-2xl px-2">
            A showcase of my latest work, featuring innovative solutions and
            cutting-edge technologies
          </p>
        </div>

        {/* Single Featured Project */}
        <div className="mb-3 md:mb-4">
          <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -2,
                  scale: 1.005,
                  transition: {
                    type: "spring",
                    stiffness: 600,
                    damping: 32,
                    mass: 0.2,
                  },
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl transition-colors duration-200 will-change-transform transform-gpu bg-white/10 border border-white/10 hover:border-white/20"
              >
                <div className="p-4 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-white/15 text-white/80">
                          {project.year}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                          {project.category}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">
                          Featured
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 cursor-default">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-3 md:mb-4">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed mb-6 wrap-break-word max-w-[90vw] sm:max-w-none">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/60">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-sm font-medium transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Visit Site
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium transition-all duration-200 w-full sm:w-auto"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Code
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project.id)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium transition-all duration-200 w-full sm:w-auto"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Removed list/filter when only one project is shown */}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find((p) => p.id === selectedProject);
                if (!project) return null;

                return (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm px-3 py-1 rounded-full bg-white/15 text-white/80">
                            {project.year}
                          </span>
                          <span className="text-sm px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="text-sm px-3 py-1 rounded-full bg-green-500/20 text-green-300">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/70 text-lg">
                          {project.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="text-white/80 text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {project.highlights && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Key Features
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {project.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-white/80 text-sm"
                            >
                              <svg
                                className="w-4 h-4 text-green-400 shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-white/15 text-white/80 text-sm border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/15 hover:bg-white/25 text-white font-medium transition-all duration-200 hover:scale-105"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Visit Site
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 font-medium transition-all duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
