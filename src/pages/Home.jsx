import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTshirt, FaMobileAlt, FaHome, FaGem, FaTools,
  FaLeaf, FaGamepad, FaRunning, FaBook
} from 'react-icons/fa';
import HomeBanner from '../components/HomeBanner';
import './Home.css';

// Constantes extraites pour éviter les recréations à chaque render
const CATEGORIES = [
  { id: 'vetements', icon: <FaTshirt />, name: 'Vêtements' },
  { id: 'multimedia', icon: <FaMobileAlt />, name: 'Multimédia' },
  { id: 'maison', icon: <FaHome />, name: 'Maison' },
  { id: 'accessoires', icon: <FaGem />, name: 'Accessoires' },
  { id: 'bricolage', icon: <FaTools />, name: 'Bricolage' },
  { id: 'jardin', icon: <FaLeaf />, name: 'Jardin' },
  { id: 'jouets', icon: <FaGamepad />, name: 'Jouets' },
  { id: 'sport', icon: <FaRunning />, name: 'Sport' },
  { id: 'livre', icon: <FaBook />, name: 'Livres' },
];

function Home() {
  return (
    <div className="home-page">
      <HomeBanner />

      <div className="home-content-wrapper">
        {/* Catégories populaires */}
        <section className="categories-section">
          <h2 className="section-title">Catégories populaires</h2>
          <div className="categories-container">
            <div className="categories-grid">
              {CATEGORIES.map((cat, index) => (
                <div className="category-card" key={`${cat.id}-${index}`}>
                  <div className="category-icon-wrapper">
                    {cat.icon}
                  </div>
                  <span className="category-name">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Multimédia */}
        <section className="category-products-section">
          <div className="section-header">
            <h2 className="category-section-title">Multimédia</h2>
            <Link to="/catalogue?category=multimedia" className="see-all-link">Voir tout</Link>
          </div>
          <div className="product-grid">
            {/* Produit 1 */}
            <div className="product-card">
              <div className="product-card-user">
                <div className="product-avatar-small" style={{ backgroundColor: "var(--primary-color)" }}>A</div>
                <Link to="/profil/ayoub" className="product-username-small">Ayoub</Link>
              </div>
              <Link to="/produit/1" className="product-image-link">
                <div className="product-image-container">
                  <div className="product-image" style={{ backgroundColor: '#f5f5f5' }}></div>
                </div>
              </Link>
              <div className="product-info-modern">
                <Link to="/produit/1" className="product-title-link">
                  <h3 className="product-title-text">Console de jeux PS5</h3>
                </Link>
                <div className="product-meta-modern">
                  <span className="product-location-text">Casablanca (Casablanca-Settat)</span>
                  <span className="product-time-text">Il y a 2 heures</span>
                </div>
              </div>
            </div>

            {/* Produit 2 */}
            <div className="product-card">
              <div className="product-card-user">
                <div className="product-avatar-small" style={{ backgroundColor: "#31511E" }}>Y</div>
                <Link to="/profil/youssef" className="product-username-small">Youssef</Link>
              </div>
              <Link to="/produit/2" className="product-image-link">
                <div className="product-image-container">
                  <div className="product-image" style={{ backgroundColor: '#f5f5f5' }}></div>
                </div>
              </Link>
              <div className="product-info-modern">
                <Link to="/produit/2" className="product-title-link">
                  <h3 className="product-title-text">Appareil photo Canon</h3>
                </Link>
                <div className="product-meta-modern">
                  <span className="product-location-text">Agadir (Souss-Massa)</span>
                  <span className="product-time-text">Il y a 1 jour</span>
                </div>
              </div>
            </div>

            {/* Produit 3 */}
            <div className="product-card">
              <div className="product-card-user">
                <div className="product-avatar-small" style={{ backgroundColor: "#E9C46A" }}>M</div>
                <Link to="/profil/mehdi" className="product-username-small">Mehdi</Link>
              </div>
              <Link to="/produit/3" className="product-image-link">
                <div className="product-image-container">
                  <div className="product-image" style={{ backgroundColor: '#f5f5f5' }}></div>
                </div>
              </Link>
              <div className="product-info-modern">
                <Link to="/produit/3" className="product-title-link">
                  <h3 className="product-title-text">Casque Audio Bose</h3>
                </Link>
                <div className="product-meta-modern">
                  <span className="product-location-text">Tanger (Tanger-Tétouan)</span>
                  <span className="product-time-text">Il y a 3 heures</span>
                </div>
              </div>
            </div>

            {/* Produit 4 */}
            <div className="product-card">
              <div className="product-card-user">
                <div className="product-avatar-small" style={{ backgroundColor: "#E76F51" }}>L</div>
                <Link to="/profil/leila" className="product-username-small">Leila</Link>
              </div>
              <Link to="/produit/4" className="product-image-link">
                <div className="product-image-container">
                  <div className="product-image" style={{ backgroundColor: '#f5f5f5' }}></div>
                </div>
              </Link>
              <div className="product-info-modern">
                <Link to="/produit/4" className="product-title-link">
                  <h3 className="product-title-text">Smartphone Samsung</h3>
                </Link>
                <div className="product-meta-modern">
                  <span className="product-location-text">Marrakech (Marrakech-Safi)</span>
                  <span className="product-time-text">Il y a 5 heures</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Vêtements */}
        <section className="category-products-section">
          <div className="section-header">
            <h2 className="category-section-title">Vêtements</h2>
            <Link to="/catalogue?category=vetements" className="see-all-link">Voir tout</Link>
          </div>
          <div className="product-grid">
            {/* Produit 5 */}
            <div className="product-card">
              <div className="product-card-user">
                <div className="product-avatar-small" style={{ backgroundColor: "var(--primary-color)" }}>A</div>
                <Link to="/profil/ayoub" className="product-username-small">Ayoub</Link>
              </div>
              <Link to="/produit/5" className="product-image-link">
                <div className="product-image-container">
                  <div className="product-image" style={{ backgroundColor: '#f5f5f5' }}></div>
                </div>
              </Link>
              <div className="product-info-modern">
                <Link to="/produit/5" className="product-title-link">
                  <h3 className="product-title-text">Veste rouge tendance</h3>
                </Link>
                <div className="product-meta-modern">
                  <span className="product-location-text">Azemmour (Casablanca-Settat)</span>
                  <span className="product-time-text">Il y a 5 minutes</span>
                </div>
              </div>
            </div>

            {/* Produit 6 */}
            <div className="product-card">
              <div className="product-card-user">
                <div className="product-avatar-small" style={{ backgroundColor: "#31511E" }}>S</div>
                <Link to="/profil/sara" className="product-username-small">Sara</Link>
              </div>
              <Link to="/produit/6" className="product-image-link">
                <div className="product-image-container">
                  <div className="product-image" style={{ backgroundColor: '#f5f5f5' }}></div>
                </div>
              </Link>
              <div className="product-info-modern">
                <Link to="/produit/6" className="product-title-link">
                  <h3 className="product-title-text">Chaussures de sport Nike</h3>
                </Link>
                <div className="product-meta-modern">
                  <span className="product-location-text">Rabat (Rabat-Salé-Kénitra)</span>
                  <span className="product-time-text">Il y a 10 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
