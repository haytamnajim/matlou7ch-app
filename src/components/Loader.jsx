import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const loadingTexts = [
    "Recherche de dons près de chez vous...",
    "Préparation de votre espace...",
    "Matlou7ch arrive bientôt...",
    "Un peu de patience, c'est pour la bonne cause..."
];

const Loader = ({ fullScreen = true }) => {
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % loadingTexts.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const content = (
        <div className="modern-loader-content">
            <motion.div
                className="loader-logo-wrapper"
                animate={{
                    scale: [1, 1.08, 1],
                    y: [0, -5, 0]
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                }}
            >
                <img src="/imageLOGO.png" alt="Matlou7ch" className="loader-logo" />
            </motion.div>
            
            <div className="loader-bar-container">
                <motion.div 
                    className="loader-bar"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="loader-text-container">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={textIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="modern-loading-text"
                    >
                        {loadingTexts[textIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );

    if (fullScreen) {
        return (
            <motion.div 
                className="loader-overlay-modern"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {content}
            </motion.div>
        );
    }

    return content;
};

export default Loader;
