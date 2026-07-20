import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { RecommendationObject, ForecastObject } from '../types/dashboardTypes';
import { Target, Zap, Clock, ShieldCheck, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

export function HeroRecommendation({ recommendation, forecast }: { recommendation: RecommendationObject | null, forecast?: ForecastObject | null }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);
  
  if (!recommendation) return null;

  // Timeline Data
  const goalId = forecast?.goal_ids[0];
  const timelineData = goalId && forecast?.outputs.goals[goalId] ? forecast.outputs.goals[goalId] : null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Estimating...';
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section className="mb-12 w-full">
      <div className="flex items-center gap-3 mb-6 pl-2">
        <Zap className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Your biggest opportunity</h2>
      </div>

      <div className="relative w-full">
        <div
          ref={cardRef}
          className="goal-liquid-glass w-full p-8 md:p-10 flex flex-col items-start text-left group transition-all overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 pointer-events-none flex items-center justify-center -translate-y-20 translate-x-20">
            <Target className="w-[400px] h-[400px] text-white opacity-[0.03] mix-blend-overlay rotate-12" />
            <div className="absolute w-[400px] h-[400px] rounded-full mix-blend-screen opacity-10 animate-[spin_18s_linear_infinite]"
                 style={{ background: 'conic-gradient(from 90deg at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.8) 100%)' }} />
          </div>

          <div className="relative z-10 w-full max-w-5xl">
            <div className="hero-content mt-2">
              <h3 className="text-white font-display mb-4 tracking-tight" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>
                Reduce food delivery
              </h3>
              
              <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl leading-relaxed font-medium">
                This single change moves your Emergency Fund from February to October.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-1.5 transition-colors hover:bg-white/10">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold uppercase tracking-[0.22em]">Effort</span>
                  </div>
                  <span className="text-xl font-display text-white">Low</span>
                  <span className="text-sm font-medium text-emerald-400">Cancel 1 subscription</span>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-1.5 transition-colors hover:bg-white/10">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-semibold uppercase tracking-[0.22em]">Time Saved</span>
                  </div>
                  <span className="text-xl font-display text-white">4 Months</span>
                  <span className="text-sm font-medium text-white/60">Hits goal by October</span>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-1.5 transition-colors hover:bg-white/10">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold uppercase tracking-[0.22em]">Impact</span>
                  </div>
                  <span className="text-xl font-display text-white">+₹2,400/mo</span>
                  <span className="text-sm font-medium text-white/60">Compound growth</span>
                </div>
              </div>

              {/* Timeline Visualization - Integrated seamlessly */}
              {timelineData && (
                <div className="mt-8 mb-10 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
                    {/* Progress Bar Track */}
                    <div className="absolute left-4 md:left-0 top-[28px] md:top-auto md:bottom-8 w-1 h-[calc(100%-56px)] md:w-full md:h-1 bg-white/10 rounded-full" />
                    
                    {/* Active Progress */}
                    <div className="absolute left-4 md:left-0 top-[28px] md:top-auto md:bottom-8 w-1 md:h-1 bg-gradient-to-b md:bg-gradient-to-r from-emerald-500/50 to-emerald-400 rounded-full" style={{ height: '70%', width: '70%' }} />

                    {/* Nodes */}
                    <div className="relative z-10 flex flex-row md:flex-col items-center gap-4 w-full md:w-auto pl-10 md:pl-0">
                      <div className="absolute left-[-24px] md:left-auto md:bottom-[-20px] w-3 h-3 bg-white rounded-full ring-4 ring-[#2A2E06]" />
                      <div className="flex flex-col items-start md:items-center">
                        <span className="text-sm font-bold text-white mb-1">Today</span>
                        <span className="text-xs text-white/50 font-lexend tracking-wider">Active</span>
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-row md:flex-col items-center gap-4 w-full md:w-auto pl-10 md:pl-0 opacity-50">
                      <div className="absolute left-[-24px] md:left-auto md:bottom-[-20px] w-3 h-3 bg-white/20 rounded-full ring-4 ring-[#2A2E06]" />
                      <div className="flex flex-col items-start md:items-center">
                        <span className="text-sm font-bold text-white mb-1">{formatDate(timelineData.baseline_completion_date)}</span>
                        <span className="text-xs text-white/50 font-lexend tracking-wider">Current Path</span>
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-row md:flex-col items-center gap-4 w-full md:w-auto pl-10 md:pl-0">
                      <div className="absolute left-[-28px] md:left-auto md:bottom-[-24px] w-5 h-5 bg-emerald-400 rounded-full ring-4 ring-[#2A2E06] flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                        <Zap className="w-3 h-3 text-[#2A2E06]" />
                      </div>
                      <div className="flex flex-col items-start md:items-end">
                        <span className="text-sm font-bold text-emerald-400 mb-1">{formatDate(timelineData.projected_completion_date)}</span>
                        <span className="text-xs text-emerald-400/80 font-lexend tracking-wider">With Recommendation</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Accept Suggestion
                </button>
                <button className="px-8 py-3.5 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
                  Remind Me Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
