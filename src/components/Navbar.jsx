import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { user, profile } = useAuth(); // Destructure profile
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

  // Helper to get initial
  const getInitial = () => {
    if (profile?.name) return profile.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return '?';
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-section">
          <Link to="/" className="logo">
            <div className="logo-icon">M</div>
            <span className="logo-text">Matlou7ch.org</span>
          </Link>
        </div>

        <div className="search-bar" onClick={handleSearchClick}>
          <input type="text" placeholder="chercher sur des objets" readOnly />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>

        <div className="nav-actions">
          <Link to="/post-ad" className="donate-button">+ DONNER</Link>

          <Link to="/favoris" className="icon-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#888" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>Favoris</span>
          </Link>

          <Link to="/messages" className="icon-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#888" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
            <span>Messages</span>
          </Link>

          {user ? (
            <Link to="/profile" className="nav-profile-pill">
              <div className="profile-pill-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="profile-pill-text">Profile</span>
            </Link>
          ) : (
            <Link to="/connexion" className="nav-login-btn">Se connecter</Link>
          )}
        </div>
      </div>

      <div className="nav-menu">
        <Link to="/" className={`menu-item ${window.location.pathname === '/' ? 'active' : ''}`}>
          <div className="menu-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <span className="menu-label">Accueil</span>
        </Link>
        <Link to="/catalogue" className={`menu-item ${window.location.pathname === '/catalogue' ? 'active' : ''}`}>
          <div className="menu-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <span className="menu-label">Catalogue</span>
        </Link>
        <Link to="/notre-adn" className={`menu-item ${window.location.pathname === '/notre-adn' ? 'active' : ''}`}>
          <div className="menu-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5H12z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="menu-label">Notre ADN</span>
        </Link>
        <Link to="/contact" className={`menu-item ${window.location.pathname === '/contact' ? 'active' : ''}`}>
          <div className="menu-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <span className="menu-label">Contact</span>
        </Link>
        {/* Animated Background Notch */}
        <div className="nav-menu-indicator"></div>
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
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
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
                <span className="search-icon" style={{ backgroundColor: '#ff5722' }}>A</span>
                <span className="search-text">Ada</span>
              </div>
              <div className="recent-search-item">
                <span className="search-icon" style={{ backgroundColor: '#4CAF50' }}>J</span>
                <span className="search-text">Juca</span>
              </div>
              <div className="recent-search-item">
                <span className="search-icon" style={{ backgroundColor: '#2196F3' }}>M</span>
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
