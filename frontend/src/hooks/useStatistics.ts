import { useState, useEffect } from 'react';
import { statisticsApi } from '../api';
import type { Statistics } from '../types';

interface UseStatisticsReturn {
  stats: Statistics | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook untuk mengambil statistik prestasi dari backend.
 * Digunakan di section stats card pada Beranda.
 */
export function useStatistics(): UseStatisticsReturn {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await statisticsApi.getStatistics();

        if (!cancelled) {
          setStats(res.data ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Gagal memuat statistik.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading, error };
}

