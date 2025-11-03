"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, Users, TrendingUp } from "lucide-react";
import BentoCard from "./ui/BentoCard";
import RevealText from "./ui/RevealText";

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="text-center mb-12">
        <RevealText
          text="Why Work With Me"
          className="text-heading-xl text-white mb-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-body-lg text-white/80 max-w-2xl mx-auto"
        >
          Combining technical expertise with creative problem-solving
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoCard delay={0} span="2">
          <div className="flex items-start gap-4">
            <div className="glass-medium glass-border rounded-xl p-3">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-heading-md text-white mb-3">
                Modern Tech Stack
              </h3>
              <p className="text-body text-white/85 leading-relaxed mb-4">
                Leveraging the latest technologies and frameworks to build
                cutting-edge applications that stand the test of time.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind CSS"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="glass glass-border px-3 py-1.5 rounded-full text-white/90 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard delay={0.1}>
          <div className="glass-medium glass-border rounded-xl p-3 w-fit mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-heading-md text-white mb-3">Goal-Oriented</h3>
          <p className="text-body text-white/85 leading-relaxed">
            Focused on delivering results that align with your business
            objectives and user needs.
          </p>
        </BentoCard>

        <BentoCard delay={0.2}>
          <div className="glass-medium glass-border rounded-xl p-3 w-fit mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-heading-md text-white mb-3">User-Centric</h3>
          <p className="text-body text-white/85 leading-relaxed">
            Designing experiences that delight users and drive engagement
            through thoughtful UX.
          </p>
        </BentoCard>

        <BentoCard delay={0.3} span="2">
          <div className="flex items-start gap-4">
            <div className="glass-medium glass-border rounded-xl p-3">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-heading-md text-white mb-3">
                Continuous Growth
              </h3>
              <p className="text-body text-white/85 leading-relaxed">
                Always learning and adapting to new technologies and best
                practices to deliver the best possible solutions. Staying ahead
                of industry trends ensures your project benefits from the latest
                innovations.
              </p>
            </div>
          </div>
        </BentoCard>
      </div>
    </div>
  );
}
