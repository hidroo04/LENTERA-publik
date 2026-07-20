import React from 'react';
import './AchievementCardSkeleton.css';

/**
 * AchievementCardSkeleton — Placeholder loading untuk AchievementCard.
 * Tampilkan saat data dari API masih dalam proses fetch.
 */
const AchievementCardSkeleton: React.FC = () => (
  <div className="achievement-card-skeleton" aria-hidden="true">
    <div className="acs__img" />
    <div className="acs__body">
      <div className="acs__line acs__line--short" />
      <div className="acs__line acs__line--full" />
      <div className="acs__line acs__line--medium" />
    </div>
  </div>
);

export default AchievementCardSkeleton;
