import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import './Loader.css';

const PRO_LOADING_TEXTS = [
  'Recherche de dons solidaires près de chez vous...',
  'Donnez une seconde vie à vos objets 🌿',
  '1ère plateforme de don 100% gratuit au Maroc 🇲🇦',
  'Préparation de votre espace solidaire...',
];

const Loader = ({ fullScreen = true, onComplete }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Rotation des textes toutes les 2.2s
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % PRO_LOADING_TEXTS.length);
    }, 2200);

    return () => clearInterval(textInterval);
  }, []);

  // Progression fluide de la barre
  useEffect(() => {
    let timeoutId;
    if (onComplete) {
      // Mode Splash Screen : monte à 100% en ~2 secondes puis déclenche onComplete
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            timeoutId = setTimeout(() => {
              onComplete();
            }, 350);
            return 100;
          }
          const increment = Math.floor(Math.random() * 12) + 8;
          return Math.min(prev + increment, 100);
        });
      }, 140);

      return () => {
        clearInterval(interval);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [onComplete]);

  const content = (
    <div className="modern-loader-content">
      <div className="pro-loader-card">
        {/* Halos d'ambiance aux couleurs de la marque */}
        <div className="pro-glow-orb pro-glow-green" />
        <div className="pro-glow-orb pro-glow-terracotta" />

        {/* Badge supérieur */}
        <div className="pro-loader-badge">
          <FaLeaf className="pro-badge-leaf" />
          <span>Plateforme Solidaire & Écologique</span>
        </div>

        {/* Logo officiel Matlou7ch avec respiration douce */}
        <motion.div
          className="pro-logo-container"
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 2.4,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <img
            src="/imageLOGO.png"
            alt="Matlou7ch Logo"
            className="pro-loader-logo-img"
          />
        </motion.div>

        {/* Nom de la marque */}
        <div className="pro-brand-title">
          <span className="pro-brand-matlou">Matlou</span>
          <span className="pro-brand-seven">7ch</span>
        </div>

        {/* Barre de progression moderne */}
        <div className="pro-loader-progress-track">
          {onComplete ? (
            <motion.div
              className="pro-loader-progress-fill"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          ) : (
            <motion.div
              className="pro-loader-progress-indeterminate"
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>

        {/* Textes rotatifs professionnels */}
        <div className="pro-loader-text-box">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="pro-loading-caption"
            >
              {PRO_LOADING_TEXTS[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Points de pulsation discrets */}
        <div className="pro-loader-dots">
          <span className="pro-dot p-dot-1" />
          <span className="pro-dot p-dot-2" />
          <span className="pro-dot p-dot-3" />
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="loader-overlay-modern"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)', transition: { duration: 0.4, ease: 'easeInOut' } }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Loader;
