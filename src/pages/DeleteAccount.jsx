import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DeleteAccount.css';

function DeleteAccount() {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 400;

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleOtherReasonChange = (event) => {
    const text = event.target.value;
    if (text.length <= maxChars) {
      setOtherReason(text);
      setCharCount(text.length);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique pour soumettre le formulaire
    console.log('Raison sélectionnée:', selectedReason);
    console.log('Autre raison:', otherReason);
    // Rediriger ou afficher un message de confirmation
  };

  return (
    <div className="delete-account-page">
      <div className="delete-account-container">
        <div className="delete-account-header">
          <Link to="/parametres" className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </Link>
        </div>
        
        <form onSubmit={handleSubmit} className="delete-account-form">
          <h1 className="delete-account-title">Aidez nous à nous améliorer</h1>
          <h2 className="delete-account-subtitle">Motif de votre suppression</h2>
          
          <div className="reason-options">
            <label className="reason-option">
              <input 
                type="radio" 
                name="reason" 
                value="no_need" 
                checked={selectedReason === 'no_need'} 
                onChange={handleReasonChange}
              />
              <span className="checkbox-custom"></span>
              <span className="reason-text">Je n'utilise plu d'appli de dons car mes besoins ont changé</span>
            </label>
            
            <label className="reason-option">
              <input 
                type="radio" 
                name="reason" 
                value="other_app" 
                checked={selectedReason === 'other_app'} 
                onChange={handleReasonChange}
              />
              <span className="checkbox-custom"></span>
              <span className="reason-text">J'ai trouvé une appli similaire qur j'ai préféré</span>
            </label>
            
            <label className="reason-option">
              <input 
                type="radio" 
                name="reason" 
                value="difficult" 
                checked={selectedReason === 'difficult'} 
                onChange={handleReasonChange}
              />
              <span className="checkbox-custom"></span>
              <span className="reason-text">L'application n'est pas assez facile à utiliser</span>
            </label>
            
            <label className="reason-option">
              <input 
                type="radio" 
                name="reason" 
                value="other" 
                checked={selectedReason === 'other'} 
                onChange={handleReasonChange}
              />
              <span className="checkbox-custom"></span>
              <span className="reason-text">Autre raison</span>
            </label>
            
            {selectedReason === 'other' && (
              <div className="other-reason-container">
                <textarea 
                  className="other-reason-input"
                  placeholder="Merci de nous préciser la raison de votre suppression de compte"
                  value={otherReason}
                  onChange={handleOtherReasonChange}
                  maxLength={maxChars}
                ></textarea>
                <div className="char-count">{charCount} / {maxChars}</div>
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">Valider</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccount;