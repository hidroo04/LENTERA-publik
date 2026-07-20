import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import CustomDropdown from '../../common/CustomDropdown/CustomDropdown';
import './FilterBar.css';

export interface FilterBarProps {
  /** Nilai input pencarian (controlled) */
  searchInput: string;
  onSearchInputChange: (val: string) => void;

  /** Pilihan & nilai dropdown Kategori */
  categoryOptions: string[];
  selectedCategory: string;
  onCategoryChange: (val: string) => void;

  /** Pilihan & nilai dropdown Level */
  levelOptions: string[];
  selectedLevel: string;
  onLevelChange: (val: string) => void;

  /** Pilihan & nilai dropdown Urutan */
  sortOptions: string[];
  selectedSort: string;
  onSortChange: (val: string) => void;

  /** Callback saat tombol Filter/Search diklik atau Enter ditekan */
  onSearch: () => void;
}

/**
 * FilterBar — Bar pencarian dan filter untuk halaman Prestasi.
 * Mencakup input teks, tiga dropdown (kategori, level, urutan), dan tombol filter.
 */
const FilterBar: React.FC<FilterBarProps> = ({
  searchInput,
  onSearchInputChange,
  categoryOptions,
  selectedCategory,
  onCategoryChange,
  levelOptions,
  selectedLevel,
  onLevelChange,
  sortOptions,
  selectedSort,
  onSortChange,
  onSearch,
}) => {
  return (
    <div className="filter-bar" role="search">
      {/* Input Pencarian */}
      <div className="filter-bar__search">
        <FaSearch className="filter-bar__search-icon" aria-hidden="true" />
        <input
          id="prestasi-search-input"
          type="text"
          placeholder="Cari judul prestasi..."
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          aria-label="Cari prestasi"
        />
      </div>

      {/* Dropdown Filters */}
      <div className="filter-bar__dropdowns">
        <CustomDropdown
          id="filter-kategori"
          options={categoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
        />
        <CustomDropdown
          id="filter-level"
          options={levelOptions}
          value={selectedLevel}
          onChange={onLevelChange}
        />
        <CustomDropdown
          id="filter-urutan"
          options={sortOptions}
          value={selectedSort}
          onChange={onSortChange}
        />
      </div>

      {/* Tombol Filter */}
      <button
        id="btn-terapkan-filter"
        className="filter-bar__btn"
        onClick={onSearch}
        title="Terapkan Filter"
        type="button"
      >
        <FaFilter aria-hidden="true" />
        <span>Filter</span>
      </button>
    </div>
  );
};

export default FilterBar;
