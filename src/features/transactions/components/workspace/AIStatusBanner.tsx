'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTransactions } from '../../hooks/useTransactions';

export function AIStatusBanner() {
  const { snapshot, loading } = useTransactions();

  if (loading) return null;

  const autoPercentage = Math.round((snapshot.autoCategorizedCount / snapshot.transactionsCount) * 100) || 0;

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/[0.15] backdrop-blur-md mb-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        <span className="text-sm font-medium text-emerald-100">
          This month: <strong className="text-emerald-400 font-bold">{snapshot.transactionsCount}</strong> transactions analyzed
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-sm text-emerald-200/80">
          <strong className="text-emerald-400 font-bold">{autoPercentage}%</strong> categorized automatically
        </span>
        {snapshot.needsReviewCount > 0 && (
          <span className="text-sm text-red-300 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            {snapshot.needsReviewCount} require review
          </span>
        )}
      </div>
    </m.div>
  );
}
