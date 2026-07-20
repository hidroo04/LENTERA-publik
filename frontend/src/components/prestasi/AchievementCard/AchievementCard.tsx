import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import type { Achievement } from '../../../types';
import { formatDate, levelBadgeClass } from '../../../utils';
import { FALLBACK_IMAGE } from '../../../constants';
import './AchievementCard.css';

export interface AchievementCardProps {
  achievement: Achievement;
}

/**
 * AchievementCard — Kartu ringkasan satu prestasi.
 * Digunakan di halaman Prestasi (grid daftar) dan Beranda (prestasi terbaru).
 */
const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const { id, title, slug, level, category, achievement_date, short_description, thumbnail_url } = achievement;

  return (
    <article key={id} className="achievement-card">
      <img
        src={thumbnail_url ?? FALLBACK_IMAGE}
        alt={title}
        className="achievement-card__img"
        onError={(e) => {
          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
        }}
        loading="lazy"
      />

      <div className="achievement-card__body">
        {/* Meta baris atas: badges + tanggal */}
        <div className="achievement-card__meta">
          <div className="achievement-card__badges">
            <span className={`badge-level ${levelBadgeClass(level, 'badge')}`}>
              {level}
            </span>
            {category?.name && (
              <span className="badge-category">{category.name}</span>
            )}
          </div>
          <span className="achievement-card__date">{formatDate(achievement_date)}</span>
        </div>

        {/* Judul */}
        <h3 className="achievement-card__title">{title}</h3>

        {/* Deskripsi singkat */}
        <p className="achievement-card__desc">{short_description}</p>

        {/* Link ke detail */}
        <Link to={`/prestasi/${slug}`} className="achievement-card__link">
          Lihat Detail <FaArrowRight style={{ marginLeft: '6px', fontSize: '11px' }} />
        </Link>
      </div>
    </article>
  );
};

export default AchievementCard;
