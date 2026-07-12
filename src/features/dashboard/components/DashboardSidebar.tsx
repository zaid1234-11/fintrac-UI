'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Wallet,
  Target,
  Settings,
  LogOut,
  BrainCircuit,
  LineChart,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const navItems = [
  { icon: LayoutDashboard, label: 'Command Center', href: '/dashboard' },
  { icon: Target, label: 'Goals', href: '/dashboard/goals' },
  { icon: LineChart, label: 'Forecast', href: '/dashboard/forecast' },
  { icon: Wallet, label: 'Transactions', href: '/dashboard/transactions' },
  { icon: BrainCircuit, label: 'Insights', href: '/dashboard/insights' },
  { icon: ShieldCheck, label: 'Trust Center', href: '/dashboard/trust-center' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function DashboardSidebar({ isCollapsed = false, onToggle }: { isCollapsed?: boolean; onToggle?: () => void }) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && sidebarRef.current) {
      // @ts-ignore
      const glass = window.liquidGlass(sidebarRef.current, { scale: -112, chroma: 6 });
      return () => {
        if (glass && glass.destroy) glass.destroy();
      };
    }
  }, []);

  return (
    <m.aside 
      ref={sidebarRef}
      initial={false}
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="sidebar-liquid-glass !fixed left-4 top-4 h-[calc(100vh-2rem)] z-50 flex-col hidden md:flex overflow-hidden"
    >
      {/* Brand & Toggle */}
      <div className={`h-24 flex items-center justify-between relative z-10 ${isCollapsed ? 'px-5' : 'px-6'}`}>
        <Link 
          href="/dashboard" 
          className={`flex items-center gap-3 group ${isCollapsed ? 'cursor-pointer' : ''}`}
          onClick={(e) => {
            if (isCollapsed && onToggle) {
              e.preventDefault();
              onToggle();
            }
          }}
        >
          <div className="w-8 h-8 relative group-hover:scale-105 transition-transform shrink-0">
            <Image src="/logo.png" alt="FinTrac Logo" fill className="object-contain" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <m.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-lexend font-medium text-base tracking-wide text-[#FFFBE6] whitespace-nowrap"
              >
                FinTrac <span className="text-[#FFFBE6]/70">OS</span>
              </m.span>
            )}
          </AnimatePresence>
        </Link>
        
        {!isCollapsed && onToggle && (
          <button 
            onClick={onToggle}
            className="p-1.5 rounded-lg text-[#FFFBE6]/70 hover:text-[#FFFBE6] hover:bg-[#FFFBE6]/5 transition-colors shrink-0"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 py-2 flex flex-col gap-2 overflow-y-auto relative z-10 ${isCollapsed ? 'px-3' : 'px-4'}`}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${isActive
                  ? 'text-[#FFFBE6]'
                  : 'text-[#FFFBE6]/80 hover:text-[#FFFBE6] hover:bg-[#FFFBE6]/5'
                }`}
            >
              {isActive && (
                <m.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-white/[0.04] rounded-xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]"
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              )}
              <item.icon className={`w-4 h-4 relative z-10 transition-colors shrink-0 ${isActive ? 'text-[#FFFBE6] drop-shadow-[0_0_8px_rgba(255,251,230,0.2)]' : 'group-hover:text-[#FFFBE6]'}`} />
              <AnimatePresence>
                {!isCollapsed && (
                  <m.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="relative z-10 text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </m.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className={`relative z-10 mb-2 ${isCollapsed ? 'p-3' : 'p-4'}`}>
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FFFBE6]/5 transition-colors cursor-pointer group">
          <div className="shrink-0">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8 border border-[#FFFBE6]/10 shadow-md"
                }
              }}
            />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <m.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex flex-col whitespace-nowrap overflow-hidden"
              >
                <span className="text-sm font-medium text-[#FFFBE6] group-hover:text-[#FFFBE6] transition-colors">Profile</span>
                <span className="text-xs text-[#FFFBE6]/70">Settings & Trust</span>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </m.aside>
  );
}
