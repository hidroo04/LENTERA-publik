import { Link } from 'react-router-dom';
import './Beranda.css';

// Import Icon
import { FaSearch, FaTrophy, FaThLarge, FaMedal, FaArrowRight, FaStar } from 'react-icons/fa';

// Import Hooks API
import { useAchievements } from '../../hooks/useAchievements';
import { useStatistics } from '../../hooks/useStatistics';

// Import Utils & Constants
import { formatDate, levelBadgeClass } from '../../utils';
import { STORAGE_URL, FALLBACK_IMAGE } from '../../constants';

import BpsBg from '../../assets/bps.jpg';
import LatestAchievements from "../../features/home/components/LatestAchievements";
import { HomeSearch } from "../../features/home";

const Beranda = () => {
  // ── Statistik dari backend ──────────────────────────────────────────────────
  const { stats, loading: statsLoading } = useStatistics();

  // ── Prestasi terbaru (3 item) dari backend ──────────────────────────────────
  const { achievements: prestasiTerbaru, loading: prestasiLoading } = useAchievements({
    per_page: 3,
    sort: 'terbaru',
  });

  return (
    <div className="beranda-container">

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
                    <p className="stat-label">Prestasi</p>
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
            <HomeSearch />
          </div>
        </section>
      </div>

      {/* ── Prestasi Terbaru ───────────────────────────────────────────── */}
      <LatestAchievements
          achievements={prestasiTerbaru}
          loading={prestasiLoading}
      />

    </div>
  );
};

export default Beranda;