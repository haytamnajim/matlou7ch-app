import React from 'react';
import './Skeleton.css';

// Skeleton pour une carte d'annonce (Catalogue)
function SkeletonListingCard() {
  return (
    <div className="skeleton-listing-card">
      <div className="skeleton-listing-image">
        <div className="skeleton-badge"></div>
        <div className="skeleton-donor-badge"></div>
      </div>
      <div className="skeleton-listing-content">
        <div className="skeleton-listing-title"></div>
        <div className="skeleton-listing-meta"></div>
        <div className="skeleton-listing-location"></div>
      </div>
    </div>
  );
}

// Skeleton pour la grille du catalogue
function SkeletonCatalogueGrid({ items = 6 }) {
  return (
    <div className="skeleton-catalogue-grid">
      {[...Array(items)].map((_, i) => (
        <SkeletonListingCard key={i} />
      ))}
    </div>
  );
}

// Skeleton pour le header du catalogue
function SkeletonCatalogueHeader() {
  return (
    <div className="skeleton-catalogue-header">
      <div className="skeleton-catalogue-title"></div>
      <div className="skeleton-catalogue-subtitle"></div>
      <div className="skeleton-catalogue-search">
        <div className="skeleton-search-input"></div>
        <div className="skeleton-search-button"></div>
      </div>
      <div className="skeleton-catalogue-chips">
        <div className="skeleton-chip"></div>
        <div className="skeleton-chip"></div>
        <div className="skeleton-chip"></div>
        <div className="skeleton-chip"></div>
      </div>
    </div>
  );
}

// Skeleton pour la page ProductDetail
function SkeletonProductDetail() {
  return (
    <div className="skeleton-product-detail">
      <div className="skeleton-product-gallery">
        <div className="skeleton-product-image"></div>
      </div>
      <div className="skeleton-product-info">
        <div className="skeleton-product-title-row">
          <div className="skeleton-product-title"></div>
          <div className="skeleton-product-badge"></div>
        </div>
        <div className="skeleton-product-meta"></div>
        <div className="skeleton-product-interested"></div>
        <div className="skeleton-product-actions">
          <div className="skeleton-action-button"></div>
          <div className="skeleton-action-button"></div>
        </div>
        <div className="skeleton-product-contact"></div>
      </div>
    </div>
  );
}

// Skeleton pour les cartes d'information
function SkeletonInfoCard() {
  return (
    <div className="skeleton-info-card">
      <div className="skeleton-info-header"></div>
      <div className="skeleton-info-row"></div>
      <div className="skeleton-info-row"></div>
      <div className="skeleton-info-row"></div>
    </div>
  );
}

// Skeleton pour la carte du donneur
function SkeletonDonorCard() {
  return (
    <div className="skeleton-donor-card">
      <div className="skeleton-donor-header"></div>
      <div className="skeleton-donor-body">
        <div className="skeleton-donor-avatar"></div>
        <div className="skeleton-donor-info">
          <div className="skeleton-donor-name"></div>
          <div className="skeleton-donor-chips">
            <div className="skeleton-chip-small"></div>
            <div className="skeleton-chip-small"></div>
          </div>
        </div>
      </div>
      <div className="skeleton-donor-description"></div>
      <div className="skeleton-donor-button"></div>
    </div>
  );
}

// Skeleton pour le Navbar
function SkeletonNavbar() {
  return (
    <div className="skeleton-navbar">
      <div className="skeleton-navbar-logo"></div>
      <div className="skeleton-navbar-search"></div>
      <div className="skeleton-navbar-actions">
        <div className="skeleton-navbar-icon"></div>
        <div className="skeleton-navbar-icon"></div>
        <div className="skeleton-navbar-icon"></div>
      </div>
    </div>
  );
}

// Skeleton générique pour un texte
function SkeletonText({ lines = 3, width = '100%' }) {
  return (
    <div className="skeleton-text-wrapper">
      {[...Array(lines)].map((_, i) => (
        <div 
          key={i} 
          className="skeleton-text-line" 
          style={{ width: i === lines - 1 ? '60%' : width }}
        ></div>
      ))}
    </div>
  );
}

// Skeleton générique pour un cercle (avatar)
function SkeletonAvatar({ size = 40 }) {
  return (
    <div 
      className="skeleton-avatar" 
      style={{ width: size, height: size }}
    ></div>
  );
}

// Skeleton générique pour un bouton
function SkeletonButton({ width = 120, height = 40 }) {
  return (
    <div 
      className="skeleton-button" 
      style={{ width, height }}
    ></div>
  );
}

export { 
  SkeletonListingCard, 
  SkeletonCatalogueGrid, 
  SkeletonCatalogueHeader,
  SkeletonProductDetail,
  SkeletonInfoCard,
  SkeletonDonorCard,
  SkeletonNavbar,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton
};
