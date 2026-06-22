"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";
import BorderGlow from "@/components/BorderGlow";

export default function HeroScrollStory() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // 500vh scroll range
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"]
  });

  // Branch scales down by ~45% (from 235vw to 120vw) to keep the silhouette readable and avoid moss close-ups.
  const branchX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    [
      "0vw",    // Hero State
      "-20vw",  // Travel to Node 1
      "-25vw",  // Pause at Node 1
      "-80vw",  // Travel to Node 2
      "-85vw",  // Pause at Node 2
      "-140vw", // Travel to Node 3
      "-145vw", // Pause at Node 3
      "-200vw", // Travel to Node 4
      "-205vw", // Pause at Node 4
      "-260vw", // Travel to Node 5
      "-265vw"  // Pause at Node 5
    ]
  );

  // Hero content fades out and moves upward as scrolling begins.
  // Explicitly mapping to 1.0 ensures Framer Motion doesn't drop the style if extrapolation fails.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15, 1], [1, 1, 0, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15, 1], [0, -80, -80]);

  // Ranges for the 5 stationary cards: [fadeInStart, holdStart, holdEnd, fadeOutEnd]
  const r1 = [0.15, 0.20, 0.30, 0.35];
  const r2 = [0.35, 0.40, 0.50, 0.55];
  const r3 = [0.55, 0.60, 0.70, 0.75];
  const r4 = [0.75, 0.80, 0.90, 0.92];
  const r5 = [0.92, 0.95, 1.0]; // Omit fadeOutEnd so it stays pinned at 1.0

  // Use a transform to safely update pointer-events without React re-renders
  const heroPointerEvents = useTransform(scrollYProgress, v => v > 0.15 ? "none" : "auto");

  // Debug logging per your request to monitor the end-of-scroll state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.9) {
      console.log("[FinTrac Debug] Scroll:", latest.toFixed(3), "Hero Opacity:", heroOpacity.get());
    }
  });

  // 3D Mouse Interaction
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 120, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 120, mass: 0.5 });

  // Parallax Translations
  const bgMouseX = useTransform(smoothMouseX, [0, 1], [2, -2]); // Inverted for depth
  const bgMouseY = useTransform(smoothMouseY, [0, 1], [2, -2]);

  const branchMouseX = useTransform(smoothMouseX, [0, 1], [-8, 8]);
  const branchMouseY = useTransform(smoothMouseY, [0, 1], [-4, 4]);

  const cardMouseX = useTransform(smoothMouseX, [0, 1], [-1, 1]);
  const cardMouseY = useTransform(smoothMouseY, [0, 1], [-1, 1]);

  // Subtle 3D Rotation
  const rotateY = useTransform(smoothMouseX, [0, 1], [-1, 1]);
  const rotateX = useTransform(smoothMouseY, [0, 1], [0.5, -0.5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only capture relative to viewport
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  };

  return (
    <section
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      data-testid="hero-scroll-story"
      className="relative w-full"
      style={{ height: "500vh", background: "linear-gradient(to bottom, var(--color-bg-1) 0%, var(--color-bg-2) 100%)" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none flex flex-col items-center justify-center">
        {/* Background Grid Lines (static) */}
        <motion.div
          style={{ x: bgMouseX, y: bgMouseY }}
          className="absolute inset-0 w-full h-screen z-0 pointer-events-none max-w-[1600px] mx-auto px-8 md:px-14 flex justify-center"
        >
          <div className="grid grid-cols-4 h-full w-full max-w-[1600px]">
            <div className="border-r border-white/[0.04] h-full" />
            <div className="border-r border-white/[0.04] h-full" />
            <div className="border-r border-white/[0.04] h-full" />
            <div className="h-full" />
          </div>
        </motion.div>



        {/* Ghost Wordmark Layer - Persists throughout the scroll */}
        <motion.div
          className="absolute inset-x-0 bottom-[-6%] flex justify-center pointer-events-none select-none z-0"
          style={{ opacity: 0.04, x: bgMouseX, y: bgMouseY }}
        >
          <span
            className="whitespace-nowrap"
            style={{
              color: "#FFFFFF",
              fontFamily: "var(--font-rozha-one), serif",
              fontSize: "clamp(10rem, 21vw, 28rem)",
              fontWeight: 400,
              lineHeight: "84%",
              letterSpacing: "-0.06em",
            }}
          >
            FINTRAC AI
          </span>
        </motion.div>

        {/* Horizontal Moving Branch Layer */}
        <motion.div
          style={{ x: branchX }}
          className="absolute inset-x-0 bottom-[-5vh] flex items-end z-0 pointer-events-none origin-bottom-left"
        >
          {/* Continuous panoramic artwork sliced into 4 chunks */}
          <motion.div
            style={{ x: branchMouseX, y: branchMouseY, rotateX, rotateY, perspective: 2000, transformStyle: "preserve-3d" }}
            className="absolute flex items-end origin-bottom"
          >
            <div
              className="absolute flex items-end"
              style={{ left: "-5vw", bottom: 0 }}
            >
              {[1, 2, 3, 4].map((num, i) => (
                <img
                  key={num}
                  src={`/${num}.png`}
                  alt=""
                  draggable={false}
                  style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,.15)) drop-shadow(0px 30px 80px rgba(0,0,0,.25)) drop-shadow(0px 80px 160px rgba(0,0,0,.12))" }}
                  className={`w-[100vw] max-w-none h-auto object-contain select-none grayscale-[15%] shrink-0 ${i !== 0 ? "-ml-[2px]" : ""}`}
                />
              ))}
            </div>
          </motion.div>

          {/* soft dynamic-light overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(255,240,200,0.03), transparent 80%)", mixBlendMode: "soft-light" }} />
        </motion.div>

        {/* Unified Hero Content Layer */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            pointerEvents: heroPointerEvents
          }}
          className="absolute inset-0 z-10 h-full max-w-[1600px] mx-auto px-8 md:px-14 pt-24 md:pt-32 flex flex-col"
        >
          <div className="grid grid-cols-4 gap-0 h-full">
            <div className="col-span-2 flex flex-col relative pr-8 pointer-events-auto">
              <div className="flex flex-col gap-1 w-max -ml-4 md:-ml-8">
                <h1 className="font-display text-white/80 font-normal text-[36px] leading-[1.0] tracking-normal whitespace-nowrap">
                  Some habits take time.
                </h1>
                <h2 className="font-display text-white/80 font-normal text-[26px] leading-[1.15] tracking-[0.02em]">
                  Your budget should<br />
                  know that.
                </h2>
              </div>
            </div>

            <div className="col-span-1 pl-12 pt-6 pointer-events-auto">
              <p className="text-[15px] md:text-[16px] leading-[1.65] text-white/60 font-light max-w-[280px]">
                FinTrac adapts around human behavior instead of forcing
                unrealistic financial change
              </p>
              <button className="mt-12 group transition-transform hover:scale-105 active:scale-95">
                <BorderGlow
                  borderRadius={32}
                  backgroundColor="rgba(255, 255, 255, 0.02)"
                  glowColor="40 80 80"
                  glowRadius={15}
                  glowIntensity={0.6}
                  coneSpread={20}
                  animated={true}
                  className="px-6 py-3 border border-white/20 flex items-center gap-3 justify-center backdrop-blur-sm"
                >
                  <span className="flex items-center gap-3 text-white/80 text-[13px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><circle cx="12" cy="5" r="1" /><circle cx="19" cy="5" r="1" /><circle cx="5" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="12" cy="19" r="1" /><circle cx="19" cy="19" r="1" /><circle cx="5" cy="19" r="1" /></svg>
                    Explore the System
                  </span>
                </BorderGlow>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Central Stationary Cards Layer */}
        <motion.div
          style={{ x: cardMouseX, y: cardMouseY }}
          className="relative z-10 w-full max-w-[500px] mx-auto px-6 h-[400px] flex items-center justify-center"
        >

          <StoryCard bgImage="/card-bg-1.png" progress={scrollYProgress} range={r1} title="Why Traditional Budgets Fail">
            <BudgetCompare />
          </StoryCard>

          <StoryCard bgImage="/card-bg-2.png" progress={scrollYProgress} range={r2} title="Behavioral Friction">
            <p className="font-light text-[16px] leading-[1.4] tracking-[-0.02em] text-[#474842] max-w-[34ch]">
              Some habits are harder to change than others. FinTrac measures
              that resistance and lets your budget breathe around it.
            </p>
          </StoryCard>

          <StoryCard bgImage="/card-bg-3.png" progress={scrollYProgress} range={r3} title="Financial Seasons">
            <SeasonGrid />
          </StoryCard>

          <StoryCard bgImage="/card-bg-4.png" progress={scrollYProgress} range={r4} title="The FinTrac Engine">
            <EnginePipeline />
          </StoryCard>

          <StoryCard bgImage="/card-bg-5.png" progress={scrollYProgress} range={r5} title="Built on Honest Math">
            <HonestMath />
          </StoryCard>

        </motion.div>

      </div>
    </section>
  );
}

