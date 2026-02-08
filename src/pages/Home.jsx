import React from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaTruck, FaShieldAlt } from 'react-icons/fa';
import HomeBanner from '../components/HomeBanner';
import './Home.css';

function Home() {
  return (
    <div className="home-page-new">
      <HomeBanner />

      {/* Section 1: We Made Modern & Creative Concepts */}
      <section className="concepts-section">
        <h2 className="concepts-title">WE MADE<br />MODERN & CREATIVE<br />CONCEPTS</h2>
        <div className="concepts-grid">
          <div className="concept-item">
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600" alt="Concept 1" />
          </div>
          <div className="concept-item">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600" alt="Concept 2" />
          </div>
          <div className="concept-item">
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600" alt="Concept 3" />
          </div>
        </div>
        <button className="concepts-cta">Get Started</button>
        <p className="concepts-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit euismod tincidunt ut laoreet</p>
      </section>

      {/* Section 2: Features (Quality, Shipping, Warranty) */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><FaAward /></div>
            <h3 className="feature-name">Best Quality</h3>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaTruck /></div>
            <h3 className="feature-name">Free Shipping</h3>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaShieldAlt /></div>
            <h3 className="feature-name">Warranty</h3>
          </div>
        </div>
      </section>

      {/* Section 3: We Provide You The Best Experience */}
      <section className="experience-section">
        <div className="experience-header">
          <h2 className="experience-title">WE PROVIDE YOU THE<br />BEST EXPERIENCE</h2>
          <p className="experience-desc">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, nostrud exerci tation ullamcorper
          </p>
        </div>
        <div className="experience-gallery">
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600" alt="Experience 1" />
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1484101403633-562f65bd896b?auto=format&fit=crop&q=80&w=600" alt="Experience 2" />
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600" alt="Experience 3" />
          </div>
        </div>
        <div className="gallery-arrows">
          <span>{">>>>>>"}</span>
        </div>
      </section>
    </div>
  );
}

export default Home;
