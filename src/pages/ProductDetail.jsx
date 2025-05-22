import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  
  // Charger les favoris depuis le localStorage ou une API
  useEffect(() => {
    // Exemple avec localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);
  
  // Fonction pour gérer le contact
  const handleContactClick = () => {
    if (!user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/connexion', { 
        state: { from: { pathname: `/produit/${id}` } }
      });
    } else {
      // Logique pour contacter le donneur
      // ...
    }
  };

  // Fonction pour gérer l'ajout aux favoris
  const handleFavoriteClick = () => {
    if (!user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/connexion', { 
        state: { from: { pathname: `/produit/${id}` } }
      });
    } else {
      // Logique pour ajouter aux favoris
      const newFavorites = favorites.includes(id)
        ? favorites.filter(itemId => itemId !== id)
        : [...favorites, id];
      
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };
  
  // Version simplifiée pour tester si la route fonctionne
  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <h1>Détails du produit</h1>
      <p>ID du produit: {id}</p>
      
      <div className="product-actions">
        <button onClick={handleContactClick} className="contact-button">
          Contacter le donneur
        </button>
        <button onClick={handleFavoriteClick} className="favorite-button">
          {favorites.includes(id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;

