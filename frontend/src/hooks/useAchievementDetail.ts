import { useState, useEffect } from 'react';
import apiFetch from '../services/api';
import type { Achievement, ApiResponse } from '../types/achievement';

interface UseAchievementDetailReturn {
  achievement: Achievement | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook untuk mengambil detail satu prestasi berdasarkan slug.
 * Digunakan di halaman /prestasi/:slug
 */
export function useAchievementDetail(slug: string | undefined): UseAchievementDetailReturn {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiFetch<ApiResponse<Achievement>>(`/public/achievements/${slug}`);

        if (!cancelled) {
          setAchievement(res.data ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Prestasi tidak ditemukan.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [slug]);

  return { achievement, loading, error };
}
