import React, { useState, useEffect } from 'react';
import { FaBoxOpen, FaSearch, FaEye, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import { listingService } from '../../services/supabaseDataService';
import './Admin.css';

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const listingsPerPage = 12;

  // Charger les annonces depuis Supabase
  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await listingService.getAll();
      setListings(data);
    } catch (error) {
      console.error('Erreur lors du chargement des annonces:', error);
      alert('Impossible de charger les annonces.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Fonctions pour gérer les actions sur les annonces
  const handleViewListing = (listing) => {
    setSelectedListing(listing);
    setShowViewModal(true);
  };

  const handleEditListing = (listing) => {
    setSelectedListing({ ...listing });
    setShowEditModal(true);
  };

  const handleDeleteListing = async (listingId) => {
    const listingToDelete = listings.find(listing => listing.id === listingId);
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement l'annonce "${listingToDelete.title}" ?`)) {
      try {
        await listingService.delete(listingId);
        setListings(listings.filter(listing => listing.id !== listingId));
        alert(`L'annonce "${listingToDelete.title}" a été supprimée.`);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'annonce.');
      }
    }
  };

  const handleApproveListing = async (listingId) => {
    const listingToApprove = listings.find(listing => listing.id === listingId);
    if (window.confirm(`Êtes-vous sûr de vouloir approuver l'annonce "${listingToApprove.title}" ?`)) {
      try {
        await listingService.update(listingId, { status: 'active' });

        // Mettre à jour l'état local
        setListings(listings.map(listing =>
          listing.id === listingId ? { ...listing, status: 'active' } : listing
        ));

        alert(`L'annonce "${listingToApprove.title}" a été approuvée.`);
      } catch (error) {
        console.error('Erreur lors de l\'approbation:', error);
        alert('Erreur lors de l\'approbation de l\'annonce.');
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedListing) return;

    try {
      const { id, user_name, created_at, ...variableData } = selectedListing;
      // On ne garde que les champs modifiables
      const updateData = {
        title: variableData.title,
        description: variableData.description,
        price: variableData.price,
        category: variableData.category,
        city: variableData.city,
        status: variableData.status
      };

      await listingService.update(id, updateData);

      // Mettre à jour la liste locale
      setListings(listings.map(listing =>
        listing.id === id ? { ...listing, ...updateData } : listing
      ));

      setShowEditModal(false);
      alert(`L'annonce "${selectedListing.title}" a été mise à jour avec succès.`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la mise à jour de l\'annonce.');
    }
  };

  // Filtrer les annonces
  const filteredListings = listings.filter(listing => {
    const matchesSearch = (listing.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (listing.user_name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing);
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'En attente';
      case 'reported': return 'Signalée';
      case 'sold': return 'Vendue';
      default: return status;
    }
  };

  // Composant Modal pour voir les détails d'une annonce
  const ViewListingModal = () => {
    if (!selectedListing) return null;

    return (
      <div className="admin-modal-overlay" onClick={() => setShowViewModal(false)}>
        <div className="admin-modal" onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header">
            <h2>Détails de l'annonce</h2>
            <button className="modal-close-btn" onClick={() => setShowViewModal(false)}>×</button>
          </div>
          <div className="admin-modal-body">
            <div className="listing-detail-image">
              <div className="listing-detail-image-placeholder">
                {selectedListing.images && selectedListing.images[0] ? (
                  <img src={selectedListing.images[0]} alt={selectedListing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <FaBoxOpen size={48} color="#ccc" />
                )}
              </div>
              <span className={`listing-status ${selectedListing.status}`}>
                {getStatusLabel(selectedListing.status)}
              </span>
            </div>

            <h3 className="listing-detail-title">{selectedListing.title}</h3>
            <p className="listing-detail-price">{selectedListing.price ? `${selectedListing.price} DH` : 'Prix non spécifié'}</p>

            <div className="listing-detail-info">
              <div className="detail-item">
                <span className="detail-label">Catégorie:</span>
                <span className="detail-value">{selectedListing.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Utilisateur:</span>
                <span className="detail-value">{selectedListing.user_name || 'Inconnu'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{formatDate(selectedListing.created_at)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Ville:</span>
                <span className="detail-value">{selectedListing.city}</span>
              </div>
            </div>

            <div className="listing-detail-description">
              <h4>Description</h4>
              <p>{selectedListing.description || 'Aucune description'}</p>
            </div>
          </div>
          <div className="admin-modal-footer">
            <button
              className="admin-btn secondary"
              onClick={() => setShowViewModal(false)}
            >
              Fermer
            </button>
            <button
              className="admin-btn primary"
              onClick={() => {
                setShowViewModal(false);
                handleEditListing(selectedListing);
              }}
            >
              Modifier
            </button>
            {selectedListing.status === 'pending' && (
              <button
                className="admin-btn success"
                onClick={() => {
                  setShowViewModal(false);
                  handleApproveListing(selectedListing.id);
                }}
              >
                Approuver
              </button>
            )}
            <button
              className="admin-btn danger"
              onClick={() => {
                setShowViewModal(false);
                handleDeleteListing(selectedListing.id);
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Composant Modal pour modifier une annonce
  const EditListingModal = () => {
    if (!selectedListing) return null;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectedListing(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <div className="admin-modal-overlay" onClick={() => setShowEditModal(false)}>
        <div className="admin-modal" onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header">
            <h2>Modifier l'annonce</h2>
            <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>×</button>
          </div>
          <div className="admin-modal-body">
            <div className="form-group">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                name="title"
                value={selectedListing.title || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Prix (DH)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={selectedListing.price || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                name="category"
                value={selectedListing.category || ''}
                onChange={handleChange}
              >
                <option value="Mobilier">Mobilier</option>
                <option value="Électronique">Électronique</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Livres">Livres</option>
                <option value="Décoration">Décoration</option>
                <option value="Jouets">Jouets</option>
                <option value="Immobilier">Immobilier</option>
                <option value="Véhicules">Véhicules</option>
                <option value="Services">Services</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Statut</label>
              <select
                id="status"
                name="status"
                value={selectedListing.status || 'active'}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="pending">En attente</option>
                <option value="reported">Signalée</option>
                <option value="sold">Vendue</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                name="city"
                value={selectedListing.city || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={selectedListing.description || ''}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="admin-modal-footer">
            <button
              className="admin-btn secondary"
              onClick={() => setShowEditModal(false)}
            >
              Annuler
            </button>
            <button
              className="admin-btn primary"
              onClick={handleSaveEdit}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout title="Annonces">
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Chargement des annonces...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Annonces">
      <div className="users-header">
        <h2><FaBoxOpen /> Gestion des annonces</h2>

        <form onSubmit={handleSearch} className="users-search">
          <input
            type="text"
            placeholder="Rechercher une annonce..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"><FaSearch /></button>
        </form>
      </div>

      <div className="users-filters">
        <select
          className="filter-select"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actives</option>
          <option value="pending">En attente</option>
          <option value="reported">Signalées</option>
          <option value="sold">Vendues</option>
        </select>

        <select
          className="filter-select"
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="all">Toutes les catégories</option>
          <option value="Mobilier">Mobilier</option>
          <option value="Électronique">Électronique</option>
          <option value="Vêtements">Vêtements</option>
          <option value="Livres">Livres</option>
          <option value="Décoration">Décoration</option>
          <option value="Jouets">Jouets</option>
          <option value="Immobilier">Immobilier</option>
          <option value="Véhicules">Véhicules</option>
          <option value="Services">Services</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div className="listings-grid">
        {currentListings.length > 0 ? (
          currentListings.map(listing => (
            <div key={listing.id} className="listing-card">
              <div className="listing-image">
                <div className="listing-image-placeholder">
                  {listing.images && listing.images[0] ? (
                    <img src={listing.images[0]} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <FaBoxOpen size={32} color="#fff" />
                  )}
                </div>
                <span className={`listing-status ${listing.status}`}>
                  {getStatusLabel(listing.status)}
                </span>
              </div>

              <div className="listing-content">
                <h3 className="listing-title">{listing.title}</h3>

                <div className="listing-info">
                  <span>{listing.category}</span>
                  <span>{formatDate(listing.created_at)}</span>
                </div>

                <div className="listing-info">
                  <span>Par: {listing.user_name || 'Inconnu'}</span>
                </div>

                <div className="listing-price-tag">
                  {listing.price ? `${listing.price} DH` : 'N/A'}
                </div>

                <div className="listing-actions">
                  <button
                    className="listing-btn view"
                    onClick={() => handleViewListing(listing)}
                  >
                    <FaEye /> Voir
                  </button>
                  {listing.status === 'pending' && (
                    <button
                      className="listing-btn success"
                      onClick={() => handleApproveListing(listing.id)}
                    >
                      <FaCheck /> OK
                    </button>
                  )}
                  <button
                    className="listing-btn delete"
                    onClick={() => handleDeleteListing(listing.id)}
                  >
                    <FaTrash /> Suppr
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">Aucune annonce trouvée</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              return page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;
            })
            .map((page, index, array) => {
              if (index > 0 && array[index - 1] !== page - 1) {
                return (
                  <React.Fragment key={`ellipsis-${page}`}>
                    <span className="pagination-ellipsis">...</span>
                    <button
                      className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              }

              return (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}

      {/* Modals */}
      {showViewModal && <ViewListingModal />}
      {showEditModal && <EditListingModal />}
    </AdminLayout>
  );
}

export default Listings;
