import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle2 } from 'lucide-react';

export function AiMonitoringFooter() {
  const watching = [
    'Subscriptions',
    'Dining',
    'Emergency Fund'
  ];

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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div ref={cardRef} className="goal-liquid-glass flex flex-col gap-4 w-full p-10 md:p-14 group overflow-hidden transition-all mt-8 md:mt-12 mb-8">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000">
           <div className="w-32 h-32 rounded-full blur-[60px] bg-blue-500" />
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)] animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">FinTrac is quietly watching your finances.</span>
        </div>
        
        <div className="relative z-10 hero-content flex flex-col gap-6">
          <div className="text-lg font-lexend text-white/80 tracking-wide font-medium">
            Watching subscriptions, dining and savings.
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-white">
              You're on track. <br />
              <span className="text-white/60 text-xl md:text-2xl mt-2 inline-block font-geist font-medium">We'll let you know when a better opportunity appears.</span>
            </h2>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
