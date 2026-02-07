import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Catalogue.css';

function Catalogue() {
  const [searchParams] = useSearchParams();
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

  // Vérifier si la recherche actuelle est sauvegardée
  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    const currentSearch = `${searchLocation}-${searchQuery}-${searchCategory}`;

    if (savedSearches.includes(currentSearch)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [searchLocation, searchQuery, searchCategory]);

  // Fonction pour basculer l'état de sauvegarde
  const toggleSaveSearch = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    const currentSearch = `${searchLocation}-${searchQuery}-${searchCategory}`;

    if (newSavedState) {
      // Ajouter la recherche
      if (!savedSearches.includes(currentSearch)) {
        savedSearches.push(currentSearch);
      }
    } else {
      // Supprimer la recherche
      const index = savedSearches.indexOf(currentSearch);
      if (index !== -1) {
        savedSearches.splice(index, 1);
      }
    }

    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  };

  // Constantes pour la génération de données fictives
  const LOCATIONS = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès'];
  const CATEGORIES_LIST = ['Vêtements', 'Électronique', 'Meubles', 'Livres', 'Jouets'];
  const AVATAR_COLORS = ['#235347', '#163832', '#8EB69B', '#163832', '#235347'];
  const USER_NAMES = ['Ayoub', 'Sara', 'Mohammed', 'Fatima', 'Karim'];

  // Filtrer les résultats en fonction des critères de recherche
  const filterResults = React.useCallback(() => {
    setLoading(true);

    // Simuler un appel API avec un délai
    setTimeout(() => {
      // Ici, vous feriez normalement un appel à votre API
      // Pour l'exemple, nous utilisons des données fictives
      const dummyItems = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Article ${i + 1}`,
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        category: CATEGORIES_LIST[Math.floor(Math.random() * CATEGORIES_LIST.length)],
        time: `Il y a ${Math.floor(Math.random() * 24)} heures`,
        image: '',
        avatar: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
        user: {
          name: USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)]
        }
      }));

      // Filtrer les résultats en fonction des critères de recherche
      const filteredItems = dummyItems.filter(item => {
        const matchesLocation = !searchLocation || item.location.toLowerCase().includes(searchLocation.toLowerCase());
        const matchesQuery = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !searchCategory || item.category.toLowerCase().includes(searchCategory.toLowerCase());
        return matchesLocation && matchesQuery && matchesCategory;
      });

      setResults(filteredItems);
      setLoading(false);
      setCurrentPage(1);
    }, 500); // Délai de 500ms pour simuler le chargement
  }, [searchLocation, searchQuery, searchCategory]);

  // Charger les résultats au chargement initial et lors des changements de filtres
  useEffect(() => {
    filterResults();
  }, []); // Exécuter uniquement au montage du composant

  // Fonction pour ajouter/supprimer des favoris
  const toggleFavorite = React.useCallback((itemId, e) => {
    if (e) e.preventDefault(); // Vérifier si e existe avant d'appeler preventDefault

    if (!user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/connexion', {
        state: { from: { pathname: '/catalogue' } }
      });
    } else {
      // Logique existante pour ajouter/supprimer des favoris
      if (favorites.includes(itemId)) {
        setFavorites(favorites.filter(id => id !== itemId));
      } else {
        setFavorites([...favorites, itemId]);
      }
    }
  }, [user, navigate, favorites]);

  // Fonction pour gérer la recherche
  const handleSearch = () => {
    filterResults();
  };

  // Calculer les éléments à afficher pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  // Après le calcul de currentItems, ajoutez cette fonction pour grouper par catégorie
  const groupItemsByCategory = (items) => {
    const grouped = {};

    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    return grouped;
  };

  const groupedItems = groupItemsByCategory(currentItems);

  return (
    <div className="search-results-page">
      <div className="advanced-search-bar">
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Ville, quartier..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Que cherchez-vous ?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            <option value="Vêtements">Vêtements</option>
            <option value="Électronique">Électronique</option>
            <option value="Meubles">Meubles</option>
            <option value="Livres">Livres</option>
            <option value="Jouets">Jouets</option>
          </select>
          <button className="search-button" onClick={handleSearch}>Rechercher</button>
        </div>
      </div>

      <div className="search-header">
        <div className="search-results-count">
          {results.length} résultats
        </div>
        <button
          className={`save-search-button ${isSaved ? 'saved' : ''}`}
          onClick={toggleSaveSearch}
        >
          {isSaved ? 'Recherche sauvegardée' : 'Sauvegarder ma recherche'}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des résultats...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="no-results">
          <svg className="no-results-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#aaa">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <p>Aucun résultat ne correspond à votre recherche.</p>
          <button onClick={() => {
            setSearchLocation('');
            setSearchQuery('');
            setSearchCategory('');
            filterResults();
          }}>Réinitialiser les filtres</button>
        </div>
      ) : (
        <>
          {Object.keys(groupedItems).map(category => (
            <section key={category} className="category-section">
              <div className="section-header">
                <h2 className="section-title">{category}</h2>
                <Link to={`/catalogue?category=${encodeURIComponent(category)}`} className="see-all-button">
                  Voir tout
                </Link>
              </div>
              <div className="product-grid">
                {groupedItems[category].map(item => (
                  <div key={item.id} className="product-card">
                    <Link to={`/produit/${item.id}`} className="product-link">
                      <div className="product-image-container">
                        <div className="product-avatar" style={{ backgroundColor: item.avatar }}>
                          {item.user.name.charAt(0)}
                        </div>
                        <div className="product-user-name">{item.user.name}</div>
                        {item.image && <img src={item.image} alt={item.title} className="product-image" />}
                        {!item.image && <div className="product-image" style={{ backgroundColor: '#f0f0f0' }}></div>}
                        <button
                          className="favorite-button"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(item.id, e);  // Passer l'événement e à la fonction
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={favorites.includes(item.id) ? "var(--primary-color)" : "none"}
                            stroke={favorites.includes(item.id) ? "var(--primary-color)" : "white"}
                            width="24px"
                            height="24px"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      <div className="product-info">
                        <h3 className="product-title">{item.title}</h3>
                        <p className="product-location">{item.location}</p>
                        <p className="product-time">{item.time}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                «
              </button>
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>

              {[...Array(totalPages)].map((_, i) => {
                // Afficher seulement quelques pages autour de la page actuelle
                if (
                  i === 0 ||
                  i === totalPages - 1 ||
                  (i >= currentPage - 2 && i <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={i}
                      className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  );
                } else if (
                  i === currentPage - 3 ||
                  i === currentPage + 3
                ) {
                  return <span key={i} className="pagination-ellipsis">...</span>;
                }
                return null;
              })}

              <button
                className="pagination-button"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Catalogue;
