"use client";

import React, { useEffect, useState } from "react";
import { formatINR } from "@/lib/formatINR";
import { m, animate } from "framer-motion";
import { FADE_UP } from "@/lib/chartTheme";

interface SavingsCardProps {
  amount: number;
  deltaPercent: number;
}

import LiquidCard from "@/components/liquid/LiquidCard";

interface SavingsCardProps {
  amount: number;
  deltaPercent: number;
}

export default function SavingsCard({ amount, deltaPercent }: SavingsCardProps) {
  const isPositive = deltaPercent >= 0;
  const [displayAmount, setDisplayAmount] = useState(0);

  useEffect(() => {
    const controls = animate(0, amount, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (value) => setDisplayAmount(Math.round(value)),
    });
    return controls.stop;
  }, [amount]);

  return (
    <m.div {...FADE_UP}>
      <LiquidCard level={2} interactive={true} className="min-w-[180px] p-5 flex flex-col gap-2 rounded-[24px]">
        <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono uppercase relative z-10">
          Monthly Savings
        </div>
        <div className="font-mono text-white text-[28px] leading-none tabular-nums relative z-10">
          {formatINR(displayAmount)}
        </div>
        <div className="flex items-center gap-1.5 mt-1 relative z-10">
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
      </LiquidCard>
    </m.div>
  );
}
