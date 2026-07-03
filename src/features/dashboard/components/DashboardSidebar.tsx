'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Wallet, 
  Target, 
  Settings, 
  LogOut,
  BrainCircuit
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const navItems = [
  { icon: LayoutDashboard, label: 'Command Center', href: '/dashboard' },
  { icon: Wallet, label: 'Transactions', href: '/dashboard/transactions' },
  { icon: BrainCircuit, label: 'Behavioral Insights', href: '/dashboard/insights' },
  { icon: Target, label: 'Goals', href: '/dashboard/goals' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl z-50 flex flex-col hidden md:flex">
      {/* Brand */}
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-3 h-3 rounded-full bg-black" />
          </div>
          <span className="font-lexend font-bold text-lg tracking-wide text-white">
            FinTrac <span className="text-white/50">AI</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 flex flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-black font-medium' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-white rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-black' : ''}`} />
              <span className="relative z-10 text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 border border-white/20"
              }
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Profile</span>
            <span className="text-xs text-white/50">Manage Account</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
