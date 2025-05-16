import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfettiIcon from './ConfettiIcon';
import './PostAd.css';
import Confetti from './Confetti';

function PostAd() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    city: '',
    description: '',
    signature: '',
    photos: []
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données du formulaire soumises:', formData);
    // Ici vous pourriez envoyer les données à votre API
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="success-container">
        <Confetti />
        <div className="confetti-icon">
          <ConfettiIcon />
        </div>
        <h1 className="success-title">Félicitations !</h1>
        <p className="success-message">
          Votre annonce a bien été enregistrée. Elle sera en ligne dans quelques secondes
        </p>
        <Link to="/mes-annonces" className="view-ad-button">
          Voir mon annonce
        </Link>
      </div>
    );
  }

  return (
    <div className="post-ad-container">
      <h1 className="post-ad-title">Publier une annonce</h1>
      
      <div className="progress-dots">
        <span className={`dot ${step === 1 ? 'active' : ''}`}></span>
        <span className={`dot ${step === 2 ? 'active' : ''}`}></span>
        <span className={`dot ${step === 3 ? 'active' : ''}`}></span>
      </div>
      
      {step === 1 && (
        <div className="post-ad-step">
          <div className="form-group">
            <label className="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              Photos
            </label>
            <p className="form-hint">Ajoutez jusqu'à 5 photos</p>
            
            <div className="photo-upload-grid">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="photo-upload-box">
                  <div className="add-icon">+</div>
                  <span className="photo-number">{num}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button className="next-button" onClick={handleNextStep}>Suivant</button>
        </div>
      )}
      
      {step === 2 && (
        <div className="post-ad-step">
          <div className="form-group">
            <label className="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 4v3h5.5v12h3V7H19V4z"/>
              </svg>
              Titre de l'annonce
            </label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="ex : table en bois, puzzle pour enfants..." 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2l-5.5 9h11z"/>
                <circle cx="17.5" cy="17.5" r="4.5"/>
                <path d="M3 13.5h8v8H3z"/>
              </svg>
              Catégorie
            </label>
            <input 
              type="text" 
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Choisir une catégorie" 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
              </svg>
              État du don
            </label>
            <input 
              type="text" 
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              placeholder="Définir une état" 
              className="form-input"
            />
          </div>
          
          <button className="next-button" onClick={handleNextStep}>Suivant</button>
        </div>
      )}
      
      {step === 3 && (
        <div className="post-ad-step">
          <div className="form-group">
            <label className="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Ma ville
            </label>
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="ex : Casablanca" 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
              </svg>
              Description
            </label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrire votre objets en quelques lignes" 
              className="form-textarea"
              maxLength="1000"
            ></textarea>
            <div className="char-count">
              {formData.description.length} / 1000
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zm0 16H2V5h20v14zM21 6h-7v5h7V6zm-1 2l-2.5 1.75L15 8V7l2.5 1.75L20 7v1zM9 12c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.59c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V18h12v-1.41zM5.48 16c.74-.5 2.22-1 3.52-1s2.77.49 3.52 1H5.48z"/>
              </svg>
              Signature
            </label>
            <input 
              type="text" 
              name="signature"
              value={formData.signature}
              onChange={handleChange}
              placeholder="ex : dispo uniquement le week-end, ne me déplace pas..." 
              className="form-input"
              maxLength="400"
            />
            <div className="char-count">
              {formData.signature.length} / 400
            </div>
          </div>
          
          <button className="publish-button" onClick={handleSubmit}>Publier</button>
        </div>
      )}
    </div>
  );
}

export default PostAd;


