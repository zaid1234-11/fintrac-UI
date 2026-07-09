'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useTransactions } from '../../hooks/useTransactions';

export function TransactionSearch() {
  const { query, setQuery } = useTransactions();

  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-white/40" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search merchants, or try >food, >last month, >over 1000..."
        className="w-full bg-white/[0.04] border border-white/[0.1] rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/30 outline-none focus:bg-white/[0.08] focus:border-white/[0.2] transition-all backdrop-blur-xl"
      />
    </div>
  );
}
