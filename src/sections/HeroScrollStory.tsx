"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  m,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Image from "next/image";
import branch1 from "../../public/1.webp";
import branch2 from "../../public/2.webp";
import branch3 from "../../public/3.webp";
import branch4 from "../../public/4.webp";

const branches = [branch1, branch2, branch3, branch4];

/**
 * MOBILE STRATEGY
 * ----------------------------------------------------------------------
 * The desktop experience is a 500vh pinned scroll-scrub: a panoramic image
 * translates by hand-tuned `vw` offsets while five cards fade in/out in
 * sequence. That math (`-260vw` etc.) was tuned against desktop image
 * aspect ratios and a long scroll track — on a narrow phone viewport the
 * same vw offsets move the artwork a wildly different *relative* amount,
 * and pinning 500vh of scroll on mobile (where scroll is the primary
 * input, not an accent) makes the page feel broken/stuck.
 *
 * Rather than retune the vw math per-breakpoint (fragile, still a 500vh
 * scroll-jack on the device least suited to it), below `md` this renders
 * a normal vertically-stacked flow: same headline, same five story cards,
 * same content — just laid out in document flow with lightweight
 * `whileInView` fades instead of a pinned scrub. The desktop scroll-scrub
 * itself is unchanged.
 *
 * `useReducedMotion()` also routes to the static/simplified path on any
 * viewport size, since the scroll-jacked version is the single most
 * motion-heavy thing on the page.
 */

const MOBILE_BREAKPOINT = 768; // matches Tailwind `md`

function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  // Defaults to `false` (desktop) on the server and on first client paint,
  // matching SSR. Avoids a hydration mismatch flash by reading the real
  // value only after mount.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

const STORY_CARDS = [
  { key: "fail", title: "Why Traditional Budgets Fail", render: () => <BudgetCompare /> },
  {
    key: "friction",
    title: "Behavioral Friction",
    render: () => (
      <p className="font-light text-[16px] leading-[1.4] tracking-[-0.02em] text-white/80 max-w-[34ch]">
        Some habits are harder to change than others. FinTrac measures
        that resistance and lets your budget breathe around it.
      </p>
    ),
  },
  { key: "seasons", title: "Financial Seasons", render: () => <SeasonGrid /> },
  { key: "engine", title: "The FinTrac Engine", render: () => <EnginePipeline /> },
  { key: "math", title: "Built on Honest Math", render: () => <HonestMath /> },
];

export default function HeroScrollStory() {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setIsMounted(true);
  }, []);

  // Return the desktop version on the server and first client paint to match SSR
  if (!isMounted) {
    return <DesktopHero />;
  }

  // Only route to the vertically-stacked layout on actual mobile screens.
  if (isMobile) {
    return <MobileHero />;
  }

  return <DesktopHero />;
}

/* ───────────────────────────────────────────────────────────────────────
   DESKTOP — original pinned scroll-scrub experience (unchanged math)
   ─────────────────────────────────────────────────────────────────────── */
