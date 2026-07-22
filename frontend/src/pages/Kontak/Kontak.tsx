import './Kontak.css';
import { LuMessageCircle, LuMapPin, LuMail, LuPhone, LuInstagram, LuFacebook } from 'react-icons/lu';
import bgImage from '../../assets/bps.jpg';

const Kontak = () => {
  return (
    <div className="kontak-page-wrapper">
      {/* Background elements */}
      <div className="kontak-bg-image" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="kontak-bg-overlay"></div>
      <div className="kontak-bg-dots"></div>

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
                <p className="kontak-item-desc">Jl. Raya Gadingrejo No.KM.33, Wonodadi, Kec. Gading Rejo, Kabupaten Pringsewu, Lampung 35372</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="kontak-item">
              <div className="kontak-icon-circle">
                <LuMail className="kontak-icon" />
              </div>
              <div className="kontak-text">
                <h3 className="kontak-item-title">Email</h3>
                <p className="kontak-item-desc">bps1810@bps.go.id</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="kontak-item">
              <div className="kontak-icon-circle">
                <LuPhone className="kontak-icon" />
              </div>
              <div className="kontak-text">
                <h3 className="kontak-item-title">Telepon</h3>
                <p className="kontak-item-desc">(0729) 7330811</p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="kontak-item">
              <div className="kontak-icon-circle">
                <LuInstagram className="kontak-icon" />
              </div>
              <div className="kontak-text">
                <h3 className="kontak-item-title">Instagram</h3>
                <p className="kontak-item-desc">@bps_pringsewu</p>
              </div>
            </div>

            {/* Item 6 */}
            <div className="kontak-item">
              <div className="kontak-icon-circle">
                <LuFacebook className="kontak-icon" />
              </div>
              <div className="kontak-text">
                <h3 className="kontak-item-title">Facebook</h3>
                <p className="kontak-item-desc">Bps Kabupaten Pringsewu</p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Kontak;