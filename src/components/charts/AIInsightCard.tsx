"use client";

import React from "react";
import { motion } from "framer-motion";
import { SEASON, scoreToSeason, EASE_REVEAL } from "@/lib/chartTheme";
import Magnetic from "@/components/Magnetic";

export interface Insight {
  headline: string;
  detail: string;
  confidence: number;
  urgency: "drought" | "recovery" | "dormancy";
  actionLabel: string;
}

interface AIInsightCardProps {
  insight: Insight;
}

export default function AIInsightCard({ insight }: AIInsightCardProps) {
  const urgencyColor = SEASON[insight.urgency];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE_REVEAL }}
      className="rounded-3xl p-5 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Subtle urgency accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.06] blur-3xl"
        style={{ backgroundColor: urgencyColor }}
      />

      {/* Urgency pill */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: urgencyColor }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: urgencyColor }}
          />
        </span>
        <span
          className="text-[11px] font-mono tracking-wide"
          style={{ color: urgencyColor }}
        >
          {insight.urgency.charAt(0).toUpperCase() + insight.urgency.slice(1)}{" "}
          · Recommendation Engine
        </span>
      </div>

      {/* Headline */}
      <h4 className="font-display text-[16px] sm:text-[18px] text-white font-medium leading-snug mb-3">
        {insight.headline}
      </h4>

      {/* Detail — recommendation-oriented text */}
      <p className="text-[13px] sm:text-[14px] text-white/60 leading-relaxed mb-4 max-w-[50ch]">
        {insight.detail}
      </p>

      {/* Confidence + Action row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <span className="text-[11px] font-mono text-white/35">
          Confidence: {insight.confidence}%
        </span>
        <Magnetic radius={6}>
          <button className="iridescent text-[13px] px-5 py-2">
            <span className="relative z-10">{insight.actionLabel}</span>
            <span className="drop-shadow" />
          </button>
        </Magnetic>
      </div>
    </motion.div>
  );
}
