import React, { useState, useEffect, useRef } from 'react';
import { FaChevronUp, FaChevronDown, FaArrowUp, FaDownload, FaBook, FaUserCheck, FaExclamationTriangle, FaGavel, FaShieldAlt, FaHandshake, FaStar, FaCopyright, FaLock, FaExclamationCircle, FaBan, FaBalanceScale, FaEnvelope } from 'react-icons/fa';
import { MdPresentToAll } from 'react-icons/md';
import './CGU.css';

function CGU() {
  const [activeSection, setActiveSection] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRefs = useRef({});

  // Gérer l'affichage du bouton de retour en haut
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour télécharger les CGU en PDF (simulation)
  const downloadPDF = () => {
    alert("Le téléchargement des CGU en PDF sera disponible prochainement.");
  };

  // Fonction pour scroller vers une section
  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Fonction pour revenir en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Fonction pour basculer l'affichage d'une section
  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  // Définition des sections pour la table des matières et la navigation
  const sections = [
    { id: 'presentation', title: '1. Présentation de la plateforme', icon: <MdPresentToAll /> },
    { id: 'acceptation', title: '2. Acceptation des conditions', icon: <FaUserCheck /> },
    { id: 'inscription', title: '3. Inscription et compte utilisateur', icon: <FaBook /> },
    { id: 'principes', title: '4. Principes fondamentaux', icon: <FaHandshake /> },
    { id: 'publication', title: '5. Publication d\'annonces', icon: <FaExclamationTriangle /> },
    { id: 'transactions', title: '6. Transactions entre utilisateurs', icon: <FaHandshake /> },
    { id: 'notation', title: '7. Système de notation', icon: <FaStar /> },
    { id: 'propriete', title: '8. Propriété intellectuelle', icon: <FaCopyright /> },
    { id: 'donnees', title: '9. Protection des données', icon: <FaLock /> },
    { id: 'responsabilite', title: '10. Limitation de responsabilité', icon: <FaExclamationCircle /> },
    { id: 'sanctions', title: '11. Sanctions', icon: <FaBan /> },
    { id: 'droit', title: '12. Droit applicable', icon: <FaBalanceScale /> },
    { id: 'contact', title: '13. Contact', icon: <FaEnvelope /> },
  ];

  return (
    <div className="cgu-page">
      <div className="cgu-hero">
        <h1 className="cgu-title">Conditions Générales d'Utilisation</h1>
        <p className="cgu-subtitle">Dernière mise à jour : 15 juin 2023</p>
        <button className="cgu-download-btn" onClick={downloadPDF}>
          <FaDownload /> Télécharger en PDF
        </button>
      </div>

      <div className="cgu-content-wrapper">
        {/* Table des matières mobile (visible uniquement sur mobile) */}
        <div className="cgu-toc-mobile">
          <select 
            onChange={(e) => scrollToSection(e.target.value)}
            value={activeSection || ''}
          >
            <option value="">Aller à la section...</option>
            {sections.map(section => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation latérale (visible uniquement sur desktop) */}
        <div className="cgu-sidebar">
          <div className="cgu-toc">
            <h3>Table des matières</h3>
            <ul>
              {sections.map(section => (
                <li 
                  key={section.id} 
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.icon} {section.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="cgu-container">
          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['presentation'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('presentation')}>
              <h2><MdPresentToAll /> 1. Présentation de la plateforme</h2>
              {activeSection === 'presentation' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'presentation' ? 'active' : ''}`}>
              <p>
                Matlou7ch.ma est une plateforme en ligne permettant à ses utilisateurs de donner et recevoir gratuitement des objets. 
                La plateforme est exploitée par la société Matlou7ch SARL, immatriculée au Registre du Commerce de Casablanca sous le numéro 123456, 
                dont le siège social est situé au 123 Avenue Mohammed V, Casablanca, Maroc.
              </p>
              <p>
                Les présentes Conditions Générales d'Utilisation (ci-après "CGU") ont pour objet de définir les modalités et conditions d'utilisation 
                des services proposés sur le site Matlou7ch.ma (ci-après "le Site") ainsi que de définir les droits et obligations des parties dans ce cadre.
              </p>
              <div className="cgu-example">
                <h4>Exemple :</h4>
                <p>Matlou7ch permet à un utilisateur de donner un canapé dont il n'a plus l'utilité à un autre utilisateur qui en a besoin, sans aucune contrepartie financière.</p>
              </div>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['acceptation'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('acceptation')}>
              <h2><FaUserCheck /> 2. Acceptation des conditions</h2>
              {activeSection === 'acceptation' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'acceptation' ? 'active' : ''}`}>
              <p>
                L'accès et l'utilisation du Site sont soumis à l'acceptation et au respect des présentes CGU. En accédant au Site, l'utilisateur 
                reconnaît avoir pris connaissance des présentes CGU et les accepter expressément sans réserve. Si l'utilisateur n'accepte pas ces CGU, 
                il doit renoncer à accéder au Site et à utiliser ses services.
              </p>
              <p>
                Matlou7ch se réserve le droit de modifier à tout moment les CGU. Les modifications prennent effet dès leur publication sur le Site. 
                L'utilisateur est réputé accepter la dernière version des CGU à chaque nouvelle connexion au Site.
              </p>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['inscription'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('inscription')}>
              <h2><FaBook /> 3. Inscription et compte utilisateur</h2>
              {activeSection === 'inscription' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'inscription' ? 'active' : ''}`}>
              <p>
                Pour pouvoir bénéficier pleinement des services du Site, l'utilisateur doit créer un compte en fournissant des informations exactes, 
                complètes et à jour. L'utilisateur s'engage à mettre à jour régulièrement ces informations afin qu'elles restent exactes.
              </p>
              <p>
                L'utilisateur est seul responsable de la préservation de la confidentialité de son identifiant et de son mot de passe. 
                Toute utilisation du Site avec ses identifiants sera présumée être effectuée par l'utilisateur et sous sa responsabilité.
              </p>
              <p>
                En cas d'utilisation frauduleuse de son compte, l'utilisateur doit immédiatement en informer Matlou7ch par email à l'adresse : 
                support@matlou7ch.ma.
              </p>
              <div className="cgu-example">
                <h4>Important :</h4>
                <p>Choisissez un mot de passe fort et ne le partagez avec personne. Matlou7ch ne vous demandera jamais votre mot de passe par email ou téléphone.</p>
              </div>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['principes'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('principes')}>
              <h2><FaHandshake /> 4. Principes fondamentaux de la plateforme</h2>
              {activeSection === 'principes' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'principes' ? 'active' : ''}`}>
              <p>
                Matlou7ch.ma est une plateforme de dons d'objets. Tous les objets proposés sur le Site doivent être donnés gratuitement, 
                sans contrepartie financière directe ou indirecte.
              </p>
              <p>
                Il est strictement interdit de :
              </p>
              <ul>
                <li>Vendre des objets ou demander une compensation financière pour un don</li>
                <li>Échanger un objet contre un autre objet ou service</li>
                <li>Proposer des objets illicites, dangereux ou ne respectant pas la législation marocaine</li>
                <li>Utiliser la plateforme à des fins commerciales ou professionnelles sans autorisation préalable</li>
              </ul>
              <div className="cgu-example">
                <h4>Exemple :</h4>
                <p>Il n'est pas permis de proposer un objet "gratuit" puis de demander de l'argent pour la livraison ou d'autres services associés.</p>
              </div>
            </div>
          </div>

          {/* Continuer avec les autres sections de la même manière */}
          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['publication'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('publication')}>
              <h2><FaExclamationTriangle /> 5. Publication d'annonces</h2>
              {activeSection === 'publication' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'publication' ? 'active' : ''}`}>
              <p>
                L'utilisateur peut publier des annonces pour donner des objets dont il est propriétaire et qu'il est en droit de céder. 
                Il s'engage à fournir une description précise et honnête de l'objet (état, dimensions, caractéristiques, défauts éventuels).
              </p>
              <p>
                Les annonces doivent respecter les catégories définies par le Site et ne pas contenir :
              </p>
              <ul>
                <li>De contenu illégal, offensant, menaçant, injurieux, diffamatoire ou pornographique</li>
                <li>De contenu portant atteinte aux droits de propriété intellectuelle de tiers</li>
                <li>De liens vers d'autres sites web ou plateformes commerciales</li>
                <li>De coordonnées personnelles visibles publiquement (numéro de téléphone, adresse email, etc.)</li>
              </ul>
              <p>
                Matlou7ch se réserve le droit de supprimer, sans préavis, toute annonce ne respectant pas ces règles ou les présentes CGU.
              </p>
              <div className="cgu-example">
                <h4>Conseil :</h4>
                <p>Prenez des photos claires de l'objet sous plusieurs angles et mentionnez tout défaut, même mineur, pour éviter les malentendus.</p>
              </div>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['transactions'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('transactions')}>
              <h2><FaHandshake /> 6. Transactions entre utilisateurs</h2>
              {activeSection === 'transactions' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'transactions' ? 'active' : ''}`}>
              <p>
                Matlou7ch.ma est uniquement une plateforme de mise en relation entre donneurs et receveurs. Matlou7ch n'est pas partie aux 
                transactions entre utilisateurs et n'exerce aucun contrôle sur la qualité, la sécurité ou la légalité des objets donnés, 
                ni sur la capacité des utilisateurs à donner ou recevoir ces objets.
              </p>
              <p>
                Les utilisateurs sont seuls responsables de la remise des objets et doivent prendre toutes les précautions nécessaires lors 
                des rencontres avec d'autres utilisateurs. Matlou7ch recommande :
              </p>
              <ul>
                <li>De privilégier les rencontres dans des lieux publics</li>
                <li>D'informer un proche du lieu et de l'heure de la rencontre</li>
                <li>De ne pas communiquer d'informations personnelles sensibles</li>
                <li>De vérifier l'objet avant de l'accepter</li>
              </ul>
              <div className="cgu-example">
                <h4>Sécurité :</h4>
                <p>Pour votre sécurité, privilégiez les échanges en journée dans des lieux publics fréquentés comme les cafés ou les centres commerciaux.</p>
              </div>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['notation'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('notation')}>
              <h2><FaStar /> 7. Système de notation et d'évaluation</h2>
              {activeSection === 'notation' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'notation' ? 'active' : ''}`}>
              <p>
                Après chaque transaction, les utilisateurs peuvent s'évaluer mutuellement. Ces évaluations doivent être objectives et 
                respectueuses. Toute évaluation abusive pourra être supprimée par Matlou7ch.
              </p>
              <p>
                Le système de notation contribue à créer un environnement de confiance sur la plateforme. Les utilisateurs ayant des 
                évaluations négatives répétées pourront voir leur compte suspendu temporairement ou définitivement.
              </p>
              <div className="cgu-example">
                <h4>Bonne pratique :</h4>
                <p>Prenez le temps d'évaluer les autres utilisateurs après chaque transaction. Cela aide toute la communauté à identifier les membres fiables.</p>
              </div>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['propriete'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('propriete')}>
              <h2><FaCopyright /> 8. Propriété intellectuelle</h2>
              {activeSection === 'propriete' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'propriete' ? 'active' : ''}`}>
              <p>
                L'ensemble des éléments du Site (textes, graphismes, logos, photos, vidéos, etc.) sont protégés par le droit d'auteur, 
                le droit des marques et/ou tout autre droit de propriété intellectuelle. Ces éléments sont la propriété exclusive de 
                Matlou7ch ou de ses partenaires.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments 
                du Site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation préalable écrite de Matlou7ch.
              </p>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['donnees'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('donnees')}>
              <h2><FaLock /> 9. Protection des données personnelles</h2>
              {activeSection === 'donnees' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'donnees' ? 'active' : ''}`}>
              <p>
                Matlou7ch accorde une grande importance à la protection des données personnelles de ses utilisateurs. La collecte et le 
                traitement des données personnelles s'effectuent dans le respect de la loi 09-08 relative à la protection des personnes 
                physiques à l'égard du traitement des données à caractère personnel.
              </p>
              <p>
                Pour plus d'informations sur la collecte, le traitement et la protection des données personnelles, l'utilisateur est 
                invité à consulter la Politique de Confidentialité accessible sur le Site.
              </p>
              <div className="cgu-example">
                <h4>Information :</h4>
                <p>Vous pouvez à tout moment demander l'accès, la rectification ou la suppression de vos données personnelles en contactant notre service client.</p>
              </div>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['responsabilite'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('responsabilite')}>
              <h2><FaExclamationCircle /> 10. Limitation de responsabilité</h2>
              {activeSection === 'responsabilite' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'responsabilite' ? 'active' : ''}`}>
              <p>
                Matlou7ch s'efforce d'assurer au mieux l'accès et le fonctionnement du Site 24 heures sur 24 et 7 jours sur 7. 
                Toutefois, Matlou7ch ne peut être tenue responsable d'une interruption de service, quelle qu'en soit la cause.
              </p>
              <p>
                Matlou7ch ne peut être tenue responsable :
              </p>
              <ul>
                <li>Des dommages de toute nature, directs ou indirects, résultant de l'utilisation du Site</li>
                <li>Des transactions effectuées entre utilisateurs</li>
                <li>De la qualité, de la sécurité ou de la légalité des objets donnés</li>
                <li>De l'exactitude des descriptions des objets publiées par les utilisateurs</li>
                <li>De la capacité des utilisateurs à donner ou recevoir les objets</li>
                <li>Des problèmes de communication entre utilisateurs</li>
              </ul>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['sanctions'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('sanctions')}>
              <h2><FaBan /> 11. Sanctions</h2>
              {activeSection === 'sanctions' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'sanctions' ? 'active' : ''}`}>
              <p>
                En cas de violation des présentes CGU, Matlou7ch se réserve le droit de :
              </p>
              <ul>
                <li>Supprimer les annonces concernées</li>
                <li>Envoyer un avertissement à l'utilisateur</li>
                <li>Suspendre temporairement le compte de l'utilisateur</li>
                <li>Supprimer définitivement le compte de l'utilisateur</li>
                <li>Bloquer l'accès au Site depuis l'adresse IP de l'utilisateur</li>
              </ul>
              <div className="cgu-example">
                <h4>Précision :</h4>
                <p>Matlou7ch applique une politique de tolérance zéro concernant les tentatives de vente d'objets ou les comportements inappropriés envers d'autres utilisateurs.</p>
              </div>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['droit'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('droit')}>
              <h2><FaBalanceScale /> 12. Droit applicable et juridiction compétente</h2>
              {activeSection === 'droit' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'droit' ? 'active' : ''}`}>
              <p>
                Les présentes CGU sont régies par le droit marocain. En cas de litige relatif à l'interprétation ou à l'exécution des 
                présentes CGU, les tribunaux de Casablanca seront seuls compétents, sauf disposition légale contraire.
              </p>
            </div>
          </div>

          <div 
            className="cgu-section" 
            ref={el => sectionRefs.current['contact'] = el}
          >
            <div className="cgu-section-header" onClick={() => toggleSection('contact')}>
              <h2><FaEnvelope /> 13. Contact</h2>
              {activeSection === 'contact' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'contact' ? 'active' : ''}`}>
              <p>
                Pour toute question relative aux présentes CGU ou au fonctionnement du Site, l'utilisateur peut contacter Matlou7ch :
              </p>
              <ul>
                <li>Par email : contact@matlou7ch.ma</li>
                <li>Par courrier : Matlou7ch SARL, 123 Avenue Mohammed V, Casablanca, Maroc</li>
              </ul>
            </div>
          </div>

          {/* Section FAQ */}
          <div className="cgu-section cgu-faq-section">
            <div className="cgu-section-header" onClick={() => toggleSection('faq')}>
              <h2><FaBook /> Foire Aux Questions (FAQ)</h2>
              {activeSection === 'faq' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`cgu-section-content ${activeSection === 'faq' ? 'active' : ''}`}>
              <div className="cgu-faq-item">
                <h3>Puis-je demander une petite compensation pour un objet que je donne ?</h3>
                <p>Non, tous les objets sur Matlou7ch doivent être donnés gratuitement, sans aucune contrepartie financière.</p>
              </div>
              <div className="cgu-faq-item">
                <h3>Comment signaler un utilisateur qui ne respecte pas les règles ?</h3>
                <p>Vous pouvez signaler un utilisateur en cliquant sur le bouton "Signaler" sur son profil ou sur l'une de ses annonces, ou en contactant notre service client.</p>
              </div>
              <div className="cgu-faq-item">
                <h3>Que faire si je ne peux pas me présenter à un rendez-vous convenu ?</h3>
                <p>Prévenez l'autre utilisateur dès que possible via la messagerie de la plateforme et proposez une autre date si possible.</p>
              </div>
              <div className="cgu-faq-item">
                <h3>Puis-je supprimer mon compte à tout moment ?</h3>
                <p>Oui, vous pouvez supprimer votre compte à tout moment depuis les paramètres de votre profil. Notez que cette action est irréversible.</p>
              </div>
              <div className="cgu-faq-item">
                <h3>Matlou7ch peut-il utiliser mes photos d'objets à d'autres fins ?</h3>
                <p>Matlou7ch peut utiliser les photos des objets publiés uniquement pour promouvoir la plateforme, sauf opposition explicite de votre part.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton de retour en haut */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default CGU;

