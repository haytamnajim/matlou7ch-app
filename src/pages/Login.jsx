import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupérer l'URL de redirection après connexion
  const from = location.state?.from?.pathname || '/';

  const handleSocialLogin = (provider) => {
    // Simulation de connexion sociale (à remplacer par votre API)
    console.log(`Connexion avec ${provider}`);
    login({ id: 2, name: `Utilisateur ${provider}`, email: `user@${provider.toLowerCase()}.com` });
    navigate(from, { replace: true });
  };

  const handleEmailLogin = () => {
    // Rediriger vers le formulaire de connexion par email
    navigate('/connexion-email');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Connexion</h1>
        
        <h2 className="login-slogan">Ne jetons plus, donnons !</h2>
        <p className="login-subtitle">Rejoignez la communauté pour donner et trouver des objets autour de vous</p>
        
        <div className="social-login-buttons">
          <button 
            className="facebook-login-button"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <div className="social-icon facebook-icon"></div>
            Continuer avec Facebook
          </button>
          
          <button 
            className="google-login-button"
            onClick={() => handleSocialLogin('Google')}
          >
            <div className="social-icon google-icon"></div>
            Continuer avec Google
          </button>
        </div>
        
        <div className="separator">
          <span className="separator-line"></span>
          <span className="separator-text">ou</span>
          <span className="separator-line"></span>
        </div>
        
        <button 
          className="email-login-button"
          onClick={handleEmailLogin}
        >
          Se connecter avec email
        </button>
        
        <div className="register-prompt">
          <p>Je n'ai pas encore de compte</p>
          <Link to="/inscription" className="create-account-link">
            Créer mon compte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
