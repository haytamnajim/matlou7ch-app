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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState('');

  const from = location.state?.from?.pathname || '/';

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
    const sanitizedEmail = sanitizeEmail(email);
    const validation = validateLoginForm({ email: sanitizedEmail, password });
    if (!validation.valid) {
      return setError(validation.errors.email || validation.errors.password || 'Formulaire invalide');
    }
    const rateLimitCheck = checkRateLimit('login', sanitizedEmail);
    if (!rateLimitCheck.allowed) {
      if (rateLimitCheck.blocked) {
        const blockedMinutes = Math.ceil((rateLimitCheck.resetTime - Date.now()) / 60000);
        return setError(`Trop de tentatives. Réessayez dans ${blockedMinutes} minute(s).`);
      }
      return setError('Trop de tentatives. Veuillez réessayer plus tard.');
    }
    try {
      setError('');
      setLoading(true);
      await login(sanitizedEmail, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      if (err.message?.includes('Email not confirmed')) {
        setError('Veuillez confirmer votre email avant de vous connecter.');
      } else if (err.message?.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect.');
      } else {
        setError('Une erreur est survenue (' + (err.message || 'Erreur inconnue') + ')');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* ── Left Panel ── */}
      <div className="login-left-panel">
        <div className="login-panel-glow login-panel-glow-1" />
        <div className="login-panel-glow login-panel-glow-2" />

        <Link to="/" className="login-panel-logo">
          <img src="/imageLOGO.png" alt="Matlou7ch" className="login-panel-logo-img" />
          <span className="login-panel-logo-text">Matlou7ch</span>
        </Link>

        <div className="login-panel-content">
          <h2 className="login-panel-title">
            Donnez, <em>partagez</em>,<br />
            faites le bien.
          </h2>
          <p className="login-panel-subtitle">
            Rejoignez des milliers de Marocains qui donnent une seconde vie à leurs objets et renforcent leur communauté.
          </p>
          <div className="login-panel-stats">
            <div className="login-panel-stat">
              <span className="login-panel-stat-number">+5 000</span>
              <span className="login-panel-stat-label">Objets donnés</span>
            </div>
            <div className="login-panel-stat">
              <span className="login-panel-stat-number">+12 000</span>
              <span className="login-panel-stat-label">Membres actifs</span>
            </div>
            <div className="login-panel-stat">
              <span className="login-panel-stat-number">100%</span>
              <span className="login-panel-stat-label">Gratuit</span>
            </div>
          </div>
        </div>

        <p className="login-panel-footer">© 2024 Matlou7ch — Plateforme solidaire marocaine</p>
      </div>

      {/* ── Right Panel ── */}
      <div className="login-right-panel">
        <div className="login-card">
          <div className="login-header">
            <Link to="/" className="login-logo-link">
              <img src="/imageLOGO.png" alt="Matlou7ch Logo" className="login-logo-img" />
              <span className="login-logo-text">Matlou7ch</span>
            </Link>
            <h1 className="login-main-title">Bon retour parmi nous !</h1>
            <p className="login-subtext">
              Connectez-vous pour donner, recevoir et partager des objets gratuits au Maroc.
            </p>
          </div>

          {redirectMessage && (
            <div className="login-alert info">
              <FaInfoCircle className="alert-icon" />
              <span>{redirectMessage}</span>
            </div>
          )}

          {error && (
            <div className="login-alert error">
              <FaExclamationCircle className="alert-icon" />
              <span>{error}</span>
            </div>
          )}

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
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  tabIndex="-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-submit-button" disabled={loading}>
              {loading ? (
                <span className="btn-loading-content">
                  <span className="btn-spinner" />
                  Connexion en cours...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="login-divider"><span>ou</span></div>

          <div className="login-footer-prompt">
            <span>Vous n'avez pas encore de compte ?</span>
            <Link to="/inscription" className="register-link">
              Créer un compte gratuitement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
