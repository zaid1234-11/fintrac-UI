'use client';

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTransactionSelection } from '../../hooks/useTransactionSelection';
import { Check, X, Edit2, SplitSquareHorizontal, Trash2 } from 'lucide-react';

export function BulkActionBar() {
  const { selectedIds, clearSelection } = useTransactionSelection();
  const count = selectedIds.size;

  return (
    <AnimatePresence>
      {count > 0 && (
        <m.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center gap-3 pr-4 border-r border-white/10">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
              {count}
            </div>
            <span className="text-sm font-medium text-white">selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 text-sm text-white/80 transition-colors">
              <Check className="w-4 h-4" />
              Verify All
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 text-sm text-white/80 transition-colors">
              <Edit2 className="w-4 h-4" />
              Change Category
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 text-sm text-white/80 transition-colors">
              <SplitSquareHorizontal className="w-4 h-4" />
              Split
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-red-500/20 text-sm text-red-400 transition-colors">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>

          <div className="pl-2 ml-2 border-l border-white/10">
            <button 
              onClick={clearSelection}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
