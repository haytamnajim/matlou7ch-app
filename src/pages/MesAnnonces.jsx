import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listingService } from '../services/supabaseDataService';
import StatusBadge from '../components/StatusBadge';
import Confetti from '../components/Confetti';
import {
  FaHandHoldingHeart,
  FaTrash,
  FaEye,
  FaRedo,
  FaHourglassHalf,
  FaPlusCircle,
  FaCheck
} from 'react-icons/fa';
import './MesAnnonces.css';

function MesAnnonces() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('en-cours');
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrationAd, setCelebrationAd] = useState(null);

  // Récupérer les annonces au chargement du composant
  useEffect(() => {
    const fetchMyAds = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout de la requête Supabase')), 5000)
        );

        const fetchPromise = listingService.getByUserId(user.id);
        const ads = await Promise.race([fetchPromise, timeoutPromise]);

        // Normaliser les données pour l'affichage
        const formattedAds = (ads || []).map((ad) => {
          const isPublished = ad.is_published !== false;
          let status = ad.status;
          if (!status) {
            status = isPublished ? 'disponible' : 'donne';
          }
          return {
            ...ad,
            date: ad.created_at,
            isActive: status !== 'donne' && isPublished,
            status,
            city: ad.location || ad.city || 'Maroc',
          };
        });

        setMyAds(formattedAds);
      } catch (error) {
        console.error('Erreur lors du chargement de mes annonces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAds();
  }, [user]);

  // Filtrer les annonces selon l'onglet actif
  const filteredAds = myAds.filter((ad) => {
    if (activeTab === 'en-cours') {
      return ad.status !== 'donne' && ad.isActive !== false;
    } else {
      return ad.status === 'donne' || ad.isActive === false;
    }
  });

  // Action : Marquer comme donné avec effet confetti festif
  const handleMarkAsGiven = async (adId, adTitle) => {
    // 1. Déclencher les confettis et la célébration
    setShowConfetti(true);
    setCelebrationAd({ id: adId, title: adTitle });

    // 2. Mise à jour optimiste locale
    setMyAds((prev) =>
      prev.map((ad) =>
        ad.id === adId
          ? { ...ad, status: 'donne', isActive: false, is_published: false }
          : ad
      )
    );

    // Arrêter les confettis après 5.5 secondes
    setTimeout(() => {
      setShowConfetti(false);
    }, 5500);

    // 3. Sauvegarde dans Supabase
    try {
      await listingService.update(adId, {
        status: 'donne',
        is_published: false,
      });
    } catch (err) {
      console.error('Erreur mise à jour don:', err);
    }
  };

  // Action : Basculer entre Disponible et Réservé
  const handleToggleReserve = async (adId, currentStatus) => {
    const newStatus = currentStatus === 'reserve' ? 'disponible' : 'reserve';

    setMyAds((prev) =>
      prev.map((ad) => (ad.id === adId ? { ...ad, status: newStatus } : ad))
    );

    try {
      await listingService.update(adId, {
        status: newStatus,
        is_published: true,
      });
    } catch (err) {
      console.error('Erreur toggle réservé:', err);
    }
  };

  // Action : Réactiver un don terminé
  const handleReactivate = async (adId) => {
    setMyAds((prev) =>
      prev.map((ad) =>
        ad.id === adId
          ? { ...ad, status: 'disponible', isActive: true, is_published: true }
          : ad
      )
    );

    try {
      await listingService.update(adId, {
        status: 'disponible',
        is_published: true,
      });
    } catch (err) {
      console.error('Erreur réactivation don:', err);
    }
  };

  // Suppression
  const handleDelete = async (adId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        await listingService.delete(adId);
        setMyAds((prev) => prev.filter((ad) => ad.id !== adId));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert("Erreur lors de la suppression de l'annonce.");
      }
    }
  };

  return (
    <div className="mes-annonces-container">
      {/* Animation Festive Confetti */}
      {showConfetti && <Confetti duration={5500} pieces={250} burst={true} />}

      {/* Modal de Célébration Solidaire */}
      {celebrationAd && (
        <div className="celebration-modal-backdrop" onClick={() => setCelebrationAd(null)}>
          <div className="celebration-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="celebration-badge-pill">Geste Solidaire 🌿</div>
            <div className="celebration-emoji-bounce">🤝🎉</div>
            <h2 className="celebration-modal-title">Bravo et Grand Merci !</h2>
            <p className="celebration-modal-text">
              Votre don <strong>« {celebrationAd.title} »</strong> a été marqué comme{' '}
              <span className="celebration-highlight">Donné avec succès</span>.
            </p>
            <div className="celebration-impact-banner">
              <span>🌱 1 objet sauvé de la poubelle</span>
              <span>💚 1 personne heureuse dans votre communauté</span>
            </div>
            <button className="celebration-close-btn" onClick={() => setCelebrationAd(null)}>
              <FaCheck /> Continuer avec le sourire
            </button>
          </div>
        </div>
      )}

      <h1 className="mes-annonces-title">Mes annonces</h1>

      <div className="mes-annonces-tabs">
        <button
          className={`tab-button ${activeTab === 'en-cours' ? 'active' : ''}`}
          onClick={() => setActiveTab('en-cours')}
        >
          En cours ({myAds.filter((a) => a.status !== 'donne' && a.isActive !== false).length})
        </button>
        <button
          className={`tab-button ${activeTab === 'termines' ? 'active' : ''}`}
          onClick={() => setActiveTab('termines')}
        >
          Terminés / Donnés ({myAds.filter((a) => a.status === 'donne' || a.isActive === false).length})
        </button>
      </div>

      <div className="annonces-content">
        {loading ? (
          <div className="loading">Chargement de vos dons...</div>
        ) : filteredAds.length > 0 ? (
          <div className="annonces-grid">
            {filteredAds.map((ad) => (
              <div key={ad.id} className="annonce-card">
                <div className="annonce-image">
                  {ad.images && ad.images.length > 0 ? (
                    <img src={ad.images[0]} alt={ad.title} className="product-image" />
                  ) : (
                    <div className="product-image" style={{ backgroundColor: '#f0f0f0' }}></div>
                  )}

                  {/* Badge de statut avec icône */}
                  <div className="annonce-status-tag">
                    <StatusBadge status={ad.status} isPublished={ad.isActive} size="sm" />
                  </div>
                </div>

                <div className="annonce-details">
                  <h3 className="annonce-title">{ad.title}</h3>
                  <p className="annonce-category">{ad.category}</p>
                  <p className="annonce-city">{ad.city}</p>
                  <p className="annonce-date">
                    {new Date(ad.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                {/* Actions enrichies */}
                <div className="annonce-actions">
                  <Link to={`/produit/${ad.id}`} className="view-button" title="Voir l'annonce">
                    <FaEye /> Voir
                  </Link>

                  {activeTab === 'en-cours' ? (
                    <>
                      {/* Bouton Réservé / Disponible */}
                      <button
                        type="button"
                        className={`reserve-toggle-button ${ad.status === 'reserve' ? 'is-reserved' : ''}`}
                        onClick={() => handleToggleReserve(ad.id, ad.status)}
                        title={ad.status === 'reserve' ? 'Rendre disponible' : 'Marquer comme réservé'}
                      >
                        <FaHourglassHalf />
                        <span>{ad.status === 'reserve' ? 'Réservé' : 'Réserver'}</span>
                      </button>

                      {/* Bouton Célébration Donné */}
                      <button
                        type="button"
                        className="mark-given-button"
                        onClick={() => handleMarkAsGiven(ad.id, ad.title)}
                        title="Marquer comme Donné"
                      >
                        <FaHandHoldingHeart />
                        <span>Donné 🎉</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="reactivate-button"
                      onClick={() => handleReactivate(ad.id)}
                      title="Remettre en ligne ce don"
                    >
                      <FaRedo />
                      <span>Réactiver</span>
                    </button>
                  )}

                  {/* Bouton Supprimer */}
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(ad.id)}
                    title="Supprimer cette annonce"
                  >
                    <FaTrash />
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
            <h2 className="empty-title">
              {activeTab === 'en-cours'
                ? "Vous n'avez aucune annonce en cours"
                : "Vous n'avez pas encore d'annonces terminées"}
            </h2>
            <p className="empty-description">
              Faites un geste pour la planète, publiez une annonce sur Matlou7ch
            </p>
            <Link to="/post-ad">
              <button className="publish-button">
                <FaPlusCircle /> Publier une annonce
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MesAnnonces;
