"use client";

import { motion } from "framer-motion";
import { Code2, Coffee, Zap, Award } from "lucide-react";
import AnimatedCounter from "./ui/AnimatedCounter";

export default function QuickStats() {
  const stats = [
    {
      icon: Code2,
      value: 10000,
      suffix: "+",
      label: "Lines of Code",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Coffee,
      value: 500,
      suffix: "+",
      label: "Cups of Coffee",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Zap,
      value: 99,
      suffix: "%",
      label: "Performance Score",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      value: 4,
      suffix: ".0",
      label: "GPA",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-medium glass-border rounded-2xl p-6 glass-shadow text-center group transition-all duration-300 hover:glass-strong"
            >
              <div className="relative mb-4">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}
                />
                <div className="relative glass glass-border rounded-xl p-3 w-fit mx-auto">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.label === "GPA" ? (
                  <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    4.0
                  </span>
                ) : (
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                  />
                )}
              </div>
              <div className="text-sm text-white/75 font-medium">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
