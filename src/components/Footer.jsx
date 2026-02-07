import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

function Footer({ type }) {
  // Le type est maintenant utilisé uniquement pour des personnalisations spécifiques à chaque page
  // mais le footer s'affiche toujours car la logique d'affichage est gérée dans App.js

  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <section className="footer-section">
          <h2 className="footer-title">Toutes les catégories</h2>
          <div className="footer-grid">
            <Link to="/catalogue?category=vetements" className="footer-link">Vêtements</Link>
            <Link to="/catalogue?category=multimedia" className="footer-link">Multimédia</Link>
            <Link to="/catalogue?category=maison" className="footer-link">Maison</Link>
            <Link to="/catalogue?category=accessoires-mode" className="footer-link">Accessoires</Link>
            <Link to="/catalogue?category=sport" className="footer-link">Sport</Link>
            <Link to="/catalogue?category=loisirs-jeux" className="footer-link">Jeux & Loisirs</Link>
          </div>
        </section>

        <section className="footer-section">
          <h2 className="footer-title">Les annonces par ville</h2>
          <div className="footer-grid">
            <Link to="/catalogue?location=Casablanca" className="footer-link">Casablanca</Link>
            <Link to="/catalogue?location=Rabat" className="footer-link">Rabat</Link>
            <Link to="/catalogue?location=Marrakech" className="footer-link">Marrakech</Link>
            <Link to="/catalogue?location=Tanger" className="footer-link">Tanger</Link>
            <Link to="/catalogue?location=Fes" className="footer-link">Fès</Link>
            <Link to="/catalogue?location=Agadir" className="footer-link">Agadir</Link>
          </div>
        </section>

        <section className="footer-section">
          <h2 className="footer-title">Les annonces par département</h2>
          <div className="footer-grid">
            <Link to="/catalogue?region=Casablanca-Settat" className="footer-link">Casablanca-Settat</Link>
            <Link to="/catalogue?region=Rabat-Sale-Kenitra" className="footer-link">Rabat-Salé-Kénitra</Link>
            <Link to="/catalogue?region=Marrakech-Safi" className="footer-link">Marrakech-Safi</Link>
            <Link to="/catalogue?region=Tanger-Tetouan-Al-Hoceima" className="footer-link">Tanger-Tétouan</Link>
          </div>
        </section>
      </div>

      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaLinkedin />
        </a>
      </div>

      <div className="footer-bottom">
        <div className="footer-links">
          <Link to="/notre-adn" className="footer-page-link">Notre ADN</Link>
          <Link to="/faq" className="footer-page-link">FAQ</Link>
          <Link to="/cgu" className="footer-page-link">Conditions d'utilisation</Link>
          <Link to="/contact" className="footer-page-link">Contact</Link>
          {/* Supprimer le lien vers les informations légales */}
          {/* <Link to="/informations-legales" className="footer-page-link">Informations légales</Link> */}
        </div>
        <p className="footer-copyright">© {currentYear} Matlou7ch. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
