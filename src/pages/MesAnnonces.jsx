import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MesAnnonces.css';

function MesAnnonces() {
  const [activeTab, setActiveTab] = useState('en-cours');
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les annonces au chargement du composant
  useEffect(() => {
    // Récupérer les annonces depuis localStorage
    const storedAds = JSON.parse(localStorage.getItem('myAds') || '[]');
    setMyAds(storedAds);
    setLoading(false);
  }, []);

  // Filtrer les annonces selon l'onglet actif
  const filteredAds = myAds.filter(ad => {
    if (activeTab === 'en-cours') {
      return ad.isActive !== false; // Annonces actives
    } else {
      return ad.isActive === false; // Annonces terminées
    }
  });

  return (
    <div className="mes-annonces-container">
      <h1 className="mes-annonces-title">Mes annonces</h1>

      <div className="mes-annonces-tabs">
        <button
          className={`tab-button ${activeTab === 'en-cours' ? 'active' : ''}`}
          onClick={() => setActiveTab('en-cours')}
        >
          En cours
        </button>
        <button
          className={`tab-button ${activeTab === 'termines' ? 'active' : ''}`}
          onClick={() => setActiveTab('termines')}
        >
          Terminés
        </button>
      </div>

      <div className="annonces-content">
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : filteredAds.length > 0 ? (
          <div className="annonces-grid">
            {filteredAds.map(ad => (
              <div key={ad.id} className="annonce-card">
                <div className="annonce-image">
                  <div className="annonce-image-placeholder"></div>
                </div>
                <div className="annonce-details">
                  <h3 className="annonce-title">{ad.title}</h3>
                  <p className="annonce-category">{ad.category}</p>
                  <p className="annonce-city">{ad.city}</p>
                  <p className="annonce-date">
                    {new Date(ad.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="annonce-actions">
                  <Link to={`/produit/${ad.id}`} className="view-button">
                    Voir l'annonce
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => {
                      // Supprimer l'annonce
                      const updatedAds = myAds.filter(item => item.id !== ad.id);
                      setMyAds(updatedAds);
                      localStorage.setItem('myAds', JSON.stringify(updatedAds));
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="annonce-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ccc" width="80px" height="80px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
              </svg>
            </div>
            <h2 className="empty-title">Vous n'avez aucune annonce en ligne pour le moment</h2>
            <p className="empty-description">
              Faites un geste pour la planète, publiez une annonce sur Matlou7ch
            </p>
            <Link to="/post-ad">
              <button className="publish-button">+ Publier une annonce</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MesAnnonces;


