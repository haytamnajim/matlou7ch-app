import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserCircle, FaBoxOpen, FaArrowLeft, FaHeart, FaRegHeart, FaFlag } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './UserProfile.css';

function UserProfile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth(); // Récupérer l'utilisateur connecté
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
    // Simuler le chargement des données de l'utilisateur
    setTimeout(() => {
      try {
        // Dans une application réelle, vous feriez un appel API ici
        const mockUser = {
          id: userId,
          name: "Ayoub Soufat",
          username: "ayoub_soufat",
          location: "Casablanca",
          memberSince: "24 avr. 2025",
          avatar: "A",
          avatarColor: "#c9d64f",
          description: "Les dons sont à venir chercher à mon domicile à Chennevières sur Marne. Je privilégie la proximité.",
          donationsGiven: 12,
          donationsReceived: 5
        };

        const mockProducts = [
          {
            id: "1",
            title: "Table d'enfant",
            location: "Casablanca",
            timeAgo: "quelques secondes",
            image: "/images/table-enfant.jpg",
            category: "Ameublement",
            condition: "très bon état"
          },
          {
            id: "2",
            title: "Chaise de bureau",
            location: "Casablanca",
            timeAgo: "2 jours",
            image: "/images/chaise-bureau.jpg",
            category: "Ameublement",
            condition: "bon état"
          },
          {
            id: "3",
            title: "Lampe de chevet",
            location: "Casablanca",
            timeAgo: "1 semaine",
            image: "/images/lampe-chevet.jpg",
            category: "Décoration",
            condition: "comme neuf"
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
      <div className="user-profile-page">
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile-page">
        <div className="error-message">Utilisateur non trouvé</div>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        <div className="profile-header">
          <Link to="/" className="back-button">
            <FaArrowLeft />
            <span>Retour</span>
          </Link>
          <h1 className="profile-title">Profil de {user.name}</h1>
        </div>

        <div className="profile-card">
          <div className="profile-banner"></div>

          <div className="profile-content">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar" style={{ backgroundColor: user.avatarColor }}>
                <span>{user.avatar}</span>
              </div>
            </div>

            <div className="profile-info-section">
              <h2 className="profile-username">{user.username}</h2>

              <div className="profile-meta">
                <div className="profile-location">
                  <FaMapMarkerAlt className="profile-icon" />
                  <span>{user.location}</span>
                </div>

                <div className="profile-member-since">
                  <FaUserCircle className="profile-icon" />
                  <span>Membre depuis le {user.memberSince}</span>
                </div>
              </div>

              {user.description && (
                <div className="profile-description">
                  <p>{user.description}</p>
                </div>
              )}

              <div className="profile-stats">
                <div className="stat-item">
                  <div className="stat-value">{user.donationsGiven}</div>
                  <div className="stat-label">Dons donnés</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{user.donationsReceived}</div>
                  <div className="stat-label">Dons reçus</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-listings-section">
          <div className="section-header">
            <h2 className="section-title">Objets disponibles</h2>
            <Link to={`/utilisateur/${userId}`} className="see-all-link">
              Voir tous les objets
            </Link>
          </div>

          {products.length > 0 ? (
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
                          <FaHeart color="var(--primary-color)" size={24} />
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
          ) : (
            <div className="empty-listings-card">
              <div className="empty-icon">
                <FaBoxOpen />
              </div>
              <h3 className="empty-title">Aucun objet disponible</h3>
              <p className="empty-message">
                {user.name} n'a pas encore publié d'annonces.
              </p>
            </div>
          )}
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

export default UserProfile;


