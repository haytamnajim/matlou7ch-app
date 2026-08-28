import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listingService, userService } from '../services/supabaseDataService';
import './PublicProfile.css';

function PublicProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Si pas d'utilisateur connecté, on arrête le chargement
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Pas besoin de refetcher le profil si AuthContext l'a déjà fait
        // On récupère juste les produits avec un timeout de sécurité

        console.log("PublicProfile: Récupération des produits annonces...");

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout de récupération des produits')), 5000)
        );

        // Utiliser la vue 'listings_with_user' via le service pour éviter les blocages RLS sur 'listings'
        const fetchPromise = listingService.getByUserId(user.id);

        const userProducts = await Promise.race([fetchPromise, timeoutPromise]);

        // Normaliser les données des produits
        const formattedProducts = userProducts.map(p => ({
          id: p.id,
          title: p.title,
          location: p.location || p.city || 'Maroc',
          timeAgo: new Date(p.created_at).toLocaleDateString(),
          image: p.images && p.images.length > 0 ? p.images[0] : '',
          category: p.category,
          condition: p.condition
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Fonction pour supprimer un produit
  const handleDeleteProduct = async (productId, e) => {
    e.preventDefault();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit?")) {
      try {
        await listingService.delete(productId);
        setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Impossible de supprimer le produit.");
      }
    }
  };

  if (loading) {
    return <div className="loading-spinner">Chargement...</div>;
  }

  if (!user) {
    return <div className="public-profile-container">Veuillez vous connecter pour voir votre profil.</div>;
  }

  // Utiliser le profil du contexte (si disponible car chargé par AuthContext), 
  // ou les métadonnées de l'utilisateur, ou des valeurs par défaut.
  // AuthContext charge le profil de toute façon, donc user.user_metadata est un bon fallback immédiat.
  const profileName = profile?.name || user.user_metadata?.name || user.email;
  const profileCity = profile?.city || user.user_metadata?.city || 'Maroc';
  const profileDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString()
    : new Date(user.created_at).toLocaleDateString();

  return (
    <div className="public-profile-container">
      <h1 className="public-profile-title">Mon profil public</h1>

      <div className="profile-header-section">
        <div className="profile-avatar">
          <span>{profileName ? profileName.charAt(0).toUpperCase() : 'U'}</span>
        </div>

        <div className="profile-info">
          <h2 className="profile-username">{profileName}</h2>
          <div className="profile-location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--text-muted)" width="16px" height="16px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>{profileCity}</span>
          </div>
          <div className="profile-member-since">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--text-muted)" width="16px" height="16px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span>Membre depuis le {profileDate}</span>
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
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
        <span>Modifier mon profil</span>
      </Link>

      {products.length > 0 ? (
        <div className="user-products">
          <h2 className="products-section-title">Mes annonces</h2>
          <div className="products-grid">
            {products.map(product => (
              <div className="product-card" key={product.id}>
                <Link to={`/produit/${product.id}`} className="product-link">
                  <div className="product-image-container">
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="product-image" />
                    ) : (
                      <div className="product-image" style={{ backgroundColor: '#f0f0f0' }}></div>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--secondary-color)" width="60px" height="60px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
            </svg>
          </div>
          <p className="empty-message">Aucune annonce en ligne pour le moment</p>
        </div>
      )}
    </div>
  );
}

export default PublicProfile;

