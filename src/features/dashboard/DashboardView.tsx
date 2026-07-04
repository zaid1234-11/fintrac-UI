'use client';

import React from 'react';
import { useDashboard } from './hooks/useDashboard';
import { DashboardSkeletons } from './components/DashboardSkeletons';
import { DashboardSidebar } from './components/DashboardSidebar';
import { DashboardVideoBackground } from './components/DashboardVideoBackground';
import { FinancialStatusHeader } from './components/FinancialStatusHeader';
import { HeroRecommendation } from './components/HeroRecommendation';
import { FutureOutlook } from './components/FutureOutlook';
import { GoalSnapshot } from './components/GoalSnapshot';
import { FinancialSignals } from './components/FinancialSignals';
import { RecentDecisions } from './components/RecentDecisions';
import { RecentProgress } from './components/RecentProgress';
import { AiMonitoringFooter } from './components/AiMonitoringFooter';
import { Activity } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionTemplate, useVelocity, useSpring } from 'framer-motion';

export function DashboardView() {
  const { data, isLoading, error } = useDashboard();
  const { dashboardState, heroRecommendation, primaryForecast, goals, signals } = data || {};

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const parallaxHero = useTransform(scrollY, [0, 1000], [0, -60]);
  const parallaxForecast = useTransform(scrollY, [0, 1000], [0, -30]);
  
  // Scroll interpolation (Velocity-based environmental effects)
  const glassReflectionShift = useTransform(smoothVelocity, [-1000, 0, 1000], [-10, 0, 10]);

  if (isLoading) {
    return <DashboardSkeletons />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center p-8">
        <div className="max-w-md w-full p-8 rounded-3xl bg-red-500/10 border border-red-500/20 text-center">
          <Activity className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-display text-black mb-2">Failed to load Command Center</h2>
          <p className="text-black/60 mb-6">We couldn't connect to the financial intelligence engine.</p>
          <button className="px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-transparent overflow-hidden selection:bg-emerald-500/20 selection:text-white">
      {/* Layer 1: Cinematic Ambient Background (Simulating a physical space for refraction) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Scroll-Linked Video Background */}
        <DashboardVideoBackground />



        {/* Atmospheric Mist Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.18), transparent 30%, rgba(28,35,24,.18) 100%)' }}
        />

        {/* Cinematic Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.12))' }}
        />
        
      </div>
        
      {/* Layer 3: The Main Glass Canvas */}
      <main className="relative z-10 min-h-screen p-4 md:p-8 block">
        {/* We keep this subtle shadow behind the card for readability but reduce to .08 since we added atmospheric mist */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ background: 'radial-gradient(ellipse at center, rgba(36,44,30,.08), rgba(36,44,30,0) 70%)' }}
        />
        
        <div 
          className="mx-auto fintrac-glass-card w-full max-w-[1600px] h-full min-h-[calc(100vh-64px)] rounded-[40px] flex flex-col p-8 md:p-12 relative"
        >
            
            {/* Edge highlights simulating physical glass thickness */}
            <div className="absolute inset-0 rounded-[40px] pointer-events-none shadow-[inset_0_1px_20px_rgba(255,255,255,0.05)] z-0" />

            {/* Canvas Content */}
            <div className="relative z-10 flex flex-col gap-12 w-full h-full max-w-7xl mx-auto">
              
              {/* Context Engine: Top Row */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="flex justify-between items-start w-full"
              >
                {dashboardState && <FinancialStatusHeader state={dashboardState} />}
              </motion.div>

              {/* Action Engine: Hero Module & Forecast & Goals */}
              <div className="flex-1 w-full flex flex-col justify-start mt-8 relative">
                
                {/* The Narrative Thread */}
                <div className="absolute left-[28px] top-6 bottom-12 w-px bg-gradient-to-b from-[#2A2E06]/0 via-[#2A2E06]/10 to-[#2A2E06]/0 z-0 pointer-events-none" />

                <div className="flex flex-col gap-10 pl-[64px] relative z-10 w-full">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative"
                  >
                    <div className="absolute -left-[40px] top-7 w-2 h-2 rounded-full bg-[#2A2E06]/40 shadow-[0_0_8px_rgba(42,46,6,0.3)] ring-4 ring-white/50" />
                    <HeroRecommendation recommendation={heroRecommendation} forecast={primaryForecast} />
                  </motion.div>
                  
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className="relative">
                    <div className="absolute -left-[40px] top-8 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] ring-4 ring-white/50" />
                    <GoalSnapshot goals={goals} />
                  </motion.div>
                  
                  {signals && signals.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
                      className="relative"
                    >
                      <div className="absolute -left-[40px] top-8 w-2 h-2 rounded-full bg-[#2A2E06]/40 shadow-[0_0_8px_rgba(42,46,6,0.3)] ring-4 ring-white/50" />
                      <FinancialSignals signals={signals} />
                    </motion.div>
                  )}
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.75 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
                  >
                    <div className="absolute -left-[40px] top-8 w-2 h-2 rounded-full bg-[#547C59] shadow-[0_0_8px_rgba(84,124,89,0.5)] ring-4 ring-white/50" />
                    <RecentDecisions />
                    <RecentProgress />
                  </motion.div>
                </div>
              </div>

              <AiMonitoringFooter />
            </div>
        </div>
      </main>
    </div>
  );
}
