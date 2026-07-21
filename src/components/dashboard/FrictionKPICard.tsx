"use client";

import React from "react";
import { m } from "framer-motion";
import { FADE_UP } from "@/lib/chartTheme";

interface FrictionCardProps {
  pendingCount: number;
}

export default function FrictionKPICard({ pendingCount }: FrictionCardProps) {
  return (
    <m.div
      {...FADE_UP}
      className="min-w-[180px] glass-tile glass-depth-hover p-5 flex flex-col gap-2 relative overflow-hidden"
    >
      <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono uppercase relative z-10">
        Friction Points
      </div>
      <div className="flex items-baseline gap-3 relative z-10">
        <span className="font-display text-white text-[28px] leading-none">
          {pendingCount}
        </span>
        <span className="text-[12px] text-white/45 font-mono">pending</span>
      </div>
      <div className="mt-2 flex items-end gap-1.5 h-8 relative z-10">
        {[35, 55, 42, 68].map((h, i) => (
          <m.span
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
            className="flex-1 rounded-sm"
            style={{
              backgroundColor:
                i < pendingCount
                  ? "rgba(169, 113, 79, 0.6)"
                  : "rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </div>
    </m.div>
  );
}
