"use client";

import React from "react";
import { formatINR } from "@/lib/formatINR";
import { motion } from "framer-motion";
import { FADE_UP } from "@/lib/chartTheme";

interface SavingsCardProps {
  amount: number;
  deltaPercent: number;
}

export default function SavingsCard({ amount, deltaPercent }: SavingsCardProps) {
  const isPositive = deltaPercent >= 0;

  return (
    <motion.div
      {...FADE_UP}
      className="min-w-[180px] rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 flex flex-col gap-2"
    >
      <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono uppercase">
        Monthly Savings
      </div>
      <div className="font-mono text-white text-[28px] leading-none tabular-nums">
        {formatINR(amount)}
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <span
          className={`inline-flex items-center gap-1 text-[12px] font-mono ${
            isPositive ? "text-[#8FA876]" : "text-[#A9714F]"
          }`}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className={isPositive ? "" : "rotate-180"}
          >
            <path
              d="M5 2L8 6.5H2L5 2Z"
              fill="currentColor"
            />
          </svg>
          {isPositive ? "+" : ""}
          {deltaPercent}%
        </span>
        <span className="text-[11px] text-white/35 font-mono">this month</span>
      </div>
    </motion.div>
  );
}
