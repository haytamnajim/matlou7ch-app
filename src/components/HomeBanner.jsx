import React from 'react';
import { Link } from 'react-router-dom';
import { FaGift, FaSearch, FaPlusCircle, FaLeaf, FaHandHoldingHeart, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import './HomeBanner.css';

const HomeBanner = () => {
  return (
    <section className="home-banner">
      {/* Orbes décoratifs en arrière-plan */}
      <div className="banner-glow banner-glow-1"></div>
      <div className="banner-glow banner-glow-2"></div>

      <div className="home-banner-container">
        <div className="home-banner-left">
          {/* Badge haut */}
          <div className="banner-pill-badge">
            <FaLeaf className="pill-icon" />
            <span>1ère Plateforme de Don & Recyclage au Maroc</span>
          </div>

          <h1 className="home-banner-title">
            Ne jetez plus,<br />
            <span className="accent-highlight">donnez & partagez</span><br />
            gratuitement à 100% !
          </h1>

          <p className="home-banner-subtitle">
            Offrez une seconde vie à vos vêtements, meubles et objets tout en aidant votre communauté locale partout au Maroc.
          </p>

          <div className="home-banner-actions">
            <Link to="/catalogue" className="banner-btn-link">
              <button className="banner-primary-btn">
                <FaSearch /> Découvrir les dons
              </button>
            </Link>
            <Link to="/post-ad" className="banner-btn-link">
              <button className="banner-secondary-btn">
                <FaPlusCircle /> Donner un objet
              </button>
            </Link>
          </div>

          {/* Statistiques / Preuve sociale */}
          <div className="banner-trust-stats">
            <div className="trust-stat-item">
              <div className="stat-icon-circle green">
                <FaGift />
              </div>
              <div className="stat-text-group">
                <span className="stat-number">+5 000</span>
                <span className="stat-label">Objets donnés</span>
              </div>
            </div>

            <div className="trust-stat-divider"></div>

            <div className="trust-stat-item">
              <div className="stat-icon-circle terracotta">
                <FaUsers />
              </div>
              <div className="stat-text-group">
                <span className="stat-number">+12 000</span>
                <span className="stat-label">Membres actifs</span>
              </div>
            </div>

            <div className="trust-stat-divider"></div>

            <div className="trust-stat-item">
              <div className="stat-icon-circle blue">
                <FaMapMarkerAlt />
              </div>
              <div className="stat-text-group">
                <span className="stat-number">12 Régions</span>
                <span className="stat-label">Partout au Maroc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Côté droit : Image avec badges flottants */}
        <div className="home-banner-right">
          <div className="banner-image-wrapper">
            <img
              src="/image.png"
              alt="Communauté d'entraide Matlou7ch"
              className="banner-main-image"
            />

            {/* Badge flottant 1 : Don récent */}
            <div className="floating-card floating-card-top">
              <div className="floating-card-icon">
                <FaHandHoldingHeart />
              </div>
              <div className="floating-card-info">
                <span className="floating-card-title">Don offert avec amour</span>
                <span className="floating-card-sub">Il y a 5 min à Casablanca</span>
              </div>
            </div>

            {/* Badge flottant 2 : 100% Gratuit */}
            <div className="floating-card floating-card-bottom">
              <div className="floating-tag">100% GRATUIT</div>
              <span className="floating-desc">Zéro frais • Entraide directe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
