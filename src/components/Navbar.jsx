import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const handleDonateClick = () => {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (!user) {
      navigate('/connexion', { state: { from: { pathname: '/post-ad' } } });
    } else {
      navigate('/post-ad');
    }
  };

  const handleSearchClick = () => {
    setShowAdvancedSearch(true);
  };

  const handleCloseSearch = () => {
    setShowAdvancedSearch(false);
  };

  const handleSearch = () => {
    // Logique de recherche
    console.log("Recherche avec:", { location, query, category });
    setShowAdvancedSearch(false);
    // Rediriger vers la page de résultats
    navigate(`/catalogue?location=${location}&query=${query}&category=${category}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-section">
          <Link to="/" className="logo">Matlou7ch.org</Link>
        </div>
        
        <div className="search-bar" onClick={handleSearchClick}>
          <input type="text" placeholder="chercher sur des objets" readOnly />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>
        
        <div className="nav-actions">
          <Link to="/post-ad" className="donate-button">+ DONNER</Link>
          <Link to="/favoris" className="icon-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#888" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>Favoris</span>
          </Link>
          <Link to="/messages" className="icon-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#888" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
            <span>Messages</span>
          </Link>
          <Link to="/profile" className="user-avatar">H</Link>
        </div>
      </div>
      
      <div className="nav-menu">
        <Link to="/" className="menu-item">Accueil</Link>
        <Link to="/catalogue" className="menu-item">Catalogue</Link>
        <Link to="/notre-adn" className="menu-item">Notre ADN</Link>
        <Link to="/contact" className="menu-item">Contact</Link>
      </div>

      {showAdvancedSearch && (
        <div className="advanced-search-overlay">
          <div className="advanced-search-container">
            <div className="advanced-search-header">
              <h3>Recherche avancée</h3>
              <button className="close-button" onClick={handleCloseSearch}>×</button>
            </div>
            <div className="advanced-search-form">
              <div className="search-field">
                <label>Où recherchez-vous ?</label>
                <div className="input-with-clear">
                  <input 
                    type="text" 
                    placeholder="Paris 10 - 100 km" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {location && (
                    <button className="clear-input" onClick={() => setLocation('')}>×</button>
                  )}
                </div>
              </div>
              
              <div className="search-field">
                <label>Que recherchez-vous ?</label>
                <input 
                  type="text" 
                  placeholder="Canapé, frigidaire, livre..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              
              <div className="search-field">
                <label>Quelle catégorie ?</label>
                <div className="input-with-clear">
                  <input 
                    type="text" 
                    placeholder="Ameublement" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  {category && (
                    <button className="clear-input" onClick={() => setCategory('')}>×</button>
                  )}
                </div>
              </div>
              
              <button className="search-submit-button" onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                Rechercher ({Math.floor(Math.random() * 2000)} dons)
              </button>
            </div>
            
            <div className="recent-searches">
              <div className="recent-search-item">
                <span className="search-icon">S</span>
                <span className="search-text">sion</span>
              </div>
              <div className="recent-search-item">
                <span className="search-icon" style={{backgroundColor: '#ff5722'}}>A</span>
                <span className="search-text">Ada</span>
              </div>
              <div className="recent-search-item">
                <span className="search-icon" style={{backgroundColor: '#4CAF50'}}>J</span>
                <span className="search-text">Juca</span>
              </div>
              <div className="recent-search-item">
                <span className="search-icon" style={{backgroundColor: '#2196F3'}}>M</span>
                <span className="search-text">Mini88</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

