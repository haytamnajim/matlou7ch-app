import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

function Footer({ type }) {
  // Le type est maintenant utilisé uniquement pour des personnalisations spécifiques à chaque page
  // mais le footer s'affiche toujours car la logique d'affichage est gérée dans App.js

  const currentYear = 2026;

  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-main-grid">
          {/* Colonne 1: Toutes les catégories */}
          <section className="footer-column">
            <h2 className="footer-column-title">Toutes les catégories</h2>
            <nav className="footer-nav">
              <Link to="/catalogue?category=vetements" className="footer-nav-link">Vêtements</Link>
              <Link to="/catalogue?category=multimedia" className="footer-nav-link">Multimédia</Link>
              <Link to="/catalogue?category=maison" className="footer-nav-link">Maison</Link>
              <Link to="/catalogue?category=accessoires" className="footer-nav-link">Accessoires</Link>
              <Link to="/catalogue?category=sport" className="footer-nav-link">Sport</Link>
              <Link to="/catalogue?category=jouets" className="footer-nav-link">Jeux & Loisirs</Link>
            </nav>
          </section>

          {/* Colonne 2: Les annonces par ville */}
          <section className="footer-column">
            <h2 className="footer-column-title">Les annonces par ville</h2>
            <nav className="footer-nav">
              <Link to="/catalogue?location=Casablanca" className="footer-nav-link">Casablanca</Link>
              <Link to="/catalogue?location=Rabat" className="footer-nav-link">Rabat</Link>
              <Link to="/catalogue?location=Marrakech" className="footer-nav-link">Marrakech</Link>
              <Link to="/catalogue?location=Tanger" className="footer-nav-link">Tanger</Link>
              <Link to="/catalogue?location=Fes" className="footer-nav-link">Fès</Link>
              <Link to="/catalogue?location=Agadir" className="footer-nav-link">Agadir</Link>
            </nav>
          </section>

          {/* Colonne 3: Les annonces par département */}
          <section className="footer-column">
            <h2 className="footer-column-title">Les annonces par département</h2>
            <nav className="footer-nav">
              <Link to="/catalogue?region=Casablanca-Settat" className="footer-nav-link">Casablanca-Settat</Link>
              <Link to="/catalogue?region=Rabat-Sale-Kenitra" className="footer-nav-link">Rabat-Salé-Kénitra</Link>
              <Link to="/catalogue?region=Marrakech-Safi" className="footer-nav-link">Marrakech-Safi</Link>
              <Link to="/catalogue?region=Tanger-Tetouan" className="footer-nav-link">Tanger-Tétouan</Link>
            </nav>
          </section>
        </div>

        <div className="footer-middle-divider"></div>

        <div className="footer-social-section">
          <div className="social-icons-row">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-bottom-divider"></div>

        <div className="footer-bottom-info">
          <div className="footer-secondary-links">
            <Link to="/notre-adn" className="bottom-page-link">Notre ADN</Link>
            <Link to="/faq" className="bottom-page-link">FAQ</Link>
            <Link to="/cgu" className="bottom-page-link">Conditions d'utilisation</Link>
            <Link to="/contact" className="bottom-page-link">Contact</Link>
          </div>
          <p className="copyright-text">© {currentYear} – Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
