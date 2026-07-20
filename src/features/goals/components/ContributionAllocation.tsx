import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useGoalEngine } from '../hooks/useGoalEngine';
import { Check, X, SlidersHorizontal } from 'lucide-react';

export function ContributionAllocation() {
  const {
    goals,
    previewAllocations,
    updatePreviewAllocation,
    isDirty,
    commitChanges,
    discardChanges
  } = useGoalEngine();

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);

  const allocatableGoals = goals.filter(g => g.state === 'active');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <m.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative flex flex-col gap-4 mt-2"
    >
      <div className="flex items-center gap-3 mb-2 ml-2">
        <SlidersHorizontal className="w-5 h-5 text-white opacity-80" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Allocation Sandbox</h2>
      </div>

      <div ref={cardRef} className="goal-liquid-glass p-8 relative z-10 flex flex-col gap-8">
        {allocatableGoals.map(goal => {
          const currentAllocation = previewAllocations[goal.id] || 0;
          const maxPossible = 10000;
          const percentage = (currentAllocation / maxPossible) * 100;

          return (
            <div 
              key={goal.id} 
              className="relative flex flex-col gap-4 py-5 px-6 -mx-6 rounded-2xl border-b border-white/5 last:border-0 transition-colors"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredGoal(goal.id)}
              onMouseLeave={() => setHoveredGoal(null)}
            >
              <m.div
                className="absolute inset-0 z-0 bg-emerald-500/15 pointer-events-none rounded-2xl transition-opacity duration-300"
                style={{
                  opacity: hoveredGoal === goal.id ? 1 : 0,
                  WebkitMaskImage: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                  maskImage: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                }}
              />
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <h4 className="text-lg font-display text-white">{goal.name}</h4>
                  <span className="text-xs text-white/50 uppercase tracking-wider font-lexend">{goal.priorityLabel} Priority</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-geist font-medium text-emerald-400">₹{currentAllocation.toLocaleString()}</span>
                  <span className="text-sm text-white/50">/ mo</span>
                </div>
              </div>

              {/* Slider Track */}
              <div className="relative z-10 h-2 w-full bg-white/10 rounded-full cursor-pointer group flex items-center">
                <input
                  type="range"
                  min="0"
                  max={maxPossible}
                  step="500"
                  value={currentAllocation}
                  onChange={(e) => updatePreviewAllocation(goal.id, Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
                />
                <m.div
                  className="absolute h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />
                <m.div
                  className="absolute w-4 h-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] rounded-full z-10"
                  style={{ left: `calc(${percentage}% - 8px)` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Bar (Preview State) */}
      <AnimatePresence>
        {isDirty && (
          <m.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-white/10 backdrop-blur-3xl border border-white/20 text-white px-6 py-4 rounded-full shadow-2xl"
          >
            <div className="flex flex-col mr-6">
              <span className="text-sm font-medium">Unsaved Allocations</span>
              <span className="text-xs text-white/60">Previewing impact...</span>
            </div>

            <button
              onClick={discardChanges}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-colors text-sm font-medium text-white/80"
            >
              <X className="w-4 h-4" />
              Discard
            </button>
            <button
              onClick={commitChanges}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-500 text-black rounded-full hover:bg-emerald-400 transition-colors text-sm font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <Check className="w-4 h-4" />
              Apply Changes
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </m.section>
  );
}
