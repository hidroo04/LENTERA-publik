import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import semua halaman
import Beranda from './pages/Beranda/Beranda';
import Prestasi from './pages/Prestasi/Prestasi';
import Statistik from './pages/Statistik/Statistik';
import Tentang from './pages/Tentang/Tentang';
import Kontak from './pages/Kontak/Kontak'; // Import halaman Kontak

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/prestasi" element={<Prestasi />} />
        <Route path="/statistik" element={<Statistik />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/kontak" element={<Kontak />} /> {/* Rute untuk Kontak */}
      </Routes>
    </Router>
  );
}

export default App;