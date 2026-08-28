import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaHeart, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './ModernNavbar.css';

const NAV_LINKS = [
    { name: 'Accueil', path: '/' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Contact', path: '/contact' },
];

const ModernNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Keyboard navigation for menu
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsMenuOpen(false);
            setIsProfileOpen(false);
        }
    };

    return (
        <nav 
            className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`} 
            role="navigation" 
            aria-label="Navigation principale"
            onKeyDown={handleKeyDown}
        >
            <div className="modern-navbar-container">
                {/* Logo Section */}
                <Link to="/" className="modern-logo" onClick={() => setIsMenuOpen(false)} tabIndex={0}>
                    <img src="/imageLOGO.png" alt="Matlou7ch Logo" className="modern-logo-image" />
                    <span className="modern-logo-text">Matlou7ch</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="modern-nav-links">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`modern-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            tabIndex={0}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Action Section */}
                <div className="modern-nav-actions">
                    <Link to="/post-ad" className="modern-donner-button" tabIndex={0}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>Donner</span>
                    </Link>

                    {user ? (
                        <div 
                            className="modern-profile-link" 
                            onClick={() => { setIsMenuOpen(false); setIsProfileOpen(true); }} 
                            style={{ cursor: 'pointer' }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    setIsProfileOpen(true);
                                }
                            }}
                        >
                            <div className="modern-profile-avatar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <span>Profil</span>
                        </div>
                    ) : null}

                    {/* Mobile Menu Toggle */}
                    <button 
                        className={`modern-menu-toggle ${isMenuOpen ? 'open' : ''}`} 
                        onClick={toggleMenu} 
                        aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                        aria-expanded={isMenuOpen}
                        tabIndex={0}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div 
                className={`modern-mobile-menu ${isMenuOpen ? 'show' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Menu mobile"
            >
                <div className="modern-mobile-links">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`modern-mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                            tabIndex={0}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/post-ad" className="modern-mobile-donner" onClick={() => setIsMenuOpen(false)} tabIndex={0}>
                        Donner un objet
                    </Link>
                    {user ? (
                        <div 
                            className="modern-mobile-link" 
                            onClick={() => { setIsMenuOpen(false); setIsProfileOpen(true); }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setIsMenuOpen(false);
                                    setIsProfileOpen(true);
                                }
                            }}
                        >
                            Profil
                        </div>
                    ) : (
                        <Link to="/connexion" className="modern-mobile-cta" onClick={() => setIsMenuOpen(false)} tabIndex={0}>
                            S'inscrire
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default ModernNavbar;
