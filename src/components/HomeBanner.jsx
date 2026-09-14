import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaGift,
  FaSearch,
  FaPlusCircle,
  FaLeaf,
  FaHandHoldingHeart,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';
import HeroDynamicBackground from './HeroDynamicBackground';
import './HomeBanner.css';

/* ── Animated Counter Hook ── */
function useCountUp(target, duration = 2000, startWhenVisible = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startWhenVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startWhenVisible]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

const HomeBanner = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { count: objetsCount, ref: objetsRef } = useCountUp(5000, 2200);
  const { count: membresCount, ref: membresRef } = useCountUp(12000, 2500);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/catalogue');
    }
  };

  return (
    <section className="home-banner">
      {/* ── Fond dynamique : Vidéo fluide + diaporama images Ken Burns ── */}
      <HeroDynamicBackground />

      <div className="home-banner-container">
        {/* ── PARTIE 1 : Titres, Recherche & Actions (Haut) ── */}
        <div className="banner-main-grid">
          {/* Colonne Gauche : Titre et Recherche */}
          <div className="banner-left-content">
            {/* Badge pilule */}
            <div className="banner-pill-badge">
              <span className="pill-dot" />
              <FaLeaf className="pill-icon" />
              <span>1ère Plateforme de Don &amp; Recyclage au Maroc</span>
            </div>

            {/* Titre Principal */}
            <h1 className="home-banner-title">
              <span className="title-line title-line-1">Ne jetez plus,</span>
              <br />
              <span className="accent-highlight title-line title-line-2">donnez &amp; partagez</span>
              <br />
              <span className="title-line title-line-3">gratuitement à 100&nbsp;%&nbsp;!</span>
            </h1>

            {/* Sous-titre */}
            <p className="home-banner-subtitle">
              Offrez une seconde vie à vos vêtements, meubles et objets tout en soutenant votre communauté locale partout au Maroc.
            </p>

            {/* Barre de recherche rapide intégrée */}
            <form className="banner-quick-search-box" onSubmit={handleSearchSubmit}>
              <div className="search-input-wrap">
                <FaSearch className="search-box-icon" />
                <input
                  type="text"
                  placeholder="Que cherchez-vous ? (ex: vélo, table, vêtements...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-box-input"
                />
              </div>
              <button type="submit" className="search-box-submit-btn">
                Rechercher
              </button>
            </form>

            {/* Boutons d'actions rapides */}
            <div className="banner-actions-row">
              <Link to="/post-ad" className="banner-btn-link">
                <button className="banner-primary-btn">
                  <FaPlusCircle /> Publier un don gratuit
                </button>
              </Link>
              <Link to="/catalogue" className="banner-btn-link">
                <button className="banner-secondary-btn">
                  <FaSearch /> Explorer le catalogue
                </button>
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Carte d'activité en direct (Glassmorphism laissant voir la vidéo) */}
          <div className="banner-right-content">
            <div className="banner-glass-card">
              <div className="glass-card-header">
                <div className="live-status-pill">
                  <span className="live-pulsing-dot" />
                  <span>Activité en direct</span>
                </div>
                <span className="live-region-tag">Casablanca • Rabat • Marrakech</span>
              </div>

              <div className="glass-card-featured-gift">
                <div className="featured-gift-thumbnail">
                  <img src="/donner1.png" alt="Don récent" />
                  <span className="gift-free-tag">100% GRATUIT</span>
                </div>
                <div className="featured-gift-info">
                  <h4 className="gift-title">Table en bois &amp; 4 chaises</h4>
                  <p className="gift-location">
                    <FaMapMarkerAlt className="mini-pin" /> Quartier Maârif, Casablanca
                  </p>
                  <span className="gift-time">Offert il y a 8 min</span>
                </div>
              </div>

              <div className="glass-card-eco-impact">
                <div className="eco-icon-wrap">
                  <FaLeaf />
                </div>
                <div className="eco-text-wrap">
                  <span className="eco-stat-title">Impact Écologique &amp; Social</span>
                  <span className="eco-stat-desc">Zéro commission • Économie circulaire solidaire</span>
                </div>
              </div>

              <Link to="/catalogue" className="glass-card-footer-link">
                Voir toutes les annonces disponibles <FaArrowRight />
              </Link>

              {/* Badge flottant supérieur */}
              <div className="floating-bubble bubble-top">
                <FaHandHoldingHeart className="bubble-icon" />
                <div>
                  <strong>Don offert</strong>
                  <span>Il y a 5 min</span>
                </div>
              </div>

              {/* Badge flottant inférieur */}
              <div className="floating-bubble bubble-bottom">
                <FaCheckCircle className="bubble-icon check" />
                <div>
                  <strong>100% Gratuit</strong>
                  <span>Direct entre voisins</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PARTIE 2 : Dock de Statistiques Horizontal (Bas) ── */}
        <div className="banner-stats-dock" ref={objetsRef}>
          <div className="stat-dock-item">
            <div className="stat-dock-icon green">
              <FaGift />
            </div>
            <div className="stat-dock-text">
              <span className="stat-dock-number">+{objetsCount.toLocaleString('fr-FR')}</span>
              <span className="stat-dock-label">Objets donnés</span>
            </div>
          </div>

          <div className="stat-dock-divider" />

          <div className="stat-dock-item" ref={membresRef}>
            <div className="stat-dock-icon terracotta">
              <FaUsers />
            </div>
            <div className="stat-dock-text">
              <span className="stat-dock-number">+{membresCount.toLocaleString('fr-FR')}</span>
              <span className="stat-dock-label">Membres actifs</span>
            </div>
          </div>

          <div className="stat-dock-divider" />

          <div className="stat-dock-item">
            <div className="stat-dock-icon blue">
              <FaMapMarkerAlt />
            </div>
            <div className="stat-dock-text">
              <span className="stat-dock-number">12 Régions</span>
              <span className="stat-dock-label">Partout au Maroc</span>
            </div>
          </div>

          <div className="stat-dock-divider" />

          <div className="stat-dock-item">
            <div className="stat-dock-icon gold">
              <FaLeaf />
            </div>
            <div className="stat-dock-text">
              <span className="stat-dock-number">100% Solidaire</span>
              <span className="stat-dock-label">Économie circulaire</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;

