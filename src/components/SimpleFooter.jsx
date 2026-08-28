import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './SimpleFooter.css';

function SimpleFooter() {
  const currentYear = 2026;
  
  return (
    <footer className="simple-footer">
      <div className="simple-footer-container">
        {/* Logo simplifié */}
        <div className="simple-footer-logo">
          <Link to="/" className="simple-footer-logo-link">
            <span className="simple-footer-logo-text">Matlou7ch</span>
          </Link>
        </div>

        {/* Liens principaux simplifiés */}
        <div className="simple-footer-links">
          <Link to="/notre-adn" className="simple-footer-link">Notre ADN</Link>
          <Link to="/faq" className="simple-footer-link">FAQ</Link>
          <Link to="/cgu" className="simple-footer-link">Conditions d'utilisation</Link>
          <Link to="/contact" className="simple-footer-link">Contact</Link>
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


















