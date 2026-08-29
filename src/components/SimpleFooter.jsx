import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './SimpleFooter.css';

function SimpleFooter() {
  const currentYear = 2026;

  return (
    <footer className="mini-footer">
      <div className="mini-footer-container">
        {/* Partie gauche : Logo */}
        <div className="mini-footer-brand">
          <Link to="/" className="mini-footer-logo">
            <img src="/imageLOGO.png" alt="Matlou7ch Logo" className="mini-footer-logo-img" />
            <span className="mini-footer-logo-text">Matlou7ch</span>
          </Link>
        </div>

        {/* Partie centrale : Liens de navigation rapides */}
        <nav className="mini-footer-nav" aria-label="Navigation secondaire">
          <Link to="/catalogue" className="mini-footer-link">Catalogue</Link>
          <span className="mini-footer-dot">•</span>
          <Link to="/notre-adn" className="mini-footer-link">Notre ADN</Link>
          <span className="mini-footer-dot">•</span>
          <Link to="/faq" className="mini-footer-link">FAQ</Link>
          <span className="mini-footer-dot">•</span>
          <Link to="/cgu" className="mini-footer-link">CGU</Link>
          <span className="mini-footer-dot">•</span>
          <Link to="/contact" className="mini-footer-link">Contact</Link>
        </nav>

        {/* Partie droite : Réseaux sociaux & Copyright */}
        <div className="mini-footer-right">
          <div className="mini-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mini-social-btn" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mini-social-btn" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mini-social-btn" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mini-social-btn" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
          <span className="mini-copyright">© {currentYear} Tous droits réservés</span>
        </div>
      </div>
    </footer>
  );
}

export default SimpleFooter;


















