import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NotificationSettings.css';

function NotificationSettings() {
  // État pour les toggles de notifications
  const [notifications, setNotifications] = useState({
    accountResetEmail: { email: true, push: false },
    moderationAlerts: { email: true, push: false },
    listingUpdates: { email: true, push: true },
    promotions: { email: true, push: true },
    newMessages: { email: true, push: true }
  });

  // Fonction pour changer l'état d'une notification
  const toggleNotification = (category, channel) => {
    setNotifications({
      ...notifications,
      [category]: {
        ...notifications[category],
        [channel]: !notifications[category][channel]
      }
    });
  };

  return (
    <div className="notification-settings-page">
      <div className="notification-settings-container">
        <div className="notification-settings-header">
          <Link to="/parametres" className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </Link>
          <h1 className="notification-settings-title">Notifications</h1>
        </div>
        
        <div className="notification-categories">
          <div className="notification-category">
            <h2 className="category-title">Vie de compte</h2>
            <div className="notification-divider"></div>
            
            <div className="notification-item">
              <div className="notification-description">
                Réinitialisation du mot de passe, confirmation d'email, demande de suppression de compte
              </div>
              <div className="notification-toggles">
                <button 
                  className={`toggle-button push ${notifications.accountResetEmail.push ? 'active' : ''}`}
                  onClick={() => toggleNotification('accountResetEmail', 'push')}
                  aria-label="Activer/désactiver les notifications push"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                  </svg>
                </button>
                <button 
                  className={`toggle-button email ${notifications.accountResetEmail.email ? 'active' : ''}`}
                  onClick={() => toggleNotification('accountResetEmail', 'email')}
                  aria-label="Activer/désactiver les notifications par email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="notification-item">
              <div className="notification-description">
                Modération de vos annonces, profil, prise en compte d'un signalement
              </div>
              <div className="notification-toggles">
                <button 
                  className={`toggle-button push ${notifications.moderationAlerts.push ? 'active' : ''}`}
                  onClick={() => toggleNotification('moderationAlerts', 'push')}
                  aria-label="Activer/désactiver les notifications push"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                  </svg>
                </button>
                <button 
                  className={`toggle-button email ${notifications.moderationAlerts.email ? 'active' : ''}`}
                  onClick={() => toggleNotification('moderationAlerts', 'email')}
                  aria-label="Activer/désactiver les notifications par email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="notification-item">
              <div className="notification-description">
                Vie de l'annonce, inactivité d'un compte
              </div>
              <div className="notification-toggles">
                <button 
                  className={`toggle-button push ${notifications.listingUpdates.push ? 'active' : ''}`}
                  onClick={() => toggleNotification('listingUpdates', 'push')}
                  aria-label="Activer/désactiver les notifications push"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                  </svg>
                </button>
                <button 
                  className={`toggle-button email ${notifications.listingUpdates.email ? 'active' : ''}`}
                  onClick={() => toggleNotification('listingUpdates', 'email')}
                  aria-label="Activer/désactiver les notifications par email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="notification-category">
            <h2 className="category-title">Actualités de Donnons</h2>
            <div className="notification-divider"></div>
            
            <div className="notification-item">
              <div className="notification-description">
                Les bons plans, les nouveautés
              </div>
              <div className="notification-toggles">
                <button 
                  className={`toggle-button push ${notifications.promotions.push ? 'active' : ''}`}
                  onClick={() => toggleNotification('promotions', 'push')}
                  aria-label="Activer/désactiver les notifications push"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                  </svg>
                </button>
                <button 
                  className={`toggle-button email ${notifications.promotions.email ? 'active' : ''}`}
                  onClick={() => toggleNotification('promotions', 'email')}
                  aria-label="Activer/désactiver les notifications par email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="notification-category">
            <h2 className="category-title">Messagerie</h2>
            <div className="notification-divider"></div>
            
            <div className="notification-item">
              <div className="notification-description">
                Réception de nouveaux messages
              </div>
              <div className="notification-toggles">
                <button 
                  className={`toggle-button push ${notifications.newMessages.push ? 'active' : ''}`}
                  onClick={() => toggleNotification('newMessages', 'push')}
                  aria-label="Activer/désactiver les notifications push"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                  </svg>
                </button>
                <button 
                  className={`toggle-button email ${notifications.newMessages.email ? 'active' : ''}`}
                  onClick={() => toggleNotification('newMessages', 'email')}
                  aria-label="Activer/désactiver les notifications par email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationSettings;