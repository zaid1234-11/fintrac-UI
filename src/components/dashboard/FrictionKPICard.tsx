"use client";

import React from "react";
import { motion } from "framer-motion";
import { FADE_UP } from "@/lib/chartTheme";

interface FrictionCardProps {
  pendingCount: number;
}

export default function FrictionKPICard({ pendingCount }: FrictionCardProps) {
  return (
    <motion.div
      {...FADE_UP}
      className="min-w-[180px] rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 flex flex-col gap-2"
    >
      <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono uppercase">
        Friction Points
      </div>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-white text-[28px] leading-none">
          {pendingCount}
        </span>
        <span className="text-[12px] text-white/45 font-mono">pending</span>
      </div>
      <div className="mt-2 flex items-end gap-1.5 h-8">
        {[35, 55, 42, 68].map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm transition-all duration-300"
            style={{
              height: `${h}%`,
              backgroundColor:
                i < pendingCount
                  ? "rgba(169, 113, 79, 0.6)"
                  : "rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
