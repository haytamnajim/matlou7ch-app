import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaVideo, FaImage } from 'react-icons/fa';
import './HeroDynamicBackground.css';

// Images par défaut pour le diaporama dynamique avec effet Ken Burns
const DEFAULT_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1920&q=80',
    title: 'Solidarité & Partage',
    fallback: '/donner3.png'
  },
  {
    url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1920&q=80',
    title: 'Don & Entraide Communautaire',
    fallback: '/donner1.png'
  },
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80',
    title: 'Une Seconde Vie aux Objets',
    fallback: '/image.png'
  }
];

// Vidéo par défaut libre de droits (ambiance chaleureuse & partage)
const DEFAULT_VIDEO = 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-soil-with-a-sprout-42994-large.mp4';

const HeroDynamicBackground = ({
  customVideo = '/videos/background-video.mp4',
  fallbackVideo = DEFAULT_VIDEO,
  slides = DEFAULT_SLIDES,
  initialMode = 'video', // 'video' | 'images'
  overlayOpacity = 0.65
}) => {
  const [mode, setMode] = useState(initialMode); // 'video' ou 'images'
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const videoRef = useRef(null);
  const slideTimerRef = useRef(null);

  // Rotation automatique des images toutes les 7 secondes avec animation Ken Burns
  useEffect(() => {
    if (mode === 'images' && isPlaying) {
      slideTimerRef.current = setInterval(() => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 7000);
    }
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [mode, isPlaying, slides.length]);

  // Gestion de la lecture vidéo
  const togglePlay = () => {
    if (mode === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Bascule entre mode Vidéo et mode Photos Animées
  const switchMode = (newMode) => {
    setMode(newMode);
    setIsPlaying(true);
    if (newMode === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Si la vidéo locale n'existe pas, on tente la vidéo de secours ou on bascule vers les images
  const handleVideoError = () => {
    const currentSrc = videoRef.current?.querySelector('source')?.src;
    if (currentSrc && !currentSrc.includes(fallbackVideo)) {
      // Tenter la vidéo de secours CDN
      if (videoRef.current) {
        videoRef.current.src = fallbackVideo;
        videoRef.current.play().catch(() => {
          setVideoError(true);
          setMode('images');
        });
      }
    } else {
      setVideoError(true);
      setMode('images');
    }
  };

  return (
    <div className="hero-dynamic-bg-container" aria-hidden="true">
      {/* ── Calque Vidéo ── */}
      {mode === 'video' && !videoError && (
        <div className={`hero-video-layer ${videoLoaded ? 'loaded' : ''}`}>
          <video
            ref={videoRef}
            className="hero-video-element"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onError={handleVideoError}
          >
            <source src={customVideo} type="video/mp4" />
            <source src={fallbackVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* ── Calque Images Animées (Ken Burns) ── */}
      {(mode === 'images' || videoError || !videoLoaded) && (
        <div className="hero-slides-layer">
          {slides.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={index}
                className={`hero-slide-item ${isActive ? 'active' : ''} ${
                  index % 2 === 0 ? 'kenburns-zoom-in' : 'kenburns-zoom-out'
                }`}
                style={{
                  backgroundImage: `url(${slide.url})`
                }}
              >
                {/* Fallback image locale invisible pour déclencher le chargement */}
                <img
                  src={slide.url}
                  alt={slide.title}
                  style={{ display: 'none' }}
                  onError={(e) => {
                    e.currentTarget.parentElement.style.backgroundImage = `url(${slide.fallback})`;
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* ── Overlay dégradé protecteur (lisibilité du texte) ── */}
      <div
        className="hero-bg-overlay"
        style={{
          background: `linear-gradient(135deg, rgba(16, 27, 20, ${overlayOpacity + 0.15}) 0%, rgba(13, 24, 16, ${overlayOpacity}) 60%, rgba(20, 32, 22, ${overlayOpacity + 0.2}) 100%)`
        }}
      />

      {/* ── Voile de texture subtile ── */}
      <div className="hero-mesh-glow" />

      {/* ── Contrôles discrets et élégants ── */}
      <div className="hero-bg-controls" role="toolbar" aria-label="Contrôles de l'arrière-plan">
        <button
          type="button"
          className="hero-control-btn"
          onClick={togglePlay}
          title={isPlaying ? 'Mettre en pause' : 'Reprendre la lecture'}
          aria-label={isPlaying ? 'Mettre en pause' : 'Reprendre la lecture'}
        >
          {isPlaying ? <FaPause size={11} /> : <FaPlay size={11} />}
        </button>

        {!videoError && (
          <button
            type="button"
            className={`hero-control-btn ${mode === 'video' ? 'active' : ''}`}
            onClick={() => switchMode(mode === 'video' ? 'images' : 'video')}
            title={mode === 'video' ? 'Passer aux photos animées' : 'Passer à la vidéo'}
            aria-label={mode === 'video' ? 'Passer aux photos animées' : 'Passer à la vidéo'}
          >
            {mode === 'video' ? <FaVideo size={11} /> : <FaImage size={11} />}
            <span className="control-btn-label">{mode === 'video' ? 'Vidéo' : 'Photos'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroDynamicBackground;
