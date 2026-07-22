import React, { useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { History, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { GoalEvent } from '../types/goalEngineTypes';

// Mock event log data
const MOCK_EVENTS: GoalEvent[] = [
  {
    id: 'evt_1',
    goalId: 'goal_laptop',
    eventType: 'goal_created',
    date: 'June 2026',
    title: 'New Laptop goal created'
  },
  {
    id: 'evt_2',
    goalId: 'goal_emergency',
    eventType: 'goal_milestone_reached',
    date: 'July 2026',
    title: 'Emergency Fund hit 50%',
    description: 'You reached the halfway mark of ₹40,000.'
  },
  {
    id: 'evt_3',
    goalId: 'goal_emergency',
    eventType: 'goal_milestone_reached',
    date: 'August 2026',
    title: 'Goal accelerated',
    description: 'You increased monthly contributions by ₹1,000.'
  },
  {
    id: 'evt_4',
    goalId: 'goal_vacation',
    eventType: 'goal_at_risk',
    date: 'September 2026',
    title: 'Vacation goal delayed',
    description: 'Contributions paused for 2 months.'
  }
];

import LiquidCard from '@/components/liquid/LiquidCard';

export function GoalEventsLog() {
  const getEventIcon = (type: GoalEvent['eventType']) => {
    switch (type) {
      case 'goal_created': return <Clock className="w-4 h-4 text-white/50" />;
      case 'goal_milestone_reached': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'goal_at_risk': return <AlertCircle className="w-4 h-4 text-amber-400" />;
      default: return <History className="w-4 h-4 text-white/50" />;
    }
  };

  return (
    <m.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative"
    >
      <div className="flex items-center gap-3 mb-6 ml-2">
        <History className="w-5 h-5 text-white opacity-80" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Goal Events</h2>
      </div>

      <LiquidCard level={2} className="p-10 rounded-[28px] flex flex-col gap-6">
        {/* Event Timeline */}
        <div className="flex flex-col gap-8 relative pl-4 z-10">
          <div className="absolute top-2 bottom-2 left-[23px] w-px bg-white/10" />

          {[...MOCK_EVENTS].reverse().map((evt, idx) => (
            <div key={evt.id} className="flex gap-6 relative">
              <div className="flex flex-col items-center mt-1 z-10 bg-white/10 ring-4 ring-white/5 rounded-full p-1">
                {getEventIcon(evt.eventType)}
              </div>
              <div className="flex flex-col gap-1 pb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white">{evt.title}</span>
                  <span className="text-xs text-white/40 uppercase tracking-wider font-lexend">{evt.date}</span>
                </div>
                {evt.description && (
                  <span className="text-sm text-white/60 leading-relaxed max-w-lg">{evt.description}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </LiquidCard>
    </m.section>
  );
}
