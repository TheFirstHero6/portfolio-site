"use client";

import { motion } from "framer-motion";

type PulseCircleProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function PulseCircle({
  size = 12,
  color = "bg-brand-purple",
  className = "",
}: PulseCircleProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.div
        className={`absolute inset-0 rounded-full ${color}`}
        animate={{
          scale: [1, 2, 2],
          opacity: [1, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.div
        className={`absolute inset-0 rounded-full ${color}`}
        animate={{
          scale: [1, 2, 2],
          opacity: [1, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1,
        }}
      />
      <div className={`absolute inset-0 rounded-full ${color}`} />
    </div>
  );
}