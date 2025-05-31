import React, { useEffect, useRef, useState } from 'react';

const COLORS = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', 
  '#009688', '#4CAF50', '#8BC34A', '#CDDC39', 
  '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
  '#FFD700', '#FF6B6B', '#4CAF50', '#7CB9E8', '#9370DB',
  '#2ecc71', '#3498db', '#9b59b6', '#f1c40f', '#e74c3c'
];

const SHAPES = ['circle', 'square', 'triangle', 'line', 'star', 'heart', 'diamond'];

function Confetti({ 
  duration = 5000, 
  pieces = 200, 
  wind = 0, 
  gravity = 0.1, 
  initialVelocity = { x: 4, y: 10 },
  colors = COLORS,
  shapes = SHAPES,
  spread = 50,
  size = { min: 5, max: 15 },
  rotation = true,
  recycle = false,
  fadeOut = true,
  confettiSource = 'center', // 'center', 'top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
  burst = true, // explosion initiale
  drift = 0.1, // mouvement aléatoire
  twinkle = false, // effet de scintillement
  swirl = 0 // effet tourbillon
}) {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  // Fonction pour créer une particule
  const createParticle = () => {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particleSize = Math.random() * (size.max - size.min) + size.min;
    
    // Position initiale basée sur la source
    let x = dimensions.width / 2;
    let y = 0;
    
    switch (confettiSource) {
      case 'top':
        x = Math.random() * dimensions.width;
        y = 0;
        break;
      case 'bottom':
        x = Math.random() * dimensions.width;
        y = dimensions.height;
        break;
      case 'left':
        x = 0;
        y = Math.random() * dimensions.height;
        break;
      case 'right':
        x = dimensions.width;
        y = Math.random() * dimensions.height;
        break;
      case 'topLeft':
        x = 0;
        y = 0;
        break;
      case 'topRight':
        x = dimensions.width;
        y = 0;
        break;
      case 'bottomLeft':
        x = 0;
        y = dimensions.height;
        break;
      case 'bottomRight':
        x = dimensions.width;
        y = dimensions.height;
        break;
      default: // center
        x = dimensions.width / 2 + (Math.random() * spread * 2 - spread);
        y = dimensions.height / 2;
        break;
    }
    
    // Vitesse initiale avec effet d'explosion si burst est activé
    const velocityX = burst 
      ? (Math.random() - 0.5) * initialVelocity.x * 2
      : (Math.random() - 0.5) * initialVelocity.x;
      
    const velocityY = burst 
      ? (Math.random() - 0.5) * initialVelocity.y * 2
      : Math.random() * -initialVelocity.y;
    
    return {
      x,
      y,
      size: particleSize,
      color,
      shape,
      velocity: {
        x: velocityX,
        y: velocityY
      },
      rotation: Math.random() * 360,
      rotationSpeed: rotation ? (Math.random() - 0.5) * 10 : 0,
      opacity: 1,
      twinkleSpeed: twinkle ? Math.random() * 0.05 + 0.01 : 0,
      twinkleDirection: 1,
      driftOffset: Math.random() * Math.PI * 2
    };
  };

  // Initialisation des particules
  useEffect(() => {
    particlesRef.current = Array.from({ length: pieces }, createParticle);
    
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pieces, confettiSource, burst, spread]);

  // Fonction pour dessiner une forme d'étoile
  const drawStar = (ctx, x, y, size) => {
    const spikes = 5;
    const outerRadius = size / 2;
    const innerRadius = outerRadius / 2;
    
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / spikes) * i;
      ctx.lineTo(
        x + radius * Math.cos(angle),
        y + radius * Math.sin(angle)
      );
    }
    ctx.closePath();
    ctx.fill();
  };
  
  // Fonction pour dessiner un cœur
  const drawHeart = (ctx, x, y, size) => {
    const width = size;
    const height = size;
    
    ctx.beginPath();
    ctx.moveTo(x, y + height/4);
    ctx.quadraticCurveTo(x, y, x + width/4, y);
    ctx.quadraticCurveTo(x + width/2, y, x + width/2, y + height/4);
    ctx.quadraticCurveTo(x + width/2, y, x + width*3/4, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + height/4);
    ctx.quadraticCurveTo(x + width, y + height/2, x + width/2, y + height);
    ctx.quadraticCurveTo(x, y + height/2, x, y + height/4);
    ctx.fill();
  };
  
  // Fonction pour dessiner un diamant
  const drawDiamond = (ctx, x, y, size) => {
    ctx.beginPath();
    ctx.moveTo(x, y - size/2);
    ctx.lineTo(x + size/2, y);
    ctx.lineTo(x, y + size/2);
    ctx.lineTo(x - size/2, y);
    ctx.closePath();
    ctx.fill();
  };

  // Fonction pour dessiner une particule
  const drawParticle = (ctx, particle) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    
    switch (particle.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -particle.size / 2);
        ctx.lineTo(particle.size / 2, particle.size / 2);
        ctx.lineTo(-particle.size / 2, particle.size / 2);
        ctx.closePath();
        ctx.fill();
        break;
      case 'line':
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size / 4;
        ctx.beginPath();
        ctx.moveTo(0, -particle.size / 2);
        ctx.lineTo(0, particle.size / 2);
        ctx.stroke();
        break;
      case 'star':
        drawStar(ctx, 0, 0, particle.size);
        break;
      case 'heart':
        drawHeart(ctx, -particle.size/2, -particle.size/2, particle.size);
        break;
      case 'diamond':
        drawDiamond(ctx, 0, 0, particle.size);
        break;
      default:
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
    }
    
    ctx.restore();
  };

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Mettre à jour et dessiner chaque particule
      particlesRef.current.forEach((particle, index) => {
        // Effet de dérive aléatoire
        if (drift > 0) {
          particle.x += Math.sin(elapsed * 0.001 + particle.driftOffset) * drift;
        }
        
        // Effet de tourbillon
        if (swirl !== 0) {
          const centerX = dimensions.width / 2;
          const centerY = dimensions.height / 2;
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            const angle = Math.atan2(dy, dx) + swirl * 0.01;
            const newX = centerX + Math.cos(angle) * distance;
            const newY = centerY + Math.sin(angle) * distance;
            particle.x = newX;
            particle.y = newY;
          }
        }
        
        // Mettre à jour la position
        particle.x += particle.velocity.x + wind;
        particle.y += particle.velocity.y + gravity;
        particle.rotation += particle.rotationSpeed;
        
        // Appliquer la gravité et la friction
        particle.velocity.y += gravity;
        particle.velocity.x *= 0.99;
        particle.velocity.y *= 0.99;
        
        // Effet de scintillement
        if (particle.twinkleSpeed > 0) {
          particle.opacity += particle.twinkleDirection * particle.twinkleSpeed;
          
          if (particle.opacity >= 1) {
            particle.opacity = 1;
            particle.twinkleDirection = -1;
          } else if (particle.opacity <= 0.3) {
            particle.opacity = 0.3;
            particle.twinkleDirection = 1;
          }
        }
        
        // Faire disparaître progressivement les particules
        if (fadeOut && !recycle) {
          particle.opacity = Math.max(0, 1 - progress);
        }
        
        // Recycler les particules qui sortent de l'écran
        if (recycle && (
          particle.y > dimensions.height + particle.size ||
          particle.x < -particle.size || 
          particle.x > dimensions.width + particle.size
        )) {
          particlesRef.current[index] = createParticle();
        }
        
        // Dessiner la particule
        drawParticle(ctx, particle);
      });
      
      // Continuer l'animation si nécessaire
      if (progress < 1 || recycle) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, duration, gravity, wind, recycle, drift, swirl, fadeOut, twinkle]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1000
      }}
    />
  );
}

export default Confetti;

