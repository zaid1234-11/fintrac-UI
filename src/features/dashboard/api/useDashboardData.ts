import { useQuery } from '@tanstack/react-query';

export function useBehavioralProfile() {
  return useQuery({
    queryKey: ['behavioral-profile'],
    queryFn: async () => {
      const res = await fetch('/api/behavioral-profile');
      if (!res.ok) throw new Error('Failed to fetch behavioral profile');
      return res.json();
    },
  });
}

export function useTelemetry() {
  return useQuery({
    queryKey: ['telemetry'],
    queryFn: async () => {
      const res = await fetch('/api/telemetry');
      if (!res.ok) throw new Error('Failed to fetch telemetry');
      return res.json();
    },
  });
}

export function useTransactions(limit: number = 100) {
  return useQuery({
    queryKey: ['transactions', limit],
    queryFn: async () => {
      const res = await fetch(`/api/transactions?limit=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch transactions');
      return res.json();
    },
  });
}

