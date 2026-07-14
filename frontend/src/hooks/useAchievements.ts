import { useState, useEffect } from 'react';
import apiFetch from '../services/api';
import type { Achievement, PaginatedResponse } from '../types/achievement';

export interface AchievementFilters {
  search?: string;
  category_id?: number | string;
  level?: string;
  sort?: string;
  per_page?: number;
  page?: number;
}

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
        // Bangun query string dari filters
        const params = new URLSearchParams();
        if (filters.search) params.set('search', filters.search);
        if (filters.category_id) params.set('category_id', String(filters.category_id));
        if (filters.level) params.set('level', filters.level);
        if (filters.sort) params.set('sort', filters.sort);
        if (filters.per_page) params.set('per_page', String(filters.per_page));
        if (filters.page) params.set('page', String(filters.page));

        const query = params.toString() ? `?${params.toString()}` : '';
        const res = await apiFetch<PaginatedResponse<Achievement>>(`/public/achievements${query}`);

        if (!cancelled) {
          setAchievements(res.data ?? []);
          setMeta(res.meta ?? null);
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
