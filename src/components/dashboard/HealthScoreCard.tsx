"use client";

import React from "react";
import { scoreToColor, scoreToLabel } from "@/lib/chartTheme";
import { m } from "framer-motion";
import { FADE_UP } from "@/lib/chartTheme";

interface HealthScoreCardProps {
  score: number;
}

export default function HealthScoreCard({ score }: HealthScoreCardProps) {
  const color = scoreToColor(score);
  const label = scoreToLabel(score);

  return (
    <m.div
      {...FADE_UP}
      className="min-w-[180px] rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 flex flex-col gap-2"
    >
      <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono uppercase">
        Health Score
      </div>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-white text-[28px] leading-none">
          {score}
        </span>
        <span
          className="font-mono text-[12px] px-2.5 py-0.5 rounded-full"
          style={{
            color,
            backgroundColor: `${color}18`,
            border: `1px solid ${color}30`,
          }}
        >
          {label}
        </span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </m.div>
  );
}
