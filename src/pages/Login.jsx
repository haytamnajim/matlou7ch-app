import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaInfoCircle,
  FaExclamationCircle,
  FaGift,
  FaUsers,
  FaLeaf,
  FaArrowRight
} from 'react-icons/fa';
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
      {/* Halos lumineux d'ambiance en arrière-plan */}
      <div className="login-ambient-blob login-blob-1" />
      <div className="login-ambient-blob login-blob-2" />

      <div className="login-card-container">
        {/* ── Panneau Gauche : Valeurs & Impact ── */}
        <div className="login-brand-panel">
          <div className="login-brand-content">
            <div className="login-pill-badge">
              <FaLeaf className="pill-badge-icon" />
              <span>Anti-gaspillage & Solidarité au Maroc</span>
            </div>

            <h2 className="login-brand-title">
              Donnez, partagez,<br />
              <span className="text-gradient-sage">faites le bien.</span>
            </h2>

            <p className="login-brand-desc">
              Rejoignez des milliers de citoyens qui donnent une seconde vie à leurs objets et participent à une économie circulaire bienveillante.
            </p>

            {/* Statistiques clés intégrées */}
            <div className="login-stats-grid">
              <div className="login-stat-card">
                <div className="stat-card-icon">
                  <FaGift />
                </div>
                <div>
                  <span className="stat-card-number">+5 000</span>
                  <span className="stat-card-label">Objets donnés</span>
                </div>
              </div>

              <div className="login-stat-card">
                <div className="stat-card-icon">
                  <FaUsers />
                </div>
                <div>
                  <span className="stat-card-number">+12 000</span>
                  <span className="stat-card-label">Membres actifs</span>
                </div>
              </div>
            </div>

            <div className="login-trust-quote">
              <span className="trust-dot" />
              <span>Plateforme 100% gratuite, sans frais ni commission</span>
            </div>
          </div>
        </div>

        {/* ── Panneau Droit : Formulaire de connexion ── */}
        <div className="login-form-panel">
          <div className="login-form-box">
            <div className="login-header-group">
              <h1 className="login-title">
                Bon retour parmi nous <span className="wave-emoji">👋</span>
              </h1>
              <p className="login-subtitle">
                Entrez vos identifiants pour accéder à votre compte.
              </p>
            </div>

            {redirectMessage && (
              <div className="login-notice-banner">
                <FaInfoCircle className="notice-icon" />
                <span>{redirectMessage}</span>
              </div>
            )}

            {error && (
              <div className="login-error-banner">
                <FaExclamationCircle className="error-icon" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="login-form-body">
              <div className="login-field-group">
                <label htmlFor="login-email" className="login-field-label">
                  Adresse Email
                </label>
                <div className="login-input-shell">
                  <FaEnvelope className="field-icon" />
                  <input
                    type="email"
                    id="login-email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@email.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="login-field-group">
                <div className="login-field-header">
                  <label htmlFor="login-password" className="login-field-label">
                    Mot de passe
                  </label>
                </div>
                <div className="login-input-shell">
                  <FaLock className="field-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="login-eye-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    tabIndex="-1"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? (
                  <span className="submit-loading-wrap">
                    <span className="login-spinner" />
                    Connexion en cours...
                  </span>
                ) : (
                  <span className="submit-content-wrap">
                    <span>Se connecter</span>
                    <FaArrowRight className="submit-arrow" />
                  </span>
                )}
              </button>
            </form>

            <div className="login-card-divider">
              <span>ou</span>
            </div>

            <div className="login-signup-prompt">
              <span>Vous n'avez pas encore de compte ?</span>
              <Link to="/inscription" className="signup-link-btn">
                Créer un compte gratuitement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
