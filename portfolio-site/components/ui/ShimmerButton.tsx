"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ShimmerButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function ShimmerButton({
  children,
  className = "",
  onClick,
}: ShimmerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      {children}
    </motion.button>
  );
}