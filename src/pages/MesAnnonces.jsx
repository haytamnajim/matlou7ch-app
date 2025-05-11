import React, { useState } from 'react';
import './MesAnnonces.css';

function MesAnnonces() {
  const [activeTab, setActiveTab] = useState('en-cours');

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
        <div className="empty-state">
          <div className="annonce-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ccc" width="80px" height="80px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
            </svg>
          </div>
          <h2 className="empty-title">Vous n'avez aucune annonce en ligne pour le moment</h2>
          <p className="empty-description">
            Faites un geste pour la planète, publiez une annonce sur Matlou7ch
          </p>
          <button className="publish-button">+ Publier une annonce</button>
        </div>
      </div>
    </div>
  );
}

export default MesAnnonces;

