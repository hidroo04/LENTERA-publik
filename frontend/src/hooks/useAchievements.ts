import { useState, useEffect } from 'react';
import { achievementApi } from '../api';
import type { Achievement, PaginatedResponse, AchievementFilters } from '../types';

interface UseAchievementsReturn {
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
  meta: PaginatedResponse<Achievement>['meta'] | null;
  refetch: () => void;
}

/**
 * Hook untuk mengambil daftar prestasi yang sudah dipublish.
 * Mendukung filter: search, category, level, sort, pagination.
 */
export function useAchievements(filters: AchievementFilters = {}): UseAchievementsReturn {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginatedResponse<Achievement>['meta'] | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await achievementApi.list(filters);

        if (!cancelled) {
          setAchievements(res.data ?? []);
          // Terkadang response dari API menggunakan key 'pagination' alih-alih 'meta'
          // Kita akan cek keduanya untuk memastikan Pagination tidak gagal dirender.
          setMeta(res.meta || (res as any).pagination || null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Gagal memuat prestasi.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.search,
    filters.category_id,
    filters.level,
    filters.sort,
    filters.per_page,
    filters.page,
    trigger,
  ]);

  return { achievements, loading, error, meta, refetch: () => setTrigger(t => t + 1) };
}

