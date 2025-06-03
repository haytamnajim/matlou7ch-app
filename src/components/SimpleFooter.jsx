import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './SimpleFooter.css';

function SimpleFooter() {
  // Suppression de la logique conditionnelle car elle est maintenant gérée dans App.js
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="simple-footer">
      <div className="simple-footer-social">
        <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>
      
      <div className="simple-footer-links">
        <Link to="/notre-adn" className="footer-link">Notre ADN</Link>
        <Link to="/faq" className="footer-link">FAQ</Link>
        <Link to="/cgu" className="footer-link">Conditions d'utilisation</Link>
        <Link to="/contact" className="footer-link">Contact</Link>
        {/* Supprimer le lien vers les informations légales */}
        {/* <Link to="/informations-legales" className="footer-link">Informations légales</Link> */}
      </div>
      
      <p className="simple-footer-copyright">© {currentYear} Matlou7ch. Tous droits réservés.</p>
    </footer>
  );
}

export default SimpleFooter;


















