import React from 'react';
import './Pagination.css';

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

/**
 * Pagination — Komponen navigasi halaman yang dapat digunakan ulang.
 * Menampilkan tombol Sebelumnya, nomor halaman aktif, dan Selanjutnya.
 */
const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange }) => {
  const { current_page, last_page } = meta;

  if (last_page <= 1) return null;

  return (
    <nav
      className="pagination-wrapper"
      aria-label="Navigasi halaman"
      role="navigation"
    >
      <button
        id="btn-halaman-sebelumnya"
        className="pagination__btn"
        disabled={current_page <= 1}
        onClick={() => onPageChange(current_page - 1)}
        aria-label="Halaman sebelumnya"
        type="button"
      >
        ← Sebelumnya
      </button>

      <span className="pagination__info" aria-live="polite">
        Halaman <strong>{current_page}</strong> dari <strong>{last_page}</strong>
      </span>

      <button
        id="btn-halaman-selanjutnya"
        className="pagination__btn"
        disabled={current_page >= last_page}
        onClick={() => onPageChange(current_page + 1)}
        aria-label="Halaman selanjutnya"
        type="button"
      >
        Selanjutnya →
      </button>
    </nav>
  );
};

export default Pagination;
