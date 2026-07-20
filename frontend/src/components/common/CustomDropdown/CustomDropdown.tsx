import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './CustomDropdown.css';

export interface CustomDropdownProps {
  /** Daftar pilihan yang tampil di menu */
  options: string[];
  /** Nilai yang sedang dipilih */
  value: string;
  /** Callback saat pilihan berubah */
  onChange: (val: string) => void;
  /** Placeholder / label saat belum ada pilihan (opsional) */
  placeholder?: string;
  /** ID unik untuk aksesibilitas */
  id?: string;
}

/**
 * CustomDropdown — Komponen dropdown yang dapat digunakan ulang.
 * Mendukung keyboard close (click outside) dan animasi ikon chevron.
 */
const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tutup dropdown saat tekan Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const displayValue = value || placeholder || options[0];

  return (
    <div className="custom-dropdown" ref={dropdownRef} id={id}>
      <button
        type="button"
        className="dropdown-selected"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{displayValue}</span>
        <FaChevronDown className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <ul className="dropdown-menu" role="listbox">
          {options.map((option, index) => (
            <li
              key={index}
              role="option"
              aria-selected={value === option}
              className={`dropdown-item ${value === option ? 'active' : ''}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
