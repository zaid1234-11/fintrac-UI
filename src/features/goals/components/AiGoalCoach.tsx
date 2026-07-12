import React, { useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export function AiGoalCoach() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);

  return (
    <m.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative"
    >
      <div className="flex items-center gap-3 mb-6 ml-2">
        <Sparkles className="w-5 h-5 text-white opacity-80" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">AI Goal Coach</h2>
      </div>

      <div ref={cardRef} className="goal-liquid-glass p-10 relative z-10 flex flex-col gap-10">

        {/* 1. Since your last change */}
        <div className="flex flex-col gap-2 pb-8 border-b border-white/10">
          <span className="text-xs text-white/50 uppercase tracking-wider font-lexend">Since your last change</span>
          <p className="text-lg font-lexend text-white/80 leading-relaxed max-w-2xl">
            Last week you increased your Emergency Fund contribution by ₹1,000. That moved your goal <strong className="font-semibold text-emerald-400">18 days earlier</strong>.
          </p>
        </div>

        {/* 2. Why & 3. Best Opportunity */}
        <div className="flex flex-col gap-2 pb-8 border-b border-white/10">
          <span className="text-xs text-white/50 uppercase tracking-wider font-lexend">Best Opportunity Today</span>
          <p className="text-lg font-lexend text-white/80 leading-relaxed max-w-2xl">
            Your dining out spending has dropped 15% this month. You have a window to accelerate your <strong className="font-semibold text-emerald-400">New Laptop</strong> goal before the holiday price hikes.
          </p>
        </div>

        {/* 4. Tradeoffs */}
        <div className="flex flex-col gap-4 pb-8 border-b border-white/10">
          <span className="text-xs text-white/50 uppercase tracking-wider font-lexend">The Tradeoff</span>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 max-w-xl">
            <div className="flex items-center justify-between">
              <span className="font-medium text-white">Increase Laptop +₹2,000</span>
              <span className="text-sm text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">Arrives 4 weeks sooner</span>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="font-medium text-white/70">Decrease Vacation -₹2,000</span>
              <span className="text-sm text-red-400 font-medium bg-red-500/10 px-2 py-0.5 rounded-full">Delayed 2 weeks</span>
            </div>
          </div>
        </div>

        {/* 5. Recommendation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 border border-white/10 text-white p-8 rounded-3xl">
          <div className="flex flex-col gap-2 max-w-lg">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-xs">Recommendation</span>
            <p className="text-xl font-display leading-tight">
              Shift ₹2,000 from Vacation to Laptop to guarantee your upgrade by November.
            </p>
          </div>
          <button className="whitespace-nowrap flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#2A2E06] rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Accept Change
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </m.section>
  );
}
