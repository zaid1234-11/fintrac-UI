"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";

const insights = [
  {
    icon: TrendingDown,
    label: "Food friction decreased",
    value: "-14%",
    detail: "Grocery substitution patterns indicate reduced resistance to budget-aligned alternatives.",
    trend: "positive" as const,
    period: "Last 30 days",
  },
  {
    icon: TrendingUp,
    label: "Savings consistency improved",
    value: "+22%",
    detail: "Automated savings routing through low-friction channels has stabilized monthly contributions.",
    trend: "positive" as const,
    period: "Last 60 days",
  },
  {
    icon: Activity,
    label: "Recovery probability increased",
    value: "87%",
    detail: "Current spending trajectory suggests seasonal shift from Recovery to Growth within 6 weeks.",
    trend: "positive" as const,
    period: "Projected",
  },
  {
    icon: BarChart3,
    label: "Projected annual savings",
    value: "+₹2,35,000",
    detail: "Behavioral adaptation across flexible categories compounds to significant annual impact.",
    trend: "positive" as const,
    period: "Annualized",
  },
];

export default function IntelligenceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="intelligence"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-white/40 text-sm font-semibold tracking-widest uppercase mb-4 block">
            How we understand your spending
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-display mb-6 text-balance tracking-tight">
            Passive <span className="text-white/50">Intelligence</span>
          </h2>
          <p className="text-white/60 text-[15px] md:text-[16px] font-light max-w-2xl mx-auto leading-relaxed">
            While your interactive AI coach is always ready to chat, FinTrac's passive
            intelligence runs quietly in the background. An 8-stage classification
            pipeline continuously studies your ecosystem without you lifting a finger.
          </p>
        </motion.div>

        {/* Insights Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-end mb-4">
            <span className="text-[11px] text-white/30 uppercase tracking-widest">
              Illustrative Example
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
          {insights.map((insight, i) => {
            const Icon = insight.icon;
            return (
               <motion.div
                key={insight.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group bg-white/[0.02] rounded-[24px] p-6 lg:p-8 border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 backdrop-blur-sm cursor-default"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.1] transition-colors duration-300">
                      <Icon className="w-6 h-6 text-white/70" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-medium text-white/90">
                        {insight.label}
                      </h3>
                      <span className="text-[12px] text-white/40 uppercase tracking-wider font-semibold">
                        {insight.period}
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl font-medium font-mono text-white">
                    {insight.value}
                  </span>
                </div>
                <p className="text-[14px] text-white/50 leading-relaxed font-light">
                  {insight.detail}
                </p>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
