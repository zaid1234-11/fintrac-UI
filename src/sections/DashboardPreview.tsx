"use client";

import React from "react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";

/**
 * Dashboard Preview — 80% software, 20% atmosphere.
 * NO branch imagery, NO editorial card styling, NO blur-reveal motion.
 * Fast, clinical, readable first.
 */
export default function DashboardPreview() {
  return (
    <section
      data-testid="dashboard-preview"
      className="relative w-full py-32 px-8 md:px-14"
      style={{ background: "linear-gradient(to bottom, #25261f 0%, #2a2b27 100%)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <header className="flex items-end justify-between mb-12">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-3">
              SECTION · 06
            </div>
            <h2 className="font-display font-light text-white text-[36px] md:text-[52px] leading-[1.05] max-w-[20ch]">
              Software that knows the season you&apos;re in.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-white/55 text-[13px]">
            <span>Live preview</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-season-growth)] animate-pulse ml-1" />
          </div>
        </header>

        {/* Dashboard grid */}
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {/* Season tile */}
          <Tile span="col-span-12 md:col-span-4">
            <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono mb-3">CURRENT SEASON</div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-white text-[40px] leading-none">Recovery</span>
              <span className="font-mono text-white/55 text-[13px]">Score 78</span>
            </div>
            <div className="mt-5 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-[var(--color-season-recovery)]" style={{ width: "78%" }} />
            </div>
            <p className="text-[12px] text-white/45 mt-4 leading-[1.5]">
              Rebuilding capacity. Budget allowing 7% additional slack on essentials.
            </p>
          </Tile>

          {/* Balance tile */}
          <Tile span="col-span-6 md:col-span-4">
            <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono mb-3">NET BALANCE</div>
            <div className="font-mono text-white text-[34px] leading-none tabular-nums">$ 12,480.<span className="text-white/45">22</span></div>
            <div className="mt-4 text-[12px] text-white/55 flex items-center gap-1">
              <MoveUpRight size={12} className="text-[var(--color-season-growth)]" />
              <span>+ 4.2% this month</span>
            </div>
          </Tile>

          {/* Friction tile */}
          <Tile span="col-span-6 md:col-span-4">
            <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono mb-3">BEHAVIORAL FRICTION</div>
            <div className="font-display text-white text-[34px] leading-none">Medium</div>
            <div className="mt-5 flex items-end gap-1.5 h-12">
              {[20, 35, 28, 42, 30, 55, 48, 38, 52, 60, 44, 50].map((h, i) => (
                <span key={i} className="w-2 rounded-sm bg-white/40" style={{ height: `${h}%` }} />
              ))}
            </div>
          </Tile>

          {/* Adaptive allocations */}
          <Tile span="col-span-12 md:col-span-8">
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
              ].map((row) => (
                <li key={row.k} className="grid grid-cols-12 items-center gap-3 text-[13px]">
                  <span className="col-span-3 text-white/85">{row.k}</span>
                  <div className="col-span-7 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.c }} />
                  </div>
                  <span className="col-span-2 font-mono text-right text-white/75 tabular-nums">${row.v}</span>
                </li>
              ))}
            </ul>
          </Tile>

          {/* Forecast tile */}
          <Tile span="col-span-12 md:col-span-4">
            <div className="text-[10px] tracking-[0.25em] text-white/45 font-mono mb-3">90-DAY FORECAST</div>
            <svg viewBox="0 0 200 90" className="w-full h-24">
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8FA876" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#8FA876" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,60 C30,55 50,70 70,55 C100,30 130,45 160,30 C175,22 190,28 200,22 L200,90 L0,90 Z" fill="url(#fg)" />
              <path d="M0,60 C30,55 50,70 70,55 C100,30 130,45 160,30 C175,22 190,28 200,22" fill="none" stroke="#8FA876" strokeWidth="1.2" />
            </svg>
            <div className="mt-2 text-[12px] text-white/55">Projected surplus by Feb · <span className="font-mono text-white">$2,140</span></div>
          </Tile>
        </div>
      </div>
    </section>
  );
}

function Tile({ children, span = "" }: { children: React.ReactNode; span?: string }) {
  return (
    <div className={`${span} rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 md:p-6 hover:bg-white/[0.045] transition-colors duration-200`}>
      {children}
    </div>
  );
}
