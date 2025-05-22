import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaCalendarAlt, FaShare, FaArrowRight } from 'react-icons/fa';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Charger les favoris depuis le localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
    
    // Simuler le chargement des données du produit
    // Dans une application réelle, vous feriez un appel API ici
    setTimeout(() => {
      // Vérifier si le produit a été passé via location.state
      if (location.state && location.state.product) {
        setProduct(location.state.product);
      } else {
        // Sinon, simuler un produit pour la démonstration
        setProduct({
          id,
          title: "Table d'enfant",
          location: "Casablanca",
          timeAgo: "quelques secondes",
          image: "/images/table-enfant.jpg",
          category: "Ameublement",
          condition: "très bon état",
          interestedCount: 2,
          isPublished: true,
          user: {
            id: "user123",
            name: "Ayoub Soufat",
            location: "Casablanca",
            memberSince: "24 avr. 2025",
            avatar: "A",
            avatarColor: "#c9d64f",
            description: "Les dons sont à venir chercher à mon domicile à Chennevières sur Marne. Je privilégie la proximité."
          }
        });
      }
      setLoading(false);
    }, 500);
  }, [id, location.state]);
  
  // Fonction pour gérer le contact
  const handleContactClick = () => {
    if (!user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/connexion', { 
        state: { from: { pathname: `/produit/${id}` } }
      });
    } else {
      // Logique pour contacter le donneur
      // Rediriger vers la page de messages ou ouvrir une boîte de dialogue
      navigate(`/messages/new`, { 
        state: { 
          recipient: product.user,
          product: product
        } 
      });
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
  
  // Fonction pour partager le produit
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Découvrez ${product.title} sur Matlou7ch.org`,
        url: window.location.href,
      })
      .catch((error) => console.log('Erreur de partage', error));
    } else {
      // Copier le lien dans le presse-papier
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Lien copié dans le presse-papier !'))
        .catch((err) => console.error('Erreur lors de la copie du lien', err));
    }
  };
  
  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error-message">
          Une erreur est survenue: {error}
          <button onClick={() => navigate('/')}>Retour à l'accueil</button>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error-message">
          Produit non trouvé
          <button onClick={() => navigate('/')}>Retour à l'accueil</button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="product-detail-container">
      {/* Galerie d'images */}
      <div className="product-image-gallery">
        <div className="main-image-container">
          <img 
            src={product.image} 
            alt={product.title} 
            className="main-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.title)}`;
            }}
          />
          {product.isPublished && (
            <div className="product-badge">Publié</div>
          )}
        </div>
      </div>
      
      {/* Informations du produit */}
      <div className="product-info-container">
        <div className="product-header">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-meta">
            <p className="product-location">{product.location} · {product.timeAgo}</p>
            <p className="interested-count">Personnes intéressées : {product.interestedCount}</p>
          </div>
        </div>
        
        <button 
          className="contact-button"
          onClick={handleContactClick}
        >
          Contacter le donneur
        </button>
        
        <div className="product-details">
          <div className="detail-section">
            <h3>Catégorie</h3>
            <p>{product.category}</p>
          </div>
          
          <div className="detail-section">
            <h3>Caractéristiques</h3>
            <p>État du don : <span className="condition-badge">{product.condition}</span></p>
          </div>
        </div>
        
        <hr className="divider" />
        
        {/* Informations sur le donneur */}
        <div className="donor-info">
          <div className="donor-avatar" style={{ backgroundColor: product.user.avatarColor }}>
            {product.user.avatar}
          </div>
          <div className="donor-details">
            <h2>{product.user.name}</h2>
            <p className="donor-location">
              <FaMapMarkerAlt /> {product.user.location}
            </p>
            <p className="donor-member-since">
              <FaCalendarAlt /> Membre depuis le {product.user.memberSince}
            </p>
          </div>
        </div>
        
        {/* Description du donneur */}
        {product.user.description && (
          <div className="donor-description">
            <p>{product.user.description}</p>
          </div>
        )}
        
        <hr className="divider" />
        
        {/* Autres objets du donneur - style amélioré */}
        <div className="other-products-section">
          <h2 className="other-products-title">Autres objets de ce donneur</h2>
          <button 
            className="see-all-products-button" 
            onClick={() => navigate(`/utilisateur/${product.user.id}`)}
          >
            <span>Voir tous les objets de {product.user.name}</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;


