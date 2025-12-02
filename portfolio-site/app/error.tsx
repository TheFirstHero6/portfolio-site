"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#000510] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center"
        >
          <span className="text-4xl">⚠️</span>
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Something went wrong!
        </h1>
        
        <p className="text-white/70 text-lg mb-8">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>
        
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white flex items-center gap-2"
          >
            <RefreshCw size={20} />
            <span>Try Again</span>
          </motion.button>
          
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-black/60 backdrop-blur-xl border-2 border-white/30 text-white hover:bg-black/80 transition-all flex items-center gap-2"
          >
            <Home size={20} />
            <span>Go Home</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}





