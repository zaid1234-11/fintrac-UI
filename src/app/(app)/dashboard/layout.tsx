import { DashboardLayout } from '@/features/dashboard/DashboardLayout';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Dashboard | FinTrac AI',
  description: 'Your financial command center.',
};

import { ClerkProvider } from '@clerk/nextjs';

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
