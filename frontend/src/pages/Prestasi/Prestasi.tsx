import React, { useState, useEffect, useRef } from 'react';
import './prestasi.css';

// Import Header dan Footer (Pastikan jalurnya sesuai dengan folder kamu)
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Import Icons
import { FaSearch, FaArrowRight, FaChevronDown } from 'react-icons/fa';

// ==========================================
// KOMPONEN CUSTOM DROPDOWN (Agar bisa di-style biru persis gambar)
// ==========================================
interface DropdownProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Menutup dropdown jika diklik di luar area
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

// ==========================================
// HALAMAN UTAMA PRESTASI
// ==========================================
const Prestasi = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('Semua category');
  const [level, setLevel] = useState('Semua level');
  const [year, setYear] = useState('Semua year');
  const [sort, setSort] = useState('Terbaru');

  // Pilihan Dropdown
  const categoryOptions = ['Semua category', 'Penghargaan', 'Pelayanan Publik', 'Statistik Resmi', 'Transformasi Digital', 'Tata Kelola', 'Literasi Statistik'];
  const levelOptions = ['Semua level', 'Nasional', 'Provinsi', 'Internasional', 'Kota'];
  const yearOptions = ['Semua year', '2025', '2024'];
  const sortOptions = ['Terbaru', 'Terlama', 'Alfabetis'];

  // Data Dummy Persis Seperti Gambar
  const dataPrestasi = [
    {
      id: 1,
      tingkat: 'Nasional',
      kategori: 'Penghargaan',
      tanggal: '2 Mei 2025',
      judul: 'Penghargaan Anugerah Keterbukaan Informasi Publik 2024',
      deskripsi: 'Diberikan atas komitmen BPS dalam mewujudkan transparansi dan keterbukaan informasi statistik resmi...',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 2,
      tingkat: 'Provinsi',
      kategori: 'Pelayanan Publik',
      tanggal: '18 Apr 2025',
      judul: 'Inovasi Pelayanan Publik Terbaik Tingkat Provinsi 2025',
      deskripsi: 'Inovasi kanal layanan statistik terpadu dinilai berdampak positif, inklusif, dan berkelanjutan bagi...',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 3,
      tingkat: 'Internasional',
      kategori: 'Statistik Resmi',
      tanggal: '10 Mar 2025',
      judul: 'Excellence in Official Statistics Award (EOSA) 2025',
      deskripsi: 'Penghargaan internasional atas kualitas, integritas, dan inovasi diseminasi statistik resmi Indonesia.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 4,
      tingkat: 'Nasional',
      kategori: 'Transformasi Digital',
      tanggal: '21 Nov 2024',
      judul: 'Satu Data Indonesia Award untuk Integrasi Metadata Statistik',
      deskripsi: 'BPS memperoleh apresiasi atas penguatan tata kelola metadata dan interoperabilitas data lintas instansi.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 5,
      tingkat: 'Nasional',
      kategori: 'Tata Kelola',
      tanggal: '4 Sep 2024',
      judul: 'Predikat Wilayah Bebas dari Korupsi untuk Unit Pelayanan Statistik',
      deskripsi: 'Penghargaan diberikan untuk peningkatan kualitas layanan, akuntabilitas, dan budaya kerja berintegritas.',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 6,
      tingkat: 'Kota',
      kategori: 'Literasi Statistik',
      tanggal: '22 Jun 2024',
      judul: 'Juara Kolaborasi Data Journalism dan Literasi Statistik Publik',
      deskripsi: 'Program literasi statistik berbasis cerita data berhasil memperluas pemanfaatan data resmi oleh komunitas...',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
    }
  ];

  return (
    <div className="page-container">
      <Header />
      
      <main className="prestasi-main">
        {/* Header Section */}
        <div className="prestasi-header-section">
          <h1 className="prestasi-page-title">Daftar Prestasi</h1>
          <p className="prestasi-page-subtitle">Hanya menampilkan data berstatus published dari API read-only.</p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon-filter" />
            <input 
              type="text" 
              placeholder="Cari judul prestasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="dropdowns-wrapper">
            <CustomDropdown options={categoryOptions} value={category} onChange={setCategory} />
            <CustomDropdown options={levelOptions} value={level} onChange={setLevel} />
            <CustomDropdown options={yearOptions} value={year} onChange={setYear} />
            <CustomDropdown options={sortOptions} value={sort} onChange={setSort} />
          </div>
        </div>

        {/* Grid Prestasi */}
        <div className="daftar-prestasi-grid">
          {dataPrestasi.map((item) => (
            <div key={item.id} className="daftar-prestasi-card">
              <img src={item.image} alt={item.judul} className="card-img" />
              <div className="card-body">
                <div className="card-top-meta">
                  <div className="card-badges">
                    <span className="badge-tingkat">{item.tingkat}</span>
                    <span className="badge-kategori">{item.kategori}</span>
                  </div>
                  <span className="card-tanggal">{item.tanggal}</span>
                </div>
                <h4 className="card-title-text">{item.judul}</h4>
                <p className="card-deskripsi">{item.deskripsi}</p>
                <a href="#" className="card-action-link">
                  Lihat Detail <FaArrowRight style={{marginLeft: '6px', fontSize: '11px'}}/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Prestasi;