import React from 'react';

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
    return (
        <div className="advanced-search-overlay">
            <div className="advanced-search-container">
                <div className="advanced-search-header">
                    <h3>Recherche avancée</h3>
                    <button className="close-button" onClick={onClose}>×</button>
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
    );
}

export default AdvancedSearch;
