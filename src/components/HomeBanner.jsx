import { Link } from 'react-router-dom';
import './HomeBanner.css';

const HomeBanner = () => {
    return (
        <section className="home-banner">
            <div className="home-banner-container">
                <div className="home-banner-left">
                    <h1 className="home-banner-title">
                        <span className="accent">La première</span> plateforme marocaine où tout se donne <span className="accent">gratuitement 100%</span> !
                    </h1>
                    <p className="home-banner-subtitle">
                        Rejoignez notre communauté engagée et donnez une seconde vie à vos objets tout en aidant les autres.
                    </p>
                    <div className="home-banner-actions">
                        <Link to="/catalogue">
                            <button className="banner-primary-btn">Découvrir les dons</button>
                        </Link>
                        <Link to="/faq">
                            <button className="banner-secondary-btn">Comment ça marche ?</button>
                        </Link>
                    </div>
                </div>
                <div className="home-banner-right">
                    <img
                        src="/image.png"
                        alt="Donation and Community"
                        className="banner-image"
                    />
                </div>
            </div>
        </section>
    );
};

export default HomeBanner;
