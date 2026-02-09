import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdvancedSearch from './AdvancedSearch';
import './Navbar.css';

const MENU_ITEMS = [
  {
    path: '/', label: 'Accueil', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    )
  },
  {
    path: '/catalogue', label: 'Catalogue', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    )
  },
  {
    path: '/notre-adn', label: 'Notre ADN', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5H12z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    )
  },
  {
    path: '/contact', label: 'Contact', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    )
  }
];

function Navbar() {
  const navigate = useNavigate();
  const locationPath = useLocation().pathname;
  const { user } = useAuth();

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    setShowAdvancedSearch(false);
    navigate(`/catalogue?location=${location}&query=${query}&category=${category}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-section">
          <Link to="/" className="logo">
            <img src="/imageLOGO.png" alt="Matlou7ch Logo" className="logo-image" />
            <span className="logo-text">Matlou7ch</span>
          </Link>
        </div>

        <div className="search-bar" onClick={() => setShowAdvancedSearch(true)}>
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

          <Link to="/favoris" className="icon-link" aria-label="Voir les favoris">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22px" height="22px">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>Favoris</span>
          </Link>

          <Link to="/messages" className="icon-link" aria-label="Voir les messages">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22px" height="22px">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu-item ${locationPath === item.path ? 'active' : ''}`}
          >
            <div className="menu-icon-wrapper">
              {item.icon}
            </div>
            <span className="menu-label">{item.label}</span>
          </Link>
        ))}
        <div className="nav-menu-indicator"></div>
      </div>

      {showAdvancedSearch && (
        <AdvancedSearch
          onClose={() => setShowAdvancedSearch(false)}
          location={location}
          setLocation={setLocation}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          handleSearch={handleSearch}
        />
      )}
    </nav>
  );
}

export default Navbar;
