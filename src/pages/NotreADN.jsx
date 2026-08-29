import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLeaf,
  FaHandsHelping,
  FaShieldAlt,
  FaRecycle,
  FaUsers,
  FaMapMarkerAlt,
  FaHeart,
  FaPlusCircle,
  FaEnvelope,
  FaCheckCircle
} from 'react-icons/fa';
import './NotreADN.css';

function NotreADN() {
  const pillars = [
    {
      icon: <FaHandsHelping />,
      color: 'green',
      title: 'Solidarité Directe',
      desc: 'Connecter directement les donneurs avec ceux qui en ont besoin, sans intermédiaire ni transaction financière.'
    },
    {
      icon: <FaRecycle />,
      color: 'terracotta',
      title: 'Écologie Circulaire',
      desc: 'Réduire le gaspillage et préserver les ressources en prolongeant la durée de vie utile de chaque objet.'
    },
    {
      icon: <FaMapMarkerAlt />,
      color: 'blue',
      title: 'Entraide de Proximité',
      desc: 'Favoriser les dons au cœur des quartiers dans toutes les 12 régions du Maroc pour créer du lien local.'
    },
    {
      icon: <FaShieldAlt />,
      color: 'emerald',
      title: 'Confiance & Sécurité',
      desc: 'Offrir un espace bienveillant avec des profils authentifiés et une messagerie interne sécurisée.'
    }
  ];

  return (
    <div className="notre-adn-page">
      {/* 1. Hero Section */}
      <section className="adn-hero-section">
        <div className="adn-container">
          <div className="adn-hero-grid">
            <div className="adn-hero-text">
              <span className="adn-hero-badge">
                <FaLeaf className="badge-icon" /> NOTRE MISSION & ENGAGEMENT
              </span>
              <h1 className="adn-hero-title">
                "Ne jetons plus, <br />
                <span className="adn-gradient-word">donnons !</span>"
              </h1>
              <p className="adn-hero-description">
                Matlou7ch est née d'une conviction profonde : ce qui ne nous sert plus peut changer le quotidien de quelqu'un d'autre. Nous bâtissons le premier écosystème solidaire et éco-responsable au Maroc.
              </p>
              <div className="adn-hero-actions">
                <Link to="/post-ad" className="adn-btn-primary">
                  <FaPlusCircle /> Faire un don
                </Link>
                <Link to="/catalogue" className="adn-btn-secondary">
                  Découvrir les objets
                </Link>
              </div>
            </div>

            <div className="adn-hero-visual">
              <div className="adn-image-frame">
                <img src="/adn.png" alt="Notre ADN Matlou7ch" className="adn-main-img" />
                <div className="adn-floating-stat">
                  <FaHeart className="stat-heart-icon" />
                  <div>
                    <span className="stat-value">100% Solidaire</span>
                    <span className="stat-sub">Sans argent • Avec le cœur</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section Histoire & Vision */}
      <section className="adn-story-section">
        <div className="adn-container">
          <div className="adn-section-header">
            <span className="adn-sub-badge">QUI SOMMES-NOUS ?</span>
            <h2 className="adn-section-heading">L'Histoire d'une Communauté Engagée</h2>
            <p className="adn-section-sub">
              Transformer la générosité des Marocains en action concrète et durable.
            </p>
          </div>

          <div className="adn-story-grid">
            <div className="story-card">
              <div className="story-step-num">01</div>
              <h3 className="story-card-title">Le Constat</h3>
              <p className="story-card-text">
                Des milliers d'objets en parfait état dorment dans nos placards ou finissent jetés, tandis que des étudiants, des familles et des associations en ont un besoin quotidien vital.
              </p>
            </div>

            <div className="story-card highlight">
              <div className="story-step-num">02</div>
              <h3 className="story-card-title">La Solution Matlou7ch</h3>
              <p className="story-card-text">
                Une application simple, moderne et gratuite qui permet à n'importe qui de poster une photo en 1 minute et de trouver un preneur bienveillant à deux pas de chez lui.
              </p>
            </div>

            <div className="story-card">
              <div className="story-step-num">03</div>
              <h3 className="story-card-title">L'Impact Collectif</h3>
              <p className="story-card-text">
                Chaque semaine, nous évitons des tonnes de déchets et permettons à des milliers de personnes de s'équiper dignement, dans un esprit de fraternité 100% marocain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section Les 4 Piliers Fondamentaux */}
      <section className="adn-pillars-section">
        <div className="adn-container">
          <div className="adn-section-header">
            <span className="adn-sub-badge green">NOS VALEURS FONDATRICES</span>
            <h2 className="adn-section-heading">Ce qui guide chacune de nos actions</h2>
            <p className="adn-section-sub">
              Des principes inébranlables au service de l'humain et de l'environnement.
            </p>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="pillar-card">
                <div className={`pillar-icon-box ${pillar.color}`}>
                  {pillar.icon}
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section Manifeste & Vision Maroc 2030 */}
      <section className="adn-manifesto-section">
        <div className="adn-container">
          <div className="manifesto-card-box">
            <span className="manifesto-pill">NOTRE VISION DU MAROC</span>
            <h2 className="manifesto-heading">
              "Un Maroc où le don est un réflexe, et le gaspillage une exception."
            </h2>
            <p className="manifesto-paragraph">
              Nous croyons qu'un avenir prospère passe par la valorisation de ce que nous possédons déjà. Matlou7ch n'est pas qu'un site web : c'est un mouvement citoyen qui célèbre la baraka du partage et protège notre belle terre marocaine.
            </p>

            <div className="manifesto-highlights-list">
              <div className="manifesto-item">
                <FaCheckCircle className="check-bullet" />
                <span>Zéro frais, zéro commission pour toujours</span>
              </div>
              <div className="manifesto-item">
                <FaCheckCircle className="check-bullet" />
                <span>Plateforme marocaine pensée pour les réalités locales</span>
              </div>
              <div className="manifesto-item">
                <FaCheckCircle className="check-bullet" />
                <span>Impact direct mesurable sur l'environnement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section Équipe & Rejoindre le mouvement */}
      <section className="adn-cta-section">
        <div className="adn-container">
          <div className="adn-join-box">
            <h2 className="join-title">Envie de contribuer à l'aventure ?</h2>
            <p className="join-sub">
              Que vous soyez particulier, bénévole ou association, rejoignez le mouvement Matlou7ch dès aujourd'hui.
            </p>
            <div className="join-buttons">
              <Link to="/post-ad" className="join-btn-donate">
                <FaPlusCircle /> Publier un don
              </Link>
              <Link to="/contact" className="join-btn-contact">
                <FaEnvelope /> Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotreADN;

