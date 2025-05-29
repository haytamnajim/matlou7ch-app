import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserCircle, FaBoxOpen, FaArrowLeft } from 'react-icons/fa';
import './UserProfile.css';

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                <Link 
                  to={`/produit/${product.id}`} 
                  className="product-card" 
                  key={product.id}
                >
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="product-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(product.title)}`;
                      }}
                    />
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
                    <div className="product-actions">
                      <Link 
                        to={`/modifier-produit/${product.id}`} 
                        className="edit-product-button"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Modifier
                      </Link>
                      <button 
                        className="delete-product-button"
                        onClick={(e) => {
                          e.preventDefault();
                          if(window.confirm("Êtes-vous sûr de vouloir supprimer ce produit?")) {
                            // Logique de suppression à implémenter
                            console.log("Supprimer produit:", product.id);
                          }
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </Link>
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
    </div>
  );
}

export default UserProfile;


