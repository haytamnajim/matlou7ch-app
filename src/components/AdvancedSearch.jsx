import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaTags, FaTimes, FaHistory } from 'react-icons/fa';

function AdvancedSearch({
    onClose,
    location,
    setLocation,
    query,
    setQuery,
    category,
    setCategory,
    handleSearch
}) {
    // Liste des catégories pour un select plus moderne
    const categories = [
        "Vêtements & Mode",
        "Électronique & Multimédia",
        "Meubles & Mobilier",
        "Maison & Décoration",
        "Livres & Scolaire",
        "Jeux & Loisirs",
        "Autre"
    ];

    return (
        <AnimatePresence>
            <motion.div 
                className="advanced-search-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div 
                    className="advanced-search-container"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="advanced-search-header">
                        <h3>Recherche avancée</h3>
                        <button className="close-button" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                    
                    <div className="advanced-search-form">
                        <div className="search-field">
                            <label><FaMapMarkerAlt className="field-icon" /> Où recherchez-vous ?</label>
                            <div className="input-with-clear">
                                <input
                                    type="text"
                                    placeholder="Casablanca, Rabat, Marrakech..."
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                {location && (
                                    <button className="clear-input" onClick={() => setLocation('')}><FaTimes /></button>
                                )}
                            </div>
                        </div>

                        <div className="search-field">
                            <label><FaSearch className="field-icon" /> Que recherchez-vous ?</label>
                            <input
                                type="text"
                                placeholder="Canapé, smartphone, livre..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        <div className="search-field">
                            <label><FaTags className="field-icon" /> Quelle catégorie ?</label>
                            <div className="custom-select-wrapper">
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="modern-select"
                                >
                                    <option value="">Toutes les catégories</option>
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button className="search-submit-button" onClick={() => {
                            handleSearch();
                            onClose();
                        }}>
                            <FaSearch style={{ marginRight: '8px' }} />
                            <span>Voir les annonces</span>
                        </button>
                    </div>

                    <div className="recent-searches">
                        <p className="recent-searches-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', fontWeight: '600' }}><FaHistory /> Recherches récentes</p>
                        <div className="recent-searches-list" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <div className="recent-search-item" onClick={() => setQuery('Table')} style={{ cursor: 'pointer', padding: '6px 14px', background: '#f1f5f9', borderRadius: '50px', fontSize: '0.85rem' }}>
                                <span className="search-text">Table</span>
                            </div>
                            <div className="recent-search-item" onClick={() => setQuery('Livre')} style={{ cursor: 'pointer', padding: '6px 14px', background: '#f1f5f9', borderRadius: '50px', fontSize: '0.85rem' }}>
                                <span className="search-text">Livre</span>
                            </div>
                            <div className="recent-search-item" onClick={() => setLocation('Casablanca')} style={{ cursor: 'pointer', padding: '6px 14px', background: '#f1f5f9', borderRadius: '50px', fontSize: '0.85rem' }}>
                                <span className="search-text">Casablanca</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default AdvancedSearch;
