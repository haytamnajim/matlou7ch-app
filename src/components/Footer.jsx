import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer({ type }) {
  // Afficher le footer complet uniquement sur les pages d'accueil et catalogue
  if (type !== 'home' && type !== 'catalogue') {
    return null;
  }

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <section className="footer-section">
          <h2 className="footer-title">Toutes les catégories</h2>
          <div className="footer-grid">
            <Link to="/catalogue?category=accessoires-mode" className="footer-link">Accessoires de mode</Link>
            <Link to="/catalogue?category=animaux" className="footer-link">Le monde des animaux</Link>
            <Link to="/catalogue?category=loisirs-jeux" className="footer-link">Loisirs & Jeux</Link>
            <Link to="/catalogue?category=nourriture" className="footer-link">Nourriture</Link>
            
            <Link to="/catalogue?category=culture" className="footer-link">Culture</Link>
            <Link to="/catalogue?category=ameublement" className="footer-link">Ameublement</Link>
            <Link to="/catalogue?category=maison" className="footer-link">Maison</Link>
            <Link to="/catalogue?category=sport" className="footer-link">Sport</Link>
            
            <Link to="/catalogue?category=equipement-bebe" className="footer-link">Équipement bébé</Link>
            <Link to="/catalogue?category=bricolage" className="footer-link">Bricolage, Jardinage, Outillage</Link>
            <Link to="/catalogue?category=materiel-professionnel" className="footer-link">Matériel professionnel</Link>
            <Link to="/catalogue?category=vehicule" className="footer-link">Véhicule</Link>
            
            <Link to="/catalogue?category=hygiene-soin" className="footer-link">Hygiène & Soin</Link>
            <Link to="/catalogue?category=chaussures" className="footer-link">Chaussures</Link>
            <Link to="/catalogue?category=multimedia" className="footer-link">Multimédia</Link>
            <Link to="/catalogue?category=vetements" className="footer-link">Vêtements</Link>
          </div>
        </section>

        <section className="footer-section">
          <h2 className="footer-title">Les annonces par ville</h2>
          <div className="footer-grid">
            <Link to="/catalogue?location=Rabat" className="footer-link">Rabat</Link>
            <Link to="/catalogue?location=Agadir" className="footer-link">Agadir</Link>
            <Link to="/catalogue?location=Sale" className="footer-link">Salé</Link>
            <Link to="/catalogue?location=Mohammedia" className="footer-link">Mohammedia</Link>
            
            <Link to="/catalogue?location=Casablanca" className="footer-link">Casablanca</Link>
            <Link to="/catalogue?location=Tanger" className="footer-link">Tanger</Link>
            <Link to="/catalogue?location=Kenitra" className="footer-link">Kenitra</Link>
            <Link to="/catalogue?location=Safi" className="footer-link">Safi</Link>
            
            <Link to="/catalogue?location=Fes" className="footer-link">Fès</Link>
            <Link to="/catalogue?location=Oujda" className="footer-link">Oujda</Link>
            <Link to="/catalogue?location=Temara" className="footer-link">Témara</Link>
            <Link to="/catalogue?location=ElJadida" className="footer-link">El Jadida</Link>
            
            <Link to="/catalogue?location=Marrakech" className="footer-link">Marrakech</Link>
            <Link to="/catalogue?location=Meknes" className="footer-link">Meknès</Link>
            <Link to="/catalogue?location=Tetouan" className="footer-link">Tétouan</Link>
            <Link to="/catalogue?location=Nador" className="footer-link">Nador</Link>
          </div>
        </section>

        <section className="footer-section">
          <h2 className="footer-title">Les annonces par département</h2>
          <div className="footer-grid">
            <Link to="/catalogue?region=Casablanca-Settat" className="footer-link">Casablanca-Settat</Link>
            <Link to="/catalogue?region=Tanger-Tetouan-Al-Hoceima" className="footer-link">Tanger-Tétouan-Al Hoceïma</Link>
            <Link to="/catalogue?region=Draa-Tafilalet" className="footer-link">Drâa-Tafilalet</Link>
            
            <Link to="/catalogue?region=Rabat-Sale-Kenitra" className="footer-link">Rabat-Salé-Kénitra</Link>
            <Link to="/catalogue?region=Oriental" className="footer-link">Oriental</Link>
            <Link to="/catalogue?region=Guelmim-Oued-Noun" className="footer-link">Guelmim-Oued Noun</Link>
            
            <Link to="/catalogue?region=Fes-Meknes" className="footer-link">Fès-Meknès</Link>
            <Link to="/catalogue?region=Beni-Mellal-Khenifra" className="footer-link">Béni Mellal-Khénifra</Link>
            <Link to="/catalogue?region=Laayoune-Sakia-El-Hamra" className="footer-link">Laâyoune-Sakia El Hamra</Link>
            
            <Link to="/catalogue?region=Marrakech-Safi" className="footer-link">Marrakech-Safi</Link>
            <Link to="/catalogue?region=Souss-Massa" className="footer-link">Souss-Massa</Link>
            <Link to="/catalogue?region=Dakhla-Oued-Ed-Dahab" className="footer-link">Dakhla-Oued Ed-Dahab</Link>
          </div>
        </section>

        <div className="footer-social">
          <a href="https://facebook.com" className="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24">
              <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
            </svg>
          </a>
          <a href="https://twitter.com" className="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
              <path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
            </svg>
          </a>
          <a href="https://instagram.com" className="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
              <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
            </svg>
          </a>
        </div>

        <div className="footer-links">
          <Link to="/notre-adn" className="footer-page-link">Notre ADN</Link>
          <Link to="/faq" className="footer-page-link">FAQ</Link>
          <Link to="/cgu" className="footer-page-link">CGU</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
