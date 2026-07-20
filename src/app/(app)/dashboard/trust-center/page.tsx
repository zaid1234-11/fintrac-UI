"use client";

import { useTrustData } from '@/features/trust/hooks/useTrustData';
import { TrustScoreHero } from '@/features/trust/components/TrustScoreHero';
import { RecoverySuggestionsPanel } from '@/features/trust/components/RecoverySuggestionsPanel';
import { ConfidenceDistributionPanel } from '@/features/trust/components/ConfidenceDistributionPanel';
import { DataFreshnessGrid } from '@/features/trust/components/DataFreshnessGrid';
import { PermissionControls } from '@/features/trust/components/PermissionControls';
import { AuditTimeline } from '@/features/trust/components/AuditTimeline';
import { TrustHistoryList } from '@/features/trust/components/TrustHistoryList';
import { LucideShieldCheck } from 'lucide-react';
import { DashboardVideoBackground } from '@/features/dashboard/components/DashboardVideoBackground';

export default function TrustCenterPage() {
  const { 
    trustScore,
    trustHealth,
    suggestions, 
    dataSources, 
    auditLogs, 
    permissions, 
    isLoading, 
    togglePermission, 
    reconnectSource 
  } = useTrustData();

  if (isLoading || !trustScore || !trustHealth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16 mb-8">
          <div className="absolute inset-0 border-t-2 border-fintrac-primary rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-2 border-white/20 rounded-full animate-spin-reverse"></div>
        </div>
        <p className="text-white/70 font-medium animate-pulse">Running diagnostics...</p>
      </div>
    );
  }

  return (
    <>
      {/* Layer 1: Cinematic Ambient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <DashboardVideoBackground src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4" />
        
        {/* Atmospheric Mist Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.05), transparent 30%, rgba(28,35,24,.18) 100%)' }}
        />

        {/* Cinematic Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.2))' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full pb-32 pt-24">
        <div className="flex items-center gap-3 mb-8">
          <LucideShieldCheck className="w-6 h-6 text-fintrac-primary" />
          <h1 className="text-2xl font-semibold text-white tracking-tight">Trust Center</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Content (70%) */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {/* Zone 1: Trust Overview */}
            <section className="flex flex-col gap-6">
              <header className="pb-4 border-b border-white/5">
                <h2 className="text-lg font-medium text-white mb-1">Trust Overview</h2>
                <p className="text-sm text-white/50">How reliable FinTrac's insights are today.</p>
              </header>
              <TrustScoreHero score={trustScore} />
            </section>

            {/* Zone 2: Action Required */}
            <section className="flex flex-col gap-6">
              <header className="pb-4 border-b border-white/5">
                <h2 className="text-lg font-medium text-white mb-1">Action Required</h2>
                <p className="text-sm text-white/50">Steps that will improve your Trust Score.</p>
              </header>
              <div className="flex flex-col gap-6">
                <RecoverySuggestionsPanel 
                  suggestions={suggestions} 
                  onAction={reconnectSource} 
                />
                <ConfidenceDistributionPanel health={trustHealth} />
              </div>
            </section>
            
            {/* Zone 3: Platform Health */}
            <section className="flex flex-col gap-6">
              <header className="pb-4 border-b border-white/5">
                <h2 className="text-lg font-medium text-white mb-1">Platform Health</h2>
                <p className="text-sm text-white/50">Status of connected data and permissions.</p>
              </header>
              <div className="flex flex-col gap-8">
                <DataFreshnessGrid 
                  sources={dataSources} 
                  onReconnect={reconnectSource} 
                />
                <PermissionControls 
                  permissions={permissions} 
                  onToggle={togglePermission} 
                />
              </div>
            </section>
            
          </div>

          {/* Zone 4: Explainability (Right Rail) */}
          <div className="lg:col-span-4 h-full">
            <div className="sticky top-24 flex flex-col gap-8">
              <header className="pb-4 border-b border-white/5">
                <h2 className="text-lg font-medium text-white mb-1">Audit & History</h2>
                <p className="text-sm text-white/50">Recent activity and AI decisions.</p>
              </header>
              
              <div className="h-[450px]">
                <AuditTimeline events={auditLogs} />
              </div>
              
              <TrustHistoryList score={trustScore} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
