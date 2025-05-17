import React, { useState, useEffect, useRef } from 'react';
import './FAQ.css';

function FAQ() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const categoryRefs = useRef({});

  // Gérer l'affichage du bouton de retour en haut
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour scroller vers une catégorie
  const scrollToCategory = (categoryId) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveCategory(categoryId);
    }
  };

  // Fonction pour revenir en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Fonction pour basculer l'affichage d'une catégorie
  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  // Fonction pour basculer l'affichage d'une question
  const toggleQuestion = (questionId) => {
    setActiveQuestion(activeQuestion === questionId ? null : questionId);
  };

  // Définition des catégories pour la navigation
  const categories = [
    { id: 'general', title: 'Questions générales' },
    { id: 'compte', title: 'Compte et inscription' },
    { id: 'annonces', title: 'Publication d\'annonces' },
    { id: 'dons', title: 'Dons et réception' },
    { id: 'securite', title: 'Sécurité et confiance' },
    { id: 'technique', title: 'Questions techniques' },
  ];

  // Questions et réponses par catégorie
  const faqData = {
    general: [
      {
        id: 'what-is-matlou7ch',
        question: 'Qu\'est-ce que Matlou7ch ?',
        answer: 'Matlou7ch est la première plateforme marocaine de dons d\'objets entre particuliers. Notre mission est de favoriser le réemploi des objets et de créer du lien social tout en luttant contre le gaspillage. Sur Matlou7ch, tous les objets sont donnés gratuitement, sans contrepartie financière.'
      },
      {
        id: 'how-it-works',
        question: 'Comment fonctionne Matlou7ch ?',
        answer: 'Le principe est simple : les utilisateurs publient des annonces pour donner des objets dont ils n\'ont plus l\'usage. D\'autres utilisateurs intéressés peuvent les contacter via la messagerie de la plateforme. Une fois d\'accord, ils conviennent d\'un lieu et d\'une heure pour la remise de l\'objet.'
      },
      {
        id: 'is-it-free',
        question: 'Est-ce vraiment gratuit ?',
        answer: 'Oui, l\'utilisation de Matlou7ch est entièrement gratuite. Tous les objets proposés sur la plateforme doivent être donnés sans contrepartie financière. Nous ne prélevons aucune commission sur les dons.'
      }
    ],
    compte: [
      {
        id: 'create-account',
        question: 'Comment créer un compte ?',
        answer: 'Pour créer un compte, cliquez sur "S\'inscrire" en haut à droite de la page d\'accueil. Vous pouvez vous inscrire avec votre adresse email ou via votre compte Google ou Facebook. Remplissez ensuite les informations demandées et validez votre inscription.'
      },
      {
        id: 'delete-account',
        question: 'Comment supprimer mon compte ?',
        answer: 'Pour supprimer votre compte, rendez-vous dans "Mon profil" > "Paramètres" > "Supprimer mon compte". Vous devrez confirmer votre décision et indiquer la raison de votre départ. Notez que la suppression de votre compte est définitive et que toutes vos données seront effacées.'
      },
      {
        id: 'change-password',
        question: 'Comment modifier mon mot de passe ?',
        answer: 'Pour modifier votre mot de passe, allez dans "Mon profil" > "Paramètres" > "Sécurité". Vous devrez entrer votre mot de passe actuel puis votre nouveau mot de passe deux fois pour confirmation.'
      }
    ],
    annonces: [
      {
        id: 'post-ad',
        question: 'Comment publier une annonce ?',
        answer: 'Pour publier une annonce, cliquez sur le bouton "+" en bas de l\'écran ou sur "Publier une annonce" dans votre profil. Remplissez le formulaire en indiquant le titre, la catégorie, la description et ajoutez des photos de l\'objet. N\'oubliez pas de préciser votre localisation pour faciliter la remise de l\'objet.'
      },
      {
        id: 'edit-ad',
        question: 'Comment modifier ou supprimer mon annonce ?',
        answer: 'Pour modifier ou supprimer votre annonce, rendez-vous dans "Mon profil" > "Mes annonces". Cliquez sur l\'annonce concernée puis sur "Modifier" ou "Supprimer". Vous pouvez également mettre votre annonce en pause temporairement.'
      },
      {
        id: 'ad-visibility',
        question: 'Combien de temps mon annonce reste-t-elle visible ?',
        answer: 'Les annonces restent visibles pendant 30 jours. Passé ce délai, elles sont automatiquement archivées. Vous recevrez une notification quelques jours avant l\'expiration de votre annonce pour vous proposer de la renouveler si l\'objet n\'a pas encore été donné.'
      }
    ],
    dons: [
      {
        id: 'contact-donor',
        question: 'Comment contacter un donneur ?',
        answer: 'Pour contacter un donneur, cliquez sur le bouton "Contacter" sur la page de l\'annonce. Vous pourrez alors envoyer un message via notre système de messagerie intégré. Soyez courtois et précis dans votre demande pour maximiser vos chances d\'obtenir l\'objet.'
      },
      {
        id: 'choose-recipient',
        question: 'Comment choisir à qui donner mon objet ?',
        answer: 'En tant que donneur, vous êtes libre de choisir à qui vous souhaitez donner votre objet. Vous pouvez vous baser sur les profils des demandeurs, leurs évaluations, ou simplement la pertinence de leur message. Privilégiez les personnes qui semblent vraiment intéressées et qui pourront venir chercher l\'objet rapidement.'
      },
      {
        id: 'meeting-safety',
        question: 'Comment organiser la remise de l\'objet en toute sécurité ?',
        answer: 'Pour votre sécurité, nous recommandons d\'organiser la remise de l\'objet dans un lieu public fréquenté (café, place, centre commercial). Privilégiez les rencontres en journée et informez un proche du lieu et de l\'heure du rendez-vous. N\'hésitez pas à échanger quelques messages avant la rencontre pour confirmer les détails.'
      }
    ],
    securite: [
      {
        id: 'trust-users',
        question: 'Comment savoir si je peux faire confiance à un utilisateur ?',
        answer: 'Consultez le profil de l\'utilisateur, ses évaluations et commentaires laissés par d\'autres membres. Un profil complet avec photo et plusieurs dons réussis est généralement un bon indicateur de fiabilité. En cas de doute, n\'hésitez pas à poser des questions via la messagerie avant d\'organiser une rencontre.'
      },
      {
        id: 'report-user',
        question: 'Comment signaler un comportement inapproprié ?',
        answer: 'Si vous constatez un comportement inapproprié, cliquez sur "Signaler" sur le profil de l\'utilisateur ou dans la conversation. Décrivez précisément le problème rencontré. Notre équipe de modération examinera votre signalement dans les plus brefs délais et prendra les mesures nécessaires.'
      },
      {
        id: 'data-protection',
        question: 'Comment mes données personnelles sont-elles protégées ?',
        answer: 'La protection de vos données est notre priorité. Nous ne partageons jamais vos informations personnelles avec des tiers sans votre consentement. Votre adresse email et votre numéro de téléphone ne sont jamais visibles publiquement. Pour plus d\'informations, consultez notre Politique de Confidentialité.'
      }
    ],
    technique: [
      {
        id: 'app-issues',
        question: 'L\'application ne fonctionne pas correctement, que faire ?',
        answer: 'Si vous rencontrez des problèmes techniques, essayez d\'abord de rafraîchir la page ou de redémarrer l\'application. Vérifiez également que vous utilisez la dernière version. Si le problème persiste, contactez notre support technique en décrivant précisément le problème et en indiquant votre appareil et votre navigateur.'
      },
      {
        id: 'notifications',
        question: 'Je ne reçois pas les notifications, pourquoi ?',
        answer: 'Vérifiez vos paramètres de notification dans "Mon profil" > "Paramètres" > "Notifications". Assurez-vous également que Matlou7ch est autorisé à vous envoyer des notifications dans les paramètres de votre appareil. Si vous utilisez l\'application web, vérifiez que vous n\'avez pas bloqué les notifications dans votre navigateur.'
      },
      {
        id: 'upload-photos',
        question: 'Je n\'arrive pas à télécharger des photos, que faire ?',
        answer: 'Si vous ne parvenez pas à télécharger des photos, vérifiez que celles-ci ne dépassent pas 5 Mo chacune. Les formats acceptés sont JPG, PNG et HEIC. Assurez-vous également d\'avoir une connexion internet stable. Si le problème persiste, essayez de réduire la taille de vos images ou de les convertir dans un format compatible.'
      }
    ]
  };

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <h1 className="faq-title">Foire Aux Questions</h1>
        <p className="faq-subtitle">Trouvez rapidement des réponses à vos questions</p>
      </div>

      <div className="faq-content-wrapper">
        {/* Sélecteur de catégorie mobile */}
        <div className="faq-categories-mobile">
          <select 
            onChange={(e) => scrollToCategory(e.target.value)}
            value={activeCategory || ''}
          >
            <option value="">Choisir une catégorie...</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation latérale (desktop) */}
        <div className="faq-sidebar">
          <div className="faq-categories">
            <h3>Catégories</h3>
            <ul>
              {categories.map(category => (
                <li 
                  key={category.id} 
                  className={activeCategory === category.id ? 'active' : ''}
                  onClick={() => scrollToCategory(category.id)}
                >
                  {category.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="faq-container">
          {categories.map(category => (
            <div 
              key={category.id}
              className="faq-category" 
              ref={el => categoryRefs.current[category.id] = el}
            >
              <div className="faq-category-header" onClick={() => toggleCategory(category.id)}>
                <h2>{category.title}</h2>
                <span className="toggle-icon">
                  {activeCategory === category.id ? '−' : '+'}
                </span>
              </div>
              
              <div className={`faq-category-content ${activeCategory === category.id ? 'active' : ''}`}>
                {faqData[category.id].map(item => (
                  <div key={item.id} className="faq-item">
                    <div 
                      className="faq-question" 
                      onClick={() => toggleQuestion(item.id)}
                    >
                      <h3>{item.question}</h3>
                      <span className="toggle-icon">
                        {activeQuestion === item.id ? '−' : '+'}
                      </span>
                    </div>
                    <div className={`faq-answer ${activeQuestion === item.id ? 'active' : ''}`}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Section de contact */}
          <div className="faq-contact-section">
            <h2>Vous n'avez pas trouvé votre réponse ?</h2>
            <p>Notre équipe est là pour vous aider avec toutes vos questions.</p>
            <a href="/contact" className="contact-button">Contactez-nous</a>
          </div>
        </div>
      </div>

      {/* Bouton de retour en haut */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}

export default FAQ;
