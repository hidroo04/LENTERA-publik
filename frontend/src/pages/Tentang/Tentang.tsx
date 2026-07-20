import './tentang.css';
import bgImage from '../../assets/bps.jpg';

const Tentang = () => {
  return (
    <div className="tentang-page-wrapper">
      <div className="tentang-bg-image" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="tentang-bg-overlay"></div>
      <div className="tentang-bg-dots"></div>

      <main className="tentang-main">
        <div className="tentang-grid">
          
          {/* KOLOM KIRI (Judul & Label) */}
          <div className="tentang-left">
            <span className="tentang-label">PROFIL</span>
            <h1 className="tentang-title">
              Instansi yang merawat tradisi prestasi dan inovasi.
            </h1>
          </div>

          {/* KOLOM KANAN (Deskripsi & Kartu Visi Misi) */}
          <div className="tentang-right">
            <p className="tentang-desc">
              Kami berkomitmen menghadirkan pendidikan, layanan, dan kolaborasi yang mendorong warga instansi mencapai potensi terbaik.
            </p>

            {/* Kartu Visi */}
            <div className="tentang-card">
              <h2 className="card-heading">Visi</h2>
              <p className="card-text">
                Lembaga yang Independen, Tepercaya, dan Berperan Aktif dalam Mendukung Perumusan Kebijakan Berbasis Data Bersama Indonesia Maju Menuju Indonesia Emas 2045.
              </p>
            </div>

            {/* Kartu Misi */}
            <div className="tentang-card">
              <h2 className="card-heading">Misi</h2>
              <ul className="card-list">
                <li>Menyediakan Data Statistik Berkualitas dan Insight untuk Perumusan Kebijakan dan Pengambilan Keputusan.</li>
                <li>Menguatkan Kepemimpinan BPS dalam penyelenggaraan Sistem Statistik Nasional (SSN).</li>
                <li>Menguatkan kapasitas kelembagaan statistik yang efektif dan efisien.</li>
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Tentang;