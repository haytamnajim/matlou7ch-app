import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PublicProfile.css';

function PublicProfile() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des produits de l'utilisateur
    setTimeout(() => {
      // Dans une application réelle, vous feriez un appel API ici
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

      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Fonction pour supprimer un produit
  const handleDeleteProduct = (productId, e) => {
    e.preventDefault();
    if(window.confirm("Êtes-vous sûr de vouloir supprimer ce produit?")) {
      // Dans une application réelle, vous feriez un appel API ici
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  return (
    <div className="public-profile-container">
      <h1 className="public-profile-title">Mon profil public</h1>
      
      <div className="profile-header-section">
        <div className="profile-avatar">
          <span>H</span>
        </div>
        
        <div className="profile-info">
          <h2 className="profile-username">haytamnajim</h2>
          <div className="profile-location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#666" width="16px" height="16px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Casablanca</span>
          </div>
          <div className="profile-member-since">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#666" width="16px" height="16px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>Membre depuis le 24 avr. 2025</span>
          </div>
        </div>
      </div>
      
      <div className="donation-stats">
        <div className="stat-box">
          <div className="stat-number">0</div>
          <div className="stat-label">don donné</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">0</div>
          <div className="stat-label">don reçu</div>
        </div>
      </div>
      
      <Link to="/modifier-profil" className="edit-profile-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="16px" height="16px">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        <span>Modifier mon profil</span>
      </Link>
      
      {loading ? (
        <div className="loading-spinner">Chargement...</div>
      ) : products.length > 0 ? (
        <div className="user-products">
          <h2 className="products-section-title">Mes annonces</h2>
          <div className="products-grid">
            {products.map(product => (
              <div className="product-card" key={product.id}>
                <Link to={`/produit/${product.id}`} className="product-link">
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
                  </div>
                </Link>
                <div className="product-actions">
                  <Link 
                    to={`/modifier-produit/${product.id}`} 
                    className="edit-product-button"
                  >
                    Modifier
                  </Link>
                  <button 
                    className="delete-product-button"
                    onClick={(e) => handleDeleteProduct(product.id, e)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-listings">
          <div className="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ccc" width="60px" height="60px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
            </svg>
          </div>
          <p className="empty-message">Aucune annonce en ligne pour le moment</p>
        </div>
      )}
    </div>
  );
}

export default PublicProfile;

