import React, { useEffect, useRef, useState } from 'react';

const COLORS = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', 
  '#009688', '#4CAF50', '#8BC34A', '#CDDC39', 
  '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
];

const SHAPES = ['circle', 'square', 'triangle', 'line'];

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
  recycle = false
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
    
    return {
      x: dimensions.width / 2 + (Math.random() * spread * 2 - spread),
      y: 0,
      size: particleSize,
      color,
      shape,
      velocity: {
        x: (Math.random() - 0.5) * initialVelocity.x * 2,
        y: Math.random() * initialVelocity.y
      },
      rotation: Math.random() * 360,
      rotationSpeed: rotation ? (Math.random() - 0.5) * 10 : 0,
      opacity: 1
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
  }, [pieces]);

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
        // Mettre à jour la position
        particle.x += particle.velocity.x + wind;
        particle.y += particle.velocity.y + gravity;
        particle.rotation += particle.rotationSpeed;
        
        // Appliquer la gravité et la friction
        particle.velocity.y += gravity;
        particle.velocity.x *= 0.99;
        particle.velocity.y *= 0.99;
        
        // Faire disparaître progressivement les particules
        if (!recycle) {
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
  }, [dimensions, duration, gravity, wind, recycle]);

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

