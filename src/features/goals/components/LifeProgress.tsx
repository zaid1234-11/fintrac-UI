import React from 'react';
import { motion } from 'framer-motion';
import { useGoalEngine } from '../hooks/useGoalEngine';
import { Layers } from 'lucide-react';

export function LifeProgress() {
  const { goals } = useGoalEngine();

  // Very rough derivation based on the V3 Concept rules
  const emergencyFund = goals.find(g => g.type === 'emergency_fund');
  const hasLongTermGoals = goals.some(g => g.priorityLabel === 'medium' || g.priorityLabel === 'low');
  
  let currentStage = 'Building Stability';
  if (emergencyFund && emergencyFund.healthLabel === 'on_track' && emergencyFund.currentAmount >= emergencyFund.targetAmount) {
    if (hasLongTermGoals) {
      currentStage = 'Building Wealth';
    }
  }

  const stages = [
    { name: 'Building Stability', active: currentStage === 'Building Stability', done: currentStage !== 'Building Stability' && emergencyFund?.currentAmount === emergencyFund?.targetAmount },
    { name: 'Building Wealth', active: currentStage === 'Building Wealth', done: false }, // Simplification
    { name: 'Financial Freedom', active: currentStage === 'Financial Freedom', done: false }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="relative mb-20"
    >
      <div className="flex items-center gap-3 mb-6 ml-2">
        <Layers className="w-5 h-5 text-primary-olive opacity-80" />
        <h2 className="text-label-small">Life Progress</h2>
      </div>

      <div className="fintrac-light-card p-10 rounded-[32px] relative z-10">
        
        <div className="flex items-center justify-between gap-4">
          {stages.map((stage, idx) => (
            <React.Fragment key={stage.name}>
              <div className={`flex-1 flex flex-col items-center gap-3 ${stage.active ? 'opacity-100 scale-105' : 'opacity-40'} transition-all`}>
                <div className={`w-4 h-4 rounded-full ${stage.active ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : stage.done ? 'bg-emerald-500' : 'bg-[#2A2E06]/20'}`} />
                <span className={`text-sm font-lexend text-center ${stage.active ? 'font-semibold text-primary-olive' : 'font-medium'}`}>{stage.name}</span>
              </div>
              {idx < stages.length - 1 && (
                <div className="flex-1 h-px bg-[#2A2E06]/10 mt-[-24px]" />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
