"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  FlaskConical,
  Gauge,
  Users,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const researchItems = [
  {
    icon: Brain,
    title: "Behavioral Economics",
    description:
      "Grounded in prospect theory, hyperbolic discounting, and loss aversion research.",
    status: "validated" as const,
  },
  {
    icon: Gauge,
    title: "POMDP Model",
    description:
      "Partially Observable Markov Decision Process for modeling hidden behavioral states.",
    status: "validated" as const,
  },
  {
    icon: FlaskConical,
    title: "Elastic RL Savings Engine",
    description:
      "Reinforcement Learning agent that adapts budget allocation based on observed friction.",
    status: "validated" as const,
  },
  {
    icon: Users,
    title: "5,000 Synthetic Agents",
    description:
      "Simulation environment with diverse behavioral profiles for stress-testing strategies.",
    status: "validated" as const,
  },
  {
    icon: BarChart3,
    title: "Recovery Analysis",
    description:
      "Tracking how quickly budgets recover from disruptions under different adaptation strategies.",
    status: "in-progress" as const,
  },
  {
    icon: ShieldCheck,
    title: "Simulation Validation",
    description:
      "Systematic comparison of simulated outcomes against real-world behavioral data.",
    status: "in-progress" as const,
  },
];

export default function ResearchSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="research"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-shadow"
    >
      {/* Subtle depth texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(42,111,161,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(79,122,97,0.1) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-river-sky text-sm font-semibold tracking-widest uppercase mb-4 block">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)] mb-6 text-balance">
            Built On Honest Math
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            No hype. No exaggerated AI claims. Every model is documented,
            every result is reproducible.
          </p>
        </motion.div>

        {/* Research Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group bg-white/5 rounded-2xl p-6 lg:p-8 border border-white/8 hover:border-white/15 hover:bg-white/8 transition-all duration-300 cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-river-sky" />
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      item.status === "validated"
                        ? "bg-moss/20 text-moss-light"
                        : "bg-amber/15 text-amber"
                    }`}
                  >
                    {item.status === "validated"
                      ? "Validated"
                      : "Not Yet Validated"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Honesty statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 text-sm max-w-xl mx-auto leading-relaxed">
            We clearly distinguish between what&apos;s been validated through
            simulation and what&apos;s still being tested. Transparency is not a
            feature—it&apos;s the foundation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
