
import './footer.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="global-footer">
      <div className="footer-brand">
        <h4>"Data Mencerdaskan Bangsa"</h4>
        <p>Portal publikasi prestasi Badan Pusat Statistik.</p>
      </div>
      <div className="footer-contact">
        <p>
          <FaMapMarkerAlt className="footer-icon" /> 
          Jl. Raya Gading Rejo Km. 33, Wonodadi, Kec Gading Rejo 35372 Kabupaten Pringsewu
        </p>
        <p>
          <FaEnvelope className="footer-icon" /> 
          bps1810@bps.go.id
        </p>
        <p>
          <FaPhoneAlt className="footer-icon" /> 
          (0729) 7330811
        </p>
      </div>
      <div className="footer-copyright">
        © 2026 Badan Pusat Statistik Kabupaten Pringsewu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;