"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  span?: "1" | "2" | "full";
};

export default function BentoCard({
  children,
  className = "",
  delay = 0,
  span = "1",
}: BentoCardProps) {
  const spanClass = {
    "1": "col-span-1",
    "2": "col-span-1 md:col-span-2",
    full: "col-span-1 md:col-span-3",
  }[span];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`glass-medium glass-border rounded-2xl p-6 md:p-8 glass-shadow transition-all duration-300 hover:glass-strong ${spanClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}