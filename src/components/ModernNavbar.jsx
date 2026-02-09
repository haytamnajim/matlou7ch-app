import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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

    return (
        <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="modern-navbar-container">
                {/* Logo Section */}
                <Link to="/" className="modern-logo" onClick={() => setIsMenuOpen(false)}>
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
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Action Section */}
                <div className="modern-nav-actions">
                    <Link to="/post-ad" className="modern-donner-button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>Donner</span>
                    </Link>

                    {user ? (
                        <Link to="/profile" className="modern-profile-link" onClick={() => setIsMenuOpen(false)}>
                            <div className="modern-profile-avatar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <span>Profil</span>
                        </Link>
                    ) : (
                        <Link to="/connexion" className="modern-cta-button">
                            S'inscrire
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button className={`modern-menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`modern-mobile-menu ${isMenuOpen ? 'show' : ''}`}>
                <div className="modern-mobile-links">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`modern-mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/post-ad" className="modern-mobile-donner" onClick={() => setIsMenuOpen(false)}>
                        Donner un objet
                    </Link>
                    {user ? (
                        <Link to="/profile" className="modern-mobile-link" onClick={() => setIsMenuOpen(false)}>
                            Profil
                        </Link>
                    ) : (
                        <Link to="/connexion" className="modern-mobile-cta" onClick={() => setIsMenuOpen(false)}>
                            S'inscrire
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default ModernNavbar;
