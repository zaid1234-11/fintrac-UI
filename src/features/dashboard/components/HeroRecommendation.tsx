import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecommendationObject, ForecastObject } from '../types/dashboardTypes';
import { Target, Zap, Clock, ShieldCheck, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

export function HeroRecommendation({ recommendation, forecast }: { recommendation: RecommendationObject | null, forecast?: ForecastObject | null }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
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
        <Zap className="w-5 h-5 text-[#0c1519] drop-shadow-[0_0_8px_rgba(12,21,25,0.5)]" />
        <h2 className="text-label-small !text-[#0c1519]">Your biggest opportunity</h2>
      </div>

      <div className="relative w-full">
        {/* Environmental Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(84,124,89,0.15)_0%,transparent_70%)] blur-[120px] pointer-events-none -z-10" />
        
        <div
          className="fintrac-light-card w-full p-8 md:p-10 flex flex-col items-start text-left group transition-all hover:brightness-105 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/80 to-white/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none z-0" />
          
          <div className="absolute top-0 right-0 p-10 pointer-events-none flex items-center justify-center -translate-y-20 translate-x-20">
            <Target className="w-[400px] h-[400px] text-[#2A2E06] opacity-[0.03] mix-blend-multiply rotate-12" />
            <div className="absolute w-[400px] h-[400px] rounded-full mix-blend-screen opacity-30 animate-[spin_18s_linear_infinite]"
                 style={{ background: 'conic-gradient(from 90deg at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.8) 100%)' }} />
          </div>

          <div className="relative z-10 w-full max-w-5xl">
            <div className="hero-content mt-2">
              <h3 className="text-hero-gradient font-display mb-4 tracking-tight" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>
                Reduce food delivery
              </h3>
              
              <p className="text-base md:text-lg text-[#2A2E06] mb-8 max-w-2xl leading-relaxed font-medium">
                This single change moves your Emergency Fund from February to October.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-8">
              {true && (
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-label-small mb-1">Emergency Fund</div>
                    <div className="text-primary-olive text-lg tracking-wide"><span className="metric-glow font-bold">4 months</span> sooner</div>
                  </div>
                </div>
              )}
              
              <div className="hidden sm:block w-px h-12 bg-[#2A2E06]/10" />

              <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)]">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-label-small mb-1">AI Confidence</div>
                    <div className="flex items-center gap-2">
                      <div className="text-primary-olive text-lg tracking-wide"><span className="metric-glow font-bold">88%</span></div>
                      <div className="text-[0.65rem] text-[#2A2E06]/50 max-w-[120px] leading-tight">Based on the last 90 days of your spending.</div>
                    </div>
                  </div>
              </div>
            </div>

            {/* Unified Timeline Block */}
            {timelineData && (
              <div className="mt-8 pt-8 border-t border-[#2A2E06]/10 w-full">
                <h4 className="text-label-small mb-8 text-[#2A2E06]/60 font-lexend uppercase tracking-widest">
                  Your future changes
                </h4>
                
                <div className="w-full flex flex-col gap-6 font-geist mb-10 max-w-3xl">
                  {/* Current Path */}
                  <div className="flex items-center justify-between text-[#2A2E06]/80 text-lg font-medium">
                    <span className="w-32 text-sm text-[#2A2E06]/60">Current</span>
                    <div className="flex-1 flex items-center px-4">
                      <div className="h-px bg-[#2A2E06]/20 flex-1" />
                      <div className="w-2 h-2 rounded-full bg-[#2A2E06]/40" />
                    </div>
                    <span className="w-32 text-right">{formatDate(timelineData.baseline_completion_date)}</span>
                  </div>

                  {/* Recommended Path */}
                  <div className="flex items-center justify-between text-primary-olive text-xl font-semibold mt-2">
                    <span className="w-32 text-sm font-medium">Recommended</span>
                    <div className="flex-1 flex items-center px-4">
                      <div className="h-[2px] bg-[#2A2E06] flex-1" />
                      <div className="w-3 h-3 rounded-full bg-[#2A2E06]" />
                      <div className="flex-1" />
                    </div>
                    <span className="w-32 text-right metric-glow">{formatDate(timelineData.projected_completion_date)}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 text-[#2A2E06] text-sm font-medium font-lexend tracking-wide">
                    {Math.floor(timelineData.time_saved_days / 30)} months recovered
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="px-8 py-3 rounded-full bg-[#6E8154] text-white text-base font-medium tracking-wide hover:bg-[#5a6b44] hover:scale-[1.02] transition-all active:scale-95 shadow-[0_0_24px_rgba(130,160,90,0.3)] border border-[#82a05a]/30">
                      Apply Recommendation
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-[#2A2E06]/70 hover:text-[#2A2E06]/90 transition-colors text-sm font-medium mt-8 tracking-wide font-lexend uppercase"
            >
              Why this recommendation?
              <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden text-left"
                >
                  <div className="p-8 rounded-3xl bg-[#2A2E06]/[0.03] border border-[#2A2E06]/[0.05] grid grid-cols-1 md:grid-cols-2 gap-10 backdrop-blur-md">
                    <div>
                      <h4 className="text-label-small mb-5">Why this recommendation</h4>
                      <div className="space-y-6">
                        <p className="text-[#2A2E06] text-base leading-relaxed font-medium">
                          Food delivery has become one of your fastest growing expenses.
                        </p>
                        <p className="text-[#2A2E06] text-base leading-relaxed font-medium">
                          Reducing it by ₹700/month won't affect essential spending.
                        </p>
                        <p className="text-[#2A2E06] text-base leading-relaxed font-medium">
                          You're very likely to maintain this habit based on the last 90 days.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-label-small mb-5">Evidence</h4>
                      <div className="space-y-3">
                        <div className="flex items-start justify-between py-2 border-b border-[#2A2E06]/10 last:border-0">
                          <div>
                            <div className="text-[#2A2E06] text-base tracking-wide font-medium mb-1">Swiggy</div>
                            <div className="text-label-small text-xs opacity-70">18 orders this month</div>
                          </div>
                          <span className="text-primary-olive text-base font-semibold">₹2,430</span>
                        </div>
                        <div className="flex items-start justify-between py-2 border-b border-[#2A2E06]/10 last:border-0">
                          <div>
                            <div className="text-[#2A2E06] text-base tracking-wide font-medium mb-1">Zomato</div>
                            <div className="text-label-small text-xs opacity-70">12 orders this month</div>
                          </div>
                          <span className="text-primary-olive text-base font-semibold">₹1,820</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
