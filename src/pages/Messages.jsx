import React, { useState } from 'react';
import './Messages.css';

function Messages() {
  const [activeTab, setActiveTab] = useState('enCours');

  return (
    <div className="messages-page">
      <div className="messages-container-wrapper">
        <div className="messages-container">
          <h1 className="messages-title">Messages</h1>
          
          <div className="messages-tabs">
            <button 
              className={`tab-button ${activeTab === 'enCours' ? 'active' : ''}`}
              onClick={() => setActiveTab('enCours')}
            >
              En Cours
            </button>
            <button 
              className={`tab-button ${activeTab === 'corbeille' ? 'active' : ''}`}
              onClick={() => setActiveTab('corbeille')}
            >
              Corbeille
            </button>
          </div>
          
          {activeTab === 'enCours' && (
            <div className="empty-state">
              <div className="message-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ccc" width="80px" height="80px">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
              </div>
              <h2 className="empty-title">Votre messagerie est vide</h2>
              <p className="empty-description">
                Votre messagerie vous permet d'échanger avec la communauté Tajdid. La mise en relation s'effectue toujours depuis une annonce en cliquant sur "contacter le donneur"
              </p>
              <button className="donate-button">+ DONNER</button>
            </div>
          )}
          
          {activeTab === 'corbeille' && (
            <div className="empty-state">
              <div className="trash-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ccc" width="80px" height="80px">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </div>
              <h2 className="empty-title">Votre corbeille est vide</h2>
            </div>
          )}
        </div>
        
        <div className="messages-detail-container">
          {/* Ce conteneur sera vide mais visible comme un carré blanc */}
        </div>
      </div>
    </div>
  );
}

export default Messages;
