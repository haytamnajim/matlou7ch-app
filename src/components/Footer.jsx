import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeart,
  FaPlusCircle,
  FaLeaf
} from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const currentYear = 2026;

  return (
    <footer className="modern-grand-footer">
      <div className="grand-footer-container">
        {/* 1. Header du Footer : Logo & Slogan */}
        <div className="footer-top-brand-box">
          <Link to="/" className="footer-brand-logo">
            <img src="/logo.png" alt="Matlou7ch Logo" className="footer-logo-image" />
            <span className="footer-logo-text">MATLOU7CH</span>
          </Link>
          <p className="footer-brand-tagline">
            La 1ère plateforme solidaire et éco-responsable de dons d'objets entre particuliers au Maroc.
          </p>
          <div className="footer-quick-action-btns">
            <Link to="/post-ad" className="footer-action-btn primary">
              <FaPlusCircle /> Publier un don
            </Link>
            <Link to="/notre-adn" className="footer-action-btn secondary">
              <FaLeaf /> Découvrir notre mission
            </Link>
          </div>
        </div>

        {/* 2. Grille Principale 4 Colonnes */}
        <div className="grand-footer-grid">
          {/* Colonne 1 : Catégories */}
          <div className="footer-grid-col">
            <h3 className="footer-col-heading">Catégories</h3>
            <nav className="footer-links-list">
              <Link to="/catalogue?category=vetements" className="footer-link-item">Vêtements</Link>
              <Link to="/catalogue?category=multimedia" className="footer-link-item">Multimédia & High-Tech</Link>
              <Link to="/catalogue?category=meubles" className="footer-link-item">Meubles & Literie</Link>
              <Link to="/catalogue?category=maison" className="footer-link-item">Maison & Décoration</Link>
              <Link to="/catalogue?category=livres" className="footer-link-item">Livres & Scolaire</Link>
              <Link to="/catalogue?category=jouets" className="footer-link-item">Jeux & Jouets</Link>
              <Link to="/catalogue?category=sport" className="footer-link-item">Sport & Plein air</Link>
            </nav>
          </div>

          {/* Colonne 2 : Annonces par Ville */}
          <div className="footer-grid-col">
            <h3 className="footer-col-heading">Villes Principales</h3>
            <nav className="footer-links-list">
              <Link to="/catalogue?location=Casablanca" className="footer-link-item">Casablanca</Link>
              <Link to="/catalogue?location=Rabat" className="footer-link-item">Rabat</Link>
              <Link to="/catalogue?location=Marrakech" className="footer-link-item">Marrakech</Link>
              <Link to="/catalogue?location=Tanger" className="footer-link-item">Tanger</Link>
              <Link to="/catalogue?location=Fes" className="footer-link-item">Fès</Link>
              <Link to="/catalogue?location=Agadir" className="footer-link-item">Agadir</Link>
              <Link to="/catalogue?location=Oujda" className="footer-link-item">Oujda</Link>
            </nav>
          </div>

          {/* Colonne 3 : Régions du Maroc */}
          <div className="footer-grid-col">
            <h3 className="footer-col-heading">Régions du Maroc</h3>
            <nav className="footer-links-list">
              <Link to="/catalogue?region=Casablanca-Settat" className="footer-link-item">Casablanca-Settat</Link>
              <Link to="/catalogue?region=Rabat-Sale-Kenitra" className="footer-link-item">Rabat-Salé-Kénitra</Link>
              <Link to="/catalogue?region=Marrakech-Safi" className="footer-link-item">Marrakech-Safi</Link>
              <Link to="/catalogue?region=Tanger-Tetouan-AlHoceima" className="footer-link-item">Tanger-Tétouan-Al Hoceïma</Link>
              <Link to="/catalogue?region=Fes-Meknes" className="footer-link-item">Fès-Meknès</Link>
              <Link to="/catalogue?region=Souss-Massa" className="footer-link-item">Souss-Massa</Link>
            </nav>
          </div>

          {/* Colonne 4 : À Propos & Liens */}
          <div className="footer-grid-col">
            <h3 className="footer-col-heading">Matlou7ch</h3>
            <nav className="footer-links-list">
              <Link to="/notre-adn" className="footer-link-item">Notre ADN & Valeurs</Link>
              <Link to="/faq" className="footer-link-item">Centre d'aide & FAQ</Link>
              <Link to="/contact" className="footer-link-item">Contactez-nous</Link>
              <Link to="/cgu" className="footer-link-item">Conditions Générales (CGU)</Link>
              <Link to="/confidentialite" className="footer-link-item">Politique de Confidentialité</Link>
              <Link to="/admin/login" className="footer-link-item admin-portal-link">Espace Administrateur</Link>
            </nav>
          </div>
        </div>

        {/* 3. Réseaux Sociaux Centrés */}
        <div className="grand-footer-social-row">
          <span className="social-tagline">Rejoignez le mouvement solidaire :</span>
          <div className="footer-social-buttons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-pill" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-pill" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-pill" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-pill" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className="footer-divider-line" />

        {/* 4. Barre Inférieure & Copyright */}
        <div className="grand-footer-bottom-bar">
          <p className="footer-copyright">
            © {currentYear} <strong>Matlou7ch Maroc</strong> — Tous droits réservés. Fièrement développé avec{' '}
            <FaHeart className="heart-love" /> pour le Maroc 🇲🇦
          </p>

          <div className="footer-bottom-legal-links">
            <Link to="/notre-adn" className="legal-link">Notre ADN</Link>
            <Link to="/faq" className="legal-link">FAQ</Link>
            <Link to="/cgu" className="legal-link">CGU</Link>
            <Link to="/contact" className="legal-link">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
