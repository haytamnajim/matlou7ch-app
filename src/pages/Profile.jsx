import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

function Profile() {
  const { logout, user, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("=== LOGOUT STARTED ===");
    try {
      await logout();
      console.log("Logout successful, redirecting...");
      // Force navigation using replace to avoid history issues
      window.location.replace('/');
    } catch (error) {
      console.error("Logout error:", error);
      window.location.replace('/');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <Link to="/" className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </Link>
          <div className="avatar-container">
            <div className="user-avatar" style={{
              backgroundColor: profile?.avatar_color || 'var(--text-white)',
              backgroundImage: profile?.avatar && profile.avatar.length > 5 ? `url(${profile.avatar})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              {(!profile?.avatar || profile.avatar.length <= 5) && (
                <span>{profile?.name ? profile.name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : '?')}</span>
              )}
            </div>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{profile?.name || user?.email || 'Utilisateur'}</h2>
            <Link to="/profil-public" className="profile-public-link">Voir mon profil public</Link>
          </div>
        </div>

        <div className="profile-menu">
          <Link to="/messages" className="menu-item">
            <div className="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
              </svg>
            </div>
            <span>Messages</span>
            <div className="chevron-right">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#888" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </div>
          </Link>

          <Link to="/favoris" className="menu-item">
            <div className="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span>Favoris</span>
            <div className="chevron-right">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#888" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </div>
          </Link>

          <Link to="/mes-annonces" className="menu-item">
            <div className="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
            </div>
            <span>Mes annonces</span>
            <div className="chevron-right">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#888" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </div>          </Link>

          <Link to="/parametres" className="menu-item">
            <div className="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
            </div>
            <span>Mes paramètres</span>
            <div className="chevron-right">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#888" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </div>
          </Link>

          {/* Supprimer le lien vers les informations légales */}
          {/* <Link to="/informations-legales" className="menu-item">
            <div className="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <span>Information légales</span>
            <div className="chevron-right">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#888" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </div>
          </Link> */}
        </div>

        <div className="profile-footer">
          <Link to="/notre-adn" className="footer-link">Notre ADN</Link>
          <Link to="/faq" className="footer-link">FAQ</Link>
          <Link to="/cgu" className="footer-link">CGU</Link>
          <button
            type="button"
            className="logout-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Profile: Clic bouton détecté");
              handleLogout();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--primary-color)" width="20px" height="20px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;



