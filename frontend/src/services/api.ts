// =============================================================================
// API Service — Semua request ke backend Laravel
// =============================================================================

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

/**
 * Helper fetch generik dengan error handling terpusat.
 */
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      (errorBody as { message?: string }).message ??
        `HTTP Error ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}

export default apiFetch;
