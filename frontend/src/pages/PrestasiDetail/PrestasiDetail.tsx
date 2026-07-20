import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaTrophy, FaCalendarAlt, FaBuilding, FaUser, FaTag } from 'react-icons/fa';

import { useAchievementDetail } from '../../hooks/useAchievementDetail';
import { formatDate, levelBadgeClass } from '../../utils';
import { FALLBACK_IMAGE } from '../../constants';
import './PrestasiDetail.css';


const PrestasiDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { achievement, loading, error } = useAchievementDetail(slug);

  return (
    <div className="detail-container">

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
                <span className={`detail-badge ${levelBadgeClass(achievement.level, 'badge')}`}>
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
              
              {achievement.attachment_url && (
                <div style={{ marginTop: '2rem' }}>
                    <a href={achievement.attachment_url} target="_blank" rel="noreferrer" className="back-btn" style={{ background: '#2563eb', color: 'white', display: 'inline-flex', padding: '10px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 }}>
                        Lihat Dokumen / Sertifikat
                    </a>
                </div>
              )}
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

    </div>
  );
};

export default PrestasiDetail;
