import React from 'react';
import { Link } from 'react-router-dom';
import './PublicProfile.css';

function PublicProfile() {
  return (
    <div className="public-profile-container">
      <h1 className="public-profile-title">Mon profil public</h1>
      
      <div className="profile-header-section">
        <div className="profile-avatar">
          <span>H</span>
        </div>
        
        <div className="profile-info">
          <h2 className="profile-username">haytamnajim</h2>
          <div className="profile-location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#666" width="16px" height="16px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Casablanca</span>
          </div>
          <div className="profile-member-since">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#666" width="16px" height="16px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>Membre depuis le 24 avr. 2025</span>
          </div>
        </div>
      </div>
      
      <div className="donation-stats">
        <div className="stat-box">
          <div className="stat-number">0</div>
          <div className="stat-label">don donné</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">0</div>
          <div className="stat-label">don reçu</div>
        </div>
      </div>
      
      <Link to="/modifier-profil" className="edit-profile-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="16px" height="16px">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        <span>Modifier mon profil</span>
      </Link>
      
      <div className="empty-listings">
        <div className="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ccc" width="60px" height="60px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
          </svg>
        </div>
        <p className="empty-message">Aucune annonce en ligne pour le moment</p>
      </div>
    </div>
  );
}

export default PublicProfile;

