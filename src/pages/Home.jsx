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
              src="/image.png"
              alt="Image principale"
              className="banner-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=Image';
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
            <Link to="/produit/1" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#FF9800"}}>A</div>
                <Link 
                  to="/profil/ayoub" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ayoub
                </Link>
                <img 
                  src={`https://picsum.photos/seed/multimedia1/300/300`}
                  alt="Console de jeux PS5" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/2" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#795548"}}>Y</div>
                <Link 
                  to="/profil/youssef" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Youssef
                </Link>
                <img 
                  src={`https://picsum.photos/seed/multimedia2/300/300`}
                  alt="Appareil photo Canon" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/3" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#CDDC39"}}>B</div>
                <Link 
                  to="/profil/bilal" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Bilal
                </Link>
                <img 
                  src={`https://picsum.photos/seed/multimedia3/300/300`}
                  alt="Ordinateur portable HP" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/4" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#FF5722"}}>R</div>
                <Link 
                  to="/profil/rachid" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Rachid
                </Link>
                <img 
                  src={`https://picsum.photos/seed/multimedia4/300/300`}
                  alt="Guitare acoustique" 
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
            </Link>
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
            <Link to="/produit/5" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar">A</div>
                <Link 
                  to="/profil/ayoub" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ayoub
                </Link>
                <img 
                  src={`https://picsum.photos/seed/vetements1/300/300`}
                  alt="Veste rouge tendance" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/6" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#4CAF50"}}>S</div>
                <Link 
                  to="/profil/sara" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Sara
                </Link>
                <img 
                  src={`https://picsum.photos/seed/vetements2/300/300`}
                  alt="Chaussures de sport Nike" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/7" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#E91E63"}}>F</div>
                <Link 
                  to="/profil/fatima" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Fatima
                </Link>
                <img 
                  src={`https://picsum.photos/seed/vetements3/300/300`}
                  alt="Robe de soirée élégante" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/8" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#673AB7"}}>I</div>
                <Link 
                  to="/profil/imane" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Imane
                </Link>
                <img 
                  src={`https://picsum.photos/seed/vetements4/300/300`}
                  alt="Manteau d'hiver pour femme" 
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
            </Link>
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
            <Link to="/produit/9" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#9C27B0"}}>M</div>
                <Link 
                  to="/profil/mohammed" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Mohammed
                </Link>
                <img 
                  src={`https://picsum.photos/seed/maison1/300/300`}
                  alt="Table basse en bois" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/10" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#607D8B"}}>Z</div>
                <Link 
                  to="/profil/zineb" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Zineb
                </Link>
                <img 
                  src={`https://picsum.photos/seed/maison2/300/300`}
                  alt="Lot de plantes d'intérieur" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/11" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#00BCD4"}}>J</div>
                <Link 
                  to="/profil/jamila" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Jamila
                </Link>
                <img 
                  src={`https://picsum.photos/seed/maison3/300/300`}
                  alt="Tapis berbère authentique" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/12" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#3F51B5"}}>H</div>
                <Link 
                  to="/profil/hassan" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Hassan
                </Link>
                <img 
                  src={`https://picsum.photos/seed/maison4/300/300`}
                  alt="Lampe design moderne" 
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
            </Link>
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
            <Link to="/produit/13" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#2196F3"}}>L</div>
                <Link 
                  to="/profil/laila" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Laila
                </Link>
                <img 
                  src={`https://picsum.photos/seed/accessoires1/300/300`}
                  alt="Sac à main cuir véritable" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/14" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#8BC34A"}}>O</div>
                <Link 
                  to="/profil/omar" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Omar
                </Link>
                <img 
                  src={`https://picsum.photos/seed/accessoires2/300/300`}
                  alt="Montre homme automatique" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/15" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#FF4081"}}>D</div>
                <Link 
                  to="/profil/dounia" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Dounia
                </Link>
                <img 
                  src={`https://picsum.photos/seed/accessoires3/300/300`}
                  alt="Bijoux en argent fait main" 
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
            </Link>
          </div>
          
          <div className="product-card">
            <Link to="/produit/16" className="product-link">
              <div className="product-image-container">
                <div className="product-avatar" style={{backgroundColor: "#009688"}}>K</div>
                <Link 
                  to="/profil/karim" 
                  className="product-user-name"
                  onClick={(e) => e.stopPropagation()}
                >
                  Karim
                </Link>
                <img 
                  src={`https://picsum.photos/seed/accessoires4/300/300`}
                  alt="Lunettes de soleil Ray-Ban" 
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
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;






