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
        image: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`
      }));
      
      setListings(mockListings);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
    switch(status) {
      case 'active': return 'Active';
      case 'pending': return 'En attente';
      case 'reported': return 'Signalée';
      default: return status;
    }
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
              <img 
                src={listing.image} 
                alt={listing.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+non+disponible';
                }}
              />
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
                <button className="listing-btn view">
                  <FaEye /> Voir
                </button>
                {listing.status === 'pending' && (
                  <button className="listing-btn view">
                    <FaCheck /> Approuver
                  </button>
                )}
                <button className="listing-btn delete">
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
    </AdminLayout>
  );
}

export default Listings;
