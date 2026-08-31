import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';
import { validateLoginForm, sanitizeEmail } from '../utils/validation';
import { checkRateLimit } from '../utils/rateLimit';
import { initializeCSRFProtection } from '../utils/csrf';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // États du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Récupérer l'URL de redirection
  const from = location.state?.from?.pathname || '/';

  // Message de redirection
  const [redirectMessage, setRedirectMessage] = useState('');

  // Initialiser la protection CSRF
  useEffect(() => {
    initializeCSRFProtection();
  }, []);

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
    <div className="login-page-wrapper">
      {/* Éléments d'arrière-plan décoratifs */}
      <div className="login-bg-blob blob-1"></div>
      <div className="login-bg-blob blob-2"></div>

      <div className="login-card">
        {/* En-tête avec Logo et Marque */}
        <div className="login-header">
          <Link to="/" className="login-logo-link">
            <img src="/imageLOGO.png" alt="Matlou7ch Logo" className="login-logo-img" />
            <span className="login-logo-text">Matlou7ch</span>
          </Link>
          <h1 className="login-main-title">Bon retour parmi nous !</h1>
          <p className="login-subtext">Connectez-vous pour donner, recevoir et partager des objets gratuits au Maroc.</p>
        </div>

        {/* Message d'info de redirection */}
        {redirectMessage && (
          <div className="login-alert info">
            <FaInfoCircle className="alert-icon" />
            <span>{redirectMessage}</span>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="login-alert error">
            <FaExclamationCircle className="alert-icon" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulaire de connexion */}
        <form onSubmit={handleEmailLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">Adresse Email</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Mot de passe</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="input-field password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                tabIndex="-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-button" disabled={loading}>
            {loading ? (
              <span className="btn-loading-content">
                <span className="btn-spinner"></span>
                Connexion en cours...
              </span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="login-divider">
          <span>ou</span>
        </div>

        {/* Pied de page du formulaire : Inscription */}
        <div className="login-footer-prompt">
          <span>Vous n'avez pas encore de compte ?</span>
          <Link to="/inscription" className="register-link">
            Créer un compte gratuitement
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
