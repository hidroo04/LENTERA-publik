import { Link } from 'react-router-dom';
import './Beranda.css';

// Import Komponen Terpisah
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Import Icon
import { FaSearch, FaTrophy, FaThLarge, FaMedal, FaArrowRight, FaStar } from 'react-icons/fa';

// Import Hooks API
import { useAchievements } from '../../hooks/useAchievements';
import { useStatistics } from '../../hooks/useStatistics';

// IMPORT GAMBAR BACKGROUND
import BpsBg from '../../assets/bps.jpg';

// Helper: format tanggal dari "YYYY-MM-DD" ke "D MMM YYYY"
function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Helper: warna badge level
function levelClass(level: string): string {
  switch (level) {
    case 'Internasional': return 'tag-internasional';
    case 'Nasional':      return 'tag-nasional';
    case 'Provinsi':      return 'tag-provinsi';
    default:              return 'tag-kabupaten';
  }
}

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL ?? 'http://127.0.0.1:8000/storage';

const Beranda = () => {
  // ── Statistik dari backend ──────────────────────────────────────────────────
  const { stats, loading: statsLoading } = useStatistics();

  // ── Prestasi terbaru (3 item) dari backend ──────────────────────────────────
  const { achievements: prestasiTerbaru, loading: prestasiLoading } = useAchievements({
    per_page: 3,
    sort: 'terbaru',
  });

  const fallbackImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400';

  return (
    <div className="beranda-container">
      <Header />

      <div className="hero-wrapper" style={{ backgroundImage: `url(${BpsBg})` }}>
        <div className="hero-overlay-gradient"></div>

        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-subtitle">Portal Publik Prestasi</p>
            <h2 className="hero-title">
              Capaian BPS tersaji <br /> jernih, terverifikasi, <br /> dan <span>mudah dibagikan.</span>
            </h2>
            <p className="hero-desc">
              Publikasi prestasi Badan Pusat Statistik yang menampilkan penghargaan, inovasi layanan, dan capaian kelembagaan secara modern, terbuka, serta ramah pencarian.
            </p>

            <Link to="/prestasi" className="btn-primary">
              Jelajahi Prestasi
              <FaArrowRight className="btn-icon" />
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stats-card">
              <div className="stats-grid">
                {/* Stat: Total Prestasi */}
                <div className="stat-item">
                  <div className="stat-icon bg-blue"><FaTrophy size={20} /></div>
                  <div className="stat-text">
                    <p className="stat-value">
                      {statsLoading ? '...' : (stats?.total_achievements ?? 0)}
                    </p>
                    <p className="stat-label">Prestasi<br/>Published</p>
                  </div>
                </div>

                {/* Stat: Kategori */}
                <div className="stat-item">
                  <div className="stat-icon bg-green"><FaThLarge size={20} /></div>
                  <div className="stat-text">
                    <p className="stat-value">
                      {statsLoading ? '...' : (stats?.total_categories ?? 0)}
                    </p>
                    <p className="stat-label">Kategori</p>
                  </div>
                </div>

                {/* Stat: Nasional */}
                <div className="stat-item">
                  <div className="stat-icon bg-orange"><FaMedal size={20} /></div>
                  <div className="stat-text">
                    <p className="stat-value">
                      {statsLoading ? '...' : (stats?.national ?? 0)}
                    </p>
                    <p className="stat-label">Nasional</p>
                  </div>
                </div>

                {/* Stat: Internasional */}
                <div className="stat-item">
                  <div className="stat-icon bg-purple"><FaStar size={20} /></div>
                  <div className="stat-text">
                    <p className="stat-value">
                      {statsLoading ? '...' : (stats?.international ?? 0)}
                    </p>
                    <p className="stat-label">Internasional</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="search-bar-container">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Cari prestasi, kategori, atau kata kunci..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val) window.location.href = `/prestasi?search=${encodeURIComponent(val)}`;
                    }
                  }}
                />
                <button
                  className="btn-search"
                  onClick={() => {
                    const input = document.querySelector<HTMLInputElement>('.search-bar input');
                    const val = input?.value.trim();
                    if (val) window.location.href = `/prestasi?search=${encodeURIComponent(val)}`;
                  }}
                >
                  <FaSearch size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Prestasi Terbaru ───────────────────────────────────────────── */}
      <section className="prestasi-section">
        <div className="prestasi-header">
          <div className="prestasi-title-wrapper">
            <span className="line-accent"></span>
            <h3>Prestasi Terbaru</h3>
          </div>

          <Link to="/prestasi" className="link-semua">
            Lihat semua prestasi
            <FaArrowRight className="link-icon" />
          </Link>
        </div>

        {/* Loading State */}
        {prestasiLoading && (
          <div className="prestasi-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="prestasi-card prestasi-card--skeleton">
                <div className="skeleton-img" />
                <div className="card-content">
                  <div className="skeleton-line skeleton-line--short" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line skeleton-line--medium" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Data dari API */}
        {!prestasiLoading && (
          <div className="prestasi-grid">
            {prestasiTerbaru.length === 0 ? (
              <p style={{ color: '#888', padding: '24px 0' }}>Belum ada prestasi yang dipublikasikan.</p>
            ) : (
              prestasiTerbaru.map((item) => (
                <div key={item.id} className="prestasi-card">
                  <img
                    src={item.thumbnail_url ? `${STORAGE_URL}/${item.thumbnail_url.replace(/^.*\/storage\//, '')}` : fallbackImage}
                    alt={item.title}
                    className="card-image"
                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                  />
                  <div className="card-content">
                    <div className="card-meta">
                      <div className="card-tags">
                        <span className={`tag-tingkat ${levelClass(item.level)}`}>{item.level}</span>
                        {item.category?.name && (
                          <span className="tag-kategori">{item.category.name}</span>
                        )}
                      </div>
                      <span className="card-date">{formatDate(item.achievement_date)}</span>
                    </div>
                    <h4 className="card-title">{item.title}</h4>
                    <p className="card-desc">{item.short_description}</p>
                    <Link to={`/prestasi/${item.slug}`} className="card-link">
                      Lihat Detail <FaArrowRight style={{ marginLeft: '4px', fontSize: '10px' }} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Beranda;