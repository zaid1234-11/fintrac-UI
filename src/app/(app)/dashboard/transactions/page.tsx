'use client';

import React from 'react';
import { TransactionsLayout } from '@/features/transactions/components/TransactionsLayout';
import { TransactionWorkspace } from '@/features/transactions/components/workspace/TransactionWorkspace';
import { TransactionSidebar } from '@/features/transactions/components/sidebar';
import { DashboardVideoBackground } from '@/features/dashboard/components/DashboardVideoBackground';

export default function TransactionsPage() {
  return (
    <div className="relative min-h-screen w-full bg-transparent overflow-hidden selection:bg-emerald-500/30 selection:text-white text-white">
      {/* Layer 1: Cinematic Ambient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <DashboardVideoBackground src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260604_125109_19424216-4e2a-4560-b9f2-f1b5f6eb2c2e.mp4" />
      </div>

      <TransactionsLayout 
        workspace={<TransactionWorkspace />}
        sidebar={<TransactionSidebar />}
      />
    </div>
  );
}
