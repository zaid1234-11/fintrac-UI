'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Clock, ShieldCheck } from 'lucide-react';
import { useForecastEngine } from '../hooks/useForecastEngine';
import { formatINR } from '@/lib/formatINR';

export function ForecastSidebar() {
  const { overallConfidence, totalTimeSaved, projectedSavings } = useForecastEngine();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 fintrac-dark-glass-card p-6 border border-white/10"
    >
      <div>
        <h1 className="font-display text-xl mb-1 text-white">Forecast Engine</h1>
        <p className="text-xs font-lexend text-white/60">What happens if I change something?</p>
      </div>

      <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white/60 flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3" />
            Confidence
          </span>
          <span className={`text-lg font-display ${overallConfidence >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {overallConfidence}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white/60 flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Time Saved
          </span>
          <span className="text-sm font-medium text-white">
            {totalTimeSaved} days
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white/60 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" />
            Projected Extra
          </span>
          <span className="text-sm font-medium text-emerald-400">
            {formatINR(projectedSavings)}
          </span>
        </div>

        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
          <motion.div
            className={`h-full rounded-full ${overallConfidence >= 70 ? 'bg-emerald-500' : 'bg-amber-400'}`}
            initial={{ width: 0 }}
            animate={{ width: `${overallConfidence}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
