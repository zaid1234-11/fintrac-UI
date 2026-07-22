'use client';

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
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

import LiquidCard from '@/components/liquid/LiquidCard';

function GlassScenarioButton({ scenario, isActive, onClick }: { scenario: ForecastScenario, isActive: boolean, onClick: () => void }) {
  return (
    <m.button
      onClick={onClick}
      className="w-full text-left focus:outline-none block"
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
    >
      <LiquidCard 
        level={isActive ? 3 : 2} 
        className={`p-5 rounded-[28px] relative transition-all duration-300 ${
          isActive ? 'border-emerald-400/50 shadow-[var(--liquid-shadow-glow)]' : ''
        }`}
      >
        {isActive && (
          <m.div
            layoutId="scenario-active"
            className="absolute left-0 top-4 bottom-4 w-[4px] bg-emerald-400 rounded-r-full"
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          />
        )}

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <ScenarioOriginBadge origin={scenario.origin} />
            </div>
            <h3 className="font-display text-sm text-white mb-1 truncate">{scenario.label}</h3>
            <p className="text-xs text-white/60 font-lexend leading-relaxed line-clamp-2">{scenario.description}</p>
          </div>
        </div>
      </LiquidCard>
    </m.button>
  );
}

export function ScenarioSelector() {
  const { scenarios, activeScenario, selectScenario } = useForecastEngine();

  return (
    <m.section
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
            <GlassScenarioButton
              key={scenario.scenarioId}
              scenario={scenario}
              isActive={isActive}
              onClick={() => selectScenario(scenario.scenarioId)}
            />
          );
        })}
      </div>
    </m.section>
  );
}
