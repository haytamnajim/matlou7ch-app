import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listingService } from '../services/supabaseDataService';
import './MesAnnonces.css';

function MesAnnonces() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('en-cours');
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les annonces au chargement du composant
  useEffect(() => {
    console.log("MesAnnonces: Effet déclenché, user:", user);

    const fetchMyAds = async () => {
      if (!user) {
        console.log("MesAnnonces: Pas d'utilisateur, arrêt du chargement");
        setLoading(false);
        return;
      }

      console.log("MesAnnonces: Début du chargement pour user:", user.id);

      try {
        // Ajouter un timeout de 5 secondes
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout de la requête Supabase')), 5000)
        );

        const fetchPromise = listingService.getByUserId(user.id);

        console.log("MesAnnonces: Appel listingService.getByUserId en cours...");
        const ads = await Promise.race([fetchPromise, timeoutPromise]);

        console.log("MesAnnonces: Données reçues:", ads);

        // Normaliser les données pour l'affichage
        const formattedAds = ads.map(ad => ({
          ...ad,
          date: ad.created_at, // Mapping created_at vers date pour l'affichage
          isActive: ad.is_published, // Mapping is_published vers isActive
          city: ad.location || ad.city // Fallback
        }));
        setMyAds(formattedAds);
      } catch (error) {
        console.error("Erreur lors du chargement de mes annonces:", error);
        alert(`Erreur de chargement: ${error.message}`);
      } finally {
        console.log("MesAnnonces: Fin du chargement (setLoading false)");
        setLoading(false);
      }
    };

    fetchMyAds();
  }, [user]);

  // Filtrer les annonces selon l'onglet actif
  const filteredAds = myAds.filter(ad => {
    if (activeTab === 'en-cours') {
      return ad.isActive !== false; // Annonces actives
    } else {
      return ad.isActive === false; // Annonces terminées
    }
  });

  const handleDelete = async (adId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      try {
        await listingService.delete(adId);
        // Mettre à jour l'état local
        setMyAds(myAds.filter(ad => ad.id !== adId));
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Erreur lors de la suppression de l'annonce.");
      }
    }
  };

  return (
    <div className="mes-annonces-container">
      <h1 className="mes-annonces-title">Mes annonces</h1>

      <div className="mes-annonces-tabs">
        <button
          className={`tab-button ${activeTab === 'en-cours' ? 'active' : ''}`}
          onClick={() => setActiveTab('en-cours')}
        >
          En cours
        </button>
        <button
          className={`tab-button ${activeTab === 'termines' ? 'active' : ''}`}
          onClick={() => setActiveTab('termines')}
        >
          Terminés
        </button>
      </div>

      <div className="annonces-content">
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : filteredAds.length > 0 ? (
          <div className="annonces-grid">
            {filteredAds.map(ad => (
              <div key={ad.id} className="annonce-card">
                <div className="annonce-image">
                  {ad.images && ad.images.length > 0 ? (
                    <img src={ad.images[0]} alt={ad.title} className="product-image" />
                  ) : (
                    <div className="product-image" style={{ backgroundColor: '#f0f0f0' }}></div>
                  )}
                </div>
                <div className="annonce-details">
                  <h3 className="annonce-title">{ad.title}</h3>
                  <p className="annonce-category">{ad.category}</p>
                  <p className="annonce-city">{ad.city}</p>
                  <p className="annonce-date">
                    {new Date(ad.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="annonce-actions">
                  <Link to={`/produit/${ad.id}`} className="view-button">
                    Voir l'annonce
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(ad.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="annonce-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--primary-color)" width="45px" height="45px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
              </svg>
            </div>
            <h2 className="empty-title">Vous n'avez aucune annonce en ligne pour le moment</h2>
            <p className="empty-description">
              Faites un geste pour la planète, publiez une annonce sur Matlou7ch
            </p>
            <Link to="/post-ad">
              <button className="publish-button">+ Publier une annonce</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MesAnnonces;


