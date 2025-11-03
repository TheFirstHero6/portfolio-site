"use client";

import { motion } from "framer-motion";
import InteractiveCard from "./ui/InteractiveCard";
import GlowingCard from "./ui/GlowingCard";

export default function TechShowcase() {
  const technologies = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      category: "Backend",
      items: ["Node.js", "Prisma ORM", "PostgreSQL", "REST APIs"],
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      category: "Tools & More",
      items: ["Git", "Framer Motion", "Three.js", "Responsive Design"],
      gradient: "from-green-500/20 to-emerald-500/20",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-heading-xl text-white mb-4">Tech Arsenal</h2>
        <p className="text-body-lg text-white/80 max-w-2xl mx-auto">
          Modern technologies I use to build exceptional experiences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <InteractiveCard>
              <GlowingCard className="glass-medium glass-border rounded-2xl p-6 glass-shadow h-full">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-50 rounded-2xl`}
                />
                <div className="relative z-10">
                  <h3 className="text-heading-md text-white mb-4">
                    {tech.category}
                  </h3>
                  <div className="space-y-2">
                    {tech.items.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + i * 0.05,
                        }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        <span className="text-body text-white/90">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlowingCard>
            </InteractiveCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
