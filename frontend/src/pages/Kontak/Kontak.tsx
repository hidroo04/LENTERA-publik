import './Kontak.css';
import { LuMessageCircle, LuMapPin, LuMail, LuPhone, LuInstagram, LuFacebook } from 'react-icons/lu';

const Kontak = () => {
  return (
    <div className="kontak-page-wrapper">
      {/* Background elements */}
      <div className="kontak-bg-dots"></div>
      <div className="kontak-bg-building"></div>

      <main className="kontak-main">
        {/* Header Section */}
        <div className="kontak-header">
          <h1 className="kontak-title">Kontak</h1>
          <div className="kontak-underline">
            <div className="line-green"></div>
            <div className="line-blue"></div>
          </div>
          <p className="kontak-subtitle">
            Hubungi kami untuk informasi lebih lanjut, kerja sama,<br />
            atau pertanyaan lainnya.
          </p>
        </div>

        {/* Card Section */}
        <div className="kontak-card-container">
          <div className="kontak-card">
            
            {/* Item 1 */}
            <div className="kontak-item">
              <div className="kontak-icon-circle">
                <LuMessageCircle className="kontak-icon" />
              </div>
              <div className="kontak-text">
                <h3 className="kontak-item-title">Informasi Kontak</h3>
                <p className="kontak-item-desc">Kami siap membantu Anda</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="kontak-item">
              <div className="kontak-icon-circle">
                <LuMapPin className="kontak-icon" />
              </div>
              <div className="kontak-text">
                <h3 className="kontak-item-title">Alamat</h3>
                <p className="kontak-item-desc">Jl. Merdeka Pendidikan No. 24, Jakarta</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="kontak-item">
              <div className="kontak-icon-circle">
                <LuMail className="kontak-icon" />
              </div>
              <div className="kontak-text">
                <h3 className="kontak-item-title">Email</h3>
                <p className="kontak-item-desc">humas@instansi.go.id</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="kontak-item">
              <div className="kontak-icon-circle">
                <LuPhone className="kontak-icon" />
              </div>
              <div className="kontak-text">
                <h3 className="kontak-item-title">Telepon</h3>
                <p className="kontak-item-desc">(021) 7788 1200</p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="kontak-item">
              <div className="kontak-icon-circle">
                <LuInstagram className="kontak-icon" />
              </div>
              <div className="kontak-text">
                <h3 className="kontak-item-title">Instagram</h3>
                <p className="kontak-item-desc">@prestasi.instansi</p>
              </div>
            </div>

            {/* Item 6 */}
            <div className="kontak-item">
              <div className="kontak-icon-circle">
                <LuFacebook className="kontak-icon" />
              </div>
              <div className="kontak-text">
                <h3 className="kontak-item-title">Facebook</h3>
                <p className="kontak-item-desc">Prestasi Instansi</p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Kontak;