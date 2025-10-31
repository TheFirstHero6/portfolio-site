"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion";
import { SiNextdotjs, SiPrisma } from "react-icons/si";
import HeroSection from "./HeroSection";
import TechStack from "./TechStack";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import Dock from "./ui/Dock";
import CommandPalette from "./ui/CommandPalette";
import CardSwap, { Card as SwapCard } from "./ui/CardSwap";
import { projects } from "../lib/projects";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("./Silk"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800" />
  ),
});

export default function ClientPage() {
  const [showCarousel, setShowCarousel] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCtrlKHint, setShowCtrlKHint] = useState(false);
  const silkRef = useRef<{ updateColor: (newColor: string) => void }>(null);
  const silkLayerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLElement | null>(null);
  const heroInView = useInView(heroRef, { amount: 0.6 }); // visible when ≥60% on screen
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

  // Detect mobile to disable CardSwap on small screens
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
    setShowContactModal(true);
  };

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden">
      <CommandPalette
        items={[
          { id: "hero", label: "Home", group: "Section" },
          { id: "about", label: "About", group: "Section" },
          { id: "tech", label: "Stack", group: "Section" },
          { id: "projects", label: "Projects", group: "Section" },
          // { id: "contact", label: "Contact", group: "Section" }, // Temporarily hidden until email DNS is configured
          ...projects.map((p) => ({
            id: "projects",
            label: p.title,
            group: "Project",
          })),
        ]}
      />
      {/* Scroll progress */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-white/30 backdrop-blur-sm"
        style={{ scaleX: scrollYProgress }}
      />

      <Dock
        items={[
          { id: "hero", label: "Home" },
          { id: "about", label: "About" },
          { id: "tech", label: "Stack" },
          { id: "projects", label: "Projects" },
          // { id: "contact", label: "Contact" }, // Temporarily hidden until email DNS is configured
        ]}
      />

      {/* CardSwap only when hero is out of view */}
      <AnimatePresence>
        {!heroInView && !isMobile && (
          <motion.div
            className="fixed bottom-0 right-0 z-40 pointer-events-none"
            style={{ transformOrigin: "100% 100%" }}
            initial={{ opacity: 0, x: 40, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, y: 40, scale: 0.94 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="relative h-[600px] w-[500px] pointer-events-auto">
              <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={false}
                onCardClick={(idx) => {
                  // Map in the same order as the cards below: Home, Projects, About
                  const ids = ["hero", "projects", "about"] as const;
                  const id = ids[idx] ?? "hero";
                  const el = document.getElementById(id);
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {/* Home */}
                <SwapCard className="bg-white/10 backdrop-blur-xl border-white/20 text-white p-6 min-w-[260px]">
                  <h3 className="text-xl font-semibold mb-1">
                    Portfolio Home Section
                  </h3>
                  <p className="text-white/70 text-sm mb-3">
                    Click Here to head back home
                  </p>
                </SwapCard>

                {/* Projects */}
                <SwapCard className="bg-white/10 backdrop-blur-xl border-white/20 text-white p-6 min-w-[260px]">
                  <h3 className="text-xl font-semibold mb-1">Projects</h3>
                  <p className="text-white/70 text-sm mb-3">Featured work</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <h4 className="text-base font-semibold mb-2">
                      War of the Elector
                    </h4>
                    <p className="text-white/70 text-xs leading-relaxed">
                      A complex RTS game built with Next.js, Prisma, and
                      PostgreSQL. Full-stack strategy game featuring real-time
                      mechanics and scalable architecture.
                    </p>
                  </div>
                </SwapCard>
                {/* About */}
                <SwapCard className="bg-white/10 backdrop-blur-xl border-white/20 text-white p-6 min-w-[260px]">
                  <h3 className="text-xl font-semibold mb-1">About</h3>
                  <p className="text-white/70 text-sm mb-3">
                    Bio • Specialties • Interests
                  </p>
                  <ul className="text-xs text-white/80 space-y-1">
                    {[
                      "React Specialist",
                      "Responsive, High-performance frontends",
                      "Performance-focused",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </SwapCard>
                {/* Contact - Temporarily hidden until email DNS is configured */}
                {/* <SwapCard className="bg-white/10 backdrop-blur-xl border-white/20 text-white p-6 min-w-[260px]">
                  <h3 className="text-xl font-semibold mb-1">Contact</h3>
                  <p className="text-white/70 text-sm mb-3">
                    Email • Socials • Availability
                  </p>
                  <div className="text-xs text-white/80">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/60" />
                      Usually replies within 24h
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/60" />
                      Have an inquiry? Reach out through the contact form!
                    </div>
                  </div>
                </SwapCard> */}
              </CardSwap>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
              className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-2">Get in touch</h3>
              <p className="text-white/80 mb-4">
                Feel free to reach out at{" "}
                <span className="font-medium">klaus.dev@kclabs.app</span> to
                connect.
              </p>
              <button
                onClick={() => setShowContactModal(false)}
                className="mt-2 px-4 py-2 rounded-lg bg-white/20 hover:bg白/30 hover:bg-white/30 transition-colors"
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
      <section id="hero" ref={heroRef} className="overflow-x-hidden">
        <HeroSection
          onViewProjects={handleViewProjects}
          onContactClick={handleContactClick}
        />
      </section>

      {/* About above tech */}
      <section id="about" className="relative z-10 py-8 md:py-12 px-4 md:px-8">
        <About />
      </section>

      <section
        id="tech"
        className="relative z-10 -mt-8 md:-mt-12 pt-8 pb-8 px-3 sm:px-4 md:px-8 overflow-x-hidden"
      >
        <div className="max-w-5xl mx-auto text-center" data-foreground>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-center mb-3">
                <SiNextdotjs className="text-white/90" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Next.js</h3>
              <p className="text-white/80 text-sm">
                React framework for production—file‑based routing, hybrid
                rendering, and edge‑ready performance.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
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
              <h3 className="text-2xl font-bold text-white mb-2">React</h3>
              <p className="text-white/80 text-sm">
                Component‑driven UI with hooks and concurrent features for
                fluid, interactive experiences.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-center mb-3">
                <SiPrisma className="text-white/90" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Prisma</h3>
              <p className="text-white/80 text-sm">
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

      {showCarousel && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-20 flex items-center justify-center p-8"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Projects Coming Soon
            </h2>
            <p className="text-white/80 text-center mb-6">
              The 3D carousel with glass morphism is being built. This will
              showcase your projects with smooth animations and color morphing
              effects.
            </p>
            <button
              onClick={() => setShowCarousel(false)}
              className="w-full py-3 px-6 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition-colors"
            >
              Back to Hero
            </button>
          </div>
        </motion.div>
      )}

      {/* Placeholder sections */}
      <section
        id="projects"
        className="relative z-10 min-h-[60vh] flex items-center justify-center px-3 sm:px-4 md:px-8 overflow-x-hidden"
      >
        <Projects />
      </section>

      {/* Contact section - Temporarily hidden until email DNS is configured */}
      {/* <section
        id="contact"
        className="relative z-10 min-h-[50vh] flex items-center justify-center px-4 md:px-8"
      >
        <Contact />
      </section> */}
    </div>
  );
}
