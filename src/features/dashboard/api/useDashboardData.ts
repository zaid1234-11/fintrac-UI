import { useQuery } from '@tanstack/react-query';

export function useBehavioralProfile() {
  return useQuery({
    queryKey: ['behavioral-profile'],
    queryFn: async () => {
      console.log('Fetching behavioral profile...');
      try {
        const res = await fetch('/api/behavioral-profile');
        if (!res.ok) return null;
        return await res.json();
      } catch (err) {
        return null;
      }
    },
  });
}

export function useTelemetry() {
  return useQuery({
    queryKey: ['telemetry'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/telemetry');
        if (!res.ok) return null;
        return await res.json();
      } catch (err) {
        return null;
      }
    },
  });
}

export function useTransactions(limit: number = 100) {
  return useQuery({
    queryKey: ['transactions', limit],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/transactions?limit=${limit}`);
        if (!res.ok) return null;
        return await res.json();
      } catch (err) {
        return null;
      }
    },
  });
}

