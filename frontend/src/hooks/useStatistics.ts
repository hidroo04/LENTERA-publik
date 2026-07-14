import { useState, useEffect } from 'react';
import apiFetch from '../services/api';
import type { Statistics, ApiResponse } from '../types/achievement';

interface UseStatisticsReturn {
  stats: Statistics | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook untuk mengambil statistik prestasi dari backend.
 * Digunakan di section stats card pada Beranda.
 *
 * Response backend:
 * {
 *   total_achievements: number,
 *   total_categories: number,
 *   national: number,
 *   international: number
 * }
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
        const res = await apiFetch<ApiResponse<Statistics>>('/achievements/statistics');

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
