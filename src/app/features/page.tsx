"use client";

import React, { useRef, useState, useEffect } from "react";
import EditorialCard from "@/components/EditorialCard";
import Navbar from "@/components/Navbar";
import WaterRevealText from "@/components/Hero/WaterRevealText";
import CircularText from "@/components/CircularText";
import StaggeredMenu from "@/components/StaggeredMenu";

const CARD_COUNT = 8;
const CARD_SPACING_VH = 85; // vh per card
const SECTION_HEIGHT = `${CARD_COUNT * CARD_SPACING_VH + 200}vh`;
const TOTAL_FRAMES = 192;

const chapters = [
  { index: 1, label: "Classifier" },
  { index: 2, label: "Learning" },
  { index: 3, label: "Savings" },
  { index: 4, label: "Alerts" },
  { index: 5, label: "Wellness" },
  { index: 6, label: "Explainability" },
  { index: 7, label: "Twin" },
  { index: 8, label: "Ledger" },
];

const cards = [
  {
    title: "AI Classifier",
    anchor: "#feature-classifier",
    children: (
      <div className="flex flex-col gap-2 mt-6">
        {[
          ["01", "Cache Lookup", "O(1)"],
          ["02", "Global Registry", "shared"],
          ["03", "Heuristics", "rules"],
          ["04", "Fuzzy Match", "Fuse.js"],
          ["05", "GPT-4o-mini", "fallback"],
        ].map(([num, stage, tag]) => (
          <div key={stage} className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-[#474842]/30 w-5">{num}</span>
            <div className="flex-1 bg-[#474842]/5 border border-[#474842]/10 rounded-lg px-3 py-2 text-[#474842]/80 text-[11px] font-bold shadow-sm">{stage}</div>
            <span className="font-mono text-[9px] text-[#474842]/30 w-10 text-right">{tag}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Friction Learning",
    anchor: "#feature-friction",
    children: (
      <div className="mt-6 space-y-3">
        <div className="bg-[#474842]/5 border border-[#474842]/8 rounded-xl p-4">
          <div className="font-mono text-[9px] text-[#474842]/40 mb-2 tracking-widest">UPDATE RULE</div>
          <p className="text-[#474842]/80 text-[11px] leading-relaxed font-mono font-semibold">
            F(t+1) = F(t) + α × (1 − C) × Streak
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[["α", "0.10", "rate"], ["F₀", "0.50", "prior"], ["−0.05", "3mo", "decay"]].map(([val, sub1, sub2]) => (
            <div key={val} className="bg-[#474842]/5 rounded-xl p-3">
              <div className="text-[#474842] text-sm font-semibold">{val}</div>
              <div className="text-[#474842]/40 text-[9px] mt-1">{sub1} {sub2}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Elastic Savings",
    anchor: "#feature-savings",
    children: (
      <div className="mt-6 space-y-3">
        <div className="font-mono text-[9px] text-[#474842]/40 tracking-widest mb-2">FRICTION → CUT SIZE</div>
        {[
          ["Dining", 0.82, "protected"],
          ["Shopping", 0.45, "moderate"],
          ["Entertainment", 0.18, "absorbs most"],
        ].map(([cat, f, label]) => (
          <div key={cat} className="space-y-1">
            <div className="flex justify-between">
              <span className="text-[#474842]/70 text-[11px] font-semibold">{cat}</span>
              <span className="text-[#474842]/50 text-[9px] font-mono font-medium">{label}</span>
            </div>
            <div className="h-1 bg-[#474842]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#474842]/70 rounded-full"
                style={{ width: `${(1 - (f as number)) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Behavioral Alerts",
    anchor: "#feature-coaching",
    children: (
      <div className="mt-6 grid grid-cols-2 gap-2">
        {[
          ["⚡", "Spending Spike", "7d vs 3-week avg"],
          ["📉", "Category Drift", "+15pp wallet shift"],
          ["🔥", "Salary Burn", "50% in 7 days"],
          ["🌙", "Late Night", "₹1,500 after 11PM"],
        ].map(([icon, name, sub]) => (
          <div key={name} className="bg-[#474842]/5 border border-[#474842]/8 rounded-xl p-3">
            <div className="text-base mb-1">{icon}</div>
            <div className="text-[#474842]/90 text-[11px] font-bold leading-tight">{name}</div>
            <div className="text-[#474842]/50 text-[9px] mt-1 font-medium">{sub}</div>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Wellness Score",
    anchor: "#feature-wellness",
    children: (
      <div className="mt-6 space-y-3">
        <div className="font-mono text-[9px] text-[#474842]/40 tracking-widest">W ∈ [0, 100] · 4 PILLARS</div>
        {[
          ["Stability", 78],
          ["Savings", 62],
          ["Impulse", 85],
          ["Subscriptions", 70],
        ].map(([pillar, score]) => (
          <div key={pillar} className="flex items-center gap-3">
            <span className="text-[#474842]/80 text-[11px] w-24 shrink-0 font-semibold">{pillar}</span>
            <div className="flex-1 h-[3px] bg-[#474842]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#474842] rounded-full"
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-[#474842]/40 font-mono text-[9px] w-5 text-right">{score}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Explainability",
    anchor: "#feature-explainability",
    children: (
      <div className="mt-6">
        <div className="bg-[#474842]/5 border border-[#474842]/8 rounded-xl p-4">
          <div className="font-mono text-[9px] text-[#474842]/40 tracking-widest mb-3">WHY THIS INSIGHT?</div>
          {[
            ["Stage matched", "Fuzzy Levenshtein"],
            ["Confidence", "0.87"],
            ["Friction (Dining)", "0.72"],
            ["Suggested cut", "₹1,200"],
            ["Compliance streak", "2 months"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center py-2 border-b border-[#474842]/10 last:border-0">
              <span className="text-[#474842]/60 text-[10px] font-medium">{k}</span>
              <span className="text-[#474842]/80 text-[10px] font-mono font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Financial Twin",
    anchor: "#feature-twin",
    children: (
      <div className="mt-6">
        <div className="font-mono text-[9px] text-[#474842]/40 tracking-widest mb-3">TRAJECTORY DIVERGENCE</div>
        <div className="flex items-end gap-2 h-16 w-full border-b border-[#474842]/10 pb-1">
           <div className="w-1/2 h-[40%] bg-[#474842]/20 rounded-t-sm relative">
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-[#474842]/50">STATIC</div>
           </div>
           <div className="w-1/2 h-[90%] bg-[#474842]/70 rounded-t-sm relative">
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-[#474842]/80 font-bold">TWIN</div>
           </div>
        </div>
      </div>
    )
  },
  {
    title: "Audit Ledger",
    anchor: "#feature-ledger",
    children: (
      <div className="mt-6 space-y-2">
        <div className="font-mono text-[9px] text-[#474842]/40 tracking-widest mb-2">CHAIN HASH</div>
        {[
          "0x8f...2a1b",
          "0x3c...9f4e",
          "0x7d...5b22"
        ].map((hash, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#474842]/30" />
            <div className="h-5 flex-1 bg-[#474842]/5 border border-[#474842]/10 rounded flex items-center px-2">
              <span className="font-mono text-[10px] text-[#474842]/60">{hash}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }
];

const detailSections = [
  {
    id: "feature-classifier",
    num: "01 / 08",
    title: "AI Classifier",
    body: "Understands intent before category.\n\nThe 8-stage cascade routes every transaction from a user-specific merchant memory cache (O(1), highest priority) through a global registry, keyword heuristics for Salary/Rent/EMI/Insurance, Fuse.js Levenshtein fuzzy matching, and finally GPT-4o-mini via OpenRouter for structured JSON output. The pipeline short-circuits the moment a stage matches. User corrections write back to the cache permanently — so every manual fix becomes the fastest path on next occurrence.",
    highlight: `"Every correction trains the next lookup. The classifier gets smarter per user, permanently."`
  },
  {
    id: "feature-friction",
    num: "02 / 08",
    title: "Friction Learning",
    body: "At the start of each month, an Inngest cron job evaluates per-category compliance for every user. Non-compliance raises that category's friction score: F(t+1) = F(t) + α × (1 − C) × StreakPenalty. Consecutive failures escalate the penalty via a streak multiplier (1.0 + failures × 0.5). Three consecutive months of full compliance triggers a decay of −0.05, relaxing the budget as habits form. Cold-start prior: F = 0.50. Production learning rate: α = 0.10.",
    highlight: `"Monte Carlo simulation (N=5,000, T=12 months): 97.08% simulated retention vs 63.54% for static budgeting."`,
    footnote: `"Simulation outcome — not empirical user data."`
  },
  {
    id: "feature-savings",
    num: "03 / 08",
    title: "Elastic Savings",
    body: "The Elastic Savings Engine allocates budget cuts inversely proportional to behavioral friction — protecting categories users find hardest to reduce, and routing more of the cut toward categories with low friction. An iterative water-filling loop (up to 100 iterations) handles categories that can't absorb their full assigned cut, redistributing the surplus until the savings target is met. Every output includes a Behavioral Cost — the total psychological pain of the proposed plan — displayed in the Friction Simulator before the user commits.",
    highlight: `Cut(c) = T × (1 − F_c)² / Σ(1 − F_c')²`
  },
  {
    id: "feature-coaching",
    num: "04 / 08",
    title: "Behavioral Alerts",
    body: "Four heuristic triggers evaluate transaction history continuously. Spending Spike: 7-day category spend ≥ ₹2,000 AND 50%+ above the 3-week weekly average. Category Drift: discretionary wallet share increases ≥15 percentage points over 14 vs 30 days. Salary Burn Velocity: total outflows in the 7 days post-salary exceed 50% of the credited amount. Impulsive Late-Night Spend: cumulative debits between 11PM and 5AM exceed ₹1,500. Each trigger fires a GPT-4o-mini explanation — non-judgmental, specific to that user's actual transactions."
  },
  {
    id: "feature-wellness",
    num: "05 / 08",
    title: "Wellness Score",
    body: "A composite score W ∈ [0, 100] from four equally-weighted pillars. Spending Stability: base 100, penalized −10 per Category Drift event and −5 per Spending Spike. Savings Consistency: (Credits₉₀ − Debits₉₀) / Credits₉₀ × 100. Impulse Pacing: base 100, penalized by late-night and weekend impulse events. Subscription Buffer: fixed recurring outlay as a share of total spend. Dashboard renders each pillar as a live progress ring with real-time recalculation."
  },
  {
    id: "feature-explainability",
    num: "06 / 08",
    title: "Explainability",
    body: "Every AI insight card surfaces a help icon that opens a glassmorphic modal. Inside: which of the 8 pipeline stages matched the transaction, the confidence score at classification time, the nearest historical match for fuzzy-stage results, and for budget recommendations — the exact friction weights, suggested cut values, and compliance signals that generated the advice. No recommendation is unattributed. Every output traces back to the input data that produced it."
  },
  {
    id: "feature-twin",
    num: "07 / 08",
    title: "Financial Twin (research feature)",
    body: "The Financial Twin is a forward projection model built on FinTrac's POMDP simulation framework. It takes a user's current behavioral profile — friction scores, compliance streaks, spending distribution — and projects two parallel trajectories: one continuing current behavior, one following the adaptive engine's recommendations. The gap between them is the measurable value of compliance, rendered as a diverging line chart with month-by-month breakpoints. Built on the same Monte Carlo simulation that validated the adaptive engine at N=5,000 agents across 12 months.",
    highlight: `"Three behavioral personas modeled: Aspirational Saver, Income Shock, Seasonal Spender. The adaptive engine outperformed static baselines under all three shock conditions."`
  },
  {
    id: "feature-ledger",
    num: "08 / 08",
    title: "Cryptographic Audit Ledger",
    body: "Every transaction insert fires a BEFORE INSERT SQL trigger that chains a SHA-256 hash from the prior transaction's hash, the current transaction ID, amount, and timestamp. The genesis block is derived from the user's Clerk ID. Any retroactive alteration of any record breaks the chain detectably. Built for expense report integrity, tax log tamper-proofing, and audit traceability without external dependencies — the entire chain lives in Supabase and is verified in-database.",
    highlight: `Hash_n = SHA256(Hash_(n-1) ∥ ID_n ∥ Amount_n ∥ Date_n)`
  }
];

function CardWrapper({ children, isActive, isPast }: { children: React.ReactNode, isActive: boolean, isPast: boolean }) {
  return (
    <div
      className="w-full"
      style={{
        opacity: isActive ? 1 : isPast ? 0.3 : 0.5,
        transform: isActive ? "scale(1)" : "scale(0.97)",
        filter: isPast ? "blur(2px)" : "none",
        transition: "opacity 500ms ease, transform 500ms ease, filter 400ms ease",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

export default function FeaturesScrollPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollYPos, setScrollYPos] = useState(0);

  // Preload frames
  useEffect(() => {
    // Immediate preload for first batch
    for (let i = 1; i <= Math.min(30, TOTAL_FRAMES); i++) {
      const img = new Image();
      img.src = `/features_frames/frame_${String(i).padStart(4, "0")}.webp`;
    }
    // Lazy preload the rest
    setTimeout(() => {
      for (let i = 31; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/features_frames/frame_${String(i).padStart(4, "0")}.webp`;
      }
    }, 1000);
  }, []);

  useEffect(() => {
    // Sync active card perfectly with viewport using IntersectionObserver
    const observers = cards.map((_, i) => {
      const el = document.getElementById(`card-wrapper-${i}`);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCard(i);
          } else if (i === 0 && entry.boundingClientRect.top > window.innerHeight / 2) {
            // User scrolled back up above the first card
            setActiveCard(-1);
          }
        },
        { rootMargin: "-45% 0px -45% 0px" } // Trigger when card hits the very center of the screen
      );
      obs.observe(el);
      return obs;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const rawProgress = (window.scrollY - sectionTop) / sectionHeight;
      const progress = Math.min(1, Math.max(0, rawProgress));

      setScrollProgress(progress);
      setScrollYPos(window.scrollY);
    };

    const loop = () => {
      handleScroll();
      requestAnimationFrame(loop);
    };

    // Using RAF for buttery smooth scrubbing
    const rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const frameIndex = Math.floor(scrollProgress * (TOTAL_FRAMES - 1));
  const frameSrc = `/features_frames/frame_${String(frameIndex + 1).padStart(4, "0")}.webp`;


  return (
    <div className="w-full bg-[#E8E8E8] min-h-screen text-[#1a1a1a] font-sans relative overflow-visible">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes oscillate {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        @keyframes shadow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-oscillate {
          animation: oscillate 2s infinite ease-in-out;
        }
      `}} />
      <Navbar variant="fixed" rightOpacity={scrollProgress < 0.98 ? 1 : 0} />

      {/* GLOBAL STAGGERED MENU for Features Page */}
      <div 
        className="fixed top-0 left-0 w-full h-screen z-50 pointer-events-none transition-opacity duration-500"
        style={{ opacity: scrollProgress >= 0.98 ? 1 : 0 }}
      >
        <StaggeredMenu
          position="right"
          isFixed={true}
          items={[
            { label: 'Classifier', ariaLabel: 'AI Classifier', link: '#feature-classifier' },
            { label: 'Learning', ariaLabel: 'Friction learning', link: '#feature-friction' },
            { label: 'Savings', ariaLabel: 'Elastic savings', link: '#feature-savings' },
            { label: 'Alerts', ariaLabel: 'Behavioral alerts', link: '#feature-coaching' },
            { label: 'Wellness', ariaLabel: 'Wellness Score', link: '#feature-wellness' },
            { label: 'Insights', ariaLabel: 'Explainability', link: '#feature-explainability' },
            { label: 'Twin', ariaLabel: 'Financial Twin', link: '#feature-twin' },
            { label: 'Ledger', ariaLabel: 'Audit Ledger', link: '#feature-ledger' }
          ]}
          socialItems={[
            { label: 'Twitter', link: '#' },
            { label: 'LinkedIn', link: '#' }
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#2E2F2B', '#3F4138', '#8FA876']}
          accentColor="#8FA876"
        />
      </div>

      {/* SVG Filter for Liquid Glass Card */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur
              in="noise"
              stdDeviation="2"
              result="blurred"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="67"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* FIRST VIEW ABSOLUTE OVERLAYS */}
      <div className="fixed top-0 left-0 right-0 h-[100vh] pointer-events-none z-20">
        <div
          style={{ opacity: Math.max(0, 1 - scrollYPos / 80) }}
          className="absolute inset-0 transition-opacity duration-75"
        >
          {/* Headline */}
          <div
            className="absolute flex flex-col items-start text-left"
            style={{ top: "18vh", left: "2vw" }}
          >
            <WaterRevealText
              text="Six systems."
              as="h1"
              className="text-[clamp(28px,3.5vw,54px)] font-bold text-[#474842] tracking-[-0.12em] font-display leading-[0.98]"
              delay={0.3}
            />
            <WaterRevealText
              text="Built to learn"
              as="h2"
              className="text-[clamp(28px,3.5vw,54px)] font-bold text-[#474842] tracking-[-0.12em] font-display leading-[0.98]"
              delay={0.6}
            />
            <WaterRevealText
              text="how you spend."
              as="h2"
              className="text-[clamp(28px,3.5vw,54px)] font-bold text-[#474842] tracking-[-0.12em] font-display leading-[0.98]"
              delay={0.9}
            />
          </div>

          {/* Descriptor */}
          <p
            className="absolute text-[14px]"
            style={{ top: "20vh", right: "5vw", color: "rgba(20,20,20,0.45)", maxWidth: "280px" }}
          >
            FinTrac doesn't apply rules to your spending.<br />
            It builds a behavioral model of how you actually<br />
            spend — then quietly adapts it every month.
          </p>

          {/* Chapter preview label */}
          <div
            className="absolute font-mono text-[11px] uppercase"
            style={{ bottom: "8vh", left: "5vw", letterSpacing: "0.2em", color: "rgba(20,20,20,0.35)" }}
          >
            01 / 08 · AI Classifier
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute font-mono text-[11px] animate-oscillate transition-opacity duration-300"
            style={{
              bottom: "8vh",
              right: "5vw",
              color: "rgba(20,20,20,0.3)",
              opacity: scrollYPos > 10 ? 0 : 1
            }}
          >
            ↓  scroll to explore
          </div>
        </div>
      </div>

      <div
        ref={sectionRef}
        style={{ height: SECTION_HEIGHT }}
        className="relative w-full overflow-visible"
      >
        {/* LAYER 1 — STICKY IMAGE SEQUENCE */}
        <div className="sticky top-0 h-[100vh] w-full z-0 overflow-hidden flex items-center justify-center pointer-events-none">
          <img
            src={frameSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div
            className="absolute z-10 pointer-events-auto mix-blend-multiply scale-[1.5] md:scale-[2] transition-all duration-300"
            style={{
              opacity: Math.max(0, 0.5 - (scrollYPos / 600)),
              filter: `blur(${Math.min(20, scrollYPos / 15)}px)`,
              pointerEvents: scrollYPos > 300 ? "none" : "auto"
            }}
          >
            <CircularText
              text="FINTRAC*BEHAVIORAL*ENGINE*"
              onHover="speedUp"
              spinDuration={20}
              className="text-[#474842]"
            />
          </div>
          {/* Animated drop shadow pulse mapped to match existing shadow area */}
          <div
            className="absolute w-[30vw] max-w-[350px] h-[80px] rounded-full animate-shadow-pulse pointer-events-none mix-blend-multiply"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 15vh)",
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(12px)"
            }}
          />
        </div>

        {/* LAYER 2 — STICKY CHAPTER RAIL (Rolling Vertical Text) */}
        <div className="hidden md:block sticky top-1/2 left-8 z-20 w-12 h-[300px] -translate-y-1/2 pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-start">
            {chapters.map((chapter, i) => {
              const distance = i - activeCard;
              const isActive = distance === 0;
              const isAdjacent = Math.abs(distance) === 1;
              const isHidden = Math.abs(distance) > 1;
              
              // distance = -1 (above active), distance = 1 (below active)
              const yOffset = distance * 120;
              
              return (
                <div
                  key={chapter.index}
                  className="absolute left-0 flex items-center justify-start transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{ 
                    writingMode: "vertical-rl", 
                    transform: `translateY(calc(-50% + ${yOffset}px)) rotate(180deg)`,
                    opacity: isActive ? 1 : isAdjacent ? 0.3 : 0,
                    filter: isActive ? "blur(0px)" : isAdjacent ? "blur(2px)" : "blur(8px)",
                    pointerEvents: isHidden ? "none" : "auto",
                    top: "50%",
                  }}
                  onClick={() => {
                    if (!sectionRef.current) return;
                    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
                    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
                    const targetScroll = sectionTop + (i / cards.length) * sectionHeight;
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                  }}
                >
                  <span className={`font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-500 ${isActive ? "text-[#474842] font-bold" : "text-[#474842]/80"}`}>
                    {String(chapter.index).padStart(2, "0")} {chapter.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* LAYER 3 — CARD COLUMN */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: "-100vh",
            paddingTop: "100vh",
            paddingBottom: "20vh",
          }}
          className="flex flex-col items-center max-w-[2000px] mx-auto w-[96vw] px-0 lg:px-4"
        >
          {cards.map((card, i) => (
            <div id={`card-wrapper-${i}`} key={card.anchor} style={{ minHeight: `${CARD_SPACING_VH}vh` }} className="w-full flex items-center justify-center">
              <CardWrapper
                isActive={i === activeCard}
                isPast={i < activeCard}
              >
                <EditorialCard
                  title={card.title}
                  side={i % 2 === 0 ? "left" : "right"}
                  align={i % 2 === 0 ? "up" : "down"}
                  index={i + 1}
                  imageSrc="/card-bg.png"
                  onAction={() =>
                    document.querySelector(card.anchor)?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {card.children}
                </EditorialCard>
              </CardWrapper>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL SECTIONS (DARK SCROLL SECTION) */}
      <div className="relative w-full z-20 pt-32 pb-32 bg-[#0a0a0a] overflow-hidden">
        {/* Ambient background glows for glassmorphism */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-[#2a3028] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-slow-drift" />
          <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] bg-[#3a4038] rounded-full mix-blend-screen filter blur-[140px] opacity-30 animate-slow-drift" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-[10%] left-[20%] w-[60vw] h-[60vw] bg-[#283230] rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-slow-drift" style={{ animationDelay: "4s" }} />
        </div>

        {detailSections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            className="flex flex-col justify-center mx-auto relative z-20"
            style={{
              minHeight: "100vh",
              maxWidth: "860px",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: "0 24px 64px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
              borderRadius: "32px",
              padding: "64px",
              marginBottom: "80px"
            }}
          >
            <div className="font-mono text-white/30 text-[12px] mb-4">
              {section.num}
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-white font-light mb-8 drop-shadow-sm">
              {section.title}
            </h2>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-[640px]">
              {section.body}
            </p>

            {section.highlight && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-md">
                <p className="font-mono text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">
                  {section.highlight}
                </p>
                {section.footnote && (
                  <p className="text-white/40 text-[10px] mt-4 uppercase tracking-widest font-mono">
                    {section.footnote}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="self-start mt-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase font-mono"
            >
              <span>←</span> Back to features
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
