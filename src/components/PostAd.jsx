import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfettiIcon from './ConfettiIcon';
import './PostAd.css';
import Confetti from './Confetti';

function PostAd() {
  // Cette fonction crée un objet global pour stocker les annonces
  useEffect(() => {
    // Initialiser l'objet global s'il n'existe pas
    if (!window.matlouchAppData) {
      window.matlouchAppData = {
        myAds: JSON.parse(localStorage.getItem('myAds') || '[]')
      };
    }
  }, []);

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [submittedProductId, setSubmittedProductId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    city: '',
    description: '',
    signature: '',
    photos: []
  });
  const navigate = useNavigate();

  // Fonction pour convertir une image en base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Fonction pour gérer l'upload d'images
  const handleImageUpload = async (e) => {
    if (e.target.files) {
      const newPhotos = [...formData.photos];
      const filesArray = Array.from(e.target.files);

      for (const file of filesArray) {
        if (newPhotos.length < 5) {
          try {
            // Convertir l'image en base64
            const base64 = await convertToBase64(file);

            newPhotos.push({
              file,
              preview: base64 // Utiliser la chaîne base64 au lieu de l'URL
            });
          } catch (error) {
            console.error("Erreur lors de la conversion de l'image:", error);
          }
        }
      }

      setFormData({
        ...formData,
        photos: newPhotos
      });
    }
  };

  // Fonction pour supprimer une image
  const removeImage = (index) => {
    const newPhotos = [...formData.photos];
    newPhotos.splice(index, 1);
    setFormData({
      ...formData,
      photos: newPhotos
    });
  };

  // Afficher l'aperçu avant soumission
  const showPreview = () => {
    setPreviewMode(true);
  };

  // Revenir à l'édition
  const backToEdit = () => {
    setPreviewMode(false);
  };

  // Soumettre le formulaire après confirmation
  const confirmSubmit = async () => {
    try {
      console.log("Photos avant sauvegarde:", formData.photos);

      // Créer un objet annonce avec toutes les données nécessaires
      const newAd = {
        id: 'product-' + Date.now(),
        title: formData.title,
        category: formData.category,
        condition: formData.condition,
        city: formData.city,
        description: formData.description,
        signature: formData.signature,
        // Sauvegardez les URLs des images
        photos: formData.photos.map(photo => photo.preview),
        date: new Date().toISOString(),
        isActive: true
      };

      console.log('Annonce complète à sauvegarder:', newAd);
      console.log('Photos sauvegardées:', newAd.photos);

      // Récupérer les annonces existantes
      const existingAds = JSON.parse(localStorage.getItem('myAds') || '[]');

      // Ajouter la nouvelle annonce
      const updatedAds = [newAd, ...existingAds];

      // Sauvegarder dans localStorage
      localStorage.setItem('myAds', JSON.stringify(updatedAds));

      // Vérifier que les données sont bien sauvegardées
      const savedAds = JSON.parse(localStorage.getItem('myAds') || '[]');
      console.log('Annonces sauvegardées dans localStorage:', savedAds);

      // Stocker l'ID du produit soumis
      setSubmittedProductId(newAd.id);

      // Marquer comme soumis
      setIsSubmitted(true);
      setPreviewMode(false);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Une erreur est survenue lors de la publication de votre annonce.');
    }
  };

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
    if (e) e.preventDefault();

    // Vérification basique des données
    if (!formData.title || !formData.category || !formData.city) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Afficher l'aperçu avant soumission
    showPreview();
  };

  const goToMyAds = () => {
    navigate('/mes-annonces');
    // Force reload to ensure the component fetches fresh data
    window.location.reload();
  };

  if (isSubmitted) {
    return (
      <div className="success-container">
        <Confetti
          pieces={250}
          duration={6000}
          colors={['#2ecc71', '#3498db', '#f1c40f', '#e74c3c', '#9b59b6']}
          shapes={['circle', 'square', 'triangle', 'diamond']}
          gravity={0.1}
          wind={0.03}
          spread={80}
          size={{ min: 6, max: 18 }}
          rotation={true}
          recycle={false}
          fadeOut={true}
          confettiSource="center"
          burst={true}
          swirl={0.3}
        />
        <div className="confetti-icon">
          <ConfettiIcon />
        </div>
        <h1 className="success-title">Félicitations !</h1>
        <p className="success-message">
          Votre annonce a bien été enregistrée. Elle sera en ligne dans quelques secondes
        </p>
        <div className="success-actions">
          <button
            onClick={() => window.location.href = '/mes-annonces'}
            className="view-ad-button"
          >
            Voir mon annonce
          </button>
          <button
            onClick={() => window.location.href = '/mes-annonces'}
            className="my-ads-button"
          >
            Mes annonces
          </button>
        </div>
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              Photos
            </label>
            <p className="form-hint">Ajoutez jusqu'à 5 photos</p>

            <div className="photo-upload-container">
              <div className="photo-upload-grid">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="photo-upload-box photo-preview">
                    <img src={photo.preview} alt={`Aperçu ${index + 1}`} />
                    <button className="remove-photo" onClick={() => removeImage(index)}>×</button>
                    <span className="photo-number">{index + 1}</span>
                  </div>
                ))}

                {formData.photos.length < 5 && (
                  <label className="photo-upload-box upload-button">
                    <div className="add-icon">+</div>
                    <span className="upload-text">Ajouter une photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
              <p className="photo-count">{formData.photos.length}/5 photos</p>
            </div>
          </div>

          <button className="next-button" onClick={handleNextStep}>Suivant</button>
        </div>
      )}

      {step === 2 && (
        <div className="post-ad-step">
          <div className="form-group">
            <label className="form-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4v3h5.5v12h3V7H19V4z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2l-5.5 9h11z" />
                <circle cx="17.5" cy="17.5" r="4.5" />
                <path d="M3 13.5h8v8H3z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zm0 16H2V5h20v14zM21 6h-7v5h7V6zm-1 2l-2.5 1.75L15 8V7l2.5 1.75L20 7v1zM9 12c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.59c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V18h12v-1.41zM5.48 16c.74-.5 2.22-1 3.52-1s2.77.49 3.52 1H5.48z" />
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

          <div className="form-actions">
            <button className="back-button" onClick={() => setStep(step - 1)}>Précédent</button>
            <button className="submit-button" onClick={handleSubmit}>Publier</button>
          </div>
        </div>
      )}

      {previewMode && (
        <div className="preview-container">
          <h2 className="preview-title">Aperçu de votre annonce</h2>

          <div className="preview-card">
            {/* Section des photos */}
            <div className="preview-photos-section">
              {formData.photos.length > 0 ? (
                <div className="preview-gallery">
                  <div className="preview-main-photo">
                    <img
                      src={formData.photos[0].preview}
                      alt={formData.title}
                      className="main-photo-img"
                    />
                  </div>

                  {formData.photos.length > 1 && (
                    <div className="preview-thumbnails">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="preview-thumbnail">
                          <img
                            src={photo.preview}
                            alt={`Photo ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="no-photos-placeholder">
                  <div className="placeholder-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ccc" width="64px" height="64px">
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  </div>
                  <p>Aucune photo ajoutée</p>
                </div>
              )}
            </div>

            {/* Section des informations */}
            <div className="preview-info-section">
              <h1 className="preview-product-title">{formData.title}</h1>

              <div className="preview-details">
                <div className="preview-detail-item">
                  <span className="detail-label">Catégorie:</span>
                  <span className="detail-value">{formData.category}</span>
                </div>

                <div className="preview-detail-item">
                  <span className="detail-label">État:</span>
                  <span className="detail-value">{formData.condition}</span>
                </div>

                <div className="preview-detail-item">
                  <span className="detail-label">Ville:</span>
                  <span className="detail-value">{formData.city}</span>
                </div>
              </div>

              <div className="preview-description-box">
                <h3 className="preview-section-title">Description</h3>
                <p className="preview-description-text">{formData.description || "Aucune description fournie."}</p>
              </div>

              {formData.signature && (
                <div className="preview-signature-box">
                  <h3 className="preview-section-title">Signature</h3>
                  <p className="preview-signature-text">{formData.signature}</p>
                </div>
              )}
            </div>
          </div>

          <div className="preview-actions">
            <button className="back-to-edit-button" onClick={backToEdit}>
              Modifier l'annonce
            </button>
            <button className="confirm-publish-button" onClick={confirmSubmit}>
              Confirmer et publier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostAd;


