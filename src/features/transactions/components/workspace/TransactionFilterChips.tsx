'use client';

import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';

const CHIPS = ['All', 'Expense', 'Income', 'Recurring', 'Subscriptions', 'Needs Review', 'Cash', 'UPI', 'Credit Card'];

export function TransactionFilterChips() {
  const { query, setQuery } = useTransactions();
  const activeChip = query ? 'All' : 'All'; // Simplified for now, real implementation would map >filters back to chips

  const handleChipClick = (chip: string) => {
    if (chip === 'All') {
      setQuery('');
    } else if (chip === 'Needs Review') {
      setQuery('>needs review');
    } else {
      setQuery(chip);
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
      {CHIPS.map((chip) => {
        // Mock active state
        const isActive = 
          (chip === 'All' && !query) || 
          (chip === 'Needs Review' && query.includes('>needs review')) ||
          (chip !== 'All' && chip !== 'Needs Review' && query === chip);

        return (
          <button
            key={chip}
            onClick={() => handleChipClick(chip)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              isActive
                ? 'bg-white/20 text-white border border-white/30 shadow-[0_2px_10px_rgba(255,255,255,0.1)]'
                : 'bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/90'
            }`}
          >
            {chip}
          </button>
        );
      })}
    </div>
  );
}
