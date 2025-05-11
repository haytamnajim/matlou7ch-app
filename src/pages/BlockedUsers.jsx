import React from 'react';
import { Link } from 'react-router-dom';
import './BlockedUsers.css';
import GhostIcon from '../components/GhostIcon';

function BlockedUsers() {
  return (
    <div className="blocked-users-page">
      <div className="blocked-users-container">
        <div className="blocked-users-header">
          <Link to="/parametres" className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </Link>
          <h1 className="blocked-users-title">Utilisateurs bloqués</h1>
        </div>
        
        <div className="empty-blocked-state">
          <div className="ghost-image-container">
            <GhostIcon />
          </div>
          <h2 className="empty-title">Vous n'avez bloqué aucun profil</h2>
          <p className="empty-description">
            Vous pouvez bloquer un utilisateur depuis sa page profil ou une conversation. Vous ne recevrez plus ses messages.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlockedUsers;
