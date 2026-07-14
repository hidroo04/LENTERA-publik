import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaTrophy, FaCalendarAlt, FaBuilding, FaUser, FaTag } from 'react-icons/fa';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useAchievementDetail } from '../../hooks/useAchievementDetail';
import './PrestasiDetail.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function levelClass(level: string): string {
  switch (level) {
    case 'Internasional': return 'badge-internasional';
    case 'Nasional':      return 'badge-nasional';
    case 'Provinsi':      return 'badge-provinsi';
    default:              return 'badge-kabupaten';
  }
}

const PrestasiDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { achievement, loading, error } = useAchievementDetail(slug);

  return (
    <div className="detail-container">
      <Header />

      <main className="detail-main">
        {/* Breadcrumb */}
        <nav className="detail-breadcrumb">
          <Link to="/" className="breadcrumb-link">Beranda</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/prestasi" className="breadcrumb-link">Prestasi</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">
            {loading ? '...' : (achievement?.title ?? 'Detail')}
          </span>
        </nav>

        {/* Loading State */}
        {loading && (
          <div className="detail-skeleton">
            <div className="sk-hero-img" />
            <div className="sk-title" />
            <div className="sk-subtitle" />
            <div className="sk-body" />
            <div className="sk-body sk-body--short" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="detail-error">
            <FaTrophy size={48} style={{ color: '#e2e8f0', marginBottom: '1rem' }} />
            <h2>Prestasi Tidak Ditemukan</h2>
            <p>{error}</p>
            <Link to="/prestasi" className="back-btn">
              <FaArrowLeft /> Kembali ke Daftar Prestasi
            </Link>
          </div>
        )}

        {/* Detail Content */}
        {achievement && !loading && !error && (
          <article className="detail-article">
            {/* Header Artikel */}
            <div className="detail-head">
              <div className="detail-badges">
                <span className={`detail-badge ${levelClass(achievement.level)}`}>
                  {achievement.level}
                </span>
                {achievement.category?.name && (
                  <span className="detail-badge badge-category">
                    {achievement.category.name}
                  </span>
                )}
              </div>

              <h1 className="detail-title">{achievement.title}</h1>

              <div className="detail-meta-row">
                <span className="meta-item">
                  <FaCalendarAlt />
                  {formatDate(achievement.achievement_date)}
                </span>
                {achievement.organizer && (
                  <span className="meta-item">
                    <FaBuilding />
                    {achievement.organizer}
                  </span>
                )}
                {achievement.recipient && (
                  <span className="meta-item">
                    <FaUser />
                    {achievement.recipient}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail */}
            <div className="detail-thumbnail-wrapper">
              <img
                src={achievement.thumbnail_url ?? FALLBACK_IMAGE}
                alt={achievement.title}
                className="detail-thumbnail"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
              />
            </div>

            {/* Deskripsi Lengkap */}
            <div className="detail-description">
              <h2 className="detail-section-title">
                <FaTag style={{ marginRight: '8px', opacity: 0.6 }} />
                Tentang Prestasi Ini
              </h2>
              <div className="detail-body">
                {achievement.description
                  ? achievement.description.split('\n').map((para, i) =>
                      para.trim() ? <p key={i}>{para}</p> : null
                    )
                  : <p style={{ color: '#999' }}>Deskripsi belum tersedia.</p>
                }
              </div>
            </div>

            {/* Footer artikel */}
            <div className="detail-footer">
              <p className="detail-published">
                Dipublikasikan: {formatDate(achievement.published_at?.slice(0, 10) ?? null)}
              </p>
              <Link to="/prestasi" className="back-btn">
                <FaArrowLeft /> Kembali ke Daftar Prestasi
              </Link>
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PrestasiDetail;
