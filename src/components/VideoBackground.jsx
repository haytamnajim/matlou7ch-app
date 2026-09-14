import React, { useState } from 'react';
import './VideoBackground.css';

const VideoBackground = ({ videoSrc, overlayOpacity = 0.5 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Vidéo par défaut style "reels" dynamique depuis une source gratuite
  const defaultVideo = "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-network-2620-large.mp4";

  const finalVideoSrc = videoSrc || defaultVideo;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className="video-background-container">
      {isLoading && !hasError && (
        <div className="video-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <video
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleLoad}
        onError={handleError}
      >
        <source src={finalVideoSrc} type="video/mp4" />
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>
      
      <div 
        className="video-overlay"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

export default VideoBackground;
