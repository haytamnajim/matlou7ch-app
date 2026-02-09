import React from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaTruck, FaShieldAlt } from 'react-icons/fa';
import HomeBanner from '../components/HomeBanner';
import './Home.css';

function Home() {
  return (
    <div className="home-page-new">
      <HomeBanner />

      {/* Section 1: Concepts Reimagined as Mission */}
      <section className="concepts-section">
        <div className="concepts-container">
          <h2 className="concepts-title">DONNEZ UNE<br />SECONDE VIE<br />À VOS OBJETS</h2>

          <div className="concepts-grid">
            <div className="concept-item">
              <div className="concept-image-wrapper">
                <img src="https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?auto=format&fit=crop&q=80&w=600" alt="Solidarité" />
                <div className="concept-overlay">
                  <span className="concept-label">Solidarité</span>
                </div>
              </div>
            </div>

            <div className="concept-item">
              <div className="concept-image-wrapper">
                <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=600" alt="Écologie" />
                <div className="concept-overlay">
                  <span className="concept-label">Écologie</span>
                </div>
              </div>
            </div>

            <div className="concept-item">
              <div className="concept-image-wrapper">
                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600" alt="Communauté" />
                <div className="concept-overlay">
                  <span className="concept-label">Communauté</span>
                </div>
              </div>
            </div>
          </div>

          <div className="concepts-footer">
            <button className="concepts-cta">Commencer un don</button>
            <p className="concepts-text">Matlou7ch est la première plateforme marocaine d'entraide dédiée au don d'objets entre particuliers.</p>
          </div>
        </div>
      </section>

      {/* Section 2: Valeurs de la plateforme */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><FaAward /></div>
            <h3 className="feature-name">Don 100% Gratuit</h3>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaTruck /></div>
            <h3 className="feature-name">Entraide Locale</h3>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaShieldAlt /></div>
            <h3 className="feature-name">Communauté de Confiance</h3>
          </div>
        </div>
      </section>

      {/* Section 3: L'expérience Matlou7ch */}
      <section className="experience-section">
        <div className="experience-header">
          <h2 className="experience-title">VOTRE IMPACT AU SEIN<br />DE LA COMMUNAUTÉ</h2>
          <p className="experience-desc">
            Chaque objet que vous donnez trouve un nouveau foyer et aide une personne dans le besoin. Ensemble, nous réduisons le gaspillage au Maroc tout en renforçant les liens sociaux.
          </p>
        </div>
        <div className="experience-gallery">
          <div className="gallery-item">
            <img src="/donner1.png" alt="Impact 1" />
          </div>
          <div className="gallery-item">
            <img src="/donner2.jpg" alt="Impact 2" />
          </div>
          <div className="gallery-item">
            <img src="/donner3.png" alt="Impact 3" />
          </div>
        </div>
        <div className="gallery-arrows">
          <span>{">>>>>>"}</span>
        </div>
      </section>
    </div>
  );
}

export default Home;
