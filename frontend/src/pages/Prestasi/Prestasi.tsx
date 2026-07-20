import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LuTriangleAlert, LuSearchX } from 'react-icons/lu';
import './Prestasi.css';

// ── Komponen Modular ────────────────────────────────────────────────────────
import { FilterBar, AchievementCard, AchievementCardSkeleton, Pagination } from '../../components/prestasi';

// ── Hooks API ───────────────────────────────────────────────────────────────
import { useAchievements } from '../../hooks/useAchievements';
import { useCategories } from '../../hooks/useCategories';

// ── Konstanta Peta ──────────────────────────────────────────────────────────
const LEVEL_MAP: Record<string, string> = {
  Nasional: 'Nasional',
  Provinsi: 'Provinsi',
  Internasional: 'Internasional',
  Kabupaten: 'Kabupaten',
};

const SORT_MAP: Record<string, string> = {
  Terbaru: 'latest',
  Terlama: 'oldest',
  Alfabetis: 'title',
};

const LEVEL_OPTIONS = ['Semua Level', 'Nasional', 'Internasional', 'Provinsi', 'Kabupaten'];
const SORT_OPTIONS = ['Terbaru', 'Terlama', 'Alfabetis'];

// ── Halaman Prestasi ────────────────────────────────────────────────────────
const Prestasi = () => {
  const [searchParams] = useSearchParams();

  // State filter — sinkronkan dari URL query jika ada (dari redirect Beranda search)
  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedLevel, setSelectedLevel] = useState('Semua Level');
  const [selectedSort, setSelectedSort] = useState('Terbaru');
  const [currentPage, setCurrentPage] = useState(1);

  // ── Data Kategori dari API ─────────────────────────────────────────────────
  const { categories } = useCategories();
  const categoryOptions = ['Semua Kategori', ...categories.map(c => c.name)];

  // ── Bangun filter untuk query ──────────────────────────────────────────────
  const categoryId = categories.find(c => c.name === selectedCategory)?.id;

  const { achievements, loading, error, meta } = useAchievements({
    search: searchQuery || undefined,
    category_id: categoryId,
    level: selectedLevel !== 'Semua Level' ? LEVEL_MAP[selectedLevel] : undefined,
    sort: SORT_MAP[selectedSort] ?? 'latest',
    per_page: 9,
    page: currentPage,
  });

  // Reset ke halaman 1 jika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLevel, selectedSort]);

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      <main className="prestasi-main">

        {/* ── Header Section ───────────────────────────────────────────────── */}
        <div className="prestasi-header-section">
          <h1 className="prestasi-page-title">Daftar Prestasi</h1>
          <p className="prestasi-page-subtitle">
            Menampilkan seluruh prestasi yang telah dipublikasikan.
          </p>
        </div>

        {/* ── Filter Bar ───────────────────────────────────────────────────── */}
        <FilterBar
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          categoryOptions={categoryOptions}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          levelOptions={LEVEL_OPTIONS}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          sortOptions={SORT_OPTIONS}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          onSearch={handleSearch}
        />

        {/* ── Error State ──────────────────────────────────────────────────── */}
        {error && (
          <div className="prestasi-error" role="alert">
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <LuTriangleAlert size={20} /> {error}
            </p>
            <p>Pastikan backend Laravel berjalan di <code>http://127.0.0.1:8000</code></p>
          </div>
        )}

        {/* ── Loading State (Skeleton) ─────────────────────────────────────── */}
        {loading && (
          <div className="prestasi-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <AchievementCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ── Hasil Pencarian ──────────────────────────────────────────────── */}
        {!loading && !error && (
          <>
            {/* Info jumlah hasil */}
            {meta && (
              <p className="result-count">
                Menampilkan <strong>{achievements.length}</strong> dari{' '}
                <strong>{meta.total}</strong> prestasi
              </p>
            )}

            {/* Empty State */}
            {achievements.length === 0 ? (
              <div className="prestasi-empty" role="status">
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <LuSearchX size={20} /> Tidak ada prestasi yang sesuai dengan filter yang dipilih.
                </p>
              </div>
            ) : (
              <div className="prestasi-grid">
                {achievements.map(item => (
                  <AchievementCard key={item.id} achievement={item} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {meta && (
              <Pagination
                meta={meta}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}

      </main>
    </div>
  );
};

export default Prestasi;