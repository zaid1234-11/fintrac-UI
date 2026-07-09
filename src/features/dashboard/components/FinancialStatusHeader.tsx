import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'framer-motion';
import { DashboardState } from '../types/dashboardTypes';

export function FinancialStatusHeader({ state }: { state: DashboardState }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controls = animate(count, state.healthScore, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [state.healthScore, count]);

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div ref={cardRef} className="goal-liquid-glass flex flex-col gap-4 w-full p-10 md:p-14 group overflow-hidden transition-all">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000">
           <div className={`w-32 h-32 rounded-full blur-[60px] ${state.trend === 'improving' ? 'bg-emerald-500' : state.trend === 'declining' ? 'bg-red-500' : 'bg-amber-500'}`} />
        </div>

        <div className="flex flex-col relative z-10">
          <span className="text-[0.65rem] font-lexend uppercase tracking-widest text-white/50 font-semibold mb-6">Financial State</span>
        </div>
        
        <div className="relative z-10 hero-content">
          <div className="text-[0.75rem] font-lexend text-white/50 mb-3">
            Good evening, Zaid
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight max-w-4xl text-white leading-tight">
            You're having a strong financial month. <br />
            <span className="text-white/60 text-2xl md:text-3xl mt-2 inline-block font-geist font-medium">Everything looks healthy today.</span>
          </h1>
          
          <div className="flex items-center gap-12 mt-10">
            <div className="flex flex-col">
               <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50 mb-3">Health Score</span>
               <div className="flex items-baseline gap-2">
                 <motion.span className="text-3xl font-display text-white leading-none">{rounded}</motion.span>
               </div>
               <div className="flex items-center gap-3 mt-2">
                 <span className="text-sm font-medium text-emerald-400">Excellent</span>
                 <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                   ↑ {state.trend} this month
                 </span>
               </div>
            </div>
            
            <div className="w-px h-12 bg-white/10" />
            
            <div className="flex flex-col">
               <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50 mb-3">Net Cash Flow</span>
               <span className={`text-3xl font-display leading-none ${state.netCashFlow >= 0 ? 'text-emerald-400' : 'text-white'}`}>
                 {state.netCashFlow >= 0 ? '+' : '-'}₹{Math.abs(state.netCashFlow).toLocaleString()}
               </span>
               <div className="mt-2 text-sm font-medium text-white/60">
                 Healthy surplus
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
