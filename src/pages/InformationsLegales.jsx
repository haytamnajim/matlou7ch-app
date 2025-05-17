import React, { useState, useEffect } from 'react';
import { FaBuilding, FaPhone, FaEnvelope, FaGlobe, FaBook, FaUserShield, FaServer } from 'react-icons/fa';
import './InformationsLegales.css';

function InformationsLegales() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
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

  return (
    <div className="legal-page">
      <div className="legal-hero">
        <h1 className="legal-title">Informations Légales</h1>
        <p className="legal-subtitle">Dernière mise à jour : 15 juin 2023</p>
      </div>

      <div className="legal-content">
        <div className="legal-section">
          <h2><FaBuilding /> Éditeur du site</h2>
          <p>
            <strong>Matlou7ch SARL</strong><br />
            Société à responsabilité limitée au capital de 100 000 MAD<br />
            Immatriculée au Registre du Commerce de Casablanca sous le numéro 123456<br />
            Numéro de TVA intracommunautaire : MA123456789<br />
            Siège social : 123 Avenue Mohammed V, Casablanca, Maroc
          </p>
        </div>

        <div className="legal-section">
          <h2><FaPhone /> Contact</h2>
          <p>
            <strong>Téléphone :</strong> +212 5XX-XXXXXX<br />
            <strong>Email :</strong> contact@matlouch.ma<br />
            <strong>Adresse :</strong> 123 Avenue Mohammed V, Casablanca, Maroc
          </p>
        </div>

        <div className="legal-section">
          <h2><FaGlobe /> Hébergement</h2>
          <p>
            <strong>OVH Cloud</strong><br />
            Société par actions simplifiée<br />
            2 rue Kellermann - 59100 Roubaix - France<br />
            Site web : www.ovhcloud.com
          </p>
        </div>

        <div className="legal-section">
          <h2><FaBook /> Conditions d'utilisation</h2>
          <p>
            L'utilisation du site Matlou7ch.ma est soumise au respect des 
            <a href="/cgu"> Conditions Générales d'Utilisation</a>.
          </p>
        </div>

        <div className="legal-section">
          <h2><FaUserShield /> Protection des données personnelles</h2>
          <p>
            Conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard 
            du traitement des données à caractère personnel, vous disposez d'un droit d'accès, 
            de rectification et d'opposition aux données vous concernant.
          </p>
          <p>
            Pour exercer ce droit, veuillez nous adresser votre demande par email à : 
            privacy@matlouch.ma ou par courrier à l'adresse du siège social.
          </p>
        </div>

        <div className="legal-section">
          <h2><FaServer /> Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments constituant le site Matlou7ch.ma (textes, graphismes, logiciels, 
            photographies, images, vidéos, sons, plans, logos, marques, etc.) sont la propriété 
            exclusive de Matlou7ch SARL ou font l'objet d'une autorisation d'utilisation.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou 
            partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, 
            sauf autorisation écrite préalable de Matlou7ch SARL.
          </p>
        </div>
      </div>

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default InformationsLegales;