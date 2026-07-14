import { useState, useEffect } from 'react';
import apiFetch from '../services/api';
import type { Category, ApiResponse } from '../types/achievement';

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook untuk mengambil semua kategori dari backend.
 * Digunakan di filter dropdown halaman Prestasi dan menu navigasi.
 */
export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiFetch<ApiResponse<Category[]>>('/categories');

        if (!cancelled) {
          setCategories(res.data ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Gagal memuat kategori.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
}
