import './kontak.css';

// Import Komponen Header dan Footer
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Import Ikon
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaInstagram, FaFacebookF } from 'react-icons/fa';

const Kontak = () => {
  return (
    <div className="page-container">
      <Header />

      <main className="kontak-main">
        <div className="kontak-header">
          <h1 className="kontak-title">Kontak</h1>
        </div>

        <div className="kontak-grid">
          
          {/* KARTU KIRI (Informasi Kontak) */}
          <div className="kontak-card card-white">
            <ul className="kontak-list">
              <li>
                <FaMapMarkerAlt className="kontak-icon" />
                <span>Jl. Merdeka Pendidikan No. 24, Jakarta</span>
              </li>
              <li>
                <FaEnvelope className="kontak-icon" />
                <span>humas@instansi.go.id</span>
              </li>
              <li>
                <FaPhoneAlt className="kontak-icon" />
                <span>(021) 7788 1200</span>
              </li>
              <li>
                <FaInstagram className="kontak-icon" />
                <span>@prestasi.instansi</span>
              </li>
              <li>
                <FaFacebookF className="kontak-icon" />
                <span>Prestasi Instansi</span>
              </li>
            </ul>
          </div>

          {/* KARTU KANAN (Jam Layanan) */}
          <div className="kontak-card card-green">
            <h2 className="layanan-title">Jam Layanan</h2>
            <p className="layanan-desc">
              Senin–Jumat, 08.00–16.00 WIB. Pesan publik akan dijawab maksimal 2 hari kerja.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Kontak;