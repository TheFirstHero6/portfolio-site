"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Rocket,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import SkillCard from "./ui/SkillCard";
import RevealText from "./ui/RevealText";

export default function Skills() {
  const skills = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description:
        "Building scalable applications with React, Next.js, and modern backend technologies.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Creating beautiful, intuitive interfaces with attention to detail and user experience.",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description:
        "Ensuring lightning-fast load times and smooth interactions across all devices.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Rigorous testing and validation to deliver reliable, bug-free applications.",
    },
    {
      icon: Rocket,
      title: "Rapid Prototyping",
      description:
        "Quickly turning ideas into working prototypes to validate concepts and gather feedback.",
    },
    {
      icon: Globe,
      title: "Web Standards",
      description:
        "Following best practices for accessibility, SEO, and modern web standards.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="text-center mb-12">
        <RevealText
          text="What I Do Best"
          className="text-heading-xl text-white mb-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-body-lg text-white/80 max-w-2xl mx-auto"
        >
          Specialized skills and expertise to bring your vision to life
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.title}
            icon={skill.icon}
            title={skill.title}
            description={skill.description}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}