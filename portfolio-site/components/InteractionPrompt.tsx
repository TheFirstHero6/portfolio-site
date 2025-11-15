"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Navigation, Keyboard } from "lucide-react";
import { useEffect, useState } from "react";

interface InteractionPromptProps {
  onDismiss: () => void;
}

export function InteractionPrompt({ onDismiss }: InteractionPromptProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 500);
    }, 8000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      <motion.div
        className="relative max-w-2xl p-8 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/20"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl" />

        <div className="relative z-10 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Welcome to My 3D Portfolio
            </h3>
            <p className="text-white/70">
              Explore the space by interacting with the geometric shapes
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
            >
              <MousePointerClick className="mx-auto mb-2 text-blue-400" size={24} />
              <p className="text-white/80 text-sm mb-1">Click</p>
              <p className="text-white/50 text-xs">3D shapes to navigate</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
            >
              <Keyboard className="mx-auto mb-2 text-purple-400" size={24} />
              <p className="text-white/80 text-sm mb-1">Arrows</p>
              <p className="text-white/50 text-xs">← → to move between</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
            >
              <Navigation className="mx-auto mb-2 text-pink-400" size={24} />
              <p className="text-white/80 text-sm mb-1">Radar</p>
              <p className="text-white/50 text-xs">Shows your position</p>
            </motion.div>
          </div>

          <motion.button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onDismiss, 500);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white pointer-events-auto"
          >
            Start Exploring
          </motion.button>

          <p className="text-center text-white/40 text-xs">
            Click anywhere or press any key to dismiss
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

