import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Bannière */}
      <section className="banner-section" id="section-15">
        <div className="banner-content">
          <div className="banner-text">
            "La première plateforme marocaine où tout se donne gratuitement 100% !"
          </div>
          <div className="banner-image-container">
            <img
              src="/images/furniture-collection.png"
              alt="Collection de meubles"
              className="banner-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=Mobilier';
              }}
            />
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="categories-section">
        <h2 className="section-title">Catégories populaires</h2>
        <div className="categories-grid">
          {[
            { image: '/images/categories/furniture.jpg', name: 'Meubles' },
            { image: '/images/categories/clothing.jpg', name: 'Vêtements' },
            { image: '/images/categories/electronics.jpg', name: 'Électronique' },
            { image: '/images/categories/toys.jpg', name: 'Jouets' },
            { image: '/images/categories/books.jpg', name: 'Livres' },
            { image: '/images/categories/home.jpg', name: 'Maison' },
          ].map((cat, index) => (
            <div className="category-card" key={index}>
              <div className="category-image-container">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="category-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/100x100?text=' + cat.name;
                  }}
                />
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
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#FF9800"}}>A</div>
              <div className="product-user-name">Ayoub</div>
              <img 
                src="/images/console-jeux.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Console de jeux PS5</h3>
              <p className="product-location">Casablanca (Casablanca-Settat)</p>
              <p className="product-time">2 heures</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#795548"}}>Y</div>
              <div className="product-user-name">Youssef</div>
              <img 
                src="/images/appareil-photo.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Appareil photo Canon</h3>
              <p className="product-location">Agadir (Souss-Massa)</p>
              <p className="product-time">1 jour</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#CDDC39"}}>B</div>
              <div className="product-user-name">Bilal</div>
              <img 
                src="/images/ordinateur-portable.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Ordinateur portable HP</h3>
              <p className="product-location">Kénitra (Rabat-Salé-Kénitra)</p>
              <p className="product-time">12 heures</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#FF5722"}}>R</div>
              <div className="product-user-name">Rachid</div>
              <img 
                src="/images/guitare-acoustique.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Guitare acoustique</h3>
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
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar">A</div>
              <div className="product-user-name">Ayoub</div>
              <img 
                src="/images/vetement-rouge.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Veste rouge tendance</h3>
              <p className="product-location">Azemmour (Casablanca-Settat)</p>
              <p className="product-time">5 minutes</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#4CAF50"}}>S</div>
              <div className="product-user-name">Sara</div>
              <img 
                src="/images/chaussures-sport.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Chaussures de sport Nike</h3>
              <p className="product-location">Rabat (Rabat-Salé-Kénitra)</p>
              <p className="product-time">10 minutes</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#E91E63"}}>F</div>
              <div className="product-user-name">Fatima</div>
              <img 
                src="/images/robe-soiree.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Robe de soirée élégante</h3>
              <p className="product-location">Fès (Fès-Meknès)</p>
              <p className="product-time">3 jours</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#673AB7"}}>I</div>
              <div className="product-user-name">Imane</div>
              <img 
                src="/images/manteau-hiver.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Manteau d'hiver pour femme</h3>
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
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#9C27B0"}}>M</div>
              <div className="product-user-name">Mohammed</div>
              <img 
                src="/images/table-basse.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Table basse en bois</h3>
              <p className="product-location">Marrakech (Marrakech-Safi)</p>
              <p className="product-time">1 heure</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#607D8B"}}>Z</div>
              <div className="product-user-name">Zineb</div>
              <img 
                src="/images/plantes-interieur.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Lot de plantes d'intérieur</h3>
              <p className="product-location">Mohammedia (Casablanca-Settat)</p>
              <p className="product-time">8 heures</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#00BCD4"}}>J</div>
              <div className="product-user-name">Jamila</div>
              <img 
                src="/images/tapis-berbere.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Tapis berbère authentique</h3>
              <p className="product-location">Marrakech (Marrakech-Safi)</p>
              <p className="product-time">5 jours</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#3F51B5"}}>H</div>
              <div className="product-user-name">Hassan</div>
              <img 
                src="/images/lampe-design.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Lampe design moderne</h3>
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
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#2196F3"}}>L</div>
              <div className="product-user-name">Laila</div>
              <img 
                src="/images/sac-main.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Sac à main cuir véritable</h3>
              <p className="product-location">Tanger (Tanger-Tétouan-Al Hoceïma)</p>
              <p className="product-time">30 minutes</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#8BC34A"}}>O</div>
              <div className="product-user-name">Omar</div>
              <img 
                src="/images/montre-homme.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Montre homme automatique</h3>
              <p className="product-location">El Jadida (Casablanca-Settat)</p>
              <p className="product-time">3 heures</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#FF4081"}}>D</div>
              <div className="product-user-name">Dounia</div>
              <img 
                src="/images/bijoux-argent.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Bijoux en argent fait main</h3>
              <p className="product-location">Tanger (Tanger-Tétouan-Al Hoceïma)</p>
              <p className="product-time">2 jours</p>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image-container">
              <div className="product-avatar" style={{backgroundColor: "#009688"}}>K</div>
              <div className="product-user-name">Karim</div>
              <img 
                src="/images/lunettes-soleil.jpg" 
                alt="" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">Lunettes de soleil Ray-Ban</h3>
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






