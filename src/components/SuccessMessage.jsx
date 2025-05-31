import React from 'react';
import { Link } from 'react-router-dom';
import Confetti from './Confetti';
import ConfettiIcon from './ConfettiIcon';

function SuccessMessage({ title, message, buttonText, buttonLink }) {
  return (
    <div className="success-container">
      <Confetti 
        pieces={300}
        duration={8000}
        colors={['#FFD700', '#FF6B6B', '#4CAF50', '#7CB9E8', '#9370DB', '#2ecc71']}
        shapes={['circle', 'square', 'star', 'heart']}
        gravity={0.08}
        wind={0.05}
        spread={100}
        size={{ min: 8, max: 20 }}
        rotation={true}
        recycle={false}
        fadeOut={true}
        twinkle={true}
        confettiSource="top"
        burst={true}
        drift={0.2}
      />
      
      <div className="confetti-icon">
        <ConfettiIcon />
      </div>
      
      <h1 className="success-title">{title || 'Félicitations !'}</h1>
      
      <p className="success-message">
        {message || 'Votre action a été effectuée avec succès.'}
      </p>
      
      <Link to={buttonLink || '/'} className="view-ad-button">
        {buttonText || 'Continuer'}
      </Link>
    </div>
  );
}

export default SuccessMessage;
