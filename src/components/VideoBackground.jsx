import React from 'react';
import './VideoBackground.css';

const VideoBackground = ({ videoSrc, overlayOpacity = 0.5 }) => {
  return (
    <div className="video-background-container">
      <video
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
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
