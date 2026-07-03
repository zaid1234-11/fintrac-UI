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
  { index: 1, label: "Memory" },
  { index: 2, label: "Learning" },
  { index: 3, label: "Savings" },
  { index: 4, label: "Signals" },
  { index: 5, label: "Wellness" },
  { index: 6, label: "Explainable" },
  { index: 7, label: "Twin" },
  { index: 8, label: "Audit" },
];

const cards = [
  {
    title: "Behavioral Memory",
    anchor: "#feature-classifier",
    children: (
      <div className="mt-6 flex flex-col gap-4">
        <div className="bg-[#474842]/5 border border-[#474842]/10 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#474842] font-semibold text-sm">₹450 Starbucks</span>
            <div className="bg-[#8FA876]/20 text-[#3F4138] px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
              <span>✓</span> Coffee & Dining
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-[#474842]/10 pt-3 mt-1">
            <div className="w-4 h-4 rounded-full bg-[#8FA876]/30 flex items-center justify-center text-[8px]">⚡</div>
            <span className="text-[#474842]/60 text-[10px] font-medium">Learned from 4 previous corrections</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Friction Learning",
    anchor: "#feature-friction",
    children: (
      <div className="mt-6 space-y-3">
        <div className="flex justify-between items-center bg-[#474842]/5 border border-[#474842]/8 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">🔒</span>
            <span className="text-[#474842]/80 text-[11px] font-semibold">Dining & Coffee</span>
          </div>
          <span className="text-[#474842]/50 text-[10px] font-medium uppercase tracking-wider">Protected</span>
        </div>
        <div className="flex justify-between items-center bg-[#474842]/5 border border-[#474842]/8 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">〰️</span>
            <span className="text-[#474842]/80 text-[11px] font-semibold">Online Shopping</span>
          </div>
          <span className="text-[#474842]/50 text-[10px] font-medium uppercase tracking-wider">Flexible</span>
        </div>
      </div>
    )
  },
  {
    title: "Adaptive Savings",
    anchor: "#feature-savings",
    children: (
      <div className="mt-6 space-y-3">
        <div className="bg-[#474842]/5 border border-[#474842]/8 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#474842]/30" />
            <div className="flex-1 h-px bg-[#474842]/20 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[#474842]/40 rotate-45" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#8FA876]/20 flex items-center justify-center text-[14px]">🎯</div>
          </div>
          <p className="text-[#474842]/70 text-[11px] font-medium leading-relaxed">
            Automatically bypasses protected habits and finds micro-savings in discretionary categories.
          </p>
        </div>
      </div>
    )
  },
  {
    title: "Behavioral Signals",
    anchor: "#feature-coaching",
    children: (
      <div className="mt-6">
        <div className="bg-[#474842]/5 border border-[#474842]/8 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#474842]/40" />
          <div className="flex items-start gap-3 ml-2">
            <span className="text-xl">🌙</span>
            <div>
              <div className="text-[#474842]/90 text-[12px] font-bold mb-1">Late night spending is up 20%</div>
              <div className="text-[#474842]/60 text-[11px] leading-tight">
                You've spent ₹1,500 after 11PM this week. Let's pace it to stay on track for your goal.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Financial Wellness",
    anchor: "#feature-wellness",
    children: (
      <div className="mt-6 space-y-3">
        {[
          ["Stability", 78],
          ["Savings", 62],
          ["Impulse", 85],
          ["Subscriptions", 70],
        ].map(([pillar, score]) => (
          <div key={pillar} className="flex items-center gap-3">
            <span className="text-[#474842]/80 text-[11px] w-24 shrink-0 font-semibold">{pillar}</span>
            <div className="flex-1 h-[4px] bg-[#474842]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8FA876] rounded-full"
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-[#474842]/80 font-mono text-[10px] w-6 text-right font-bold">{score}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Explainable Intelligence",
    anchor: "#feature-explainability",
    children: (
      <div className="mt-6">
        <div className="bg-[#474842]/5 border border-[#474842]/8 rounded-xl p-5">
          <div className="text-center mb-4">
            <div className="text-[#474842]/50 text-[10px] font-mono tracking-widest uppercase mb-1">Suggested Savings</div>
            <div className="text-[#474842] text-2xl font-display">₹1,200</div>
          </div>
          <div className="space-y-2 border-t border-[#474842]/10 pt-4">
            <div className="text-[#474842]/50 text-[9px] font-mono tracking-widest uppercase mb-2">Why?</div>
            {[
              "Dining spending down 18%",
              "2-month compliance streak",
              "Target achievable",
            ].map((reason, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#8FA876] text-[10px] mt-[2px]">✓</span>
                <span className="text-[#474842]/70 text-[11px] font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Financial Twin",
    anchor: "#feature-twin",
    children: (
      <div className="mt-6">
        <div className="bg-[#474842]/5 border border-[#474842]/8 rounded-xl p-5">
          <div className="text-[#474842]/50 text-[10px] font-mono tracking-widest uppercase mb-4 text-center">In 12 Months</div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-[#474842]/70 text-[11px] font-semibold">Current Habits</span>
                <span className="text-[#474842]/80 text-[12px] font-bold">₹18,200 Saved</span>
              </div>
              <div className="h-1.5 w-full bg-[#474842]/10 rounded-full overflow-hidden">
                <div className="h-full w-[30%] bg-[#474842]/30 rounded-full" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-[#8FA876] text-[11px] font-bold">Adaptive Plan</span>
                <span className="text-[#8FA876] text-[12px] font-bold">₹42,600 Saved</span>
              </div>
              <div className="h-1.5 w-full bg-[#474842]/10 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-[#8FA876] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Audit Trail",
    anchor: "#feature-ledger",
    children: (
      <div className="mt-6 space-y-3">
        {[
          "Starbucks · ₹450",
          "Uber · ₹220",
          "Amazon · ₹1,299"
        ].map((txn, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex-1 bg-[#474842]/5 border border-[#474842]/10 rounded-lg p-3 shadow-sm flex justify-between items-center">
              <span className="text-[#474842]/80 text-[11px] font-medium">{txn}</span>
              <div className="flex items-center gap-1 text-[#8FA876]">
                <span className="text-[10px]">✓</span>
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold">Verified</span>
              </div>
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
    title: "Behavioral Memory",
    body: "Instead of rigid rules, FinTrac builds a living memory of your habits. Over time, it develops a personalized understanding of how you spend, making every future decision more accurate. Every time you correct a categorization, the system permanently learns your preference for that specific merchant.",
    highlight: `"FinTrac doesn't just categorize your spending. It understands your intent."`,
    metrics: [
      { label: "Learns From", value: "1,248 Transactions" },
      { label: "Accuracy", value: "97.4%" },
      { label: "Corrections Saved", value: "Forever" }
    ]
  },
  {
    id: "feature-friction",
    num: "02 / 08",
    title: "Friction Learning",
    body: "We don't believe in static budgets that break when life happens. FinTrac constantly evaluates how easily you stick to your goals. When a goal consistently creates resistance, FinTrac adapts the strategy rather than repeating the same recommendation. If you struggle to cut back on dining, the system naturally learns that this category has high friction and shifts the savings pressure to areas where you naturally spend less effort.",
    highlight: `"A financial system that bends to your lifestyle, so it never has to break."`,
    metrics: [
      { label: "Adapts", value: "Monthly" },
      { label: "Categories Tracked", value: "4" },
      { label: "Budget Resistance", value: "Measured" }
    ]
  },
  {
    id: "feature-savings",
    num: "03 / 08",
    title: "Adaptive Savings",
    body: "Hitting your savings goals shouldn't feel like a punishment. Instead of flat percentage cuts across the board, FinTrac protects the habits you love most. It intelligently routes your budget reductions toward discretionary categories where it creates the least disruption to your lifestyle, minimizing psychological resistance while still hitting your targets.",
    highlight: `"Save more money by cutting out what you don't care about, while protecting what you do."`,
    metrics: [
      { label: "Routing", value: "Dynamic" },
      { label: "Protected Categories", value: "Honored" },
      { label: "Micro-Savings", value: "Captured" }
    ]
  },
  {
    id: "feature-coaching",
    num: "04 / 08",
    title: "Behavioral Signals",
    body: "Behavioral Signals continuously watches for meaningful changes in spending patterns and highlights them before they become long-term trends. By analyzing your spending behavior, it can detect subtle shifts—like late-night impulse buys or a sudden spike in discretionary spending after payday. It delivers gentle, highly personalized nudges exactly when you need them.",
    highlight: `"Catch risky spending patterns before they turn into bad financial habits."`,
    metrics: [
      { label: "Spending Behavior", value: "Monitored" },
      { label: "Latency", value: "Real-time" },
      { label: "Nudges", value: "Personalized" }
    ]
  },
  {
    id: "feature-wellness",
    num: "05 / 08",
    title: "Financial Wellness",
    body: "Your entire financial ecosystem is distilled into a single, comprehensive health score from 0 to 100. Unlike traditional budgeting metrics, it measures behavioral consistency—not just account balances. The Wellness Score evaluates your spending stability, savings consistency, impulse control, and subscription burden, providing a true, holistic view of your financial momentum.",
    highlight: `"Stop tracking expenses. Start tracking your financial health."`,
    metrics: [
      { label: "Core Pillars", value: "4" },
      { label: "Recalculation", value: "Instant" },
      { label: "Score Range", value: "0-100" }
    ]
  },
  {
    id: "feature-explainability",
    num: "06 / 08",
    title: "Explainable Intelligence",
    body: "Financial advice should never feel like a black box. Every insight, alert, and budget recommendation FinTrac makes comes with complete transparency. You can click on any piece of advice to see exactly why it was suggested—from your recent spending streaks to the specific habit shifts that triggered the alert.",
    highlight: `"Every recommendation is fully transparent, verifiable, and personalized to your data."`,
    metrics: [
      { label: "Transparency", value: "100%" },
      { label: "Trust", value: "Verifiable" },
      { label: "Attribution", value: "Clear" }
    ]
  },
  {
    id: "feature-twin",
    num: "07 / 08",
    title: "Financial Twin",
    body: "The Financial Twin creates a behavioral simulation of your financial future. It doesn't simply project balances—it models how your spending habits evolve over time and shows how small behavioral changes compound into different outcomes. By projecting two parallel realities—current habits vs. the adaptive plan—you can visually see the long-term compounding impact of your daily decisions.",
    highlight: `"See where your current habits lead—and how small changes can completely alter the outcome."`,
    metrics: [
      { label: "Projection", value: "12 Months" },
      { label: "Future Paths", value: "2" },
      { label: "Simulation", value: "Behavior-Aware" }
    ]
  },
  {
    id: "feature-ledger",
    num: "08 / 08",
    title: "Audit Trail",
    body: "Every transaction is permanently recorded and traceable, creating a trusted history of your financial activity. Your financial history remains intact, traceable, and verifiable—giving you complete confidence in every record.",
    highlight: `"Bank-grade integrity and transparency."`,
    metrics: [
      { label: "Integrity", value: "Bank-Grade" },
      { label: "Records", value: "Immutable" },
      { label: "History", value: "Verifiable" }
    ]
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
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const rawProgress = (window.scrollY - sectionTop) / sectionHeight;
      const progress = Math.min(1, Math.max(0, rawProgress));

      setScrollProgress(progress);
      setScrollYPos(window.scrollY);

      // Determine active card by exact distance to screen center
      let closestCard = -1;
      let minDistance = Infinity;
      const centerY = window.innerHeight / 2;
      
      cards.forEach((_, i) => {
        const el = document.getElementById(`card-wrapper-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - centerY);
          if (distance < minDistance) {
            minDistance = distance;
            closestCard = i;
          }
        }
      });
      
      if (closestCard !== -1) {
        setActiveCard(closestCard);
      }
    };

    const loop = () => {
      handleScroll();
      requestAnimationFrame(loop);
    };

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
            { label: 'Memory', ariaLabel: 'Behavioral Memory', link: '#feature-classifier' },
            { label: 'Learning', ariaLabel: 'Friction Learning', link: '#feature-friction' },
            { label: 'Savings', ariaLabel: 'Adaptive Savings', link: '#feature-savings' },
            { label: 'Signals', ariaLabel: 'Behavioral Signals', link: '#feature-coaching' },
            { label: 'Wellness', ariaLabel: 'Financial Wellness', link: '#feature-wellness' },
            { label: 'Explainable', ariaLabel: 'Explainable Intelligence', link: '#feature-explainability' },
            { label: 'Twin', ariaLabel: 'Financial Twin', link: '#feature-twin' },
            { label: 'Audit', ariaLabel: 'Audit Trail', link: '#feature-ledger' }
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
            className="absolute flex flex-col items-start text-left top-[12vh] md:top-[18vh] left-[5vw] z-10 w-[90vw] md:w-auto"
          >
            <WaterRevealText
              text="Learns your habits."
              as="h1"
              className="text-[clamp(24px,3vw,46px)] font-bold text-[#474842] tracking-[-0.04em] font-display leading-[1.1]"
              delay={0.3}
            />
            <WaterRevealText
              text="Adapts your finances."
              as="h2"
              className="text-[clamp(18px,2.2vw,32px)] font-bold text-[#474842] tracking-[-0.02em] font-display leading-[1.2] mt-1"
              delay={0.6}
            />
            <WaterRevealText
              text="Explains every decision."
              as="h2"
              className="text-[clamp(18px,2.2vw,32px)] font-bold text-[#474842] tracking-[-0.02em] font-display leading-[1.2]"
              delay={0.9}
            />
          </div>

          {/* Descriptor */}
          <p
            className="absolute text-[13px] md:text-[14px] bottom-[16vh] top-auto md:top-[20vh] md:bottom-auto left-[5vw] md:left-auto md:right-[5vw] w-[85vw] md:max-w-[280px]"
            style={{ color: "rgba(20,20,20,0.45)" }}
          >
            FinTrac doesn't apply rules to your spending.<br className="hidden md:block" />
            It builds a behavioral model of how you actually<br className="hidden md:block" />
            spend — then quietly adapts it every month.
          </p>

          {/* Chapter preview label */}
          <div
            className="hidden md:block absolute font-mono text-[11px] uppercase"
            style={{ bottom: "8vh", left: "5vw", letterSpacing: "0.2em", color: "rgba(20,20,20,0.35)" }}
          >
            01 / 08 · Behavioral Memory
          </div>

          {/* Scroll indicator */}
          <div
            className="hidden md:block absolute font-mono text-[11px] animate-oscillate transition-opacity duration-300"
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
            className="absolute z-10 pointer-events-auto mix-blend-multiply scale-75 md:scale-100 translate-y-[15vh] md:translate-y-[1vh] transition-all duration-300"
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

        {/* LAYER 3 — CARD COLUMN (Mobile Vertical Snap / Desktop Normal Stack) */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: "-100vh",
            paddingTop: "100vh",
            paddingBottom: "20vh",
          }}
          className="flex flex-col items-center max-w-[2000px] mx-auto w-full px-4 lg:px-4 snap-y snap-mandatory md:snap-none"
        >
          {cards.map((card, i) => (
            <div 
              id={`card-wrapper-${i}`} 
              key={card.anchor} 
              className="w-full shrink-0 snap-center flex flex-col items-center justify-center h-[100svh] md:h-auto py-10 md:py-0" 
              style={{ minHeight: isDesktop ? `${CARD_SPACING_VH}vh` : 'auto' }}
            >
              <CardWrapper
                isActive={i === activeCard}
                isPast={i < activeCard}
              >
                <EditorialCard
                  title={card.title}
                  side={i % 2 === 0 ? "left" : "right"}
                  align={isDesktop ? (i % 2 === 0 ? "up" : "down") : "up"}
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
            className="flex flex-col justify-center mx-auto relative z-20 w-[92vw] sm:w-[85vw] max-w-[860px] p-8 sm:p-16 mb-16 sm:mb-20"
            style={{
              minHeight: "100vh",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: "0 24px 64px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
              borderRadius: "32px",
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
              </div>
            )}

            {section.metrics && (
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 border-t border-white/10 pt-8 mb-8">
                {section.metrics.map((metric, i) => (
                  <div key={i} className="flex-1">
                    <div className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-1">{metric.label}</div>
                    <div className="text-white/90 font-semibold text-lg">{metric.value}</div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="self-start mt-4 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase font-mono"
            >
              <span>←</span> Back to features
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
