import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaQuestionCircle,
  FaUserCheck,
  FaPlusCircle,
  FaGift,
  FaShieldAlt,
  FaCogs,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaUndoAlt,
  FaHeadset
} from 'react-icons/fa';
import './FAQ.css';

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeQuestions, setActiveQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleQuestion = (questionId) => {
    setActiveQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const categories = [
    { id: 'all', title: 'Toutes les questions', icon: <FaQuestionCircle /> },
    { id: 'general', title: 'Général', icon: <FaGift /> },
    { id: 'compte', title: 'Compte & Inscription', icon: <FaUserCheck /> },
    { id: 'annonces', title: 'Publication d\'annonces', icon: <FaPlusCircle /> },
    { id: 'dons', title: 'Dons & Remise', icon: <FaGift /> },
    { id: 'securite', title: 'Sécurité & Confiance', icon: <FaShieldAlt /> },
    { id: 'technique', title: 'Assistance Technique', icon: <FaCogs /> }
  ];

  const allFaqItems = useMemo(() => [
    {
      id: 'what-is-matlou7ch',
      category: 'general',
      categoryName: 'Général',
      question: 'Qu\'est-ce que Matlou7ch ?',
      answer: 'Matlou7ch est la première plateforme marocaine 100% gratuite de dons d\'objets entre particuliers. Notre mission est de donner une seconde vie aux objets du quotidien, d\'encourager l\'économie circulaire et de créer des liens de solidarité humaine sans contrepartie financière.'
    },
    {
      id: 'how-it-works',
      category: 'general',
      categoryName: 'Général',
      question: 'Comment fonctionne la plateforme ?',
      answer: 'Le fonctionnement est simple : un utilisateur publie gratuitement une annonce avec photo et description d\'un objet qu\'il n\'utilise plus. Les personnes intéressées le contactent via notre messagerie sécurisée pour convenir d\'un point de rendez-vous convivial pour la remise de l\'objet.'
    },
    {
      id: 'is-it-free',
      category: 'general',
      categoryName: 'Général',
      question: 'Est-ce réellement 100% gratuit ?',
      answer: 'Oui, sans aucune exception. Tout objet proposé sur Matlou7ch doit être donné gratuitement. Nous ne prélevons aucune commission, aucuns frais cachés et aucune transaction financière n\'a lieu sur la plateforme.'
    },
    {
      id: 'create-account',
      category: 'compte',
      categoryName: 'Compte & Inscription',
      question: 'Comment créer un compte sur Matlou7ch ?',
      answer: 'Cliquez sur "S\'inscrire" en haut à droite. Il vous suffit d\'indiquer votre nom, adresse email et un mot de passe sécurisé. Vous recevrez instantanément accès à l\'ensemble des fonctionnalités de la communauté.'
    },
    {
      id: 'delete-account',
      category: 'compte',
      categoryName: 'Compte & Inscription',
      question: 'Comment gérer ou supprimer mon compte ?',
      answer: 'Depuis votre menu profil, rendez-vous dans vos paramètres de compte. Vous pouvez à tout moment modifier vos coordonnées ou demander la suppression définitive de vos données personnelles.'
    },
    {
      id: 'post-ad',
      category: 'annonces',
      categoryName: 'Publication d\'annonces',
      question: 'Comment publier une annonce de don ?',
      answer: 'Cliquez sur le bouton "+ Donner" dans la barre de navigation. Ajoutez une ou plusieurs photos claires, un titre descriptif, la catégorie de l\'objet ainsi que votre ville / quartier. Votre don est mis en ligne instantanément !'
    },
    {
      id: 'edit-ad',
      category: 'annonces',
      categoryName: 'Publication d\'annonces',
      question: 'Puis-je modifier ou retirer mon annonce une fois donnée ?',
      answer: 'Absolument. Rendez-vous dans "Mon Profil" > "Mes annonces". Vous pouvez y modifier les détails, marquer l\'objet comme donné ou supprimer l\'annonce dès que la remise a été effectuée.'
    },
    {
      id: 'choose-recipient',
      category: 'dons',
      categoryName: 'Dons & Remise',
      question: 'Comment choisir à qui donner mon objet ?',
      answer: 'En tant que donateur, vous êtes entièrement libre de choisir le bénéficiaire. Vous pouvez échanger quelques messages pour vous assurer que la personne en a réellement besoin et qu\'elle est disponible pour venir le récupérer à l\'heure convenue.'
    },
    {
      id: 'meeting-safety',
      category: 'dons',
      categoryName: 'Dons & Remise',
      question: 'Comment organiser la remise en toute sérénité ?',
      answer: 'Nous vous recommandons de privilégier un lieu public fréquenté en journée (devant un café, un centre commercial, une station) et de confirmer le rendez-vous par message avant de vous déplacer.'
    },
    {
      id: 'trust-users',
      category: 'securite',
      categoryName: 'Sécurité & Confiance',
      question: 'Comment la sécurité est-elle assurée sur Matlou7ch ?',
      answer: 'Toutes les annonces sont modérées. Notre système de messagerie interne vous permet d\'échanger sans divulguer votre numéro de téléphone si vous le souhaitez. De plus, notre équipe réactive intervient sur tout signalement.'
    },
    {
      id: 'report-user',
      category: 'securite',
      categoryName: 'Sécurité & Confiance',
      question: 'Que faire en cas d\'abus ou de comportement suspect ?',
      answer: 'Si un utilisateur tente de vendre un objet ou se montre inapproprié, utilisez le bouton "Signaler" disponible sur l\'annonce ou dans la messagerie. Notre équipe traite les alertes dans l\'heure.'
    },
    {
      id: 'app-issues',
      category: 'technique',
      categoryName: 'Assistance Technique',
      question: 'J\'ai un problème technique sur le site, qui contacter ?',
      answer: 'Vous pouvez joindre notre assistance technique via la page Contact ou par email à support@matlou7ch.ma. Notre équipe vous répondra dans les plus brefs délais.'
    }
  ], []);

  // Filtrer les questions selon la catégorie et la recherche
  const filteredFaq = useMemo(() => {
    return allFaqItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.categoryName.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [allFaqItems, activeCategory, searchQuery]);

  return (
    <div className="faq-page-wrapper">
      {/* 1. Hero Header */}
      <section className="faq-hero-section">
        <div className="faq-container">
          <span className="faq-pill-badge">
            <FaHeadset className="pill-icon" /> CENTRE D'AIDE & SUPPORT
          </span>
          <h1 className="faq-main-title">Comment pouvons-nous vous aider ?</h1>
          <p className="faq-main-subtitle">
            Retrouvez les réponses aux questions les plus fréquentes sur l'utilisation de Matlou7ch.
          </p>

          {/* Barre de recherche instantanée */}
          <div className="faq-search-box">
            <FaSearch className="faq-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par mot-clé (ex: compte, publier, gratuit, sécurité...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="faq-clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Effacer la recherche"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Onglets de Catégories */}
      <section className="faq-main-content-section">
        <div className="faq-container">
          <div className="faq-category-chips">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`faq-chip ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="chip-icon">{cat.icon}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* 3. Liste Accordéon */}
          <div className="faq-accordion-container">
            {filteredFaq.length === 0 ? (
              <div className="faq-no-results-box">
                <FaQuestionCircle className="no-res-icon" />
                <h3>Aucune question ne correspond à votre recherche</h3>
                <p>Essayez avec d'autres termes ou parcourez les catégories ci-dessus.</p>
                <button
                  type="button"
                  className="faq-reset-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  <FaUndoAlt /> Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="faq-questions-list">
                {filteredFaq.map((item) => {
                  const isOpen = !!activeQuestions[item.id];
                  return (
                    <article
                      key={item.id}
                      className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
                    >
                      <button
                        type="button"
                        className="faq-accordion-trigger"
                        onClick={() => toggleQuestion(item.id)}
                        aria-expanded={isOpen}
                      >
                        <div className="trigger-left">
                          <span className="question-cat-tag">{item.categoryName}</span>
                          <h3 className="question-text">{item.question}</h3>
                        </div>
                        <span className="trigger-chevron">
                          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="faq-accordion-body">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Boîte de contact direct */}
          <div className="faq-contact-card">
            <div className="contact-card-icon-box">
              <FaEnvelope />
            </div>
            <h2 className="contact-card-title">Vous avez encore une question ?</h2>
            <p className="contact-card-text">
              Notre équipe d'assistance est à votre écoute pour vous accompagner dans vos dons.
            </p>
            <Link to="/contact" className="contact-card-btn">
              Contacter le support
            </Link>
          </div>
        </div>
      </section>

      {/* Bouton Scroll to top */}
      {showScrollTop && (
        <button
          type="button"
          className="faq-scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Retour en haut"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default FAQ;
