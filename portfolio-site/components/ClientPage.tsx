"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { SiNextdotjs, SiPrisma } from "react-icons/si";
import HeroSection from "./HeroSection";
import TechStack from "./TechStack";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import Skills from "./Skills";
import Features from "./Features";
import FloatingActionButton from "./ui/FloatingActionButton";
import AnimatedBackground from "./ui/AnimatedBackground";
import ScrollProgress from "./ui/ScrollProgress";
import Timeline from "./Timeline";
import TechShowcase from "./TechShowcase";
import QuickStats from "./QuickStats";
import Dock from "./ui/Dock";
import CommandPalette from "./ui/CommandPalette";
import { projects } from "../lib/projects";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("./Silk"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800" />
  ),
});

export default function ClientPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCtrlKHint, setShowCtrlKHint] = useState(false);
  const silkRef = useRef<{ updateColor: (newColor: string) => void }>(null);
  const silkLayerRef = useRef<HTMLDivElement | null>(null);
  // Ensure we always land at the top on initial load/reload
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // If the URL has a fragment, clear it to avoid auto-jump
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    window.scrollTo(0, 0);
  }, []);
  // Show CTRL+K hint when mouse is not over foreground content (approximate background hover)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const overForeground = !!(
        el && (el as HTMLElement).closest("[data-foreground]")
      );
      setShowCtrlKHint(!overForeground && !isMobile);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Detect mobile device
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const pointer = window.matchMedia("(pointer: coarse)");
    const update = () => setIsMobile(mq.matches || pointer.matches);
    update();
    mq.addEventListener("change", update);
    pointer.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      pointer.removeEventListener("change", update);
    };
  }, []);

  const handleViewProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleContactClick = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden">
      <AnimatedBackground />
      <ScrollProgress />
      <CommandPalette
        items={[
          { id: "hero", label: "Home", group: "Section" },
          { id: "about", label: "About", group: "Section" },
          { id: "tech", label: "Stack", group: "Section" },
          { id: "projects", label: "Projects", group: "Section" },
          { id: "contact", label: "Contact", group: "Section" },
          ...projects.map((p) => ({
            id: "projects",
            label: p.title,
            group: "Project",
          })),
        ]}
      />
      <Dock
        items={[
          { id: "hero", label: "Home" },
          { id: "about", label: "About" },
          { id: "tech", label: "Stack" },
          { id: "projects", label: "Projects" },
          { id: "contact", label: "Contact" },
        ]}
      />

      {/* Simple Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="max-w-md w-full glass-medium glass-border rounded-2xl glass-shadow p-6 text-center text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-heading-md mb-2">Get in touch</h3>
              <p className="text-body text-white/85 mb-4">
                Feel free to reach out at{" "}
                <span className="font-medium">klaus.dev@kclabs.app</span> to
                connect.
              </p>
              <button
                onClick={() => setShowContactModal(false)}
                className="mt-2 px-5 py-2.5 rounded-xl glass glass-border hover:glass-medium transition-all duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Animated Silk Background with hover hint */}
      <div ref={silkLayerRef} className="absolute inset-0 z-0 overflow-hidden">
        <Silk
          ref={silkRef}
          speed={3}
          scale={1.2}
          color="#2c22b4"
          noiseIntensity={1.2}
          rotation={0.1}
        />
      </div>

      {/* Simple CTRL+K tooltip (appears when hovering silk) */}
      <AnimatePresence>
        {showCtrlKHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 32,
              mass: 0.3,
            }}
            className="fixed bottom-4 left-4 z-50 pointer-events-none select-none hidden md:block"
          >
            <div className="px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs border border-white/20 shadow-md">
              Press CTRL + K!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="overflow-x-hidden">
        <HeroSection
          onViewProjects={handleViewProjects}
          onContactClick={handleContactClick}
        />
      </section>

      {/* About above tech */}
      <section id="about" className="relative z-10 py-8 md:py-12 px-4 md:px-8">
        <About />
      </section>

      {/* Quick Stats */}
      <section className="relative z-10 py-8 md:py-12 px-4 md:px-8">
        <QuickStats />
      </section>

      {/* Skills Section */}
      <section className="relative z-10 py-8 md:py-12 px-4 md:px-8">
        <Skills />
      </section>

      {/* Tech Showcase */}
      <section className="relative z-10 py-8 md:py-12 px-4 md:px-8">
        <TechShowcase />
      </section>

      {/* Features Bento Grid */}
      <section className="relative z-10 py-8 md:py-12 px-4 md:px-8">
        <Features />
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 py-8 md:py-12 px-4 md:px-8">
        <Timeline />
      </section>

      <section
        id="tech"
        className="relative z-10 -mt-8 md:-mt-12 pt-8 pb-8 px-3 sm:px-4 md:px-8 overflow-x-hidden"
      >
        <div className="max-w-5xl mx-auto text-center" data-foreground>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="glass-medium glass-border rounded-2xl p-6 md:p-8 glass-shadow">
              <div className="flex items-center justify-center mb-3">
                <SiNextdotjs className="text-white/90" size={36} />
              </div>
              <h3 className="text-heading-md text-white mb-2">Next.js</h3>
              <p className="text-body text-white/85">
                React framework for production—file‑based routing, hybrid
                rendering, and edge‑ready performance.
              </p>
            </div>
            <div className="glass-medium glass-border rounded-2xl p-6 md:p-8 glass-shadow">
              <div className="flex items-center justify-center mb-3">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  className="text-[#61DAFB]"
                >
                  <g fill="currentColor">
                    <circle cx="12" cy="12" r="2" />
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <ellipse
                        rx="11"
                        ry="4.2"
                        transform="translate(12 12) rotate(60)"
                      />
                      <ellipse
                        rx="11"
                        ry="4.2"
                        transform="translate(12 12) rotate(0)"
                      />
                      <ellipse
                        rx="11"
                        ry="4.2"
                        transform="translate(12 12) rotate(120)"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="text-heading-md text-white mb-2">React</h3>
              <p className="text-body text-white/85">
                Component‑driven UI with hooks and concurrent features for
                fluid, interactive experiences.
              </p>
            </div>
            <div className="glass-medium glass-border rounded-2xl p-6 md:p-8 glass-shadow">
              <div className="flex items-center justify-center mb-3">
                <SiPrisma className="text-white/90" size={36} />
              </div>
              <h3 className="text-heading-md text-white mb-2">Prisma</h3>
              <p className="text-body text-white/85">
                Type‑safe ORM powering robust data models, migrations, and
                efficient database access.
              </p>
            </div>
          </div>
          <div className="mt-6 md:mt-10 w-full overflow-hidden">
            <TechStack />
          </div>
        </div>
      </section>

      {/* Placeholder sections */}
      <section
        id="projects"
        className="relative z-10 min-h-[60vh] flex items-center justify-center px-3 sm:px-4 md:px-8 overflow-x-hidden"
      >
        <Projects />
      </section>

      <section
        id="contact"
        className="relative z-10 min-h-[50vh] flex items-center justify-center px-4 md:px-8 pb-16"
      >
        <Contact />
      </section>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
