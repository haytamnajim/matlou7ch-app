import React from 'react';
import './Loader.css';

const Loader = ({ text = "Matlou7ch", fullScreen = true }) => {
    const content = (
        <div className="loader">
            <svg className="loader-svg" viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle
                    className="dash"
                    cx="50"
                    cy="50"
                    r="45"
                />
                {/* Animated Circle */}
                <circle
                    className="spin"
                    cx="50"
                    cy="50"
                    r="45"
                />
                {/* Custom Text */}
                <text
                    x="50"
                    y="50"
                    className="loader-text"
                >
                    {text}
                </text>
            </svg>
            <div className="loading-text">Chargement...</div>
        </div>
    );

    if (fullScreen) {
        return <div className="loader-overlay">{content}</div>;
    }

    return content;
};

export default Loader;
