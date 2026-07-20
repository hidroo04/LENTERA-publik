import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css'; 
import LogoWeb from '../../assets/logo-lentera.png';
import { FaSearch, FaThLarge, FaHome, FaTimes } from 'react-icons/fa';

import { NAVIGATION_MENU, APP_NAME } from '../../constants';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

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

  const closeNav = () => setIsNavOpen(false);

  const handleSearchSubmit = () => {
    const value = searchQuery.trim();
    if (!value) return;
    
    navigate(`/prestasi?search=${encodeURIComponent(value)}`);
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <>
      {isNavOpen && (
        <div className="mobile-overlay" onClick={closeNav}></div>
      )}

      <header className="global-header">
        <div className="header-brand">
          <Link to="/" onClick={closeNav} className="brand-link-wrapper">
            <img src={LogoWeb} alt="Logo BPS" className="brand-logo" />
          </Link>
          <div className="brand-text">
            <h1>{APP_NAME}</h1>
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

            {NAVIGATION_MENU.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              className="search-btn" 
              onClick={(e) => {
                if (isSearchOpen && searchQuery.trim()) {
                  handleSearchSubmit();
                } else {
                  toggleSearch(e);
                }
              }}
            >
              <FaSearch size={16} />
            </button>
          </div>

          <button className="mobile-search-toggle" onClick={toggleSearch}>
            <FaSearch size={16} />
          </button>

          <button className="btn-kategori" onClick={toggleNav}>
            <FaThLarge />
            <span>MENU</span>
          </button>
        </div>

        <div className={`mobile-search-dropdown ${isSearchOpen ? 'open' : ''}`}>
          <div className="mobile-search-container">
            <input
              type="text"
              placeholder="Cari prestasi..."
              className="mobile-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="mobile-search-submit" onClick={handleSearchSubmit}>
              <FaSearch size={16} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;