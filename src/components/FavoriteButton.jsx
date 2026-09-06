import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './FavoriteButton.css';

/**
 * FavoriteButton - Bouton favori avec micro-animation interactive de cœur et étincelles
 */
const FavoriteButton = ({
  isFavorited = false,
  onToggle,
  size = 'md',
  className = '',
  ariaLabel,
}) => {
  const [showSparkles, setShowSparkles] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const willBeFavorited = !isFavorited;
    if (willBeFavorited) {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 700);
    }

    if (onToggle) {
      onToggle(e);
    }
  };

  // 6 micro-étincelles rayonnant autour du cœur
  const sparklePositions = [
    { x: -14, y: -14, scale: 0.9, delay: 0 },
    { x: 14, y: -14, scale: 0.8, delay: 0.05 },
    { x: 18, y: 4, scale: 1, delay: 0.08 },
    { x: 10, y: 16, scale: 0.7, delay: 0.12 },
    { x: -12, y: 15, scale: 0.8, delay: 0.06 },
    { x: -18, y: 2, scale: 1, delay: 0.1 },
  ];

  return (
    <motion.button
      type="button"
      className={`favorite-interactive-btn favorite-btn-${size} ${isFavorited ? 'is-active' : ''} ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.82 }}
      aria-label={ariaLabel || (isFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris')}
    >
      {/* Cœur animé */}
      <motion.div
        className="favorite-heart-wrapper"
        animate={isFavorited ? { scale: [1, 1.38, 0.88, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {isFavorited ? (
          <FaHeart className="favorite-icon favorite-icon-filled" />
        ) : (
          <FaRegHeart className="favorite-icon favorite-icon-outline" />
        )}
      </motion.div>

      {/* Particules d'étincelles dorées et roses au clic */}
      <AnimatePresence>
        {showSparkles && (
          <div className="favorite-sparkles-container">
            {sparklePositions.map((pos, idx) => (
              <motion.span
                key={idx}
                className="favorite-sparkle-dot"
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  opacity: [1, 1, 0],
                  scale: [0, pos.scale, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: pos.delay, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default FavoriteButton;
