import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listingService } from '../services/supabaseDataService';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaTag,
  FaClock,
  FaBookmark,
  FaRegBookmark,
  FaUndoAlt,
  FaChevronLeft,
  FaChevronRight,
  FaGift
} from 'react-icons/fa';
import { SkeletonCatalogueGrid } from '../components/Skeleton';
import StatusBadge from '../components/StatusBadge';
import FavoriteButton from '../components/FavoriteButton';
import './Catalogue.css';

const QUICK_CATEGORIES = [
  { id: '', label: 'Tout voir' },
  { id: 'vetements', label: 'Vêtements' },
  { id: 'multimedia', label: 'Multimédia' },
  { id: 'meubles', label: 'Meubles' },
  { id: 'maison', label: 'Maison' },
  { id: 'livres', label: 'Livres' },
  { id: 'jouets', label: 'Jeux & Jouets' },
  { id: 'sport', label: 'Sport' }
];

function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [searchLocation, setSearchLocation] = useState(searchParams.get('location') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [searchCategory, setSearchCategory] = useState(searchParams.get('category') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  const itemsPerPage = 12;

  // Synchroniser avec les query params si changés depuis l'URL
  useEffect(() => {
    setSearchLocation(searchParams.get('location') || '');
    setSearchQuery(searchParams.get('query') || '');
    setSearchCategory(searchParams.get('category') || '');
  }, [searchParams]);

  // Vérifier si la recherche actuelle est sauvegardée
  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    const currentSearch = `${searchLocation}-${searchQuery}-${searchCategory}`;
    setIsSaved(savedSearches.includes(currentSearch));
  }, [searchLocation, searchQuery, searchCategory]);

  const toggleSaveSearch = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    const currentSearch = `${searchLocation}-${searchQuery}-${searchCategory}`;

    if (newSavedState) {
      if (!savedSearches.includes(currentSearch)) {
        savedSearches.push(currentSearch);
      }
    } else {
      const index = savedSearches.indexOf(currentSearch);
      if (index !== -1) {
        savedSearches.splice(index, 1);
      }
    }

    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  };

  // Filtrer les résultats
  const filterResults = useCallback(async () => {
    setLoading(true);
    try {
      const searchResults = await listingService.search({
        category: searchCategory,
        location: searchLocation,
        query: searchQuery
      });

      const formattedItems = searchResults.map(item => ({
        id: item.id,
        title: item.title,
        location: item.location || item.city || 'Maroc',
        category: item.category || 'Divers',
        image: item.images && item.images.length > 0 ? item.images[0] : '',
        user: {
          name: item.user_name || item.user?.name || 'Donateur'
        },
        time: new Date(item.created_at).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short'
        }),
        avatar: item.avatar_color || '#62825D',
        status: item.status || (item.is_published === false ? 'donne' : 'disponible'),
        isPublished: item.is_published
      }));

      setResults(formattedItems);
      setCurrentPage(1);
    } catch (error) {
      console.error("Erreur chargement catalogue:", error);
    } finally {
      setLoading(false);
    }
  }, [searchLocation, searchQuery, searchCategory]);

  useEffect(() => {
    filterResults();
  }, [filterResults]);

  const toggleFavorite = (itemId, e) => {
    if (e) e.preventDefault();

    if (!user) {
      navigate('/connexion', {
        state: { from: { pathname: '/catalogue' } }
      });
      return;
    }

    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSearchParams({
      location: searchLocation,
      query: searchQuery,
      category: searchCategory
    });
    filterResults();
  };

  const handleCategoryClick = (catId) => {
    setSearchCategory(catId);
    setSearchParams({
      location: searchLocation,
      query: searchQuery,
      category: catId
    });
  };

  const handleResetFilters = () => {
    setSearchLocation('');
    setSearchQuery('');
    setSearchCategory('');
    setSearchParams({});
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <div className="catalogue-page-wrapper">
      {/* 1. Header Banner & Barre de Recherche */}
      <section className="catalogue-hero-header">
        <div className="catalogue-container">
          <div className="catalogue-header-text">
            <span className="catalogue-pill">Catalogue des dons</span>
            <h1 className="catalogue-title">Trouvez des objets gratuits près de chez vous</h1>
            <p className="catalogue-subtitle">
              Parcourez des milliers d'annonces de dons solidaires partout au Maroc.
            </p>
          </div>

          {/* Formulaire de recherche interactif */}
          <form className="catalogue-search-bar" onSubmit={handleSearchSubmit}>
            <div className="search-input-field">
              <FaSearch className="field-icon" />
              <input
                type="text"
                placeholder="Que cherchez-vous ? (ex: vélo, table, veste...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="search-input-field">
              <FaMapMarkerAlt className="field-icon" />
              <input
                type="text"
                placeholder="Ville, quartier (ex: Casablanca, Rabat...)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>

            <div className="search-input-field select-field">
              <FaTag className="field-icon" />
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">Toutes catégories</option>
                <option value="vetements">Vêtements</option>
                <option value="multimedia">Multimédia</option>
                <option value="meubles">Meubles</option>
                <option value="maison">Maison & Déco</option>
                <option value="livres">Livres</option>
                <option value="jouets">Jeux & Loisirs</option>
                <option value="sport">Sport</option>
              </select>
            </div>

            <button type="submit" className="catalogue-search-submit">
              <FaSearch /> Rechercher
            </button>
          </form>

          {/* Chips de catégories rapides */}
          <div className="quick-categories-bar">
            {QUICK_CATEGORIES.map((cat) => {
              const isSelected = searchCategory.toLowerCase() === cat.id.toLowerCase();
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`quick-cat-chip ${isSelected ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Résultats et Grille */}
      <section className="catalogue-results-section">
        <div className="catalogue-container">
          <div className="results-top-bar">
            <div className="results-count-text">
              <strong>{results.length}</strong> {results.length > 1 ? 'objets disponibles' : 'objet disponible'}
              {searchCategory && <span> dans <em>{searchCategory}</em></span>}
              {searchLocation && <span> à <em>{searchLocation}</em></span>}
            </div>

            <button
              type="button"
              className={`save-search-pill-btn ${isSaved ? 'is-saved' : ''}`}
              onClick={toggleSaveSearch}
            >
              {isSaved ? <FaBookmark className="save-icon" /> : <FaRegBookmark className="save-icon" />}
              <span>{isSaved ? 'Recherche sauvegardée' : 'Sauvegarder la recherche'}</span>
            </button>
          </div>

          {/* États de chargement & résultats */}
          {loading ? (
            <SkeletonCatalogueGrid items={8} />
          ) : results.length === 0 ? (
            <div className="catalogue-empty-state">
              <div className="empty-state-icon-box">
                <FaGift />
              </div>
              <h3 className="empty-title">Aucun don ne correspond à votre recherche</h3>
              <p className="empty-desc">
                Essayez d'élargir vos critères de recherche ou de modifier votre ville.
              </p>
              <button
                type="button"
                className="empty-reset-btn"
                onClick={handleResetFilters}
              >
                <FaUndoAlt /> Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <div className="catalogue-items-grid">
                {currentItems.map((item) => {
                  const isFav = favorites.includes(item.id);
                  return (
                    <article key={item.id} className="catalogue-item-card">
                      <Link to={`/produit/${item.id}`} className="item-card-link">
                        <div className="item-img-wrapper">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="item-cover-image" />
                          ) : (
                            <div className="item-img-placeholder">
                              <FaGift className="placeholder-icon" />
                            </div>
                          )}

                          <div className="item-card-badges-top">
                            <span className="item-free-badge">100% GRATUIT</span>
                            <StatusBadge status={item.status} isPublished={item.isPublished} size="sm" />
                          </div>

                          {/* Avatar Donateur */}
                          <div className="item-donor-badge">
                            <div className="donor-avatar" style={{ backgroundColor: item.avatar }}>
                              {item.user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="donor-name">{item.user.name}</span>
                          </div>

                          {/* Bouton Favori avec Micro-Animation */}
                          <div className="item-favorite-animated-wrapper">
                            <FavoriteButton
                              isFavorited={isFav}
                              onToggle={(e) => toggleFavorite(item.id, e)}
                              size="sm"
                            />
                          </div>
                        </div>

                        <div className="item-card-details">
                          <h3 className="item-card-title" title={item.title}>
                            {item.title}
                          </h3>

                          <div className="item-card-meta">
                            <span className="item-meta-location">
                              <FaMapMarkerAlt className="meta-icon" />
                              {item.location}
                            </span>
                            <span className="item-meta-date">
                              <FaClock className="meta-icon" />
                              {item.time}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>

              {/* 3. Pagination moderne */}
              {totalPages > 1 && (
                <div className="catalogue-pagination">
                  <button
                    type="button"
                    className="pagin-btn prev"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    aria-label="Page précédente"
                  >
                    <FaChevronLeft />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          className={`pagin-number ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === currentPage - 3 ||
                      pageNum === currentPage + 3
                    ) {
                      return <span key={pageNum} className="pagin-dots">...</span>;
                    }
                    return null;
                  })}

                  <button
                    type="button"
                    className="pagin-btn next"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    aria-label="Page suivante"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Catalogue;
