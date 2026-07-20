'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TransactionSelectionContextType {
  selectedIds: Set<string>;
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;
}

const TransactionSelectionContext = createContext<TransactionSelectionContextType | undefined>(undefined);

export function TransactionSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = (ids: string[]) => {
    setSelectedIds(new Set(ids));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const isSelected = (id: string) => selectedIds.has(id);

  return (
    <TransactionSelectionContext.Provider
      value={{ selectedIds, toggleSelection, selectAll, clearSelection, isSelected }}
    >
      {children}
    </TransactionSelectionContext.Provider>
  );
}

export function useTransactionSelection() {
  const context = useContext(TransactionSelectionContext);
  if (!context) {
    throw new Error('useTransactionSelection must be used within a TransactionSelectionProvider');
  }
  return context;
}
