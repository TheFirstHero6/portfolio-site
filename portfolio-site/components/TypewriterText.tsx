"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  delay?: number;
  className?: string;
}

const TypewriterText = memo(function TypewriterText({
  texts,
  speed = 250,
  delay = 1000,
  className = "",
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const updateText = useCallback(() => {
    const fullText = texts[currentTextIndex];

    if (isWaiting) {
      setIsWaiting(false);
      setIsDeleting(true);
      return;
    }

    if (isDeleting) {
      setCurrentText(fullText.substring(0, currentText.length - 1));
      if (currentText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      setCurrentText(fullText.substring(0, currentText.length + 1));
      if (currentText === fullText) {
        setIsWaiting(true);
      }
    }
  }, [currentText, currentTextIndex, isDeleting, isWaiting, texts]);

  useEffect(() => {
    const timeout = setTimeout(updateText, isWaiting ? delay : speed);
    return () => clearTimeout(timeout);
  }, [updateText, isWaiting, delay, speed]);

  return (
    <div
      className={`font-mono text-xl sm:text-2xl md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap overflow-hidden max-w-[92vw] mx-auto ${className}`}
    >
      <span className="text-white/90">{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-blue-400 ml-1"
      >
        |
      </motion.span>
    </div>
  );
});

export default TypewriterText;
