import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // États du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Récupérer l'URL de redirection
  const from = location.state?.from?.pathname || '/';

  // Message de redirection
  const [redirectMessage, setRedirectMessage] = useState('');

  useEffect(() => {
    if (location.state?.from) {
      const path = location.state.from.pathname;
      if (path.includes('/favoris')) setRedirectMessage('Connectez-vous pour accéder à vos favoris');
      else if (path.includes('/messages')) setRedirectMessage('Connectez-vous pour accéder à vos messages');
      else if (path.includes('/post-ad')) setRedirectMessage('Connectez-vous pour donner un objet');
      else setRedirectMessage('Connectez-vous pour accéder à cette fonctionnalité');
    }
  }, [location]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Veuillez remplir tous les champs');
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      if (err.message && err.message.includes("Email not confirmed")) {
        setError("Veuillez confirmer votre email avant de vous connecter.");
      } else if (err.message && err.message.includes("Invalid login credentials")) {
        setError("Email ou mot de passe incorrect.");
      } else {
        setError('Une erreur est survenue (' + (err.message || 'Erreur inconnue') + ')');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Matlou7ch</h1>
        <h2 className="login-slogan">Donnez, recevez, partagez</h2>
        <p className="login-subtitle">Rejoignez la communauté de partage d'objets gratuits au Maroc</p>

        {redirectMessage && (
          <div className="redirect-message">
            {redirectMessage}
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleEmailLogin} className="email-login-form">
          <div className="form-group">
            <label htmlFor="email"><FaEnvelope /> Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"><FaLock /> Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="register-prompt">
          Vous n'avez pas de compte ?
          <Link to="/inscription" className="create-account-link">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
