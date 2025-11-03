"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type SkillCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
};

export default function SkillCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass glass-border rounded-2xl p-6 glass-shadow group transition-all duration-300 hover:glass-medium"
    >
      <div className="flex items-start gap-4">
        <div className="glass-medium glass-border rounded-xl p-3 group-hover:glass-strong transition-all duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-body text-white/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}