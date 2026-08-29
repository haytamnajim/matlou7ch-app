import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCamera,
  FaComments,
  FaHandsHelping,
  FaShieldAlt,
  FaHeart,
  FaRecycle,
  FaArrowRight,
  FaPlusCircle,
  FaCheckCircle
} from 'react-icons/fa';
import HomeBanner from '../components/HomeBanner';
import './Home.css';

function Home() {
  const categories = [
    {
      id: 'vetements',
      name: 'Vêtements & Mode',
      image: '/images/categories/vetement.jpg',
      badge: 'Populaire'
    },
    {
      id: 'multimedia',
      name: 'Électronique & Multimédia',
      image: '/images/categories/electronique.jpg',
      badge: 'Demandé'
    },
    {
      id: 'meubles',
      name: 'Meubles & Mobilier',
      image: '/images/categories/meubles.jpg',
      badge: 'Tendance'
    },
    {
      id: 'maison',
      name: 'Maison & Décoration',
      image: '/images/categories/maison.jpg',
      badge: 'Indispensable'
    },
    {
      id: 'livres',
      name: 'Livres & Scolaire',
      image: '/images/categories/livre.jpg',
      badge: 'Éducatif'
    },
    {
      id: 'jouets',
      name: 'Jeux & Loisirs',
      image: '/images/categories/jouet.jpg',
      badge: 'Enfants'
    }
  ];

  return (
    <div className="home-page-new">
      {/* 1. Hero Banner moderne */}
      <HomeBanner />

      {/* 2. Section Catégories Populaires */}
      <section className="home-categories-section">
        <div className="home-section-container">
          <div className="section-header-center">
            <span className="section-tag">DÉCOUVREZ PAR BESOIN</span>
            <h2 className="section-title">Explorez les Catégories de Dons</h2>
            <p className="section-subtitle">
              Trouvez ce dont vous avez besoin ou faites don d'objets spécifiques à proximité.
            </p>
          </div>

          <div className="categories-cards-grid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalogue?category=${cat.id}`}
                className="category-card-item"
              >
                <div className="category-card-img-wrap">
                  <img src={cat.image} alt={cat.name} className="category-card-img" />
                  <span className="category-card-badge">{cat.badge}</span>
                  <div className="category-card-overlay">
                    <h3 className="category-card-title">{cat.name}</h3>
                    <span className="category-card-link-text">
                      Voir les annonces <FaArrowRight className="link-arrow" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="categories-view-all-wrap">
            <Link to="/catalogue" className="view-all-btn">
              Voir tout le catalogue <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Section Comment ça marche en 3 étapes */}
      <section className="how-it-works-section">
        <div className="home-section-container">
          <div className="section-header-center">
            <span className="section-tag green">SIMPLE ET RAPIDE</span>
            <h2 className="section-title">Comment fonctionne Matlou7ch ?</h2>
            <p className="section-subtitle">
              Donner et recevoir n'a jamais été aussi facile. En 3 étapes simples, partagez la générosité.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number-badge">01</div>
              <div className="step-icon-box">
                <FaCamera className="step-icon" />
              </div>
              <h3 className="step-title">Publiez en 1 minute</h3>
              <p className="step-desc">
                Prenez une photo de l'objet que vous n'utilisez plus, ajoutez une description et choisissez votre ville.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number-badge">02</div>
              <div className="step-icon-box">
                <FaComments className="step-icon" />
              </div>
              <h3 className="step-title">Échangez sereinement</h3>
              <p className="step-desc">
                Discutez avec les personnes intéressées via notre messagerie sécurisée pour convenir d'un rendez-vous.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number-badge">03</div>
              <div className="step-icon-box">
                <FaHandsHelping className="step-icon" />
              </div>
              <h3 className="step-title">Donnez le sourire</h3>
              <p className="step-desc">
                Remettez l'objet en main propre gratuitement et participez activement à l'économie circulaire au Maroc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section Mission & Impact */}
      <section className="concepts-section">
        <div className="concepts-container">
          <div className="concepts-header-wrap">
            <span className="concepts-pill">NOTRE MISSION COMMUNE</span>
            <h2 className="concepts-title">
              DONNEZ UNE SECONDE VIE<br />À VOS OBJETS
            </h2>
            <p className="concepts-intro-text">
              Chaque objet partagé évite le gaspillage et renforce les liens d'entraide entre citoyens.
            </p>
          </div>

          <div className="concepts-grid">
            <div className="concept-item">
              <div className="concept-image-wrapper">
                <img src="/donner1.png" alt="Solidarité et entraide" />
                <div className="concept-overlay">
                  <span className="concept-label">Solidarité</span>
                  <p className="concept-desc">Aidez des familles et étudiants qui en ont vraiment besoin.</p>
                </div>
              </div>
            </div>

            <div className="concept-item">
              <div className="concept-image-wrapper">
                <img src="/donner2.jpg" alt="Écologie et recyclage" />
                <div className="concept-overlay">
                  <span className="concept-label">Écologie</span>
                  <p className="concept-desc">Réduisez les déchets en prolongeant la durée de vie des objets.</p>
                </div>
              </div>
            </div>

            <div className="concept-item">
              <div className="concept-image-wrapper">
                <img src="/donner3.png" alt="Communauté marocaine" />
                <div className="concept-overlay">
                  <span className="concept-label">Communauté</span>
                  <p className="concept-desc">Un réseau chaleureux d'échange local dans toutes les villes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="concepts-footer">
            <Link to="/post-ad" className="concepts-cta-link">
              <button className="concepts-cta">
                <FaPlusCircle /> Déposer un don maintenant
              </button>
            </Link>
            <p className="concepts-text">
              Matlou7ch est la 1ère plateforme solidaire 100% gratuite sans intermédiaire au Maroc.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Section Valeurs et Sécurité */}
      <section className="features-section">
        <div className="home-section-container">
          <div className="section-header-center">
            <span className="section-tag">POURQUOI MATLOU7CH ?</span>
            <h2 className="section-title">Une expérience fiable et humaine</h2>
            <p className="section-subtitle">
              Nous mettons la confiance, la gratuité et l'impact positif au cœur de la plateforme.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper green-icon">
                <FaHeart className="feature-icon" />
              </div>
              <h3 className="feature-name">100% Gratuit & Solidaire</h3>
              <p className="feature-text">
                Aucune commission, aucune transaction financière. Tout se donne de bon cœur.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper blue-icon">
                <FaShieldAlt className="feature-icon" />
              </div>
              <h3 className="feature-name">Communauté de Confiance</h3>
              <p className="feature-text">
                Comptes vérifiés, modération attentive et avis communautaires bienveillants.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper terracotta-icon">
                <FaRecycle className="feature-icon" />
              </div>
              <h3 className="feature-name">Impact Écologique Réel</h3>
              <p className="feature-text">
                Moins de pollution, moins de production inutile : vive l'économie circulaire !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Grande Bannière d'Appel à l'action (CTA) */}
      <section className="home-cta-banner-section">
        <div className="home-section-container">
          <div className="cta-card-box">
            <div className="cta-card-content">
              <span className="cta-mini-pill">Rejoignez le mouvement</span>
              <h2 className="cta-heading">Vous avez un objet qui ne vous sert plus ?</h2>
              <p className="cta-subheading">
                Quelqu'un près de chez vous en cherche sûrement un. Faites une bonne action en quelques clics.
              </p>
              <div className="cta-benefits-list">
                <span><FaCheckCircle className="check-icon" /> Gratuit à 100%</span>
                <span><FaCheckCircle className="check-icon" /> Envoi en 1 minute</span>
                <span><FaCheckCircle className="check-icon" /> Partout au Maroc</span>
              </div>
              <Link to="/post-ad" className="cta-main-btn-link">
                <button className="cta-main-btn">
                  <FaPlusCircle /> Publier un don gratuitement
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
