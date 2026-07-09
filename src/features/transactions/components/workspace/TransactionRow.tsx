'use client';

import React from 'react';
import { Transaction } from '../../types';
import { CheckSquare, Square, ChevronRight } from 'lucide-react';
import { formatINR } from '@/lib/formatINR';
import { useTransactionSelection } from '../../hooks/useTransactionSelection';

interface TransactionRowProps {
  transaction: Transaction;
  style?: React.CSSProperties;
  onClick: (tx: Transaction) => void;
}

export function TransactionRow({ transaction, style, onClick }: TransactionRowProps) {
  const { isSelected, toggleSelection } = useTransactionSelection();
  const selected = isSelected(transaction.id);

  const confidenceWidth = Math.min(100, transaction.confidence * 100);
  const isNeedsReview = transaction.reviewStatus === 'needs_review';

  return (
    <div style={style} className="pr-2 pb-2">
      <div 
        className={`w-full h-full flex items-center gap-4 px-4 py-3 rounded-xl border transition-all cursor-pointer group ${
          selected 
            ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]' 
            : isNeedsReview
              ? 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30'
              : 'bg-white/[0.04] backdrop-blur-md border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]'
        }`}
        onClick={() => onClick(transaction)}
      >
        {/* Selection Checkbox */}
        <button 
          className="shrink-0 text-white/40 hover:text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            toggleSelection(transaction.id);
          }}
        >
          {selected ? <CheckSquare className="w-5 h-5 text-emerald-400" /> : <Square className="w-5 h-5" />}
        </button>

        {/* Date & Merchant */}
        <div className="flex-1 min-w-0 flex items-center gap-4">
          <div className="w-12 text-center shrink-0">
            <span className="block text-xs font-mono text-white/40">
              {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-display text-white truncate">{transaction.merchant}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-lexend text-white/50">{transaction.category}</span>
              {transaction.recurring && (
                <span className="px-1.5 py-0.5 rounded-sm bg-blue-500/20 text-blue-300 text-[9px] uppercase tracking-wider font-mono">
                  Recurring
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="shrink-0 text-right w-24">
          <span className={`text-sm font-mono ${transaction.direction === 'inflow' ? 'text-emerald-400' : 'text-white'}`}>
            {transaction.direction === 'inflow' ? '+' : ''}{formatINR(transaction.amount)}
          </span>
        </div>

        {/* AI Confidence Inline Bar */}
        <div className="w-32 shrink-0 hidden md:flex flex-col gap-1.5 pl-4 border-l border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">AI</span>
            <span className={`text-[10px] font-mono ${isNeedsReview ? 'text-red-400' : 'text-emerald-400'}`}>
              {Math.round(transaction.confidence * 100)}%
            </span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${isNeedsReview ? 'bg-red-400' : 'bg-emerald-400'}`}
              style={{ width: `${confidenceWidth}%` }}
            />
          </div>
        </div>

        {/* Expand Icon */}
        <div className="shrink-0 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-4 h-4 text-white/40" />
        </div>
      </div>
    </div>
  );
}
