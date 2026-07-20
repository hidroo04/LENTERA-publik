import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function HomeSearch() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        const value = keyword.trim();

        if (!value) return;

        navigate(`/prestasi?search=${encodeURIComponent(value)}`);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Cari prestasi, kategori, atau kata kunci..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className="btn-search"
                    onClick={handleSearch}
                >
                    <FaSearch size={18} />
                </button>
            </div>
        </div>
    );
}
