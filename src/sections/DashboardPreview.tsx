"use client";

import React from "react";
import { m } from "framer-motion";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import LiquidCard from "@/components/liquid/LiquidCard";

/**
 * Dashboard Preview — 80% software, 20% atmosphere.
 * NO branch imagery, NO editorial card styling, NO blur-reveal motion.
 * Fast, clinical, readable first.
 */
export default function DashboardPreview() {
  return (
    <section
      data-testid="dashboard-preview"
      className="relative w-full py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-14 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #25261f 0%, #2a2b27 100%)" }}
    >
      {/* Ambient glow behind the grid */}
      <div className="ambient-glow bg-[#8FA876] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <header className="flex items-end justify-between mb-12">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-3">
              SECTION · 06
            </div>
            <h2 className="font-display font-light text-white text-[26px] sm:text-[36px] md:text-[52px] leading-[1.1] sm:leading-[1.05] max-w-[20ch]">
              Software that knows the season you&apos;re in.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-white/55 text-[13px]">
            <span>Live preview</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-season-growth)] animate-pulse ml-1" />
          </div>
        </header>

        {/* Dashboard grid */}
        <m.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-12 gap-3 md:gap-4"
        >
          {/* Season tile */}
          <Tile span="col-span-12 md:col-span-4" delay={0.1}>
            <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono mb-3">CURRENT SEASON</div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-white text-[28px] sm:text-[36px] md:text-[40px] leading-none">Recovery</span>
              <span className="font-mono text-white/55 text-[12px] sm:text-[13px]">Score 78</span>
            </div>
            <div className="mt-5 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <m.div 
                initial={{ width: 0 }}
                whileInView={{ width: "78%" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="h-full rounded-full bg-[var(--color-season-recovery)]" 
              />
            </div>
            <p className="text-[12px] text-white/45 mt-4 leading-[1.5]">
              Rebuilding capacity. Budget allowing 7% additional slack on essentials.
            </p>
          </Tile>

          {/* Balance tile */}
          <Tile span="col-span-6 md:col-span-4" delay={0.2}>
            <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono mb-3">NET BALANCE</div>
            <div className="font-mono text-white text-[26px] sm:text-[30px] md:text-[34px] leading-none tabular-nums">$ 12,480.<span className="text-white/45">22</span></div>
            <div className="mt-4 text-[12px] text-white/55 flex items-center gap-1">
              <MoveUpRight size={12} className="text-[var(--color-season-growth)]" />
              <span>+ 4.2% this month</span>
            </div>
          </Tile>

          {/* Friction tile */}
          <Tile span="col-span-6 md:col-span-4" delay={0.3}>
            <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono mb-3">BEHAVIORAL FRICTION</div>
            <div className="font-display text-white text-[26px] sm:text-[30px] md:text-[34px] leading-none">Medium</div>
            <div className="mt-5 flex items-end gap-1.5 h-12">
              {[20, 35, 28, 42, 30, 55, 48, 38, 52, 60, 44, 50].map((h, i) => (
                <m.span 
                  key={i} 
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 0.3 + (i * 0.05), ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="w-2 rounded-sm bg-white/40" 
                />
              ))}
            </div>
          </Tile>

          {/* Adaptive allocations */}
          <Tile span="col-span-12 md:col-span-8" delay={0.4}>
            <div className="flex items-center justify-between mb-5">
              <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono">ADAPTIVE ALLOCATION · NOV</div>
              <button className="text-[12px] text-white/55 hover:text-white inline-flex items-center gap-1">
                Adjust <ArrowUpRight size={12} />
              </button>
            </div>
            <ul className="space-y-3">
              {[
                { k: "Groceries",   v: 620, pct: 78, c: "var(--color-season-growth)" },
                { k: "Transport",   v: 180, pct: 42, c: "var(--color-season-recovery)" },
                { k: "Dining out",  v: 240, pct: 88, c: "var(--color-season-harvest)" },
                { k: "Shopping",    v: 95,  pct: 21, c: "var(--color-season-dormancy)" },
                { k: "Subscriptions", v: 64, pct: 35, c: "var(--color-season-drought)" },
              ].map((row, idx) => (
                <li key={row.k} className="grid grid-cols-12 items-center gap-3 text-[13px]">
                  <span className="col-span-3 text-white/85">{row.k}</span>
                  <div className="col-span-7 h-1 rounded-full bg-white/10 overflow-hidden">
                    <m.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + (idx * 0.1), ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full rounded-full" 
                      style={{ background: row.c }} 
                    />
                  </div>
                  <span className="col-span-2 font-mono text-right text-white/75 tabular-nums">${row.v}</span>
                </li>
              ))}
            </ul>
          </Tile>

          {/* Forecast tile */}
          <Tile span="col-span-12 md:col-span-4" delay={0.5}>
            <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono mb-3">90-DAY FORECAST</div>
            <svg viewBox="0 0 200 90" className="w-full h-24">
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8FA876" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#8FA876" stopOpacity="0" />
                </linearGradient>
              </defs>
              <m.path 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                d="M0,60 C30,55 50,70 70,55 C100,30 130,45 160,30 C175,22 190,28 200,22 L200,90 L0,90 Z" 
                fill="url(#fg)" 
              />
              <m.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                d="M0,60 C30,55 50,70 70,55 C100,30 130,45 160,30 C175,22 190,28 200,22" 
                fill="none" 
                stroke="#8FA876" 
                strokeWidth="1.2" 
              />
            </svg>
            <div className="mt-2 text-[12px] text-white/55">Projected surplus by Feb · <span className="font-mono text-white">$2,140</span></div>
          </Tile>
        </m.div>
      </div>
    </section>
  );
}

function Tile({ children, span = "", delay = 0 }: { children: React.ReactNode; span?: string; delay?: number }) {
  return (
    <m.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1], delay } }
      }}
      className={span}
    >
      <LiquidCard level={2} className="p-4 sm:p-5 md:p-6 rounded-[28px] h-full w-full">
        {children}
      </LiquidCard>
    </m.div>
  );
}
