'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TransactionSearch } from './TransactionSearch';
import { TransactionFilterChips } from './TransactionFilterChips';
import { AIStatusBanner } from './AIStatusBanner';
import { TransactionList } from './TransactionList';
import { BulkActionBar } from './BulkActionBar';
import { TransactionDetailsDrawer } from '../drawer/TransactionDetailsDrawer';
import { Transaction } from '../../types';

export function TransactionWorkspace() {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col h-full"
    >
      <TransactionSearch />
      <TransactionFilterChips />
      <AIStatusBanner />
      
      <div className="flex-1 relative">
        <TransactionList onRowClick={(tx) => setSelectedTx(tx)} />
      </div>

      <BulkActionBar />
      
      <TransactionDetailsDrawer 
        transaction={selectedTx} 
        onClose={() => setSelectedTx(null)} 
      />
    </motion.div>
  );
}
