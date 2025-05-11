import React from 'react';

function GhostIcon() {
  return (
    <svg 
      width="100" 
      height="100" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M50 10C33.4315 10 20 23.4315 20 40V70C20 73.3137 22.6863 76 26 76C29.3137 76 32 73.3137 32 70V65C32 61.6863 34.6863 59 38 59C41.3137 59 44 61.6863 44 65V70C44 73.3137 46.6863 76 50 76C53.3137 76 56 73.3137 56 70V65C56 61.6863 58.6863 59 62 59C65.3137 59 68 61.6863 68 65V70C68 73.3137 70.6863 76 74 76C77.3137 76 80 73.3137 80 70V40C80 23.4315 66.5685 10 50 10Z" 
        fill="#E0E0E0"
      />
      <circle cx="40" cy="40" r="5" fill="#BDBDBD" />
      <circle cx="60" cy="40" r="5" fill="#BDBDBD" />
    </svg>
  );
}

export default GhostIcon;