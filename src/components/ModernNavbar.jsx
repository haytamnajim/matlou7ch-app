import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './ModernNavbar.css';

const NAV_LINKS = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projets', path: '/projects' },
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
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="10" fill="url(#logo-gradient)" />
                        <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white" />
                        <circle cx="20" cy="20" r="4" fill="rgba(255,255,255,0.8)" />
                        <defs>
                            <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#859F3D" />
                                <stop offset="1" stopColor="#31511E" />
                            </linearGradient>
                        </defs>
                    </svg>
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
                            Commencer
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
                    {user ? (
                        <Link to="/profile" className="modern-mobile-link" onClick={() => setIsMenuOpen(false)}>
                            Profil
                        </Link>
                    ) : (
                        <Link to="/connexion" className="modern-mobile-cta" onClick={() => setIsMenuOpen(false)}>
                            Commencer
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default ModernNavbar;
