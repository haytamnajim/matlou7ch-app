import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Constantes extraites pour éviter les recréations à chaque render
const CATEGORIES = [
  { id: 'meubles', image: '/images/categories/meubles.jpg', name: 'Meubles' },
  { id: 'vetement', image: '/images/categories/vetement.jpg', name: 'Vêtements' },
  { id: 'electronique', image: '/images/categories/electronique.jpg', name: 'Électronique' },
  { id: 'jouet', image: '/images/categories/jouet.jpg', name: 'Jouets' },
  { id: 'livre', image: '/images/categories/livre.jpg', name: 'Livres' },
  { id: 'maison', image: '/images/categories/maison.jpg', name: 'Maison' },
];

const CATEGORY_IMAGE_STYLE = { backgroundColor: '#e0e0e0' };

function Home() {
  return (
    <div className="home-page">
      {/* Bannière */}
      <section className="banner-section" id="section-15">
        <div className="banner-content">
          <div className="banner-text">
            <span className="highlight-word">La première</span> plateforme marocaine où tout se donne <span className="highlight-word">gratuitement 100%</span> !
          </div>
          <div className="banner-image-container">
            {/* Image supprimée - Conteneur vide */}
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="categories-section">
        <h2 className="section-title">Catégories populaires</h2>
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <div className="category-card" key={cat.id}>
              <div className="category-image-container">
                <div className="category-image" style={CATEGORY_IMAGE_STYLE}></div>
              </div>
              <div className="category-name">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Multimédia */}
      <section className="category-products-section">
        <div className="section-header">
          <h2 className="section-title">Multimédia</h2>
          <Link to="/catalogue?category=multimedia" className="see-all-button">Voir tout</Link>
        </div>
        <div className="product-grid">
          {/* Produit 1 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/1" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--primary-color)" }}>A</div>
              <Link
                to="/profil/ayoub"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Ayoub
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/1" className="product-title-link">
                <h3 className="product-title">Console de jeux PS5</h3>
              </Link>
              <p className="product-location">Casablanca (Casablanca-Settat)</p>
              <p className="product-time">2 heures</p>
            </div>
          </div>

          {/* Produit 2 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/2" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--primary-hover)" }}>Y</div>
              <Link
                to="/profil/youssef"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Youssef
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/2" className="product-title-link">
                <h3 className="product-title">Appareil photo Canon</h3>
              </Link>
              <p className="product-location">Agadir (Souss-Massa)</p>
              <p className="product-time">1 jour</p>
            </div>
          </div>

          {/* Produit 3 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/3" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--secondary-color)" }}>B</div>
              <Link
                to="/profil/bilal"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Bilal
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/3" className="product-title-link">
                <h3 className="product-title">Ordinateur portable HP</h3>
              </Link>
              <p className="product-location">Kénitra (Rabat-Salé-Kénitra)</p>
              <p className="product-time">12 heures</p>
            </div>
          </div>

          {/* Produit 4 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/4" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--primary-color)" }}>R</div>
              <Link
                to="/profil/rachid"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Rachid
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/4" className="product-title-link">
                <h3 className="product-title">Guitare acoustique</h3>
              </Link>
              <p className="product-location">Salé (Rabat-Salé-Kénitra)</p>
              <p className="product-time">1 semaine</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vêtements */}
      <section className="category-products-section">
        <div className="section-header">
          <h2 className="section-title">Vêtements</h2>
          <Link to="/catalogue?category=vetements" className="see-all-button">Voir tout</Link>
        </div>
        <div className="product-grid">
          {/* Produit 5 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/5" className="product-link-overlay"></Link>
              <div className="product-avatar">A</div>
              <Link
                to="/profil/ayoub"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Ayoub
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/5" className="product-title-link">
                <h3 className="product-title">Veste rouge tendance</h3>
              </Link>
              <p className="product-location">Azemmour (Casablanca-Settat)</p>
              <p className="product-time">5 minutes</p>
            </div>
          </div>

          {/* Produit 6 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/6" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--primary-hover)" }}>S</div>
              <Link
                to="/profil/sara"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Sara
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/6" className="product-title-link">
                <h3 className="product-title">Chaussures de sport Nike</h3>
              </Link>
              <p className="product-location">Rabat (Rabat-Salé-Kénitra)</p>
              <p className="product-time">10 minutes</p>
            </div>
          </div>

          {/* Produit 7 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/7" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--secondary-color)" }}>F</div>
              <Link
                to="/profil/fatima"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Fatima
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/7" className="product-title-link">
                <h3 className="product-title">Robe de soirée élégante</h3>
              </Link>
              <p className="product-location">Fès (Fès-Meknès)</p>
              <p className="product-time">3 jours</p>
            </div>
          </div>

          {/* Produit 8 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/8" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--primary-color)" }}>I</div>
              <Link
                to="/profil/imane"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Imane
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/8" className="product-title-link">
                <h3 className="product-title">Manteau d'hiver pour femme</h3>
              </Link>
              <p className="product-location">Meknès (Fès-Meknès)</p>
              <p className="product-time">2 jours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Maison */}
      <section className="category-products-section">
        <div className="section-header">
          <h2 className="section-title">Maison</h2>
          <Link to="/catalogue?category=maison" className="see-all-button">Voir tout</Link>
        </div>
        <div className="product-grid">
          {/* Produit 9 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/9" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--primary-hover)" }}>M</div>
              <Link
                to="/profil/mohammed"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Mohammed
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/9" className="product-title-link">
                <h3 className="product-title">Table basse en bois</h3>
              </Link>
              <p className="product-location">Marrakech (Marrakech-Safi)</p>
              <p className="product-time">1 heure</p>
            </div>
          </div>

          {/* Produit 10 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/10" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "#163832" }}>Z</div>
              <Link
                to="/profil/zineb"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Zineb
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/10" className="product-title-link">
                <h3 className="product-title">Lot de plantes d'intérieur</h3>
              </Link>
              <p className="product-location">Mohammedia (Casablanca-Settat)</p>
              <p className="product-time">8 heures</p>
            </div>
          </div>

          {/* Produit 11 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/11" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--secondary-color)" }}>J</div>
              <Link
                to="/profil/jamila"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Jamila
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/11" className="product-title-link">
                <h3 className="product-title">Tapis berbère authentique</h3>
              </Link>
              <p className="product-location">Marrakech (Marrakech-Safi)</p>
              <p className="product-time">5 jours</p>
            </div>
          </div>

          {/* Produit 12 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/12" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--primary-color)" }}>H</div>
              <Link
                to="/profil/hassan"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Hassan
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/12" className="product-title-link">
                <h3 className="product-title">Lampe design moderne</h3>
              </Link>
              <p className="product-location">Tétouan (Tanger-Tétouan-Al Hoceïma)</p>
              <p className="product-time">6 heures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Accessoires */}
      <section className="category-products-section">
        <div className="section-header">
          <h2 className="section-title">Accessoires</h2>
          <Link to="/catalogue?category=accessoires-mode" className="see-all-button">Voir tout</Link>
        </div>
        <div className="product-grid">
          {/* Produit 13 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/13" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--primary-hover)" }}>L</div>
              <Link
                to="/profil/laila"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Laila
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/13" className="product-title-link">
                <h3 className="product-title">Sac à main cuir véritable</h3>
              </Link>
              <p className="product-location">Tanger (Tanger-Tétouan-Al Hoceïma)</p>
              <p className="product-time">30 minutes</p>
            </div>
          </div>

          {/* Produit 14 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/14" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--secondary-color)" }}>O</div>
              <Link
                to="/profil/omar"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Omar
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/14" className="product-title-link">
                <h3 className="product-title">Montre homme automatique</h3>
              </Link>
              <p className="product-location">El Jadida (Casablanca-Settat)</p>
              <p className="product-time">3 heures</p>
            </div>
          </div>

          {/* Produit 15 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/15" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "var(--primary-color)" }}>D</div>
              <Link
                to="/profil/dounia"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Dounia
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/15" className="product-title-link">
                <h3 className="product-title">Bijoux en argent fait main</h3>
              </Link>
              <p className="product-location">Tanger (Tanger-Tétouan-Al Hoceïma)</p>
              <p className="product-time">2 jours</p>
            </div>
          </div>

          {/* Produit 16 */}
          <div className="product-card">
            <div className="product-image-container">
              <Link to="/produit/16" className="product-link-overlay"></Link>
              <div className="product-avatar" style={{ backgroundColor: "#163832" }}>K</div>
              <Link
                to="/profil/karim"
                className="product-user-name"
                onClick={(e) => e.stopPropagation()}
              >
                Karim
              </Link>
              {/* Image supprimée */}
            </div>
            <div className="product-info">
              <Link to="/produit/16" className="product-title-link">
                <h3 className="product-title">Lunettes de soleil Ray-Ban</h3>
              </Link>
              <p className="product-location">Agadir (Souss-Massa)</p>
              <p className="product-time">4 heures</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;






