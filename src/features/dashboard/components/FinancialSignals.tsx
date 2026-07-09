import React from 'react';
import { motion } from 'framer-motion';
import { RecommendationObject } from '../types/dashboardTypes';
import { Activity, AlertTriangle, TrendingUp, Info } from 'lucide-react';

export function FinancialSignals({ signals }: { signals: RecommendationObject[] }) {
  if (!signals || signals.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'important': return <TrendingUp className="w-5 h-5 text-amber-400" />;
      default: return <Info className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <div className="flex items-center gap-2 mb-4 px-2">
        <Activity className="w-5 h-5 text-emerald-400" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Financial Signals</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals.map((signal, i) => (
          <motion.div
            key={signal.recommendation_id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
            whileHover={{ y: -4 }}
            className="goal-liquid-glass p-6 transition-all overflow-hidden"
          >
            <div className="flex items-start gap-3 mb-3 relative z-10">
              <div className="mt-1">{getIcon(signal.type)}</div>
              <div>
                <h3 className="text-white mb-1 text-lg leading-tight font-medium">{signal.title}</h3>
                <p className="text-white/60 text-sm">{signal.subtitle}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
              <p className="text-white/50 text-xs">{signal.reason}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
