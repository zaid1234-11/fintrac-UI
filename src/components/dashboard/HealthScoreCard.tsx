"use client";

import React from "react";
import { scoreToColor, scoreToLabel } from "@/lib/chartTheme";
import { m } from "framer-motion";
import { FADE_UP } from "@/lib/chartTheme";

interface HealthScoreCardProps {
  score: number;
}

import LiquidCard from "@/components/liquid/LiquidCard";

interface HealthScoreCardProps {
  score: number;
}

export default function HealthScoreCard({ score }: HealthScoreCardProps) {
  const color = scoreToColor(score);
  const label = scoreToLabel(score);

  return (
    <m.div {...FADE_UP}>
      <LiquidCard level={2} interactive={true} className="min-w-[180px] p-5 flex flex-col gap-2 rounded-[24px]">
      <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono uppercase relative z-10">
        Health Score
      </div>
      <div className="flex items-baseline gap-3 relative z-10">
        <div className="relative">
          <m.div
            animate={{ boxShadow: [`0 0 0 0px ${color}00`, `0 0 0 12px ${color}10`, `0 0 0 24px ${color}00`] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full"
          />
          <span className="font-display text-white text-[28px] leading-none relative z-10">
            {score}
          </span>
        </div>
        <span
          className="font-mono text-[12px] px-2.5 py-0.5 rounded-full relative z-10"
          style={{
            color,
            backgroundColor: `${color}18`,
            border: `1px solid ${color}30`,
          }}
        >
          {label}
        </span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden relative z-10">
        <m.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </LiquidCard>
    </m.div>
  );
}
