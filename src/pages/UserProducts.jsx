import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import './UserProducts.css';

function UserProducts() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                {!product.isPublished && (
                  <div className="product-status">Non publié</div>
                )}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProducts;