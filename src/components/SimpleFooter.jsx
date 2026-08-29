import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './SimpleFooter.css';

function SimpleFooter() {
  const currentYear = 2026;
  
  return (
    <footer className="simple-footer">
      <div className="simple-footer-container">
        {/* Logo */}
        <div className="simple-footer-logo">
          <Link to="/" className="simple-footer-logo-link">
            <span className="simple-footer-logo-text">Matlou7ch</span>
          </Link>
        </div>

        {/* Catégories simplifiées */}
        <div className="simple-footer-section">
          <h3 className="simple-footer-title">Catégories</h3>
          <div className="simple-footer-links">
            <Link to="/catalogue?category=vetements" className="simple-footer-link">Vêtements</Link>
            <Link to="/catalogue?category=multimedia" className="simple-footer-link">Multimédia</Link>
            <Link to="/catalogue?category=maison" className="simple-footer-link">Maison</Link>
            <Link to="/catalogue?category=sport" className="simple-footer-link">Sport</Link>
          </div>
        </div>

        {/* Villes simplifiées */}
        <div className="simple-footer-section">
          <h3 className="simple-footer-title">Villes</h3>
          <div className="simple-footer-links">
            <Link to="/catalogue?location=Casablanca" className="simple-footer-link">Casablanca</Link>
            <Link to="/catalogue?location=Rabat" className="simple-footer-link">Rabat</Link>
            <Link to="/catalogue?location=Marrakech" className="simple-footer-link">Marrakech</Link>
            <Link to="/catalogue?location=Tanger" className="simple-footer-link">Tanger</Link>
          </div>
        </div>

        {/* Liens utiles */}
        <div className="simple-footer-section">
          <h3 className="simple-footer-title">Liens</h3>
          <div className="simple-footer-links">
            <Link to="/notre-adn" className="simple-footer-link">Notre ADN</Link>
            <Link to="/faq" className="simple-footer-link">FAQ</Link>
            <Link to="/cgu" className="simple-footer-link">CGU</Link>
            <Link to="/contact" className="simple-footer-link">Contact</Link>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="simple-footer-social">
          <a href="https://facebook.com" className="simple-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" className="simple-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="simple-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" className="simple-social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>

        {/* Copyright */}
        <p className="simple-footer-copyright">© {currentYear} – Tous droits réservés</p>
      </div>
    </footer>
  );
}

export default SimpleFooter;


















