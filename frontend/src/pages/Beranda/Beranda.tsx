import { useState } from 'react';
// Import Link dari react-router-dom
import { Link } from 'react-router-dom';
import './Beranda.css';

// Import Komponen Terpisah
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Import Icon
import { FaSearch, FaTrophy, FaThLarge, FaMedal, FaArrowRight } from 'react-icons/fa';

// IMPORT GAMBAR BACKGROUND
import BpsBg from '../../assets/bps.jpg';

const Beranda = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy Data
  const stats = { published: 6, kategori: 6, peraih: '120+' };
  const prestasiTerbaru = [
    {
      id: 1,
      tingkat: 'Nasional',
      kategori: 'Penghargaan',
      tanggal: '2 Mei 2025',
      judul: 'Penghargaan Anugerah Keterbukaan Informasi Publik 2024',
      deskripsi: 'Diberikan atas komitmen BPS dalam mewujudkan transparansi dan keterbukaan',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      tingkat: 'Provinsi',
      kategori: 'Pelayanan Publik',
      tanggal: '18 Apr 2025',
      judul: 'Inovasi Pelayanan Publik Terbaik Tingkat Provinsi 2025',
      deskripsi: 'Inovasi kanal layanan statistik terpadu dinilai berdampak positif, inklusif, dan berkelanjutan',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 3,
      tingkat: 'Internasional',
      kategori: 'Statistik Resmi',
      tanggal: '10 Mar 2025',
      judul: 'Excellence in Official Statistics Award (EOSA) 2025',
      deskripsi: 'Penghargaan internasional atas kualitas, integritas, dan inovasi diseminasi statistik resmi',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400',
    }
  ];

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
            
            {/* UBAH DI SINI: Tombol diubah menjadi Link mengarah ke /prestasi */}
            <Link to="/prestasi" className="btn-primary">
              Jelajahi Prestasi
              <FaArrowRight className="btn-icon" />
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stats-card">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon bg-blue"><FaTrophy size={20} /></div>
                  <div className="stat-text">
                    <p className="stat-value">{stats.published}</p>
                    <p className="stat-label">Prestasi<br/>Published</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon bg-green"><FaThLarge size={20} /></div>
                  <div className="stat-text">
                    <p className="stat-value">{stats.kategori}</p>
                    <p className="stat-label">Kategori</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon bg-orange"><FaMedal size={20} /></div>
                  <div className="stat-text">
                    <p className="stat-value">{stats.peraih}</p>
                    <p className="stat-label">Peraih</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="search-bar-container">
              <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="Cari prestasi, kategori, atau kata kunci..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn-search">
                  <FaSearch size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="prestasi-section">
        <div className="prestasi-header">
          <div className="prestasi-title-wrapper">
            <span className="line-accent"></span>
            <h3>Prestasi Terbaru</h3>
          </div>
          
          {/* UBAH DI SINI: Tag <a> diubah menjadi Link mengarah ke /prestasi */}
          <Link to="/prestasi" className="link-semua">
            Lihat semua prestasi
            <FaArrowRight className="link-icon" />
          </Link>
        </div>
        
        <div className="prestasi-grid">
          {prestasiTerbaru.map((item) => (
            <div key={item.id} className="prestasi-card">
              <img src={item.image} alt={item.judul} className="card-image" />
              <div className="card-content">
                <div className="card-meta">
                  <div className="card-tags">
                    <span className="tag-tingkat">{item.tingkat}</span>
                    <span className="tag-kategori">{item.kategori}</span>
                  </div>
                  <span className="card-date">{item.tanggal}</span>
                </div>
                <h4 className="card-title">{item.judul}</h4>
                <p className="card-desc">{item.deskripsi}</p>
                <a href="#" className="card-link">
                  Lihat Detail <FaArrowRight style={{marginLeft: '4px', fontSize: '10px'}}/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Beranda;