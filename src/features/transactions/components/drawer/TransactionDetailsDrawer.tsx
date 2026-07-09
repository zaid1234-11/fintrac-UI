'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, MessageSquare, BrainCircuit, History } from 'lucide-react';
import { Transaction } from '../../types';
import { formatINR } from '@/lib/formatINR';

interface TransactionDetailsDrawerProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export function TransactionDetailsDrawer({ transaction, onClose }: TransactionDetailsDrawerProps) {
  if (!transaction) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#1a1f1b]/95 backdrop-blur-3xl border-l border-white/10 shadow-[-24px_0_48px_rgba(0,0,0,0.5)] z-50 p-6 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-display text-white">Transaction Details</h2>
            {transaction.reviewStatus === 'needs_review' && (
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] uppercase font-bold tracking-wider">
                Review Required
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview */}
        <div className="flex flex-col items-center justify-center py-6 mb-8 border-b border-white/10">
          <h1 className="text-3xl font-display text-white mb-2">{transaction.merchant}</h1>
          <span className={`text-xl font-mono ${transaction.direction === 'inflow' ? 'text-emerald-400' : 'text-white/80'}`}>
            {transaction.direction === 'inflow' ? '+' : ''}{formatINR(transaction.amount)}
          </span>
          <span className="text-sm text-white/50 font-lexend mt-2">{new Date(transaction.date).toLocaleString()}</span>
        </div>

        {/* AI Explanation */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="w-4 h-4 text-emerald-400" />
            <h3 className="text-[11px] font-mono uppercase tracking-wider text-white/50">AI Reasoning</h3>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/80">Confidence</span>
              <span className={`text-sm font-mono ${transaction.reviewStatus === 'needs_review' ? 'text-amber-400' : 'text-emerald-400'}`}>
                {Math.round(transaction.confidence * 100)}%
              </span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4">
              <div 
                className={`h-full rounded-full ${transaction.reviewStatus === 'needs_review' ? 'bg-amber-400' : 'bg-emerald-400'}`}
                style={{ width: `${Math.round(transaction.confidence * 100)}%` }}
              />
            </div>
            <p className="text-sm text-white/60 leading-relaxed font-lexend">
              {transaction.explanation}
            </p>
          </div>
        </div>

        {/* Merchant Memory */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 text-blue-400" />
            <h3 className="text-[11px] font-mono uppercase tracking-wider text-white/50">Merchant Memory</h3>
          </div>
          <div className="p-4 rounded-xl bg-blue-500/[0.05] border border-blue-500/[0.15]">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-sm text-white/80 mb-1">Remember this categorization?</span>
                <span className="block text-xs text-white/40">Always categorize {transaction.merchant} as {transaction.category}</span>
              </div>
              <button className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                Enable Rule
              </button>
            </div>
          </div>
        </div>

        {/* Evidence */}
        {transaction.evidence && transaction.evidence.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-white/40" />
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-white/50">Source Evidence</h3>
            </div>
            {transaction.evidence.map((ev, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] font-mono text-xs text-white/40">
                {ev.content}
              </div>
            ))}
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  );
}
