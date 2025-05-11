import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditProfile.css';

function EditProfile() {
  const [username, setUsername] = useState('najimhaytam');
  const [city, setCity] = useState('Casablanca');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pourriez ajouter la logique pour sauvegarder les modifications
    navigate('/profil-public');
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <div className="edit-profile-header">
          <Link to="/profil-public" className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </Link>
          <h1 className="edit-profile-title">Modifier mon profil</h1>
        </div>
        
        <div className="photo-section">
          <div className="profile-avatar">
            <span>H</span>
          </div>
          <div className="change-photo-button">
            <span>Changer ma photo de profil</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Pseudo</label>
            <div className="input-container">
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
              />
              <button type="button" className="clear-button" onClick={() => setUsername('')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#666" width="20px" height="20px">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <p className="input-hint">De 2 à 30 caractères comprenant des lettres, chiffres, espaces ou tirets.</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="city">Ma ville</label>
            <div className="input-container">
              <input 
                type="text" 
                id="city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
              />
              <div className="check-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4CAF50" width="20px" height="20px">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <button type="submit" className="submit-button">Modifier</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;