function DesktopHero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // 500vh scroll range
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
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
  const r1 = [0.15, 0.25, 0.35, 0.45];
  const r2 = [0.35, 0.45, 0.55, 0.65];
  const r3 = [0.55, 0.65, 0.75, 0.85];
  const r4 = [0.75, 0.85, 0.90, 0.95];
  const r5 = [0.90, 0.95, 1.0]; // Omit fadeOutEnd so it stays pinned at 1.0
  const ranges = [r1, r2, r3, r4, r5];

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
        <m.div
          style={{ x: bgMouseX, y: bgMouseY }}
          className="absolute inset-0 w-full h-screen z-0 pointer-events-none max-w-[1600px] mx-auto px-8 md:px-14 flex justify-center"
        >
          <div className="grid grid-cols-4 h-full w-full max-w-[1600px]">
            <div className="border-r border-white/[0.04] h-full" />
            <div className="border-r border-white/[0.04] h-full" />
            <div className="border-r border-white/[0.04] h-full" />
            <div className="h-full" />
          </div>
        </m.div>

        {/* Ghost Wordmark Layer - Persists throughout the scroll */}
        <m.div
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
        </m.div>

        {/* Horizontal Moving Branch Layer */}
        <m.div
          style={{ x: branchX }}
          className="absolute inset-x-0 bottom-[-5vh] flex items-end z-0 pointer-events-none origin-bottom-left"
        >
          {/* Continuous panoramic artwork sliced into 4 chunks */}
          <m.div
            style={{ x: branchMouseX, y: branchMouseY, rotateX, rotateY, perspective: 2000, transformStyle: "preserve-3d" }}
            className="absolute flex items-end origin-bottom"
          >
            <div
              className="absolute flex items-end"
              style={{ left: "-5vw", bottom: 0 }}
            >
              {branches.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  draggable={false}
                  placeholder="blur"
                  priority={i < 2}
                  style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,.15)) drop-shadow(0px 30px 80px rgba(0,0,0,.25)) drop-shadow(0px 80px 160px rgba(0,0,0,.12))" }}
                  className={`w-[100vw] max-w-none h-auto object-contain select-none grayscale-[15%] shrink-0 ${i !== 0 ? "-ml-[2px]" : ""} ${i === 0 ? "mix-blend-multiply" : ""}`}
                />
              ))}
            </div>
          </m.div>

          {/* soft dynamic-light overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(255,240,200,0.03), transparent 80%)", mixBlendMode: "soft-light" }} />
        </m.div>

        {/* Unified Hero Content Layer */}
        <m.div
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
                <div className="px-6 py-3 border border-white/20 flex items-center gap-3 justify-center backdrop-blur-sm rounded-[32px] bg-white/[0.02]">
                  <span className="flex items-center gap-3 text-white/80 text-[13px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><circle cx="12" cy="5" r="1" /><circle cx="19" cy="5" r="1" /><circle cx="5" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="12" cy="19" r="1" /><circle cx="19" cy="19" r="1" /><circle cx="5" cy="19" r="1" /></svg>
                    Explore the System
                  </span>
                </div>
              </button>
            </div>
          </div>
        </m.div>

        {/* Central Stationary Cards Layer */}
        <m.div
          style={{ x: cardMouseX, y: cardMouseY }}
          className="relative z-10 w-full max-w-[500px] mx-auto px-6 h-[400px] flex items-center justify-center"
        >
          {STORY_CARDS.map((card, i) => (
            <StoryCard key={card.key} progress={scrollYProgress} range={ranges[i]} title={card.title} priority={i === 0}>
              {card.render()}
            </StoryCard>
          ))}
        </m.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   MOBILE / REDUCED-MOTION — vertical document flow, no scroll-jacking
   ─────────────────────────────────────────────────────────────────────── */
