"use client";

import { motion } from "framer-motion";
import Lanyard from "./Lanyard";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0% -10% 0%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-white/80 leading-relaxed text-base md:text-lg">
            Hi, I'm Klaus! I'm a developer who specializes in React/Next.js. I
            am a full-stack developer with a focus on modern, high-performing
            frontends (like this one!).
          </p>
          <div className="h-3" />
          <p className="text-white/80 leading-relaxed text-base md:text-lg">
            At the time of writing, out now is my RTS game{" "}
            <span className="text-white font-medium">War of the Elector</span>,
            version 1.1 of which is out now. I built this with my favorite tech
            stack, Next/Tailwind and Prisma/PostgreSQL. Aside from my React
            specialty, I'm something of a JS framework generalist, and I like to
            build in Vue.js and adore Svelte whenever I get to use it.{" "}
          </p>
          <div className="h-3" />
          <p className="text-white/80 leading-relaxed text-base md:text-lg">
            I also have a strong interest/background in QA and testing. Having
            built my own full-stack projects, I'm passionate about software
            quality and end-to-end reliability, and thus put my apps through
            notable testing to ensure a positive UX.
          </p>
          <div className="h-3" />
          <p className="text-white/80 leading-relaxed text-base md:text-lg">
            Have an inquiry or project you'd like to discuss? Let's connect!
            Feel free to reach through the contact form below!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("projects");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/85 border border-white/20 transition-transform will-change-transform hover:scale-[1.03]"
            >
              View projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="px-5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-transform will-change-transform hover:scale-[1.03]"
            >
              Let's connect
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Lanyard (3D) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, rotateX: 6 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-1 lg:order-2"
        >
          <div className="glass glass-border rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
            <div className="relative aspect-[4/3]">
              <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
