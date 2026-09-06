import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import './Loader.css';

const FULL_TEXT = 'Matlou7ch';
// "Matlou" (0..5) en vert sauge #62825D, "7ch" (6..8) en terracotta chaleureux #BC7C4E

const Loader = ({ fullScreen = true, onComplete }) => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (displayedCount < FULL_TEXT.length) {
      // Vitesse d'écriture naturelle et humaine avec micro-variations
      const humanDelays = [200, 150, 160, 130, 150, 180, 210, 150, 190];
      const delay = humanDelays[displayedCount] || 160;

      timeoutId = setTimeout(() => {
        setDisplayedCount((prev) => prev + 1);
      }, delay);
    } else {
      // Écriture terminée : on marque l'état complété
      setIsCompleted(true);

      if (onComplete) {
        // Laisse le temps d'admirer le mot complet et le slogan avant de faire la transition
        timeoutId = setTimeout(() => {
          onComplete();
        }, 750);
      } else {
        // Si aucun callback n'est fourni, on boucle élégamment
        timeoutId = setTimeout(() => {
          setIsCompleted(false);
          setDisplayedCount(0);
        }, 3500);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedCount, onComplete]);

  // Découpage du texte en fonction de l'avancement
  const matlouPart = FULL_TEXT.slice(0, Math.min(displayedCount, 6));
  const sevenChPart = displayedCount > 6 ? FULL_TEXT.slice(6, displayedCount) : '';

  const content = (
    <div className="modern-loader-content">
      <div className="loader-card">
        {/* Halos lumineux subtils en arrière-plan */}
        <div className="loader-glow-orb loader-glow-green" />
        <div className="loader-glow-orb loader-glow-terracotta" />

        {/* Petit badge supérieur */}
        <motion.div
          className="loader-badge"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaLeaf className="loader-badge-icon" />
          <span>Don & Recyclage Solidaire</span>
        </motion.div>

        {/* Zone d'écriture en temps réel avec stylo */}
        <div className="loader-writer-row">
          <div className="loader-text-display">
            <span className="text-matlou">{matlouPart}</span>
            <span className="text-sevench">{sevenChPart}</span>
          </div>

          {/* Stylo plume animé qui écrit en direct */}
          <motion.div
            className={`loader-pen-indicator ${isCompleted ? 'pen-finished' : 'pen-writing'}`}
            animate={{
              rotate: isCompleted ? [0, -10, 0] : [-8, 12, -8],
              y: isCompleted ? [0, -4, 0] : [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: isCompleted ? 2.5 : 0.35,
              ease: 'easeInOut',
            }}
          >
            {/* SVG Stylo plume calligraphique moderne */}
            <svg
              className="loader-pen-svg"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L8.5 17.5L4 19L5.5 14.5L16.5 3.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.25"
              />
              <path
                d="M15 5L19 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M7 16L8 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {/* Goutte d'encre pulsante à la pointe */}
            <span className="loader-ink-drop" />
          </motion.div>
        </div>

        {/* Soulignement élégant qui se trace au fur et à mesure */}
        <div className="loader-underline-track">
          <div
            className="loader-underline-fill"
            style={{
              width: `${(displayedCount / FULL_TEXT.length) * 100}%`,
              transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

        {/* Slogan */}
        <motion.p
          className="loader-tagline"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Ne jetez plus, donnez au Maroc 🇲🇦🌿
        </motion.p>

        {/* Indicateurs de pulsation discrets */}
        <div className="loader-dots-indicator">
          <span className="dot dot-1" />
          <span className="dot dot-2" />
          <span className="dot dot-3" />
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
        exit={{ opacity: 0, scale: 1.02, filter: 'blur(3px)', transition: { duration: 0.45, ease: 'easeInOut' } }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Loader;
