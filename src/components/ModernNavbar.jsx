import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  FaPlus,
  FaHeart,
  FaCommentDots,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaListUl,
  FaChevronDown,
  FaShieldAlt,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import './ModernNavbar.css';

const NAV_LINKS = [
  { name: 'Accueil', path: '/' },
  { name: 'Catalogue', path: '/catalogue' },
  { name: 'Notre ADN', path: '/notre-adn' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, profile, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Détection du scroll pour effet glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fermer les menus lors d'un changement de page
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  const displayName = profile?.name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Mon Compte';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className={`modern-navbar-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="modern-navbar-container">
        {/* Logo */}
        <Link to="/" className="modern-navbar-logo" aria-label="Retour à l'accueil Matlou7ch">
          <img src="/imageLOGO.png" alt="Matlou7ch Logo" className="navbar-logo-img" />
          <span className="navbar-logo-name">Matlou7ch</span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="modern-desktop-nav" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`desktop-nav-item ${isActive ? 'active' : ''}`}
              >
                {link.name}
                {isActive && <span className="nav-active-indicator" />}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Profil à droite */}
        <div className="modern-navbar-actions">
          {/* Toggle Theme */}
          <button 
            type="button" 
            className="icon-action-btn theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Basculer le thème"
            title="Mode sombre / clair"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>

          {/* Bouton Donner */}
          <Link to="/post-ad" className="btn-donner-navbar">
            <FaPlus className="donner-plus-icon" />
            <span>Donner</span>
          </Link>

          {/* Si utilisateur connecté */}
          {user ? (
            <div className="auth-user-section">
              {/* Favoris */}
              <Link
                to="/favoris"
                className={`icon-action-btn ${location.pathname === '/favoris' ? 'active' : ''}`}
                title="Mes favoris"
                aria-label="Mes favoris"
              >
                <FaHeart />
              </Link>

              {/* Messages */}
              <Link
                to="/messages"
                className={`icon-action-btn ${location.pathname === '/messages' ? 'active' : ''}`}
                title="Mes messages"
                aria-label="Mes messages"
              >
                <FaCommentDots />
              </Link>

              {/* Menu Profil Déroulant */}
              <div className="profile-dropdown-wrapper" ref={dropdownRef}>
                <button
                  type="button"
                  className={`profile-pill-trigger ${isProfileOpen ? 'open' : ''}`}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <div className="user-avatar-badge">{initial}</div>
                  <span className="user-name-label">{displayName}</span>
                  <FaChevronDown className={`chevron-icon ${isProfileOpen ? 'rotate' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="profile-dropdown-menu">
                    <div className="dropdown-user-header">
                      <p className="dropdown-user-name">{displayName}</p>
                      <p className="dropdown-user-email">{user.email}</p>
                    </div>

                    <div className="dropdown-divider" />

                    <Link to="/profile" className="dropdown-menu-link" onClick={() => setIsProfileOpen(false)}>
                      <FaUser className="dropdown-icon" /> Mon Profil
                    </Link>

                    <Link to="/mes-annonces" className="dropdown-menu-link" onClick={() => setIsProfileOpen(false)}>
                      <FaListUl className="dropdown-icon" /> Mes Annonces
                    </Link>

                    <Link to="/parametres" className="dropdown-menu-link" onClick={() => setIsProfileOpen(false)}>
                      <FaCog className="dropdown-icon" /> Paramètres
                    </Link>

                    {isAdmin && (
                      <Link to="/admin" className="dropdown-menu-link admin-highlight" onClick={() => setIsProfileOpen(false)}>
                        <FaShieldAlt className="dropdown-icon" /> Administration
                      </Link>
                    )}

                    <div className="dropdown-divider" />

                    <button type="button" className="dropdown-logout-btn" onClick={handleLogout}>
                      <FaSignOutAlt className="dropdown-icon" /> Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Si visiteur non connecté */
            <div className="guest-actions-section">
              <Link to="/connexion" className="navbar-login-link">
                Se connecter
              </Link>
              <Link to="/inscription" className="navbar-register-btn">
                S'inscrire
              </Link>
            </div>
          )}

          {/* Bouton Hamburger Mobile */}
          <button
            type="button"
            className={`navbar-burger-btn ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </div>

      {/* Menu Drawer Mobile */}
      <div className={`modern-mobile-drawer ${isMenuOpen ? 'show' : ''}`}>
        <div className="mobile-drawer-inner">
          <nav className="mobile-nav-list">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-nav-item ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mobile-drawer-divider" />

          <div className="mobile-actions-stack">
            <Link to="/post-ad" className="mobile-btn-donner" onClick={() => setIsMenuOpen(false)}>
              <FaPlus /> Donner un objet gratuitement
            </Link>

            {user ? (
              <div className="mobile-user-links">
                <Link to="/profile" className="mobile-user-link" onClick={() => setIsMenuOpen(false)}>
                  <FaUser /> Mon Profil ({displayName})
                </Link>
                <Link to="/favoris" className="mobile-user-link" onClick={() => setIsMenuOpen(false)}>
                  <FaHeart /> Mes Favoris
                </Link>
                <Link to="/messages" className="mobile-user-link" onClick={() => setIsMenuOpen(false)}>
                  <FaCommentDots /> Mes Messages
                </Link>
                <Link to="/mes-annonces" className="mobile-user-link" onClick={() => setIsMenuOpen(false)}>
                  <FaListUl /> Mes Annonces
                </Link>
                <button type="button" className="mobile-logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt /> Se déconnecter
                </button>
              </div>
            ) : (
              <div className="mobile-guest-links">
                <Link to="/connexion" className="mobile-login-btn" onClick={() => setIsMenuOpen(false)}>
                  Se connecter
                </Link>
                <Link to="/inscription" className="mobile-register-btn" onClick={() => setIsMenuOpen(false)}>
                  Créer un compte
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModernNavbar;
