import { useState, useEffect } from 'react';
import { achievementApi } from '../api';
import type { Achievement } from '../types';

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
        const res = await achievementApi.detail(slug);

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

