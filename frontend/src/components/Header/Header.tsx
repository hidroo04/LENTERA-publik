import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'; // sebelumnya './header.css' - perbaiki casing agar tidak gagal build di server case-sensitive (Linux)
import LogoBps from '../../assets/Logo_bps.png';
import { FaSearch, FaThLarge, FaHome, FaTimes } from 'react-icons/fa';

const NAV_LINKS = [
  { path: '/', label: 'Beranda' },
  { path: '/prestasi', label: 'Prestasi' },
  { path: '/statistik', label: 'Statistik' },
  { path: '/tentang', label: 'Tentang' },
  { path: '/kontak', label: 'Kontak' },
];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();

  const toggleNav = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsNavOpen(!isNavOpen);
    if (!isNavOpen) setIsSearchOpen(false);
  };

  const toggleSearch = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setIsNavOpen(false);
  };

  // Cukup tutup sidebar saat link diklik.
  // Navigasi ke halaman tujuan sudah otomatis ditangani oleh <Link to="...">,
  // jadi tidak perlu lagi preventDefault() + navigate() manual (itu penyebab konfliknya).
  const closeNav = () => setIsNavOpen(false);

  return (
    <>
      {isNavOpen && (
        <div className="mobile-overlay" onClick={closeNav}></div>
      )}

      <header className="global-header">
        <div className="header-brand">
          <Link to="/" onClick={closeNav} className="brand-link-wrapper">
            <img src={LogoBps} alt="Logo BPS" className="brand-logo" />
          </Link>
          <div className="brand-text">
            <h1>Badan Pusat Statistik</h1>
            <p>Arsip Prestasi</p>
          </div>
        </div>

        <div className="header-right">
          <nav className={`header-nav ${isNavOpen ? 'open' : ''}`}>
            <button
              className="close-nav-btn"
              onClick={toggleNav}
              aria-label="Tutup Menu"
            >
              <FaTimes size={20} />
            </button>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={closeNav}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/"
            className="btn-home"
            title="Ke Halaman Beranda"
            onClick={closeNav}
          >
            <FaHome size={18} />
          </Link>

          <div className={`search-wrapper desktop-search ${isSearchOpen ? 'open' : 'closed'}`}>
            <input
              type="text"
              placeholder="Cari prestasi, kategori..."
              className="search-input"
            />
            <button className="search-btn" onClick={toggleSearch}>
              <FaSearch size={16} />
            </button>
          </div>

          <button className="mobile-search-toggle" onClick={toggleSearch}>
            <FaSearch size={16} />
          </button>

          <button className="btn-kategori" onClick={toggleNav}>
            <FaThLarge />
            <span>KATEGORI</span>
          </button>
        </div>

        <div className={`mobile-search-dropdown ${isSearchOpen ? 'open' : ''}`}>
          <div className="mobile-search-container">
            <input
              type="text"
              placeholder="Cari prestasi..."
              className="mobile-search-input"
            />
            <button className="mobile-search-submit">
              <FaSearch size={16} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;