"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Prefer a quick splash; fade out after first paint + short delay
    const start = requestAnimationFrame(() => {
      const t = setTimeout(() => {
        setFadeOut(true);
        const t2 = setTimeout(() => setVisible(false), 400); // match transition
        return () => clearTimeout(t2);
      }, 800);
      return () => clearTimeout(t);
    });
    return () => cancelAnimationFrame(start);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={
        "fixed inset-0 z-[999] flex items-center justify-center bg-[#0b0b0b] transition-opacity duration-400 " +
        (fadeOut ? "opacity-0 pointer-events-none" : "opacity-100")
      }
      aria-hidden
    >
      <div className="flex flex-col items-center gap-4 select-none">
        {/* Logo mark */}
        <div className="relative w-16 h-16 rounded-xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.25)] grid place-items-center">
          <span className="text-white/90 font-bold tracking-wider">KC</span>
        </div>
        {/* Subtext / loader bar */}
        <div className="w-40 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-white/60 animate-[splash_900ms_ease-in-out_infinite] rounded-full" />
        </div>
      </div>
      <style jsx>{`
        @keyframes splash {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}


