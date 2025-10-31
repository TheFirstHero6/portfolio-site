"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type MotionInViewProps = {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
};

export default function MotionInView({
  children,
  y = 16,
  delay = 0,
  className,
}: MotionInViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0% -10% 0%", once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
