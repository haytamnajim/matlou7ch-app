import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGift, FaSearch, FaPlusCircle, FaLeaf, FaHandHoldingHeart, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import './HomeBanner.css';

/* ── Animated Counter Hook ── */
function useCountUp(target, duration = 2000, startWhenVisible = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startWhenVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
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
  const { count: objetsCount, ref: objetsRef } = useCountUp(5000, 2200);
  const { count: membresCount, ref: membresRef } = useCountUp(12000, 2500);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle parallax on glow orbs
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section className="home-banner" onMouseMove={handleMouseMove}>
      {/* Orbes décoratifs avec parallaxe subtile */}
      <div
        className="banner-glow banner-glow-1"
        style={{ transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)` }}
      />
      <div
        className="banner-glow banner-glow-2"
        style={{ transform: `translate(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px)` }}
      />
      <div
        className="banner-glow banner-glow-3"
        style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.8}px)` }}
      />

      <div className="home-banner-container">
        <div className="home-banner-left">
          {/* Badge haut avec animation pulse */}
          <div className="banner-pill-badge">
            <span className="pill-dot" />
            <FaLeaf className="pill-icon" />
            <span>1ère Plateforme de Don &amp; Recyclage au Maroc</span>
          </div>

          <h1 className="home-banner-title">
            <span className="title-line title-line-1">Ne jetez plus,</span>
            <br />
            <span className="accent-highlight title-line title-line-2">donnez &amp; partagez</span>
            <br />
            <span className="title-line title-line-3">gratuitement à 100&nbsp;%&nbsp;!</span>
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

          {/* Statistiques animées */}
          <div className="banner-trust-stats" ref={objetsRef}>
            <div className="trust-stat-item">
              <div className="stat-icon-circle green">
                <FaGift />
              </div>
              <div className="stat-text-group">
                <span className="stat-number">+{objetsCount.toLocaleString('fr-FR')}</span>
                <span className="stat-label">Objets donnés</span>
              </div>
            </div>

            <div className="trust-stat-divider" />

            <div className="trust-stat-item" ref={membresRef}>
              <div className="stat-icon-circle terracotta">
                <FaUsers />
              </div>
              <div className="stat-text-group">
                <span className="stat-number">+{membresCount.toLocaleString('fr-FR')}</span>
                <span className="stat-label">Membres actifs</span>
              </div>
            </div>

            <div className="trust-stat-divider" />

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
            {/* Anneau décoratif derrière l'image */}
            <div className="image-ring-decoration" />

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
              <div className="floating-online-dot" />
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