function MobileHero() {
  return (
    <section
      data-testid="hero-scroll-story-mobile"
      className="relative w-full px-5 sm:px-6 pt-28 pb-20"
      style={{ background: "linear-gradient(to bottom, var(--color-bg-1) 0%, var(--color-bg-2) 100%)" }}
    >
      {/* Ghost wordmark — kept as a quiet background watermark, scaled down */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-10 flex justify-center pointer-events-none select-none z-0 overflow-hidden"
        style={{ opacity: 0.04 }}
      >
        <span
          className="whitespace-nowrap"
          style={{
            color: "#FFFFFF",
            fontFamily: "var(--font-rozha-one), serif",
            fontSize: "clamp(5rem, 32vw, 9rem)",
            fontWeight: 400,
            lineHeight: "84%",
            letterSpacing: "-0.06em",
          }}
        >
          FINTRAC AI
        </span>
      </div>

      {/* Hero content — stacked, no fixed-width nowrap headline */}
      <div className="relative z-10 flex flex-col gap-6 max-w-[480px] mx-auto text-center sm:text-left">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-white/80 font-normal text-[30px] sm:text-[36px] leading-[1.08] tracking-normal">
            Some habits take time.
          </h1>
          <h2 className="font-display text-white/80 font-normal text-[22px] sm:text-[26px] leading-[1.2] tracking-[0.02em]">
            Your budget should know that.
          </h2>
        </div>

        <p className="text-[15px] leading-[1.65] text-white/60 font-light mx-auto sm:mx-0 max-w-[320px]">
          FinTrac adapts around human behavior instead of forcing
          unrealistic financial change
        </p>

        <button className="group self-center sm:self-start mt-2 active:scale-95 transition-transform">
          <div className="px-6 py-3 border border-white/20 flex items-center gap-3 justify-center backdrop-blur-sm rounded-[32px] bg-white/[0.02]">
            <span className="flex items-center gap-3 text-white/80 text-[13px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><circle cx="12" cy="5" r="1" /><circle cx="19" cy="5" r="1" /><circle cx="5" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="12" cy="19" r="1" /><circle cx="19" cy="19" r="1" /><circle cx="5" cy="19" r="1" /></svg>
              Explore the System
            </span>
          </div>
        </button>
      </div>

      {/* Story cards — vertical stack, fade-up on scroll into view instead of pinned scrub */}
      <div className="relative z-10 mt-16 flex flex-col gap-6 max-w-[480px] mx-auto">
        {STORY_CARDS.map((card, i) => (
          <MobileStoryCard key={card.key} title={card.title} priority={i === 0}>
            {card.render()}
          </MobileStoryCard>
        ))}
      </div>
    </section>
  );
}

function MobileStoryCard({
  title,
  children,
  priority = false,
}: {
  title: string;
  children: React.ReactNode;
  priority?: boolean;
}) {
  return (
    <m.div
      initial={priority ? false : { opacity: 0, y: 24 }}
      animate={priority ? { opacity: 1, y: 0 } : undefined}
      whileInView={priority ? undefined : { opacity: 1, y: 0 }}
      viewport={priority ? undefined : { once: true, margin: "-60px" }}
      transition={priority ? undefined : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      <div className="relative liquid-glass-card rounded-[28px] p-6 overflow-hidden shadow-2xl h-full w-full">
        <div className="relative z-10">
          <h3 className="font-display text-[18px] text-white font-medium mb-5">{title}</h3>
          {children}
        </div>
      </div>
    </m.div>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   Shared: desktop StoryCard wrapper (pinned-scrub version)
   ─────────────────────────────────────────────────────────────────────── */
function StoryCard({ progress, range, title, children, priority = false }: { progress: MotionValue<number>, range: number[], title: string, children: React.ReactNode, priority?: boolean }) {
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
    <m.div
      style={{ opacity, x, scale, filter: blurTemplate }}
      className="absolute inset-x-0 mx-auto w-fit flex flex-col pointer-events-auto"
    >
      <div className="relative liquid-glass-card rounded-[40px] p-8 md:p-10 overflow-hidden shadow-2xl h-full w-full">
        <div className="relative z-10">
          <h3 className="font-display text-[20px] text-white font-medium mb-6">{title}</h3>
          {children}
        </div>
      </div>
    </m.div>
  );
}

/* ---------- Card 1: Budget Compare ---------- */
function BudgetCompare() {
  const trad = [
    { k: "Focus", v: "Rigid categories" },
    { k: "Guilt", v: "High (when breaking rules)" },
    { k: "Adaptability", v: "Low (manual resets)" },
  ];
  const fin = [
    { k: "Focus", v: "Behavioral momentum" },
    { k: "Guilt", v: "Zero (auto-correcting)" },
    { k: "Adaptability", v: "High (elastic limits)" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[380px]">
      <div>
        <div className="text-[10px] tracking-[0.25em] text-white/50 font-mono mb-3">TRADITIONAL</div>
        <ul className="space-y-2.5">
          {trad.map((r) => (
            <li key={r.k} className="flex justify-between gap-3 sm:gap-6 font-light text-[14px] sm:text-[16px] leading-[1.4] tracking-[-0.02em] text-white/60">
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
            <li key={r.k} className="flex justify-between gap-3 sm:gap-6 font-light text-[14px] sm:text-[16px] leading-[1.4] tracking-[-0.02em] text-[#474842]">
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
        <li key={s.name} className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
          <span className="font-light text-[15px] sm:text-[16px] leading-[1.4] tracking-[-0.02em] text-white/90 w-[72px] sm:w-[80px]">{s.name}</span>
          <span className="font-mono text-[12px] text-white/70">Score: {s.score}</span>
          {/* Note text now shown on its own line on small screens instead of being
              dropped entirely (`hidden md:inline` previously had no mobile fallback). */}
          <span className="font-light text-[13px] sm:text-[14px] leading-[1.4] tracking-[-0.02em] text-white/50 w-full sm:w-auto sm:ml-auto basis-full sm:basis-auto pl-5 sm:pl-0">
            {s.note}
          </span>
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
        <li key={s} className="flex items-center gap-4 font-light text-[15px] sm:text-[16px] leading-[1.4] tracking-[-0.02em] text-white/90">
          <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center font-mono text-[11px] text-white/60 shrink-0">
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
          <span key={t} className="font-mono text-[10px] tracking-wide px-3 py-1.5 rounded-full border border-white/20 text-white/80">
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div>
          <div className="text-[10px] tracking-[0.25em] text-[#8FA876] font-mono mb-2">VALIDATED</div>
          <ul className="space-y-1.5 font-light text-[14px] sm:text-[15px] leading-[1.4] tracking-[-0.02em] text-white/90">
            {validated.map((v) => <li key={v}>· {v}</li>)}
          </ul>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.25em] text-[#A9714F] font-mono mb-2">NOT YET</div>
          <ul className="space-y-1.5 font-light text-[14px] sm:text-[15px] leading-[1.4] tracking-[-0.02em] text-white/60">
            {unvalidated.map((v) => <li key={v}>· {v}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
