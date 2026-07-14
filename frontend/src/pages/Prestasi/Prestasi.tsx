import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './prestasi.css';

// Import Header dan Footer
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Import Icons
import { FaSearch, FaArrowRight, FaChevronDown, FaFilter } from 'react-icons/fa';

// Import Hooks API
import { useAchievements } from '../../hooks/useAchievements';
import { useCategories } from '../../hooks/useCategories';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600';

// ── Helper ─────────────────────────────────────────────────────────────────────
function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function levelClass(level: string): string {
  switch (level) {
    case 'Internasional': return 'badge-internasional';
    case 'Nasional':      return 'badge-nasional';
    case 'Provinsi':      return 'badge-provinsi';
    default:              return 'badge-kabupaten';
  }
}

// ── Custom Dropdown ────────────────────────────────────────────────────────────
interface DropdownProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
        <span>{value}</span>
        <FaChevronDown className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className={`dropdown-item ${value === option ? 'active' : ''}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Halaman Prestasi ───────────────────────────────────────────────────────────
const Prestasi = () => {
  const [searchParams] = useSearchParams();

  // State filter — sinkronkan dari URL query jika ada (dari redirect Beranda search)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');
  const [searchInput, setSearchInput]  = useState(searchParams.get('search') ?? '');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedLevel, setSelectedLevel]       = useState('Semua Level');
  const [selectedSort, setSelectedSort]         = useState('Terbaru');
  const [currentPage, setCurrentPage]           = useState(1);

  // ── Data dari API ──────────────────────────────────────────────────────────
  const { categories } = useCategories();

  // Bangun filter berdasarkan state
  const categoryId = categories.find(c => c.name === selectedCategory)?.id;
  const levelMap: Record<string, string> = {
    'Nasional':      'Nasional',
    'Provinsi':      'Provinsi',
    'Internasional': 'Internasional',
    'Kabupaten':     'Kabupaten',
  };
  const sortMap: Record<string, string> = {
    'Terbaru':   'terbaru',
    'Terlama':   'terlama',
    'Alfabetis': 'alphabetical',
  };

  const { achievements, loading, error, meta } = useAchievements({
    search:      searchQuery || undefined,
    category_id: categoryId,
    level:       selectedLevel !== 'Semua Level' ? levelMap[selectedLevel] : undefined,
    sort:        sortMap[selectedSort] ?? 'terbaru',
    per_page:    9,
    page:        currentPage,
  });

  // Reset halaman ke 1 jika filter berubah
  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategory, selectedLevel, selectedSort]);

  // Opsi dropdown — kategori dari API + "Semua Kategori"
  const categoryOptions = ['Semua Kategori', ...categories.map(c => c.name)];
  const levelOptions    = ['Semua Level', 'Nasional', 'Internasional', 'Provinsi', 'Kabupaten'];
  const sortOptions     = ['Terbaru', 'Terlama', 'Alfabetis'];

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      <Header />

      <main className="prestasi-main">
        {/* Header Section */}
        <div className="prestasi-header-section">
          <h1 className="prestasi-page-title">Daftar Prestasi</h1>
          <p className="prestasi-page-subtitle">
            Menampilkan seluruh prestasi yang telah dipublikasikan.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon-filter" />
            <input
              type="text"
              placeholder="Cari judul prestasi..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div className="dropdowns-wrapper">
            <CustomDropdown options={categoryOptions}  value={selectedCategory}  onChange={setSelectedCategory} />
            <CustomDropdown options={levelOptions}     value={selectedLevel}     onChange={setSelectedLevel} />
            <CustomDropdown options={sortOptions}      value={selectedSort}      onChange={setSelectedSort} />
          </div>

          <button className="btn-filter-search" onClick={handleSearch} title="Terapkan Filter">
            <FaFilter /> Filter
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="fetch-error">
            <p>⚠️ {error}</p>
            <p>Pastikan backend Laravel berjalan di <code>http://127.0.0.1:8000</code></p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="daftar-prestasi-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="daftar-prestasi-card daftar-prestasi-card--skeleton">
                <div className="skeleton-card-img" />
                <div className="card-body">
                  <div className="sk-line sk-line--short" />
                  <div className="sk-line" />
                  <div className="sk-line sk-line--medium" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid Prestasi */}
        {!loading && !error && (
          <>
            {/* Info jumlah hasil */}
            {meta && (
              <p className="result-count">
                Menampilkan <strong>{achievements.length}</strong> dari <strong>{meta.total}</strong> prestasi
              </p>
            )}

            {achievements.length === 0 ? (
              <div className="empty-state">
                <p>Tidak ada prestasi yang sesuai filter.</p>
              </div>
            ) : (
              <div className="daftar-prestasi-grid">
                {achievements.map((item) => (
                  <div key={item.id} className="daftar-prestasi-card">
                    <img
                      src={item.thumbnail_url ?? FALLBACK_IMAGE}
                      alt={item.title}
                      className="card-img"
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                    />
                    <div className="card-body">
                      <div className="card-top-meta">
                        <div className="card-badges">
                          <span className={`badge-tingkat ${levelClass(item.level)}`}>{item.level}</span>
                          {item.category?.name && (
                            <span className="badge-kategori">{item.category.name}</span>
                          )}
                        </div>
                        <span className="card-tanggal">{formatDate(item.achievement_date)}</span>
                      </div>
                      <h4 className="card-title-text">{item.title}</h4>
                      <p className="card-deskripsi">{item.short_description}</p>
                      <Link to={`/prestasi/${item.slug}`} className="card-action-link">
                        Lihat Detail <FaArrowRight style={{ marginLeft: '6px', fontSize: '11px' }} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {meta && meta.last_page > 1 && (
              <div className="pagination-wrapper">
                <button
                  className="page-btn"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  ← Sebelumnya
                </button>

                <span className="page-info">
                  Halaman {meta.current_page} dari {meta.last_page}
                </span>

                <button
                  className="page-btn"
                  disabled={currentPage >= meta.last_page}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Prestasi;