import React, { useState, useEffect } from 'react';
import { FaBoxOpen, FaSearch, FaEye, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import AdminLayout from './AdminLayout';
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

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      // Dans une application réelle, vous feriez un appel API ici
      const categories = ['Mobilier', 'Électronique', 'Vêtements', 'Livres', 'Décoration', 'Jouets'];
      const statuses = ['active', 'pending', 'reported'];

      const mockListings = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Annonce ${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        user: `Utilisateur ${Math.floor(Math.random() * 20) + 1}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        image: '',
        description: `Description détaillée de l'annonce ${i + 1}. Cet objet est en bon état et disponible immédiatement.`,
        city: ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès'][Math.floor(Math.random() * 5)]
      }));

      setListings(mockListings);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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

  const handleDeleteListing = (listingId) => {
    // Confirmer la suppression
    const listingToDelete = listings.find(listing => listing.id === listingId);

    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'annonce "${listingToDelete.title}" ?`)) {
      // Supprimer l'annonce
      const updatedListings = listings.filter(listing => listing.id !== listingId);
      setListings(updatedListings);

      // Afficher un message de confirmation
      alert(`L'annonce "${listingToDelete.title}" a été supprimée avec succès.`);
    }
  };

  const handleApproveListing = (listingId) => {
    // Confirmer l'approbation
    const listingToApprove = listings.find(listing => listing.id === listingId);

    if (window.confirm(`Êtes-vous sûr de vouloir approuver l'annonce "${listingToApprove.title}" ?`)) {
      // Mettre à jour le statut de l'annonce
      const updatedListings = listings.map(listing => {
        if (listing.id === listingId) {
          return {
            ...listing,
            status: 'active'
          };
        }
        return listing;
      });

      setListings(updatedListings);

      // Afficher un message de confirmation
      alert(`L'annonce "${listingToApprove.title}" a été approuvée avec succès.`);
    }
  };

  const handleSaveEdit = () => {
    if (!selectedListing) return;

    // Mettre à jour l'annonce dans la liste
    const updatedListings = listings.map(listing => {
      if (listing.id === selectedListing.id) {
        return selectedListing;
      }
      return listing;
    });

    setListings(updatedListings);
    setShowEditModal(false);
    alert(`L'annonce "${selectedListing.title}" a été mise à jour avec succès.`);
  };

  // Filtrer les annonces
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.user.toLowerCase().includes(searchTerm.toLowerCase());
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
    // La recherche est déjà gérée par le filtrage en temps réel
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
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
              <div className="listing-detail-image-placeholder"></div>
              <span className={`listing-status ${selectedListing.status}`}>
                {getStatusLabel(selectedListing.status)}
              </span>
            </div>

            <h3 className="listing-detail-title">{selectedListing.title}</h3>

            <div className="listing-detail-info">
              <div className="detail-item">
                <span className="detail-label">Catégorie:</span>
                <span className="detail-value">{selectedListing.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Utilisateur:</span>
                <span className="detail-value">{selectedListing.user}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{formatDate(selectedListing.date)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Ville:</span>
                <span className="detail-value">{selectedListing.city}</span>
              </div>
            </div>

            <div className="listing-detail-description">
              <h4>Description</h4>
              <p>{selectedListing.description}</p>
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
                value={selectedListing.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                name="category"
                value={selectedListing.category}
                onChange={handleChange}
              >
                <option value="Mobilier">Mobilier</option>
                <option value="Électronique">Électronique</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Livres">Livres</option>
                <option value="Décoration">Décoration</option>
                <option value="Jouets">Jouets</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Statut</label>
              <select
                id="status"
                name="status"
                value={selectedListing.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="pending">En attente</option>
                <option value="reported">Signalée</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                name="city"
                value={selectedListing.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={selectedListing.description}
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
        </select>
      </div>

      <div className="listings-grid">
        {currentListings.map(listing => (
          <div key={listing.id} className="listing-card">
            <div className="listing-image">
              <div className="listing-image-placeholder"></div>
              <span className={`listing-status ${listing.status}`}>
                {getStatusLabel(listing.status)}
              </span>
            </div>

            <div className="listing-content">
              <h3 className="listing-title">{listing.title}</h3>

              <div className="listing-info">
                <span>{listing.category}</span>
                <span>{formatDate(listing.date)}</span>
              </div>

              <div className="listing-info">
                <span>Par: {listing.user}</span>
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
                    className="listing-btn view"
                    onClick={() => handleApproveListing(listing.id)}
                  >
                    <FaCheck /> Approuver
                  </button>
                )}
                <button
                  className="listing-btn delete"
                  onClick={() => handleDeleteListing(listing.id)}
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
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
              // Afficher seulement les pages proches de la page actuelle
              return page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;
            })
            .map((page, index, array) => {
              // Ajouter des points de suspension si nécessaire
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
