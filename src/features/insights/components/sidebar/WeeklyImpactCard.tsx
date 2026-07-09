import React from 'react';

export function WeeklyImpactCard() {
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);

  return (
    <div ref={cardRef} className="goal-liquid-glass p-5">
      <h3 className="text-sm font-semibold text-emerald-400 mb-4">This Week</h3>
      
      <div className="space-y-4">
        <div>
          <span className="text-2xl font-bold text-white tracking-tight">₹2,140</span>
          <span className="text-xs text-white/50 block mt-1">Potential Savings</span>
        </div>
        
        <div className="h-px w-full bg-white/10" />
        
        <div>
          <span className="text-xl font-medium text-white">3</span>
          <span className="text-xs text-white/50 block mt-0.5">Decisions Accepted</span>
        </div>
        
        <div className="h-px w-full bg-white/10" />
        
        <div>
          <span className="text-xl font-medium text-white">2</span>
          <span className="text-xs text-white/50 block mt-0.5">Goals Accelerated</span>
        </div>
        
        <div className="h-px w-full bg-white/10" />
        
        <div>
          <span className="text-xl font-medium text-white">1</span>
          <span className="text-xs text-white/50 block mt-0.5">Risk Prevented</span>
        </div>
      </div>
    </div>
  );
}
