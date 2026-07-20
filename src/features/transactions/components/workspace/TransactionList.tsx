'use client';

import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionRow } from './TransactionRow';
import { Transaction } from '../../types';

interface TransactionListProps {
  onRowClick: (tx: Transaction) => void;
}

export function TransactionList({ onRowClick }: TransactionListProps) {
  const { transactions, loading } = useTransactions();
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: loading ? 10 : transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // Estimated height of a TransactionRow
    overscan: 5,
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-full h-[64px] bg-white/[0.02] border border-white/[0.05] rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
          <span className="text-2xl opacity-50">💸</span>
        </div>
        <h3 className="text-lg font-display text-white mb-2">No transactions found</h3>
        <p className="text-sm text-white/50 font-lexend max-w-sm">
          Your financial timeline is empty for this query. Upload a bank statement or connect an account to begin.
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={parentRef} 
      className="w-full h-[600px] overflow-y-auto scrollbar-hide pr-2"
      style={{
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const tx = transactions[virtualItem.index];
          return (
            <TransactionRow
              key={tx.id}
              transaction={tx}
              onClick={onRowClick}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
