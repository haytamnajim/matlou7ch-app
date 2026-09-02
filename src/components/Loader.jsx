import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = ({ fullScreen = true }) => {
  const [phase, setPhase] = useState('drawing'); // 'drawing' | 'done'

  useEffect(() => {
    // After drawing animation (~3s), show "done" state
    const timer = setTimeout(() => setPhase('done'), 3200);
    return () => clearTimeout(timer);
  }, []);

  const content = (
    <div className="modern-loader-content">
      {/* SVG Drawing Animation */}
      <div className="loader-svg-wrapper">
        <svg
          viewBox="0 0 400 120"
          xmlns="http://www.w3.org/2000/svg"
          className="loader-text-svg"
        >
          {/* Decorative leaf / heart before the text */}
          <motion.path
            d="M28 60 C28 45 10 38 10 55 C10 70 28 80 28 80 C28 80 46 70 46 55 C46 38 28 45 28 60Z"
            fill="none"
            stroke="#62825D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0 }}
          />

          {/* "Matlou7ch" text drawn stroke by stroke */}
          {/* M */}
          <motion.path
            d="M70 80 L70 40 L90 65 L110 40 L110 80"
            fill="none" stroke="#62825D" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.6 }}
          />
          {/* a */}
          <motion.path
            d="M130 80 C130 65 118 57 115 65 C112 73 115 80 125 80 L130 80 L130 57"
            fill="none" stroke="#62825D" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.0 }}
          />
          {/* t */}
          <motion.path
            d="M142 45 L142 80 M135 55 L149 55"
            fill="none" stroke="#62825D" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 1.3 }}
          />
          {/* l */}
          <motion.path
            d="M157 38 L157 80"
            fill="none" stroke="#62825D" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeInOut', delay: 1.55 }}
          />
          {/* o */}
          <motion.ellipse
            cx="172" cy="70" rx="8" ry="11"
            fill="none" stroke="#62825D" strokeWidth="3.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeInOut', delay: 1.75 }}
          />
          {/* u */}
          <motion.path
            d="M186 57 L186 73 C186 80 196 82 200 76 L200 57"
            fill="none" stroke="#BC7C4E" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeInOut', delay: 2.05 }}
          />
          {/* 7 */}
          <motion.path
            d="M210 57 L226 57 L214 80"
            fill="none" stroke="#BC7C4E" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 2.35 }}
          />
          {/* c */}
          <motion.path
            d="M248 63 C244 56 234 56 232 65 C230 74 234 81 242 81"
            fill="none" stroke="#BC7C4E" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 2.6 }}
          />
          {/* h */}
          <motion.path
            d="M258 38 L258 80 M258 65 C262 56 278 54 278 65 L278 80"
            fill="none" stroke="#BC7C4E" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut', delay: 2.85 }}
          />

          {/* Underline that appears at the end */}
          <motion.line
            x1="65" y1="92" x2="285" y2="92"
            stroke="url(#underlineGrad)" strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 3.2 }}
          />

          {/* Gradient def */}
          <defs>
            <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#62825D" />
              <stop offset="100%" stopColor="#BC7C4E" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtitle / tagline */}
      <motion.p
        className="loader-tagline"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      >
        La plateforme du don solidaire au Maroc 🌿
      </motion.p>
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="loader-overlay-modern"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Loader;
