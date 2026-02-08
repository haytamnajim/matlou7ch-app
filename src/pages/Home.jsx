import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeBanner from '../components/HomeBanner';
import './Home.css';

// Constantes extraites pour éviter les recréations à chaque render
const CATEGORIES = [
  { id: 'vetements', image: '/images/categories/vetement.jpg', name: 'Vêtements' },
  { id: 'multimedia', image: '/images/categories/multimedia.jpg', name: 'Multimédia' },
  { id: 'maison', image: '/images/categories/maison.jpg', name: 'Maison' },
  { id: 'accessoires', image: '/images/categories/accessoire.jpg', name: 'Accessoires' },
  { id: 'bricolage', image: '/images/categories/bricolage.jpg', name: 'Bricolage' },
  { id: 'jardin', image: '/images/categories/jardin.jpg', name: 'Jardin' },
  { id: 'jouets', image: '/images/categories/jouet.jpg', name: 'Jouets' },
  { id: 'sport', image: '/images/categories/sport.jpg', name: 'Sport' },
  { id: 'livre', image: '/images/categories/livre.jpg', name: 'Livres' },
  { id: 'maison', image: '/images/categories/maison.jpg', name: 'Maison' },
];

const CATEGORY_IMAGE_STYLE = { backgroundColor: 'var(--bg-sage)' };

function Home() {
  return (
    <div className="home-page">
      <HomeBanner />

      {/* Catégories */}
      <section className="categories-section">
        <h2 className="section-title">Catégories populaires</h2>
        <div className="categories-grid">
          {CATEGORIES.map((cat, index) => (
            <div className="category-card" key={`${cat.id}-${index}`}>
              <div className="category-image-container">
                <div className="category-image" style={CATEGORY_IMAGE_STYLE}></div>
              </div>
              <div className="category-name">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Multimédia */}
      <section className="category-products-section">
        <div className="section-header">
          <h2 className="section-title">Multimédia</h2>
          <Link to="/catalogue?category=multimedia" className="see-all-button">Voir tout</Link>
        </div>
        <div className="product-grid">
          {/* Produit 1 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/1" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--bg-main)" }}>A</div>
              <Link
                to="/profil/ayoub"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Ayoub
              </Link>
            </div>
            <div className="product-info">
              <Link to="/produit/1" className="product-title-link">
                <h3 className="product-title">Console de jeux PS5</h3>
              </Link>
              <p className="product-location">Casablanca (Casablanca-Settat)</p>
              <p className="product-time">2 heures</p>
            </div>
          </div>

          {/* Produit 2 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/2" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--bg-dark)" }}>Y</div>
              <Link
                to="/profil/youssef"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Youssef
              </Link>
            </div>
            <div className="product-info">
              <Link to="/produit/2" className="product-title-link">
                <h3 className="product-title">Appareil photo Canon</h3>
              </Link>
              <p className="product-location">Agadir (Souss-Massa)</p>
              <p className="product-time">1 jour</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vêtements */}
      <section className="category-products-section">
        <div className="section-header">
          <h2 className="section-title">Vêtements</h2>
          <Link to="/catalogue?category=vetements" className="see-all-button">Voir tout</Link>
        </div>
        <div className="product-grid">
          {/* Produit 5 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/5" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--bg-main)" }}>A</div>
              <Link
                to="/profil/ayoub"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Ayoub
              </Link>
            </div>
            <div className="product-info">
              <Link to="/produit/5" className="product-title-link">
                <h3 className="product-title">Veste rouge tendance</h3>
              </Link>
              <p className="product-location">Azemmour (Casablanca-Settat)</p>
              <p className="product-time">5 minutes</p>
            </div>
          </div>

          {/* Produit 6 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/6" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--bg-dark)" }}>S</div>
              <Link
                to="/profil/sara"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Sara
              </Link>
            </div>
            <div className="product-info">
              <Link to="/produit/6" className="product-title-link">
                <h3 className="product-title">Chaussures de sport Nike</h3>
              </Link>
              <p className="product-location">Rabat (Rabat-Salé-Kénitra)</p>
              <p className="product-time">10 minutes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
