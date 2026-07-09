'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Zap, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';
import { useTransactions } from '../../hooks/useTransactions';
import { formatINR } from '@/lib/formatINR';

function CardWrapper({ children, title, icon: Icon, delay = 0, alert = false }: any) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div 
        ref={cardRef} 
        className={`goal-liquid-glass p-5 transition-all duration-300 ${alert ? 'border-red-500/20' : ''}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Icon className={`w-4 h-4 ${alert ? 'text-red-400' : 'text-white/60'}`} />
          <h3 className={`text-[11px] font-mono uppercase tracking-wider ${alert ? 'text-red-400 font-bold' : 'text-white/50'}`}>
            {title}
          </h3>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

export function NeedsReviewCard() {
  const { snapshot } = useTransactions();
  if (snapshot.needsReviewCount === 0) return null;

  return (
    <CardWrapper title="Needs Review" icon={ShieldAlert} alert delay={0.1}>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center pb-2 border-b border-red-500/10">
          <span className="text-sm font-medium text-red-200">Merchant Unknown</span>
          <span className="text-xs font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">{Math.floor(snapshot.needsReviewCount * 0.4) || 1}</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-red-500/10">
          <span className="text-sm font-medium text-red-200">Low Confidence</span>
          <span className="text-xs font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">{Math.floor(snapshot.needsReviewCount * 0.6) || 1}</span>
        </div>
        <button className="text-xs font-lexend text-red-400 hover:text-red-300 mt-1 transition-colors text-left">
          Review All {snapshot.needsReviewCount} →
        </button>
      </div>
    </CardWrapper>
  );
}

export function SpendingSignalsCard() {
  return (
    <CardWrapper title="AI Alerts" icon={Zap} delay={0.2}>
      <div className="flex flex-col gap-4">
        <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
          <p className="text-sm text-amber-200/90 leading-snug">
            You've spent <strong className="text-amber-400">28% more on Food</strong> than usual this month.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
          <p className="text-sm text-white/70 leading-snug">
            Three merchants appeared for the first time this month.
          </p>
        </div>
      </div>
    </CardWrapper>
  );
}

export function RecurringPaymentsCard() {
  return (
    <CardWrapper title="Recurring" icon={RefreshCw} delay={0.3}>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/80">Netflix</span>
          <span className="text-sm font-mono text-white/60">₹649</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/80">Spotify</span>
          <span className="text-sm font-mono text-white/60">₹119</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/80">AWS</span>
          <span className="text-sm font-mono text-white/60">₹842</span>
        </div>
      </div>
    </CardWrapper>
  );
}

export function MonthlySnapshotCard() {
  const { snapshot } = useTransactions();
  
  return (
    <CardWrapper title="Monthly Snapshot" icon={BarChart2} delay={0.4}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs text-white/40 mb-1">Spent</span>
            <span className="text-lg font-display text-white">{formatINR(snapshot.spent)}</span>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs text-white/40 mb-1">Income</span>
            <span className="text-lg font-display text-emerald-400">{formatINR(snapshot.income)}</span>
          </div>
        </div>
        <div className="flex justify-between items-end pt-3 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-xs text-white/40 mb-1">Savings Rate</span>
            <span className="text-lg font-display text-emerald-400">{snapshot.savingsRate}%</span>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}

export function TransactionSidebar() {
  return (
    <div className="sticky top-24 flex flex-col gap-5">
      <NeedsReviewCard />
      <SpendingSignalsCard />
      <RecurringPaymentsCard />
      <MonthlySnapshotCard />
    </div>
  );
}
