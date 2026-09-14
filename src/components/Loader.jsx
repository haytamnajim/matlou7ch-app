import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import './Loader.css';

const LOADING_CAPTIONS = [
  'Préparation de votre espace solidaire...',
  'Recherche des dons disponibles près de chez vous...',
  'Donnez une seconde vie à vos objets 🌿',
  '1ère communauté de don 100% gratuit au Maroc 🇲🇦',
];

const Loader = ({ fullScreen = true, onComplete }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Rotation douce des légendes toutes les 2.5s
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % LOADING_CAPTIONS.length);
    }, 2500);

    return () => clearInterval(textInterval);
  }, []);

  // Progression fluide si onComplete est utilisé (mode Splash Screen)
  useEffect(() => {
    let timeoutId;
    if (onComplete) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            timeoutId = setTimeout(() => {
              onComplete();
            }, 300);
            return 100;
          }
          const step = Math.floor(Math.random() * 14) + 10;
          return Math.min(prev + step, 100);
        });
      }, 120);

      return () => {
        clearInterval(interval);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [onComplete]);

  // Rendu Compact (Inline pour composants isolés)
  if (!fullScreen) {
    return (
      <div className="inline-loader-wrap" role="status" aria-live="polite">
        <div className="inline-loader-spinner">
          <div className="inline-spinner-ring" />
          <FaLeaf className="inline-spinner-icon" />
        </div>
        <span className="inline-loader-text">Chargement...</span>
      </div>
    );
  }

  // Rendu Plein Écran : Le Cinématique Signature
  return (
    <motion.div
      className="signature-loader-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        filter: 'blur(6px)',
        transition: { duration: 0.45, ease: 'easeInOut' }
      }}
      role="status"
      aria-live="polite"
    >
      {/* ── Halos lumineux d'ambiance profonde ── */}
      <div className="signature-glow-orb glow-orb-green" />
      <div className="signature-glow-orb glow-orb-terracotta" />

      <div className="signature-loader-center">
        {/* ── Aura vivante derrière le logo ── */}
        <div className="signature-logo-aura-wrap">
          <motion.div
            className="signature-logo-aura"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.35, 0.65, 0.35],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Logo officiel Matlou7ch avec lévitation douce */}
          <motion.div
            className="signature-logo-mark"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src="/imageLOGO.png"
              alt="Matlou7ch Logo"
              className="signature-logo-img"
            />
          </motion.div>
        </div>

        {/* ── Typographie de Marque ── */}
        <div className="signature-brand-name">
          <span className="brand-word-matlou">Matlou</span>
          <span className="brand-word-seven">7ch</span>
        </div>

        <span className="signature-tagline">
          Donner &amp; Partager au Maroc • 100% Gratuit
        </span>

        {/* ── Ligne de Progression Laser Ultra-Fine ── */}
        <div className="signature-laser-track">
          {onComplete ? (
            <motion.div
              className="signature-laser-fill"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          ) : (
            <motion.div
              className="signature-laser-shimmer"
              animate={{
                x: ['-120%', '240%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>

        {/* ── Légende en fondu croisé discret ── */}
        <div className="signature-caption-container">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="signature-caption-text"
            >
              {LOADING_CAPTIONS[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
