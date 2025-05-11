import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EmailSettings.css';

function EmailSettings() {
  const [newEmail, setNewEmail] = useState('');
  const currentEmail = 'najimhaytam07@gmail.com';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour modifier l'email
    console.log('Email modifié:', newEmail);
    // Redirection ou notification de succès
  };

  return (
    <div className="email-settings-page">
      <div className="email-settings-container">
        <div className="email-settings-header">
          <Link to="/parametres" className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </Link>
          <h1 className="email-settings-title">Modifier mon email</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="email-form">
          <div className="form-group">
            <label htmlFor="currentEmail" className="form-label">Email actuel</label>
            <input 
              type="email" 
              id="currentEmail" 
              className="form-input disabled-input" 
              value={currentEmail} 
              disabled 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newEmail" className="form-label">Email actuel</label>
            <input 
              type="email" 
              id="newEmail" 
              className="form-input" 
              placeholder="Entrer votre nouvel email" 
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="modify-button">Modifier</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailSettings;