import React from 'react';
import { motion } from 'framer-motion';
import { ForecastObject } from '../types/dashboardTypes';
import { LineChart, ArrowRight } from 'lucide-react';

export function FutureOutlook({ forecast }: { forecast: ForecastObject | null }) {
  if (!forecast) return null;

  // For this component, we visualize the first goal's forecast data
  const goalId = forecast.goal_ids[0];
  const data = forecast.outputs.goals[goalId];
  if (!data) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 w-full"
    >
      <div className="flex items-center gap-3 mb-6 pl-2">
        <LineChart className="w-5 h-5 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        <h2 className="text-label-small">Future Outlook</h2>
      </div>

      <div className="fintrac-light-card p-8 md:p-10 rounded-[32px] relative overflow-hidden group transition-all hover:brightness-105">
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/80 to-white/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/15 transition-colors duration-700 pointer-events-none" />
        
        <div className="mb-10 max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-display text-gradient-olive mb-3">{forecast.scenario_label}</h3>
          <p className="text-[#2A2E06]/80 text-lg font-geist leading-relaxed">Comparing your current trajectory vs. optimized path</p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 p-2 rounded-[24px] bg-white/50 border border-[#2A2E06]/[0.05]">
          <div className="flex-1 text-center md:text-left w-full p-6 rounded-xl bg-white/50 border border-[#2A2E06]/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="text-label-small mb-2">Current Path</div>
            <div className="text-3xl font-display text-[#2A2E06]">{formatDate(data.baseline_completion_date)}</div>
          </div>

          <div className="flex items-center justify-center -my-3 md:my-0 md:-mx-4 z-10">
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg"
              style={{ background: 'rgba(255,255,255,.22)', backdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,.3)' }}
            >
              <ArrowRight className="w-5 h-5 text-[#2A2E06]/70 rotate-90 md:rotate-0" />
            </div>
          </div>

          <div 
            className="flex-1 text-center md:text-right w-full p-6 rounded-xl relative overflow-hidden shadow-[0_4px_20px_rgba(84,124,89,0.15)]"
            style={{ background: 'linear-gradient(180deg, rgba(111,142,108,.18), rgba(84,124,89,.10))', border: '1px solid rgba(84,124,89,.35)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#547C59]/0 via-[#547C59]/10 to-[#547C59]/0 translate-x-[-100%] animate-[shimmer_2.5s_infinite]" />
            <div className="relative z-10">
              <div className="text-label-small mb-2" style={{ color: '#3D6545' }}>Optimized Path</div>
              <div className="text-4xl font-display metric-glow" style={{ color: '#3D6545' }}>{formatDate(data.projected_completion_date)}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#2A2E06]/10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#547C59]/10 text-positive text-sm font-medium border border-[#547C59]/20 font-lexend tracking-wide metric-glow">
            <span className="w-2 h-2 rounded-full bg-[#547C59] animate-pulse" />
            You save {Math.floor(data.time_saved_days / 30)} months
          </div>
          <button className="text-sm font-medium text-[#2A2E06]/80 hover:text-[#2A2E06] transition-colors flex items-center gap-1 font-lexend uppercase tracking-wide">
            Explore Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
