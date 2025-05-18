import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './Catalogue.css';

function Catalogue() {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location') || 'Paris 10 (75) - 100 km';
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || 'Ameublement';
  
  // État pour gérer les favoris
  const [favorites, setFavorites] = useState([]);
  
  // État pour la recherche avancée
  const [searchLocation, setSearchLocation] = useState(location);
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchCategory, setSearchCategory] = useState(category);
  
  // État pour les résultats
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Base de données simulée
  const databaseItems = [
    {
      id: 'etagere1',
      title: 'Petite étagère en bois',
      location: 'Antony (Châtenay-Malabry)',
      image: 'https://via.placeholder.com/200x180?text=Etagere',
      date: 'il y a 20 minutes',
      user: { name: 'Ayoub', avatar: 'A', color: '#F44336' },
      category: 'Ameublement'
    },
    {
      id: 'fauteuil1',
      title: 'Fauteuil ancien',
      location: 'Antony (Châtenay-Malabry)',
      image: 'https://via.placeholder.com/200x180?text=Fauteuil',
      date: 'il y a 2 heures',
      user: { name: 'Ousama', avatar: 'O', color: '#4CAF50' },
      category: 'Ameublement'
    },
    {
      id: 'table1',
      title: 'Table basse en bois',
      location: 'Antony (Châtenay-Malabry)',
      image: 'https://via.placeholder.com/200x180?text=Table',
      date: 'il y a 3 heures',
      user: { name: 'Sahra', avatar: 'S', color: '#3F51B5' },
      category: 'Ameublement'
    },
    {
      id: 'lampe1',
      title: 'Lampe de bureau design',
      location: 'Casablanca, Maarif',
      image: 'https://via.placeholder.com/200x180?text=Lampe',
      date: 'il y a 5 heures',
      user: { name: 'Karim', avatar: 'K', color: '#FF9800' },
      category: 'Décoration'
    },
    {
      id: 'canape1',
      title: 'Canapé 3 places gris',
      location: 'Rabat, Agdal',
      image: 'https://via.placeholder.com/200x180?text=Canape',
      date: 'il y a 1 jour',
      user: { name: 'Leila', avatar: 'L', color: '#9C27B0' },
      category: 'Ameublement'
    },
    {
      id: 'frigo1',
      title: 'Réfrigérateur Samsung',
      location: 'Marrakech, Guéliz',
      image: 'https://via.placeholder.com/200x180?text=Frigo',
      date: 'il y a 2 jours',
      user: { name: 'Hassan', avatar: 'H', color: '#795548' },
      category: 'Électroménager'
    },
    {
      id: 'veste1',
      title: 'Veste en cuir taille M',
      location: 'Tanger, Centre',
      image: 'https://via.placeholder.com/200x180?text=Veste',
      date: 'il y a 3 jours',
      user: { name: 'Fatima', avatar: 'F', color: '#E91E63' },
      category: 'Vêtements'
    },
    {
      id: 'miroir1',
      title: 'Miroir mural doré',
      location: 'Fès, Médina',
      image: 'https://via.placeholder.com/200x180?text=Miroir',
      date: 'il y a 4 jours',
      user: { name: 'Youssef', avatar: 'Y', color: '#009688' },
      category: 'Décoration'
    },
    {
      id: 'machine1',
      title: 'Machine à laver LG',
      location: 'Agadir, Talborjt',
      image: 'https://via.placeholder.com/200x180?text=Machine',
      date: 'il y a 5 jours',
      user: { name: 'Nadia', avatar: 'N', color: '#673AB7' },
      category: 'Électroménager'
    }
  ];

  // Fonction pour filtrer les résultats
  const filterResults = () => {
    setLoading(true);
    
    // Simuler un délai de chargement
    setTimeout(() => {
      let filteredItems = [...databaseItems];
      
      // Filtrer par catégorie si sélectionnée
      if (searchCategory) {
        filteredItems = filteredItems.filter(item => 
          item.category.toLowerCase() === searchCategory.toLowerCase()
        );
      }
      
      // Filtrer par requête de recherche
      if (searchQuery) {
        filteredItems = filteredItems.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Filtrer par localisation
      if (searchLocation && searchLocation !== 'Paris 10 (75) - 100 km') {
        filteredItems = filteredItems.filter(item => 
          item.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
      }
      
      setResults(filteredItems);
      setLoading(false);
      setCurrentPage(1);
    }, 500); // Délai de 500ms pour simuler le chargement
  };

  // Charger les résultats au chargement initial et lors des changements de filtres
  useEffect(() => {
    filterResults();
  }, []); // Exécuter uniquement au montage du composant

  // Fonction pour ajouter/supprimer des favoris
  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  // Fonction pour gérer la recherche
  const handleSearch = () => {
    filterResults();
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="search-results-page">
      {/* Barre de recherche avancée */}
      <div className="advanced-search-bar">
        <div className="search-inputs">
          <input 
            type="text" 
            placeholder="Que recherchez-vous ?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Où cherchez-vous ?" 
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <select 
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="">Toutes catégories</option>
            <option value="Ameublement">Ameublement</option>
            <option value="Électroménager">Électroménager</option>
            <option value="Vêtements">Vêtements</option>
            <option value="Décoration">Décoration</option>
          </select>
        </div>
        <button className="search-button" onClick={handleSearch}>
          Rechercher
        </button>
      </div>

      <div className="search-results-count">
        {results.length} résultats
      </div>

      {/* Affichage du chargement */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des résultats...</p>
        </div>
      ) : (
        <>
          {/* Grille de résultats avec le style de la page d'accueil */}
          <div className="product-grid">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div className="product-card" key={item.id}>
                  <Link to={`/produit/${item.id}`} className="product-link">
                    <div className="product-avatar" style={{ backgroundColor: item.user.color }}>
                      {item.user.avatar}
                    </div>
                    <div className="product-image-container">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="product-image"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = `https://via.placeholder.com/200x180?text=${encodeURIComponent(item.title)}`;
                        }}
                      />
                      <button 
                        className={`favorite-button ${favorites.includes(item.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(item.id);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={favorites.includes(item.id) ? "red" : "white"} width="24px" height="24px">
                          <path d="M0 0h24v24H0z" fill="none"/>
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="product-info">
                      <h3 className="product-title">{item.title}</h3>
                      <p className="product-location">{item.location}</p>
                      <p className="product-time">{item.date}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>Aucun résultat ne correspond à votre recherche.</p>
                <button onClick={() => {
                  setSearchQuery('');
                  setSearchLocation('');
                  setSearchCategory('');
                  filterResults();
                }}>Réinitialiser les filtres</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Catalogue;
