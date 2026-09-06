import React from 'react';
import { FaCheckCircle, FaHourglassHalf, FaHandHoldingHeart } from 'react-icons/fa';
import './StatusBadge.css';

/**
 * StatusBadge - Affiche le statut d'un don avec une icône adaptée et ses couleurs respectives
 * @param {string} status - 'disponible' | 'reserve' | 'donne'
 * @param {boolean} isPublished - Si le champ status n'existe pas, fallback sur is_published
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
const StatusBadge = ({ status, isPublished, size = 'md' }) => {
  // Déterminer le statut normalisé
  let normalizedStatus = 'disponible';

  if (status) {
    const s = status.toLowerCase();
    if (s === 'donne' || s === 'donné' || s === 'completed' || s === 'donated') {
      normalizedStatus = 'donne';
    } else if (s === 'reserve' || s === 'réservé' || s === 'reserved') {
      normalizedStatus = 'reserve';
    } else {
      normalizedStatus = 'disponible';
    }
  } else if (isPublished === false) {
    normalizedStatus = 'donne';
  }

  const configs = {
    disponible: {
      label: 'Disponible',
      icon: <FaCheckCircle className="status-badge-icon" />,
      className: 'status-disponible',
    },
    reserve: {
      label: 'Réservé',
      icon: <FaHourglassHalf className="status-badge-icon" />,
      className: 'status-reserve',
    },
    donne: {
      label: 'Donné',
      icon: <FaHandHoldingHeart className="status-badge-icon" />,
      className: 'status-donne',
    },
  };

  const current = configs[normalizedStatus];

  return (
    <span className={`status-badge status-badge-${size} ${current.className}`}>
      {current.icon}
      <span className="status-badge-text">{current.label}</span>
    </span>
  );
};

export default StatusBadge;
