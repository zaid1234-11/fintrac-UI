import React from 'react';
import { m } from 'framer-motion';

const SkeletonBase = ({ className, delay = 0 }: { className: string, delay?: number }) => (
  <m.div
    initial={{ opacity: 0.3 }}
    animate={{ opacity: 0.6 }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay
    }}
    className={`bg-white/5 rounded-xl ${className}`}
  />
);

export const FinancialStatusSkeleton = () => (
  <div className="flex flex-col md:flex-row gap-4 mb-8">
    <SkeletonBase className="h-24 w-full md:w-1/3" />
    <SkeletonBase className="h-24 w-full md:w-1/3" delay={0.2} />
    <SkeletonBase className="h-24 w-full md:w-1/3" delay={0.4} />
  </div>
);

export const RecommendationSkeleton = () => (
  <div className="w-full p-6 rounded-2xl border border-white/10 bg-white/5 mb-8">
    <SkeletonBase className="h-6 w-3/4 mb-4" />
    <SkeletonBase className="h-4 w-1/2 mb-6" />
    <SkeletonBase className="h-12 w-full rounded-xl" delay={0.2} />
  </div>
);

export const GoalSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    {[0, 1, 2].map((i) => (
      <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/5">
        <SkeletonBase className="h-5 w-2/3 mb-4" delay={i * 0.1} />
        <SkeletonBase className="h-2 w-full rounded-full mb-2" delay={i * 0.1} />
        <SkeletonBase className="h-4 w-1/3" delay={i * 0.1} />
      </div>
    ))}
  </div>
);

export const ForecastSkeleton = () => (
  <div className="w-full p-6 rounded-2xl border border-white/10 bg-white/5 mb-8">
    <SkeletonBase className="h-5 w-1/4 mb-6" />
    <div className="flex justify-between items-center">
      <SkeletonBase className="h-20 w-5/12" delay={0.1} />
      <SkeletonBase className="h-10 w-2/12 rounded-full" delay={0.2} />
      <SkeletonBase className="h-20 w-5/12" delay={0.3} />
    </div>
  </div>
);

export const SignalSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[0, 1, 2].map((i) => (
      <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/5">
        <SkeletonBase className="h-5 w-1/2 mb-3" delay={i * 0.15} />
        <SkeletonBase className="h-4 w-full mb-2" delay={i * 0.15} />
        <SkeletonBase className="h-4 w-3/4" delay={i * 0.15} />
      </div>
    ))}
  </div>
);

export function DashboardSkeletons() {
  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex flex-col w-64 h-screen border-r border-white/5 bg-[#0a0a0a]/80 p-6 gap-6">
        <SkeletonBase className="h-10 w-3/4 mb-4" />
        {[0,1,2,3,4,5].map(i => (
          <SkeletonBase key={i} className="h-10 w-full" delay={i * 0.1} />
        ))}
      </div>
      
      {/* Main Content Skeleton */}
      <div className="flex-1 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <FinancialStatusSkeleton />
        <RecommendationSkeleton />
        <GoalSkeleton />
        <ForecastSkeleton />
        <SignalSkeleton />
      </div>
    </div>
  );
}
