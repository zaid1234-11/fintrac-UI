import { ReactNode } from 'react';

interface InsightsLayoutProps {
  children: ReactNode;
}

export function InsightsLayout({ children }: InsightsLayoutProps) {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-fintrac-primary/30">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen scale-105"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 min-h-screen">
        <header className="mb-12">
          <h1 className="text-4xl font-light text-white tracking-tight sm:text-5xl mb-2">
            Today's Best Decisions
          </h1>
          <p className="text-lg text-white/50 max-w-2xl font-light">
            These are the highest-value financial decisions you can make today to improve your financial trajectory.
          </p>
        </header>
        
        {children}
      </div>
    </div>
  );
}
