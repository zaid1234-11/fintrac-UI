import React from 'react';

export function TrustScoreCard() {
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white/70">Trust Score</h3>
        <span className="text-lg font-bold text-white">96%</span>
      </div>
      
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-emerald-400 w-[96%]" />
      </div>
      
      <p className="text-xs text-white/40 mb-2">Based on:</p>
      <ul className="space-y-1.5">
        <li className="text-xs text-white/60 flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          Accepted recommendations
        </li>
        <li className="text-xs text-white/60 flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          Merchant Memory
        </li>
        <li className="text-xs text-white/60 flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          Corrections & feedback
        </li>
        <li className="text-xs text-white/60 flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          Recent financial activity
        </li>
      </ul>
    </div>
  );
}
