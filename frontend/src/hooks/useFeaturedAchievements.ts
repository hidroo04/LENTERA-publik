import { useState, useEffect } from 'react';
import apiFetch from '../services/api';
import type { Achievement, ApiResponse } from '../types/achievement';

interface UseFeaturedReturn {
  featured: Achievement[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook untuk mengambil daftar prestasi unggulan (featured).
 * Digunakan di Hero / Slider section Beranda.
 */
export function useFeaturedAchievements(): UseFeaturedReturn {
  const [featured, setFeatured] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiFetch<ApiResponse<Achievement[]>>('/achievements/featured');

        if (!cancelled) {
          setFeatured(res.data ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Gagal memuat prestasi unggulan.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { featured, loading, error };
}
