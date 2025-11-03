"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export default function Timeline() {
  const events = [
    {
      year: "Aug 2024-Present",
      title: "Bachelor's in Computer Science",
      organization: "The Ohio State University",
      description:
        "Currently pursuing a Computer Science degree with a 4.0 GPA. Taking classes at an accelerated rate while working through high-level CS coursework.",
      icon: GraduationCap,
      type: "education",
    },
    {
      year: "April 2025-Present",
      title: "IT Support Specialist",
      organization: "SafeLite",
      description:
        "Testing REST API errors and repairing functionality of endpoints. Created application for fuzzy-searching Knowledge/Userbase which cut AHT for tickets by 40%. Maintaining top spot in all ticketing metrics during entire tenure.",
      icon: Briefcase,
      type: "work",
    },
    {
      year: "Sep 2023-Feb 2025",
      title: "IT Software Engineer",
      organization: "Hero Builds LLC",
      description:
        "Developed website using React, React Router, and Node.js, integrating REST APIs for seamless backend communication. Built and customized high-performance computers, specializing in component upgrades and performance optimization.",
      icon: Briefcase,
      type: "work",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-heading-xl text-white mb-4">My Journey</h2>
        <p className="text-body-lg text-white/80 max-w-2xl mx-auto">
          A timeline of key milestones and achievements
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-purple via-brand-blue to-brand-cyan" />

        <div className="space-y-12">
          {events.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-brand-purple glass-border z-10" />

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ${
                    isEven ? "md:pr-12 pl-16" : "md:pl-12 pl-16"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="glass-medium glass-border rounded-2xl p-6 glass-shadow transition-all duration-300 hover:glass-strong"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <div className="glass glass-border rounded-xl p-2">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-brand-cyan font-semibold mb-1">
                          {event.year}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {event.title}
                        </h3>
                        <div className="text-sm text-white/70 mb-3">
                          {event.organization}
                        </div>
                      </div>
                    </div>
                    <p className="text-body text-white/85 leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}