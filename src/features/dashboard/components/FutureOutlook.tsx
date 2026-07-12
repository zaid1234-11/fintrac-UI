import React, { useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { ForecastObject } from '../types/dashboardTypes';
import { LineChart, ArrowRight } from 'lucide-react';

export function FutureOutlook({ forecast }: { forecast: ForecastObject | null }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);

  if (!forecast) return null;

  const goalId = forecast.goal_ids[0];
  const data = forecast.outputs.goals[goalId];
  if (!data) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <m.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 w-full"
    >
      <div className="flex items-center gap-3 mb-6 pl-2">
        <LineChart className="w-5 h-5 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Future Outlook</h2>
      </div>

      <div ref={cardRef} className="goal-liquid-glass p-8 md:p-10 relative overflow-hidden group transition-all">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/15 transition-colors duration-700 pointer-events-none" />
        
        <div className="mb-10 max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-display text-white mb-3">{forecast.scenario_label}</h3>
          <p className="text-white/70 text-lg font-geist leading-relaxed">Comparing your current trajectory vs. optimized path</p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 p-2 rounded-[24px] bg-white/5 border border-white/10">
          <div className="flex-1 text-center md:text-left w-full p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50 mb-2">Current Path</div>
            <div className="text-3xl font-display text-white">{formatDate(data.baseline_completion_date)}</div>
          </div>

          <div className="flex items-center justify-center -my-3 md:my-0 md:-mx-4 z-10">
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/10 backdrop-blur-xl border border-white/20"
            >
              <ArrowRight className="w-5 h-5 text-white/70 rotate-90 md:rotate-0" />
            </div>
          </div>

          <div 
            className="flex-1 text-center md:text-right w-full p-6 rounded-xl relative overflow-hidden shadow-[0_4px_20px_rgba(16,185,129,0.15)] bg-emerald-500/10 border border-emerald-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] animate-[shimmer_2.5s_infinite]" />
            <div className="relative z-10">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/80 mb-2">Optimized Path</div>
              <div className="text-4xl font-display text-emerald-400">{formatDate(data.projected_completion_date)}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 font-lexend tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            You save {Math.floor(data.time_saved_days / 30)} months
          </div>
          <button className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-1 font-lexend uppercase tracking-wide">
            Explore Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </m.section>
  );
}
