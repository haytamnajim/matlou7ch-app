import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupérer l'URL de redirection après connexion
  const from = location.state?.from?.pathname || '/';
  
  // État pour afficher un message si l'utilisateur a été redirigé
  const [redirectMessage, setRedirectMessage] = useState('');
  
  // Vérifier si l'utilisateur a été redirigé depuis une page protégée
  React.useEffect(() => {
    if (location.state?.from) {
      // Déterminer le message en fonction de la page d'origine
      const path = location.state.from.pathname;
      
      if (path.includes('/favoris')) {
        setRedirectMessage('Connectez-vous pour accéder à vos favoris');
      } else if (path.includes('/messages')) {
        setRedirectMessage('Connectez-vous pour accéder à vos messages');
      } else if (path.includes('/post-ad')) {
        setRedirectMessage('Connectez-vous pour donner un objet');
      } else {
        setRedirectMessage('Connectez-vous pour accéder à cette fonctionnalité');
      }
    }
  }, [location]);

  const handleSocialLogin = (provider) => {
    // Simulation de connexion sociale
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
        <h1 className="login-title">Matlou7ch</h1>
        <h2 className="login-slogan">Donnez, recevez, partagez</h2>
        <p className="login-subtitle">Rejoignez la communauté de partage d'objets gratuits au Maroc</p>
        
        {/* Message de redirection si nécessaire */}
        {redirectMessage && (
          <div className="redirect-message">
            {redirectMessage}
          </div>
        )}
        
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
          
          <button 
            className="email-login-button"
            onClick={handleEmailLogin}
          >
            Continuer avec un email
          </button>
        </div>
        
        <div className="separator">
          <div className="separator-line"></div>
          <div className="separator-text">ou</div>
          <div className="separator-line"></div>
        </div>
        
        <div className="register-prompt">
          Vous n'avez pas de compte ?
          <Link to="/inscription" className="create-account-link">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

