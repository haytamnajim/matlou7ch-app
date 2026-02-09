import React, { useState } from 'react';
import './Favoris.css';

function Favoris() {
  const [activeTab, setActiveTab] = useState('recherches');

  return (
    <div className="favoris-container">
      <h1 className="favoris-title">Favoris</h1>

      <div className="favoris-tabs">
        <button
          className={`tab-button ${activeTab === 'recherches' ? 'active' : ''}`}
          onClick={() => setActiveTab('recherches')}
        >
          Mes Recherches
        </button>
        <button
          className={`tab-button ${activeTab === 'dons' ? 'active' : ''}`}
          onClick={() => setActiveTab('dons')}
        >
          Dons
        </button>
      </div>

      {activeTab === 'recherches' && (
        <div className="empty-state">
          <div className="search-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--primary-color)" width="80px" height="80px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
          <h2 className="empty-title">Vous n'avez pas encore de recherches sauvegardées</h2>
          <p className="empty-description">
            Soyez alertés dès qu'une nouvelle annonce correspond à cette recherche.
          </p>
          <button className="search-button">Lancer une nouvelle recherche</button>
        </div>
      )}

      {activeTab === 'dons' && (
        <div className="empty-state">
          <div className="heart-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--primary-color)" width="80px" height="80px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h2 className="empty-title">Vous n'avez pas encore de dons en favoris</h2>
          <button className="search-button">Nouvelle recherche</button>
        </div>
      )}
    </div>
  );
}

export default Favoris;



