"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import ParallaxScene from "@/components/Hero/ParallaxScene";
import FogLayer from "@/components/Hero/FogLayer";
import WaterRevealText from "@/components/Hero/WaterRevealText";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[100vh] min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background */}
      <ParallaxScene />

      {/* Fog Overlay */}
      <FogLayer />

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(16,32,42,0.2) 0%, rgba(16,32,42,0.5) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <m.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-30 text-center px-6 max-w-4xl mx-auto"
      >
        <WaterRevealText
          text="Some habits take time."
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.1] tracking-tight font-[family-name:var(--font-display)]"
          delay={0.3}
        />
        <WaterRevealText
          text="Your budget should know that."
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight font-[family-name:var(--font-display)]"
          delay={0.8}
        />

        {/* Subheadline */}
        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-[family-name:var(--font-body)]"
        >
          FinTrac routes budget adjustments where they create the least
          behavioral resistance, adapting over time instead of forcing change all
          at once.
        </m.p>

        {/* CTAs */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="cta-see-flow"
            className="px-8 py-4 bg-amber text-shadow font-semibold rounded-full text-base cursor-pointer
              hover:bg-amber-light hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-300 shadow-lg shadow-amber/25"
          >
            See Your Financial Flow
          </button>
          <a
            href="#behavior"
            id="cta-how-it-works"
            className="px-8 py-4 border border-white/30 text-white font-medium rounded-full text-base cursor-pointer
              hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
            How It Works
          </a>
        </m.div>
      </m.div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase font-[family-name:var(--font-body)]">
          Scroll
        </span>
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </m.div>
      </m.div>
    </section>
  );
}
