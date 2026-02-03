import React from 'react';
import { Link } from 'react-router-dom';
import './NotreADN.css';

function NotreADN() {
  return (
    <div className="notre-adn-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              "Ne jetons plus, <br /><span className="highlight-word">donnons</span> !"
            </h1>
            <p className="hero-description">
              Notre mission est de créer une communauté solidaire où le don d'objets
              devient une alternative au gaspillage, contribuant ainsi à un Maroc
              plus durable et plus uni.
            </p>
          </div>
          <div className="hero-image-container">
            <div className="hero-image-placeholder"></div>
          </div>
        </div>
      </section>

      <section className="who-we-are-section">
        <div className="container">
          <h2 className="section-title">Qui sommes-nous ?</h2>
          <p className="who-we-are-tagline">
            La première plateforme gratuite de dons d'objets au Maroc.
          </p>

          <div className="who-we-are-content">
            <p>
              Fondée en 2025 par une équipe passionnée d'entrepreneurs marocains, Matlou7ch est née d'une vision simple mais puissante :
              transformer la façon dont nous gérons nos objets inutilisés. Notre plateforme connecte les personnes souhaitant donner des
              objets dont elles n'ont plus besoin avec celles qui en ont l'utilité.
            </p>

            <p>
              En quelques mois seulement, nous avons réuni une communauté grandissante de Marocains partageant nos valeurs de solidarité
              et de durabilité. Chaque jour, des centaines d'objets trouvent une seconde vie grâce à notre plateforme, évitant ainsi
              d'être jetés et contribuant à réduire notre impact environnemental collectif.
            </p>

            <p>
              Notre mission va au-delà de la simple réduction des déchets. Nous créons des liens sociaux, favorisons l'entraide et
              contribuons à une économie plus circulaire et solidaire. Chaque don représente non seulement un objet sauvé, mais aussi
              une connexion humaine établie.
            </p>

            <p>
              Matlou7ch s'engage à rendre le don d'objets aussi simple, sécurisé et accessible que possible pour tous les Marocains,
              où qu'ils se trouvent dans le pays.
            </p>
          </div>
        </div>
      </section>

      <section className="mission-detail-section">
        <div className="container">
          <div className="mission-detail-content">
            <div className="mission-detail-text">
              <h2 className="mission-detail-title">Notre mission</h2>
              <p className="mission-detail-subtitle">
                Rendre le don accessible à tous, partout et rapidement
              </p>

              <ul className="mission-detail-list">
                <li>
                  <strong>Une plateforme locale et de proximité.</strong>
                  <p>Notre système de géolocalisation vous permet de trouver et donner des objets près de chez vous, réduisant ainsi les déplacements et l'empreinte carbone.</p>
                </li>

                <li>
                  <strong>Une expérience utilisateur simplifiée.</strong>
                  <p>Notre interface intuitive permet de publier une annonce ou de contacter un donneur en quelques clics seulement.</p>
                </li>

                <li>
                  <strong>Un environnement sécurisé et bienveillant.</strong>
                  <p>Notre système de notation des utilisateurs et notre messagerie sécurisée garantissent des échanges en toute confiance.</p>
                </li>
              </ul>

              <Link to="/post-ad" className="donate-receive-button">
                Donner et recevoir
              </Link>
            </div>

            <div className="mission-detail-image">
              <div className="mission-detail-image-placeholder"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto-section">
        <div className="container">
          <h2 className="manifesto-title">NOTRE VISION POUR LE MAROC</h2>

          <div className="manifesto-content">
            <p>
              Au Maroc, comme partout dans le monde, nous faisons face à des défis environnementaux et sociaux majeurs. La surconsommation
              et le gaspillage des ressources menacent notre avenir commun, tandis que les inégalités économiques persistent.
            </p>

            <p>
              Nous croyons fermement que de petites actions, multipliées à grande échelle, peuvent engendrer des changements profonds.
              Chaque objet donné plutôt que jeté représente une victoire pour notre environnement et notre société.
            </p>

            <p>
              Notre vision est celle d'un Maroc où la générosité et le partage font partie intégrante de notre quotidien. Un pays où
              les objets circulent librement entre ceux qui n'en ont plus l'utilité et ceux qui en ont besoin, créant ainsi un cycle
              vertueux de solidarité et de durabilité.
            </p>

            <p>
              En développant Matlou7ch, nous aspirons à créer un mouvement national qui transforme notre rapport aux objets et à la
              consommation. Nous voulons inspirer chaque Marocain à se demander, avant de jeter un objet : "Quelqu'un pourrait-il
              en avoir besoin ?"
            </p>

            <p className="manifesto-highlight">
              Ne jetons plus, donnons !
            </p>
          </div>
        </div>
      </section>

      <section className="values-red-section">
        <div className="container">
          <div className="values-content">
            <div className="values-left">
              <h2 className="values-red-title">Nos valeurs</h2>
              <p className="values-red-subtitle">Ce qui guide chacune de nos actions</p>
            </div>

            <div className="values-right">
              <div className="value-item">
                <h3 className="value-name">Solidarité</h3>
                <p className="value-description">
                  Nous croyons au pouvoir du don pour créer des liens sociaux et renforcer le tissu communautaire marocain.
                </p>
              </div>

              <div className="value-item">
                <h3 className="value-name">Durabilité</h3>
                <p className="value-description">
                  Chaque objet réutilisé contribue à préserver nos ressources naturelles et à réduire notre impact environnemental collectif.
                </p>
              </div>

              <div className="value-item">
                <h3 className="value-name">Innovation</h3>
                <p className="value-description">
                  Nous utilisons la technologie pour faciliter et démocratiser le don d'objets, rendant cette pratique accessible à tous.
                </p>
              </div>

              <div className="value-item">
                <h3 className="value-name">Confiance</h3>
                <p className="value-description">
                  Nous créons un environnement sécurisé où chacun peut donner et recevoir en toute sérénité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2 className="section-title">L'Équipe Matlou7ch</h2>
          <p className="team-intro">
            Nous sommes une équipe de jeunes professionnels marocains passionnés par l'innovation sociale
            et l'économie circulaire, déterminés à faire du don d'objets une pratique courante au Maroc.
          </p>
          <div className="team-cta">
            <p>Vous partagez notre vision et souhaitez contribuer à notre mission ?</p>
            <a href="/contact" className="contact-button">Contactez-nous</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotreADN;

