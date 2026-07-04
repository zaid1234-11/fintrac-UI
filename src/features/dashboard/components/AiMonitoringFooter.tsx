import React from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle2 } from 'lucide-react';

export function AiMonitoringFooter() {
  const watching = [
    'Subscriptions',
    'Dining',
    'Emergency Fund'
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fintrac-light-card flex flex-col gap-4 w-full p-10 md:p-14 group rounded-[32px] overflow-hidden transition-all hover:brightness-105 mt-8 md:mt-12 mb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/80 to-white/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000">
         <div className="w-32 h-32 rounded-full blur-[60px] bg-blue-500" />
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
        <span className="text-label-small uppercase tracking-widest text-[#2A2E06]/80 font-semibold">FinTrac is quietly watching your finances.</span>
      </div>
      
      <div className="relative z-10 hero-content flex flex-col gap-6">
        <div className="text-lg font-lexend text-[#2A2E06]/80 tracking-wide font-medium">
          Watching subscriptions, dining and savings.
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#2A2E06]/10">
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-gradient-olive">
            You're on track. <br />
            <span className="text-[#2A2E06]/60 text-xl md:text-2xl mt-2 inline-block font-geist font-medium">We'll let you know when a better opportunity appears.</span>
          </h2>
        </div>
      </div>
    </motion.section>
  );
}