import { useMotionTemplate } from "framer-motion";

/* ---------- Wrapper for the drifting central cards ---------- */
function StoryCard({ progress, range, title, children, bgImage }: { progress: MotionValue<number>, range: number[], title: string, children: React.ReactNode, bgImage?: string }) {
  // If range has 4 points: [fadeInStart, holdStart, holdEnd, fadeOutEnd]
  // If range has 3 points: [fadeInStart, holdStart, holdEnd] -> never fades out
  const hasFadeOut = range.length === 4;

  const opacity = useTransform(progress, range, hasFadeOut ? [0, 1, 1, 0] : [0, 1, 1]);
  const x = useTransform(progress, range, hasFadeOut ? [60, 0, 0, -60] : [60, 0, 0]);
  const scale = useTransform(progress, range, hasFadeOut ? [0.97, 1, 1, 0.97] : [0.97, 1, 1]);

  // Custom blur mapping
  const blurValue = useTransform(progress, range, hasFadeOut ? [10, 0, 0, 10] : [10, 0, 0]);
  const blurTemplate = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.div
      style={{ opacity, x, scale, filter: blurTemplate }}
      className="absolute inset-x-0 mx-auto w-fit flex flex-col pointer-events-auto"
    >
      <div className="absolute inset-0 bg-[#D7D8D6] rounded-[40px] -z-10" />
      <div className="relative glass-panel rounded-[40px] p-8 md:p-10 border border-white/10 overflow-hidden shadow-2xl">
        {bgImage && (
          <img
            src={bgImage}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none z-0"
          />
        )}
        <div className="relative z-10">
          <h3 className="font-display text-[20px] text-[#474842] font-medium mb-6">{title}</h3>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Card 1: Traditional vs FinTrac comparison ---------- */
function BudgetCompare() {
  const trad = [
    { k: "Food", v: "-10%" },
    { k: "Transport", v: "-10%" },
    { k: "Shopping", v: "-10%" },
    { k: "Dining", v: "-10%" },
  ];
  const fin = [
    { k: "Food", v: "-2%" },
    { k: "Transport", v: "-1%" },
    { k: "Shopping", v: "-15%" },
    { k: "Dining", v: "-12%" },
  ];
  return (
    <div className="grid grid-cols-2 gap-8 max-w-[400px]">
      <div>
        <div className="text-[10px] tracking-[0.25em] text-[#474842]/50 font-mono mb-3">TRADITIONAL</div>
        <ul className="space-y-2.5">
          {trad.map((r) => (
            <li key={r.k} className="flex justify-between gap-6 font-light text-[16px] leading-[1.4] tracking-[-0.02em] text-[#474842]/70">
              <span>{r.k}</span>
              <span className="font-mono">{r.v}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-[10px] tracking-[0.25em] text-[#8FA876] font-mono mb-3">FINTRAC</div>
        <ul className="space-y-2.5">
          {fin.map((r) => (
            <li key={r.k} className="flex justify-between gap-6 font-light text-[16px] leading-[1.4] tracking-[-0.02em] text-[#474842]">
              <span>{r.k}</span>
              <span className="font-mono">{r.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Card 3: Financial Seasons ---------- */
function SeasonGrid() {
  const seasons = [
    { name: "Growth", score: 84, color: "var(--color-season-growth)", note: "income rising, low friction" },
    { name: "Harvest", score: 91, color: "var(--color-season-harvest)", note: "surplus, accumulating" },
    { name: "Drought", score: 42, color: "var(--color-season-drought)", note: "constrained, defensive" },
    { name: "Recovery", score: 78, color: "var(--color-season-recovery)", note: "rebuilding capacity" },
    { name: "Dormancy", score: 56, color: "var(--color-season-dormancy)", note: "low activity, stable" },
  ];
  return (
    <ul className="space-y-3 max-w-[380px]">
      {seasons.map((s) => (
        <li key={s.name} className="flex items-center gap-4">
          <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
          <span className="font-light text-[16px] leading-[1.4] tracking-[-0.02em] text-[#474842] w-[80px]">{s.name}</span>
          <span className="font-mono text-[12px] text-[#474842]/70">Score: {s.score}</span>
          <span className="font-light text-[14px] leading-[1.4] tracking-[-0.02em] text-[#474842]/50 ml-auto hidden md:inline">{s.note}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Card 4: Engine pipeline ---------- */
function EnginePipeline() {
  const steps = ["Transactions", "Behavior Modeling", "POMDP System", "Adaptive Budgeting"];
  return (
    <ol className="space-y-3 max-w-[300px]">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-4 font-light text-[16px] leading-[1.4] tracking-[-0.02em] text-[#474842]">
          <span className="w-6 h-6 rounded-full border border-[#474842]/20 flex items-center justify-center font-mono text-[11px] text-[#474842]/60">
            {i + 1}
          </span>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Card 5: Honest math credibility ---------- */
function HonestMath() {
  const tags = ["Behavioral Economics", "POMDP Framework", "Elastic RL Engine", "5,000 Simulated Agents", "Recovery Analysis"];
  const validated = ["POMDP convergence", "Friction calibration", "Seasonal classification"];
  const unvalidated = ["Long-horizon recovery", "Cross-cohort transfer"];
  return (
    <div className="max-w-[440px]">
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((t) => (
          <span key={t} className="font-mono text-[10px] tracking-wide px-3 py-1.5 rounded-full border border-[#474842]/20 text-[#474842]/80">
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-[10px] tracking-[0.25em] text-[#8FA876] font-mono mb-2">VALIDATED</div>
          <ul className="space-y-1.5 font-light text-[15px] leading-[1.4] tracking-[-0.02em] text-[#474842]">
            {validated.map((v) => <li key={v}>· {v}</li>)}
          </ul>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.25em] text-[#A9714F] font-mono mb-2">NOT YET</div>
          <ul className="space-y-1.5 font-light text-[15px] leading-[1.4] tracking-[-0.02em] text-[#474842]/60">
            {unvalidated.map((v) => <li key={v}>· {v}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
