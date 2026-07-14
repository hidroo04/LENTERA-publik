import React, { useState } from 'react';
import './statistik.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Statistik = () => {
  // Data dummy sesuai gambar
  const dataStatistik = [
    { year: '2024', count: 3 },
    { year: '2025', count: 3 }
  ];
  const maxCount = 4; // Skala maksimal Y-Axis
  const yAxisLabels = [4, 3, 2, 1, 0];

  // State untuk Tooltip yang mengikuti kursor
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    year: '',
    count: 0
  });

  const handleMouseMove = (e: React.MouseEvent, year: string, count: number) => {
    setTooltip({
      show: true,
      x: e.clientX,
      y: e.clientY,
      year: year,
      count: count
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, show: false });
  };

  return (
    <div className="page-container">
      <Header />

      <main className="statistik-main">
        <div className="statistik-header">
          <h1 className="statistik-title">Statistik Prestasi</h1>
          <p className="statistik-subtitle">Visualisasi ringkas untuk membaca tren kategori dan tahun.</p>
        </div>

        {/* CHART CONTAINER DITENGAH */}
        <div className="chart-center-wrapper">
          <div className="chart-card">
            <h3 className="chart-card-title">Prestasi per Tahun</h3>
            
            <div className="bar-chart-container">
              {/* Sumbu Y (Kiri) */}
              <div className="y-axis">
                {yAxisLabels.map(label => (
                  <span key={label} className="y-label">{label}</span>
                ))}
              </div>

              {/* Area Bar (Kanan) */}
              <div className="chart-area">
                {dataStatistik.map((item, index) => {
                  const heightPercent = (item.count / maxCount) * 100;
                  
                  return (
                    <div 
                      key={index} 
                      className="bar-column"
                      onMouseMove={(e) => handleMouseMove(e, item.year, item.count)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Latar belakang abu-abu saat hover */}
                      <div className="bar-hover-bg"></div>
                      
                      {/* Batang Biru Utama */}
                      <div 
                        className="bar-fill" 
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                      
                      {/* Label Tahun di bawah */}
                      <span className="x-label">{item.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* TOOLTIP MELAYANG (Mengikuti Kursor) */}
      {tooltip.show && (
        <div 
          className="custom-tooltip"
          style={{ top: `${tooltip.y}px`, left: `${tooltip.x}px` }}
        >
          <div className="tooltip-year">{tooltip.year}</div>
          <div className="tooltip-count">Jumlah prestasi : {tooltip.count}</div>
        </div>
      )}
    </div>
  );
};

export default Statistik;