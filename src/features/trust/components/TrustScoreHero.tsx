import React from 'react';
import { TrustScore } from '../../types';
import { LucideShieldCheck, LucideTrendingUp, LucideTrendingDown } from 'lucide-react';

interface TrustScoreHeroProps {
  score: TrustScore;
}

export function TrustScoreHero({ score }: TrustScoreHeroProps) {
  const isPositive = score.trend > 0;
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && cardRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(cardRef.current, { scale: -112, chroma: 6 });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, []);

  // Dummy sparkline points
  const points = score.history.map((val, i) => {
    const x = (i / (score.history.length - 1)) * 100;
    const y = 100 - ((val - 60) / (100 - 60)) * 100; // Map 60-100 to 100-0 height
    return `${x},${y}`;
  }).join(' ');

  return (
    <div ref={cardRef} className="goal-liquid-glass w-full p-8 relative overflow-hidden flex flex-col md:flex-row gap-12">
      
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-64 h-64 blur-[80px] opacity-20 -ml-20 -mt-20 rounded-full bg-blue-500" />

      {/* Left: Score */}
      <div className="flex flex-col items-start justify-center relative z-10 shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <LucideShieldCheck className="w-5 h-5 text-white/50" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">FinTrac Trust Score</h2>
        </div>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-7xl font-light text-white tracking-tight">{score.overallScore}</span>
          <span className="text-2xl text-white/30">/100</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          {isPositive ? (
            <LucideTrendingUp className="w-4 h-4 text-emerald-400" />
          ) : (
            <LucideTrendingDown className="w-4 h-4 text-rose-400" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? '+' : ''}{score.trend} this week
          </span>
        </div>
      </div>

      {/* Right: Sparkline */}
      <div className="flex-1 flex flex-col justify-end relative h-40 mt-auto">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          {/* Sparkline Path */}
          <polyline 
            points={points} 
            fill="none" 
            stroke="rgba(255,251,230,0.3)" 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Mock Event Overlay 1 */}
          <g className="group cursor-pointer">
            <circle cx="33.33" cy={100 - ((score.history[1] - 60) / 40) * 100} r="4" fill="rgba(255,251,230,0.8)" className="group-hover:r-6 transition-all" />
            <text x="33.33" y={100 - ((score.history[1] - 60) / 40) * 100 - 15} fill="rgba(255,255,255,0.7)" fontSize="5" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity">
              Statement Imported
            </text>
          </g>

          {/* Mock Event Overlay 2 */}
          <g className="group cursor-pointer">
            <circle cx="66.66" cy={100 - ((score.history[2] - 60) / 40) * 100} r="4" fill="rgba(255,251,230,0.8)" className="group-hover:r-6 transition-all" />
            <text x="66.66" y={100 - ((score.history[2] - 60) / 40) * 100 + 20} fill="rgba(255,255,255,0.7)" fontSize="5" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity">
              Merchant Review
            </text>
          </g>
          
          {/* Current Score Point */}
          <circle cx="100" cy={100 - ((score.history[3] - 60) / 40) * 100} r="5" fill="#FFFBE6" className="animate-pulse" />
        </svg>

        <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-white/30 uppercase tracking-wider translate-y-6">
          <span>Last 30 Days</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
