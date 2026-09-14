import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

const DROPDOWN_ITEMS = [
  { to: '/profile', icon: <FaUser />, label: 'Mon Profil' },
  { to: '/mes-annonces', icon: <FaListUl />, label: 'Mes Annonces' },
  { to: '/parametres', icon: <FaCog />, label: 'Paramètres' },
];

const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const { user, profile, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Animated pill indicator
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector('.desktop-nav-item.active');
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;
      setPillStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

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

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: 'easeOut' } },
    exit:   { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.15 } })
  };

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 340, damping: 32 } },
    exit:   { x: '100%', transition: { duration: 0.22, ease: 'easeIn' } }
  };

  return (
    <header className={`modern-navbar-header ${isScrolled ? 'is-scrolled' : ''} ${isHome ? 'on-home-page' : ''}`}>
      <div className="modern-navbar-container">
        {/* Logo */}
        <Link to="/" className="modern-navbar-logo" aria-label="Retour à l'accueil Matlou7ch">
          <div className="navbar-logo-glow" />
          <img src="/imageLOGO.png" alt="Matlou7ch Logo" className="navbar-logo-img" />
          <span className="navbar-logo-name">
            <span className="logo-word-matlou">Matlou</span>
            <span className="logo-word-seven">7ch</span>
          </span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="modern-desktop-nav" aria-label="Navigation principale" ref={navRef}>
          {/* Pill indicator animé */}
          <span
            className="nav-pill-indicator"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
            }}
          />
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`desktop-nav-item ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions droite */}
        <div className="modern-navbar-actions">
          {/* Toggle Theme */}
          <button
            type="button"
            className="icon-action-btn theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Basculer le thème"
            title="Mode sombre / clair"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Bouton Donner avec badge NEW */}
          <Link to="/post-ad" className="btn-donner-navbar">
            <FaPlus className="donner-plus-icon" />
            <span>Donner</span>
            <span className="donner-new-badge">NEW</span>
          </Link>

          {/* Utilisateur connecté */}
          {user ? (
            <div className="auth-user-section">
              <Link
                to="/favoris"
                className={`icon-action-btn ${location.pathname === '/favoris' ? 'active' : ''}`}
                title="Mes favoris"
                aria-label="Mes favoris"
              >
                <FaHeart />
              </Link>

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

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="profile-dropdown-menu"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="dropdown-user-header">
                        <div className="dropdown-user-avatar">{initial}</div>
                        <div>
                          <p className="dropdown-user-name">{displayName}</p>
                          <p className="dropdown-user-email">{user.email}</p>
                        </div>
                      </div>

                      <div className="dropdown-divider" />

                      {DROPDOWN_ITEMS.map((item, i) => (
                        <motion.div key={item.to} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                          <Link
                            to={item.to}
                            className="dropdown-menu-link"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <span className="dropdown-icon">{item.icon}</span>
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}

                      {isAdmin && (
                        <motion.div custom={DROPDOWN_ITEMS.length} variants={itemVariants} initial="hidden" animate="visible">
                          <Link
                            to="/admin"
                            className="dropdown-menu-link admin-highlight"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <span className="dropdown-icon"><FaShieldAlt /></span>
                            Administration
                          </Link>
                        </motion.div>
                      )}

                      <div className="dropdown-divider" />

                      <motion.div custom={DROPDOWN_ITEMS.length + 1} variants={itemVariants} initial="hidden" animate="visible">
                        <button type="button" className="dropdown-logout-btn" onClick={handleLogout}>
                          <span className="dropdown-icon"><FaSignOutAlt /></span>
                          Se déconnecter
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="guest-actions-section">
              <Link to="/connexion" className="navbar-login-link">Se connecter</Link>
              <Link to="/inscription" className="navbar-register-btn">S'inscrire</Link>
            </div>
          )}

          {/* Hamburger Mobile */}
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

      {/* Backdrop Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Drawer Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="modern-mobile-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-drawer-inner">
              <div className="mobile-drawer-header">
                <Link to="/" className="modern-navbar-logo" onClick={() => setIsMenuOpen(false)}>
                  <img src="/imageLOGO.png" alt="Matlou7ch" className="navbar-logo-img" />
                  <span className="navbar-logo-name">Matlou7ch</span>
                </Link>
                <button
                  className="mobile-close-btn"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Fermer le menu"
                >
                  ✕
                </button>
              </div>

              <nav className="mobile-nav-list">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`mobile-nav-item ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                    {location.pathname === link.path && <span className="mobile-active-dot" />}
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

                {/* Theme toggle mobile */}
                <button
                  type="button"
                  className="mobile-theme-btn"
                  onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                >
                  {theme === 'dark' ? <><FaSun /> Mode Clair</> : <><FaMoon /> Mode Sombre</>}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ModernNavbar;
