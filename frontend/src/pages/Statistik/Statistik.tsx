import React, { useState } from 'react';
import { LuTriangleAlert, LuTrophy, LuMedal, LuGlobe, LuFolder, LuCalendar } from 'react-icons/lu';
import bgImage from '../../assets/bps.jpg';
import './Statistik.css';

// ── Hooks API ───────────────────────────────────────────────────────────────
import { useStatistics } from '../../hooks/useStatistics';
import { useAchievements } from '../../hooks/useAchievements';

// ── Types ───────────────────────────────────────────────────────────────────
interface TooltipState {
  show: boolean;
  x: number;
  y: number;
  year: string;
  count: number;
}

// ── Komponen StatCard ────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => (
  <div className="stat-summary-card" style={{ borderRight: `4px solid ${color}` }}>
    <div className="stat-summary-icon" style={{ backgroundColor: `${color}15`, color: color }}>
      {icon}
    </div>
    <div className="stat-summary-info">
      <p className="stat-summary-value">{value}</p>
      <p className="stat-summary-label">{label}</p>
    </div>
  </div>
);

// ── Halaman Statistik ────────────────────────────────────────────────────────
const Statistik: React.FC = () => {
  // ── Data dari backend ────────────────────────────────────────────────────
  const { stats, loading: statsLoading, error: statsError } = useStatistics();

  // Ambil semua prestasi published untuk chart per tahun (max 200, sorted terlama)
  const { achievements, loading: achLoading } = useAchievements({
    per_page: 200,
    sort: 'oldest',
  });

  // ── State tooltip ────────────────────────────────────────────────────────
  const [tooltip, setTooltip] = useState<TooltipState>({
    show: false, x: 0, y: 0, year: '', count: 0,
  });

  // ── Hitung data per tahun dari achievements ──────────────────────────────
  const yearCountMap: Record<string, number> = {};
  achievements.forEach(a => {
    if (a.achievement_date) {
      const year = a.achievement_date.substring(0, 4);
      yearCountMap[year] = (yearCountMap[year] ?? 0) + 1;
    }
  });

  const chartData = Object.entries(yearCountMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, count]) => ({ year, count }));

  const maxCount = chartData.length > 0
    ? Math.max(...chartData.map(d => d.count), 1)
    : 1;
  const yMax = Math.ceil(maxCount / 5) * 5 || 5;
  const ySteps = 5;
  const yAxisLabels = Array.from({ length: ySteps + 1 }, (_, i) =>
    Math.round((yMax / ySteps) * (ySteps - i))
  );

  const isLoading = statsLoading || achLoading;

  return (
    <div className="statistik-page-wrapper">
      <div className="statistik-bg-image" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="statistik-bg-overlay"></div>
      <div className="statistik-bg-dots"></div>

      <main className="statistik-main">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="statistik-header">
          <h1 className="statistik-title">Statistik Prestasi</h1>
          <div className="statistik-underline">
             <div className="line-blue-main"></div>
             <div className="line-blue-light"></div>
          </div>
          <p className="statistik-subtitle">
            Ringkasan dan visualisasi data prestasi dari backend secara real-time.
          </p>
        </div>

        {/* ── Error ────────────────────────────────────────────────────────── */}
        {statsError && (
          <div className="statistik-error" role="alert" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LuTriangleAlert size={20} /> Gagal memuat statistik: {statsError}
          </div>
        )}

        {/* ── Summary Cards ────────────────────────────────────────────────── */}
        {isLoading ? (
          <div className="stat-summary-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="stat-summary-card stat-summary-card--skeleton">
                <div className="ssk-icon" />
                <div className="ssk-body">
                  <div className="ssk-line ssk-line--short" />
                  <div className="ssk-line" />
                </div>
              </div>
            ))}
          </div>
        ) : stats ? (
          <div className="stat-summary-grid">
            <StatCard label="Total Dipublikasikan" value={stats.total_achievements ?? stats.published ?? 0} icon={<LuTrophy size={24} />} color="#003366" />
            <StatCard label="Nasional" value={stats.national ?? 0} icon={<LuMedal size={24} />} color="#15803d" />
            <StatCard label="Internasional" value={stats.international ?? 0} icon={<LuGlobe size={24} />} color="#dc2626" />
            <StatCard label="Total Kategori" value={stats.total_categories ?? 0} icon={<LuFolder size={24} />} color="#ea580c" />
          </div>
        ) : null}

        {/* ── Bar Chart per Tahun ───────────────────────────────────────────── */}
        <div className="chart-center-wrapper">
          <div className="chart-card">
            
            <div className="chart-card-header">
              <h2 className="chart-card-title">Prestasi per Tahun</h2>
              <div className="chart-filter">
                <LuCalendar size={16} className="chart-filter-icon" />
                <select className="chart-select">
                  <option value="semua">Semua Tahun</option>
                </select>
              </div>
            </div>

            {achLoading ? (
              <div className="chart-skeleton">
                <div className="cs-bars">
                  {[60, 85, 40, 100, 70].map((h, i) => (
                    <div key={i} className="cs-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            ) : chartData.length === 0 ? (
              <p className="chart-empty">Belum ada data prestasi untuk ditampilkan.</p>
            ) : (
              <div className="bar-chart-container">
                {/* Sumbu Y */}
                <div className="y-axis">
                  {yAxisLabels.map(label => (
                    <span key={label} className="y-label">{label}</span>
                  ))}
                </div>

                {/* Area Bar */}
                <div className="chart-area">
                  {chartData.map((item, index) => {
                    const heightPercent = (item.count / yMax) * 100;
                    return (
                      <div
                        key={index}
                        className="bar-column"
                        onMouseMove={(e) =>
                          setTooltip({ show: true, x: e.clientX, y: e.clientY, year: item.year, count: item.count })
                        }
                        onMouseLeave={() => setTooltip(t => ({ ...t, show: false }))}
                        aria-label={`${item.year}: ${item.count} prestasi`}
                      >
                        <div className="bar-hover-bg" />
                        <div className="bar-fill" style={{ height: `${heightPercent}%` }} />
                        <span className="x-label">{item.year}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Tooltip melayang */}
      {tooltip.show && (
        <div
          className="custom-tooltip"
          style={{ top: `${tooltip.y}px`, left: `${tooltip.x}px` }}
          aria-hidden="true"
        >
          <div className="tooltip-year">{tooltip.year}</div>
          <div className="tooltip-count">Jumlah prestasi: <strong>{tooltip.count}</strong></div>
        </div>
      )}
    </div>
  );
};

export default Statistik;