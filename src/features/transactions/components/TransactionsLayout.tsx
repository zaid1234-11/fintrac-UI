'use client';

import React from 'react';
import { TransactionSelectionProvider } from '../hooks/useTransactionSelection';

export function TransactionsLayout({ 
  workspace, 
  sidebar 
}: { 
  workspace: React.ReactNode, 
  sidebar: React.ReactNode 
}) {
  return (
    <TransactionSelectionProvider>
      <div className="relative z-10 w-full min-h-screen pt-8 md:pt-16 px-4 md:px-8 max-w-[1800px] mx-auto pb-32">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-white mb-2">Transactions</h1>
            <p className="text-sm font-lexend text-white/50">Is my money being understood correctly?</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] 2xl:grid-cols-[1fr_360px] gap-6 xl:gap-10">
          {/* MAIN WORKSPACE */}
          <main className="w-full min-w-0">
            {workspace}
          </main>

          {/* RIGHT SIDEBAR (Sticky) */}
          <aside className="hidden xl:block w-full shrink-0">
            {sidebar}
          </aside>
        </div>
      </div>
    </TransactionSelectionProvider>
  );
}
