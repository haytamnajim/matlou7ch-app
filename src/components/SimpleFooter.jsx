import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './SimpleFooter.css';

function SimpleFooter() {
  const currentYear = 2026;

  return (
    <footer className="mini-footer">
      <div className="mini-footer-container">
        {/* Section Haute : Logo et Liens principaux */}
        <div className="mini-footer-top">
          <Link to="/" className="mini-footer-logo">
            <img src="/imageLOGO.png" alt="Matlou7ch Logo" className="mini-footer-logo-img" />
            <span className="mini-footer-logo-text">Matlou7ch</span>
          </Link>

          <nav className="mini-footer-nav" aria-label="Navigation">
            <Link to="/catalogue" className="mini-footer-nav-link">Catalogue</Link>
            <Link to="/notre-adn" className="mini-footer-nav-link">Notre ADN</Link>
            <Link to="/faq" className="mini-footer-nav-link">FAQ</Link>
            <Link to="/cgu" className="mini-footer-nav-link">Conditions d'utilisation</Link>
            <Link to="/contact" className="mini-footer-nav-link">Contact</Link>
          </nav>
        </div>

        {/* Section Réseaux sociaux : centrée comme dans le grand footer */}
        <div className="mini-footer-social-section">
          <div className="mini-social-icons-row">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mini-social-icon-btn" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mini-social-icon-btn" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mini-social-icon-btn" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mini-social-icon-btn" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="mini-footer-bottom-divider"></div>

        {/* Section Bas : Liens secondaires et Copyright */}
        <div className="mini-footer-bottom-info">
          <div className="mini-footer-secondary-links">
            <Link to="/notre-adn" className="mini-bottom-page-link">Notre ADN</Link>
            <Link to="/faq" className="mini-bottom-page-link">FAQ</Link>
            <Link to="/cgu" className="mini-bottom-page-link">Conditions d'utilisation</Link>
            <Link to="/contact" className="mini-bottom-page-link">Contact</Link>
          </div>
          <p className="mini-copyright-text">© {currentYear} – Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}

export default SimpleFooter;


















