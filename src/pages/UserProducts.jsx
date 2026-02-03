import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft, FaHeart, FaRegHeart, FaFlag } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './UserProducts.css';

function UserProducts() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportProductId, setReportProductId] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [reportProduct, setReportProduct] = useState(null);

  // Charger les favoris depuis localStorage au chargement du composant
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Fonction pour ajouter/supprimer des favoris
  const toggleFavorite = (productId, e) => {
    e.preventDefault(); // Empêcher la navigation vers la page du produit

    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Fonction pour gérer le clic sur le bouton de signalement
  const handleReportClick = (productId, e) => {
    e.preventDefault(); // Empêcher la navigation vers la page du produit

    // Vérifier si l'utilisateur est connecté
    if (!currentUser) {
      alert("Vous devez être connecté pour signaler un produit.");
      return;
    }

    // Trouver le produit correspondant à l'ID
    const productToReport = products.find(p => p.id === productId);
    if (productToReport) {
      setReportProductId(productId);
      setReportProduct(productToReport);
      setShowReportModal(true);
    }
  };

  // Fonction pour soumettre un signalement
  const submitReport = () => {
    // Vérifier que toutes les informations nécessaires sont présentes
    if (!currentUser || !reportProductId || !reportReason || !reportProduct) {
      alert("Informations manquantes pour le signalement.");
      return;
    }

    // Créer l'objet de signalement
    const reportData = {
      productId: reportProductId,
      productTitle: reportProduct.title,
      reason: reportReason,
      reportedBy: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email
      },
      timestamp: new Date().toISOString()
    };

    // Demander confirmation à l'utilisateur
    const confirmReport = window.confirm(
      `Êtes-vous sûr de vouloir signaler "${reportProduct.title}" pour la raison: ${getReasonLabel(reportReason)}?`
    );

    if (confirmReport) {
      // Dans une application réelle, vous feriez un appel API ici
      console.log("Envoi du signalement:", reportData);

      // Simuler une requête API
      setTimeout(() => {
        // Réinitialiser et fermer la modal
        setReportReason('');
        setReportProductId(null);
        setReportProduct(null);
        setShowReportModal(false);

        // Afficher un message de confirmation
        alert('Merci pour votre signalement. Notre équipe va l\'examiner dans les plus brefs délais.');
      }, 500);
    }
  };

  // Fonction pour obtenir le libellé d'une raison de signalement
  const getReasonLabel = (reasonCode) => {
    const reasons = {
      'inappropriate': 'Contenu inapproprié',
      'spam': 'Spam',
      'scam': 'Arnaque',
      'offensive': 'Contenu offensant',
      'other': 'Autre raison'
    };

    return reasons[reasonCode] || reasonCode;
  };

  useEffect(() => {
    // Simuler le chargement des données de l'utilisateur et de ses produits
    setTimeout(() => {
      try {
        // Dans une application réelle, vous feriez un appel API ici
        const mockUser = {
          id: userId,
          name: "Ayoub Soufat",
          location: "Casablanca",
          memberSince: "24 avr. 2025",
          avatar: "A",
          avatarColor: "#c9d64f",
          description: "Les dons sont à venir chercher à mon domicile à Chennevières sur Marne. Je privilégie la proximité."
        };

        const mockProducts = [
          {
            id: "1",
            title: "Table d'enfant",
            location: "Casablanca",
            timeAgo: "quelques secondes",
            image: "/images/table-enfant.jpg",
            category: "Ameublement",
            condition: "très bon état",
            isPublished: true
          },
          {
            id: "2",
            title: "Chaise de bureau",
            location: "Casablanca",
            timeAgo: "2 jours",
            image: "/images/chaise-bureau.jpg",
            category: "Ameublement",
            condition: "bon état",
            isPublished: true
          },
          {
            id: "3",
            title: "Lampe de chevet",
            location: "Casablanca",
            timeAgo: "1 semaine",
            image: "/images/lampe-chevet.jpg",
            category: "Décoration",
            condition: "comme neuf",
            isPublished: true
          },
          {
            id: "4",
            title: "Livre de cuisine",
            location: "Casablanca",
            timeAgo: "3 jours",
            image: "/images/livre-cuisine.jpg",
            category: "Livres",
            condition: "bon état",
            isPublished: false
          }
        ];

        setUser(mockUser);
        setProducts(mockProducts);
        setLoading(false);
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des données");
        setLoading(false);
      }
    }, 800);
  }, [userId]);

  if (loading) {
    return (
      <div className="user-products-container">
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-products-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-products-container">
        <div className="error-message">Utilisateur non trouvé</div>
      </div>
    );
  }

  return (
    <div className="user-products-page">
      <div className="user-products-container">
        <div className="page-header">
          <Link to="/" className="back-button">
            <FaArrowLeft /> Retour
          </Link>
          <h1 className="page-title">Objets de {user.name}</h1>
        </div>

        <div className="user-profile-card">
          <div className="user-avatar" style={{ backgroundColor: user.avatarColor }}>
            {user.avatar}
          </div>
          <div className="user-info">
            <h2 className="user-name">{user.name}</h2>
            <p className="user-location">
              <FaMapMarkerAlt /> {user.location}
            </p>
            <p className="user-member-since">
              <FaCalendarAlt /> Membre depuis le {user.memberSince}
            </p>
            {user.description && (
              <p className="user-description">{user.description}</p>
            )}
          </div>
        </div>

        <div className="products-stats">
          <span className="products-count">{products.length} objets</span>
          <span className="active-products-count">
            {products.filter(p => p.isPublished).length} objets actifs
          </span>
        </div>

        <div className="products-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <Link
                to={`/produit/${product.id}`}
                className="product-link"
              >
                <div className="product-image-container">
                  <div className="product-image-placeholder"></div>
                  <button
                    className="favorite-button"
                    onClick={(e) => toggleFavorite(product.id, e)}
                  >
                    {favorites.includes(product.id) ? (
                      <FaHeart color="#FF5733" size={24} />
                    ) : (
                      <FaRegHeart color="white" size={24} />
                    )}
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-meta">
                    <span className="product-location">{product.location}</span>
                    <span className="product-time">{product.timeAgo}</span>
                  </p>
                  <div className="product-details">
                    <span className="product-category">{product.category}</span>
                    <span className="product-condition">{product.condition}</span>
                  </div>
                </div>
              </Link>
              <button
                className="report-product-button"
                onClick={(e) => handleReportClick(product.id, e)}
              >
                <FaFlag /> Signaler ce produit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de signalement */}
      {showReportModal && (
        <div className="report-modal-overlay">
          <div className="report-modal">
            <h3 className="report-modal-title">Signaler un produit</h3>
            <p className="report-modal-subtitle">
              Vous êtes sur le point de signaler "{reportProduct?.title}"
            </p>

            <div className="report-product-info">
              <div className="report-product-image-placeholder"></div>
              <div className="report-product-details">
                <p className="report-product-title">{reportProduct?.title}</p>
                <p className="report-product-location">{reportProduct?.location}</p>
              </div>
            </div>

            <div className="report-form-group">
              <label htmlFor="report-reason">Raison du signalement:</label>
              <select
                id="report-reason"
                className="report-reason-select"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              >
                <option value="">Sélectionnez une raison</option>
                <option value="inappropriate">Contenu inapproprié</option>
                <option value="spam">Spam</option>
                <option value="scam">Arnaque</option>
                <option value="offensive">Contenu offensant</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div className="report-user-info">
              <p>Votre signalement sera envoyé en tant que:</p>
              <p className="report-user-name">{currentUser?.name || 'Utilisateur anonyme'}</p>
            </div>

            <div className="report-modal-actions">
              <button
                className="cancel-report-button"
                onClick={() => {
                  setShowReportModal(false);
                  setReportProductId(null);
                  setReportProduct(null);
                  setReportReason('');
                }}
              >
                Annuler
              </button>
              <button
                className="submit-report-button"
                onClick={submitReport}
                disabled={!reportReason}
              >
                Confirmer le signalement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProducts;

