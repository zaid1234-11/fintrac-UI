'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CommandCenterPreview from '@/components/dashboard/CommandCenterPreview';

export function DashboardView() {
  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-lexend text-3xl md:text-4xl font-bold text-white tracking-tight">
            Command Center
          </h1>
          <p className="text-white/50 mt-1 font-geist text-sm">
            Welcome back. Your financial engine is running smoothly.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-geist text-white/70 uppercase tracking-widest">Engine Active</span>
          </div>
        </motion.div>
      </header>

      {/* Main Dashboard Components from the design system */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CommandCenterPreview />
      </motion.div>
    </div>
  );
}
