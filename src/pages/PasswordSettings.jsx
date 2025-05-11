import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PasswordSettings.css';

function PasswordSettings() {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour modifier le mot de passe
    console.log('Nouveau mot de passe:', newPassword);
    // Redirection ou notification de succès
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-settings-page">
      <div className="password-settings-container">
        <div className="password-settings-header">
          <Link to="/parametres" className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </Link>
          <h1 className="password-settings-title">Mot de passe</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">Nouveau mot de passe</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"} 
                id="newPassword" 
                className="form-input" 
                placeholder="Entrer votre nouveau mot de passe" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-password-button" 
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#666" width="24px" height="24px">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="validate-button">Valider</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordSettings;

