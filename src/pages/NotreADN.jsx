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
              Une conviction, une mission et des femmes et des hommes qui 
              travaillent en coulisse pour créer une communauté où l'on 
              donne les objets plutôt que de les jeter.
            </p>
          </div>
          <div className="hero-image-container">
            <img 
              src="image.png" 
              alt="Illustration de notre mission" 
              className="hero-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/500x300?text=Notre+ADN';
              }}
            />
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
              Créée en 2023 par une équipe de jeunes entrepreneurs marocains, Matlou7ch.ma est la première plateforme 
              gratuite de dons d'objets au Maroc, réunissant près de 10 000 membres. Notre plateforme vise à réduire le gaspillage 
              et à promouvoir l'économie circulaire, une entreprise sociale créée avec la conviction que chaque objet mérite une seconde vie.
            </p>
            
            <p>
              Dans cette lignée, Matlou7ch a pour mission de faire du don d'objets une norme.
            </p>
            
            <p>
              Une norme parce qu'aujourd'hui trop d'objets réutilisables ayant une valeur marchande sont encore jetés tandis que 
              des millions de citoyens seraient prêts à les récupérer gratuitement pour faire des économies de pouvoir d'achat. Une 
              norme parce que l'urgence écologique nous oblige à réemployer tout objet qui pourrait avoir une seconde vie et ainsi 
              éviter la production d'un nouveau déchet.
            </p>
            
            <p>
              Matlou7ch s'engage tous les jours pour faire de la seconde vie des objets un puissant levier de changement.
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
                  <strong>Un système de géolocalisation.</strong>
                  <p>Pour que vous trouviez tout ce que vous voulez à côté de chez vous.</p>
                </li>
                
                <li>
                  <strong>Donner n'a jamais été aussi simple.</strong>
                  <p>Donnez et recevez en quelques clics seulement.</p>
                </li>
                
                <li>
                  <strong>Confiance et confidentialité.</strong>
                  <p>Les utilisateurs sont notés et la messagerie est 100% sécurisée, pour vous permettre de donner et recevoir en toute sécurité.</p>
                </li>
              </ul>
              
              <Link to="/post-ad" className="donate-receive-button">
                Donner et recevoir
              </Link>
            </div>
            
            <div className="mission-detail-image">
              <img 
                src="m1s8v9otltiq73nl.png" 
                alt="Illustration de notre mission" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x400?text=Notre+Mission';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto-section">
        <div className="container">
          <h2 className="manifesto-title">DONNER. DONNER. DONNER.</h2>
          
          <div className="manifesto-content">
            <p>
              L'urgence écologique et sociale que nous vivons est sans précédent. Chaque jour, les inégalités sociales se creusent encore un peu plus. Chaque 
              jour, notre planète nous rappelle les conséquences de nos choix : mers engorgées de plastique, sols saturés de déchets, équilibres naturels 
              fragilisés.
            </p>
            
            <p>
              Au milieu de ces signaux alarmants, une réalité se dégage : nous sommes à un tournant décisif. Un tournant social, sociétal et environnemental. 
              Chaque objet jeté, chaque ressource non valorisée alourdit le poids de notre empreinte sur cette planète.
            </p>
            
            <p>
              Mais tout n'est pas perdu.
            </p>
            
            <p>
              Oui tout n'est pas perdu, car avec Matlou7ch, nous relevons un défi. Celui de, tous ensemble, inverser la tendance. Résolument et 
              audacieusement. Le défi de mettre un maximum d'utilisateurs sur la plateforme afin de créer un puissant effet de levier et amorcer un changement, 
              profond, durable, impactant. Atteindre des millions de foyers, c'est aussi supprimer potentiellement des milliers de tonnes de déchets, éviter des 
              tonnes d'émissions de CO2 et faire des millions d'économies. Ce défi, c'est l'espoir qui s'ancre dans la réalité. En insufflant une nouvelle 
              vie à chaque objet, en promouvant le don comme alternative au fait de jeter des biens réutilisables, on change de paradigme et on s'assure un 
              avenir meilleur.
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
              <p className="values-red-subtitle">Celles qui nous font nous lever<br />tous les matins !</p>
            </div>
            
            <div className="values-right">
              <div className="value-item">
                <h3 className="value-name">Solidarité</h3>
                <p className="value-description">
                  Parce que le don est une des plus belles façons de recréer du lien social.
                </p>
              </div>
              
              <div className="value-item">
                <h3 className="value-name">Durabilité</h3>
                <p className="value-description">
                  Parce que chaque don d'objet est un objet en moins de produit, et donc moins de CO² rejeté dans l'atmosphère.
                </p>
              </div>
              
              <div className="value-item">
                <h3 className="value-name">Ambition</h3>
                <p className="value-description">
                  Parce que nous sommes convaincus que le geste de donner peut amorcer un changement immense et sans précédent dans notre société.
                </p>
              </div>
              
              <div className="value-item">
                <h3 className="value-name">Audace</h3>
                <p className="value-description">
                  Parce que sans audace, point de réussite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2 className="section-title">L'Équipe Derrière Matlou7ch</h2>
          <p className="team-intro">
            Nous sommes une équipe passionnée de développeurs, designers et entrepreneurs marocains 
            unis par la conviction que le partage peut changer positivement notre société.
          </p>
          <div className="team-cta">
            <p>Vous souhaitez nous rejoindre ou en savoir plus sur notre projet ?</p>
            <a href="/contact" className="contact-button">Contactez-nous</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotreADN;

