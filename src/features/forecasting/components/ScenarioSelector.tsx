'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Lightbulb, User } from 'lucide-react';
import { useForecastEngine } from '../hooks/useForecastEngine';
import type { ForecastScenario } from '../types';

function ScenarioOriginBadge({ origin }: { origin: ForecastScenario['origin'] }) {
  if (origin === 'recommendation_engine' || origin === 'system') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-medium text-amber-300 uppercase tracking-wider">
        <Lightbulb className="w-2.5 h-2.5" />
        AI Suggested
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-medium text-blue-300 uppercase tracking-wider">
      <User className="w-2.5 h-2.5" />
      Your Scenario
    </span>
  );
}

export function ScenarioSelector() {
  const { scenarios, activeScenario, selectScenario } = useForecastEngine();

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-3 mb-6 ml-2">
        <Zap className="w-5 h-5 text-white/80" />
        <h2 className="text-[10px] tracking-[0.2em] text-white/40 font-mono uppercase">Scenarios</h2>
      </div>

      <div className="flex flex-col gap-3">
        {scenarios.map((scenario) => {
          const isActive = scenario.scenarioId === activeScenario.scenarioId;
          return (
            <motion.button
              key={scenario.scenarioId}
              onClick={() => selectScenario(scenario.scenarioId)}
              className={`relative w-full text-left p-5 rounded-2xl border transition-all duration-300 group ${
                isActive
                  ? 'bg-white/[0.10] border-white/[0.18] shadow-[inset_0_1px_4px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl'
                  : 'bg-white/[0.06] border-white/[0.10] hover:bg-white/[0.08] hover:border-white/[0.14] backdrop-blur-xl'
              }`}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              {isActive && (
                <motion.div
                  layoutId="scenario-active"
                  className="absolute left-0 top-3 bottom-3 w-[3px] bg-emerald-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <ScenarioOriginBadge origin={scenario.origin} />
                  </div>
                  <h3 className="font-display text-sm text-white mb-1 truncate">{scenario.label}</h3>
                  <p className="text-xs text-white/50 font-lexend leading-relaxed line-clamp-2">{scenario.description}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}
