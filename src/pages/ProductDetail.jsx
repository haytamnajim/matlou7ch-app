import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FaHeart, FaRegHeart, FaMapMarkerAlt, FaCalendarAlt,
  FaShare, FaArrowRight, FaUserCircle, FaChevronLeft, FaGift, FaEye
} from 'react-icons/fa';
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

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);

    setTimeout(() => {
      if (location.state && location.state.product) {
        setProduct(location.state.product);
      } else {
        setProduct({
          id,
          title: "Table d'enfant",
          location: "Casablanca",
          timeAgo: "il y a 2 jours",
          image: null,
          category: "Meubles & Literie",
          condition: "Très bon état",
          interestedCount: 2,
          isPublished: true,
          user: {
            id: "user123",
            name: "Ayoub Soufat",
            location: "Casablanca",
            memberSince: "Avr. 2025",
            avatar: "A",
            avatarColor: "#62825D",
            description: "Les dons sont à venir chercher à mon domicile. Je privilégie la proximité et les membres vérifiés de la communauté."
          }
        });
      }
      setLoading(false);
    }, 500);
  }, [id, location.state]);

  const handleFavoriteClick = () => {
    if (!user) {
      navigate('/connexion', { state: { from: { pathname: `/produit/${id}` } } });
    } else {
      const newFavorites = favorites.includes(id)
        ? favorites.filter(itemId => itemId !== id)
        : [...favorites, id];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Découvrez ${product.title} sur Matlou7ch`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Lien copié !'))
        .catch(console.error);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-page-wrapper">
        <div className="product-detail-container">
          <div className="product-loading-state">
            <div className="product-spinner" />
            <p>Chargement de l'annonce...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page-wrapper">
        <div className="product-detail-container">
          <div className="product-error-state">
            <h2>Annonce introuvable</h2>
            <p>Ce don n'existe plus ou a été supprimé.</p>
            <button onClick={() => navigate('/')}>Retour à l'accueil</button>
          </div>
        </div>
      </div>
    );
  }

  const isFav = favorites.includes(id);

  return (
    <div className="product-detail-page-wrapper">
      <div className="product-detail-container">
        {/* Breadcrumb retour */}
        <Link to="/catalogue" className="product-back-link">
          <FaChevronLeft /> Retour au catalogue
        </Link>

        <div className="product-detail-grid">
          {/* Colonne Gauche : Galerie */}
          <div className="product-gallery-col">
            <div className="product-main-image-box">
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.title} />
              ) : (
                <div className="product-image-placeholder">
                  <FaGift />
                  <span>Aucune photo disponible</span>
                </div>
              )}
              {product.isPublished && (
                <span className="product-badge-published">✓ Disponible</span>
              )}
            </div>

            <div className="product-action-row">
              <button className="product-share-btn" onClick={handleShareClick}>
                <FaShare /> Partager
              </button>
              <button
                className={`product-fav-btn ${isFav ? 'favorited' : ''}`}
                onClick={handleFavoriteClick}
              >
                {isFav ? <FaHeart /> : <FaRegHeart />}
                {isFav ? 'Sauvegardé' : 'Sauvegarder'}
              </button>
            </div>
          </div>

          {/* Colonne Droite : Infos */}
          <div className="product-info-col">
            {/* Card Titre + CTA */}
            <div className="product-info-card">
              <div className="product-title-row">
                <h1 className="product-main-title">{product.title}</h1>
                <span className="product-free-badge">100% GRATUIT</span>
              </div>

              <div className="product-meta-row">
                <span className="product-meta-chip">
                  <FaMapMarkerAlt /> {product.location}
                </span>
                <span className="product-meta-chip">
                  <FaCalendarAlt /> {product.timeAgo}
                </span>
              </div>

              {product.interestedCount > 0 && (
                <p className="product-interested-line">
                  <FaEye /> {product.interestedCount} personne{product.interestedCount > 1 ? 's' : ''} intéressée{product.interestedCount > 1 ? 's' : ''}
                </p>
              )}

              <button
                className="product-contact-btn"
                onClick={() => {
                  if (!user) {
                    navigate('/connexion', { state: { from: { pathname: `/produit/${id}` } } });
                  } else {
                    navigate('/messages', {
                      state: { recipient: product.user, product, newConversation: true }
                    });
                  }
                }}
              >
                💬 Contacter le donneur
              </button>
            </div>

            {/* Détails du don */}
            <div className="product-details-card">
              <h3>Détails du don</h3>
              <div className="product-detail-rows">
                <div className="detail-row">
                  <span className="detail-row-label">Catégorie</span>
                  <span className="detail-row-value">{product.category}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-row-label">État</span>
                  <span className="condition-pill">{product.condition}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-row-label">Prix</span>
                  <span className="detail-row-value" style={{ color: '#62825D', fontWeight: '800' }}>Gratuit 🎁</span>
                </div>
              </div>
            </div>

            {/* Profil Donneur */}
            <div className="donor-card">
              <h3 className="donor-card-heading">À propos du donneur</h3>
              <div className="donor-card-inner">
                <Link to={`/profil/${product.user.id}`} className="donor-avatar-link">
                  <div
                    className="donor-avatar"
                    style={{ backgroundColor: product.user.avatarColor }}
                  >
                    {product.user.avatar}
                  </div>
                </Link>
                <div className="donor-details">
                  <Link to={`/profil/${product.user.id}`} className="donor-name-link">
                    {product.user.name}
                  </Link>
                  <div className="donor-chips">
                    <span className="donor-chip">
                      <FaMapMarkerAlt /> {product.user.location}
                    </span>
                    <span className="donor-chip">
                      <FaUserCircle /> Depuis {product.user.memberSince}
                    </span>
                  </div>
                </div>
              </div>

              {product.user.description && (
                <div className="donor-description-block">
                  {product.user.description}
                </div>
              )}

              <button
                className="donor-see-all-btn"
                onClick={() => navigate(`/utilisateur/${product.user.id}`)}
              >
                <span>Voir tous les dons de {product.user.name}</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;







