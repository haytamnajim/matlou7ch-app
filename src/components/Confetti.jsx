import React, { useState, useEffect } from 'react';

// Solution temporaire si react-confetti ne fonctionne pas
function Confetti() {
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    // Arrêter les confettis après 5 secondes
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Rendu alternatif sans la dépendance externe
  if (!showConfetti) return null;

  return (
    <div className="confetti-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }}>
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50'][i % 10],
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: showConfetti ? 1 : 0,
            transition: 'opacity 1s ease',
            animation: `fall-${i} 5s linear forwards`,
          }}
        />
      ))}
      <style>
        {Array.from({ length: 100 }).map((_, i) => `
          @keyframes fall-${i} {
            0% { transform: translateY(-10vh) rotate(0deg); }
            100% { transform: translateY(${70 + Math.random() * 30}vh) rotate(${360 * (Math.random() > 0.5 ? 1 : -1)}deg); }
          }
        `).join('')}
      </style>
    </div>
  );
}

export default Confetti;
