import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaChevronLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaCheck
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { validateRegisterForm, sanitizeEmail, sanitizePhone, sanitizeName, sanitizeCity } from '../utils/validation';
import { checkRateLimit } from '../utils/rateLimit';
import { initializeCSRFProtection } from '../utils/csrf';
import './Register.css';

function Register() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [city, setCity] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [rejectNewsletter, setRejectNewsletter] = useState(false);
  const [rejectNotifications, setRejectNotifications] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Initialiser la protection CSRF
  useEffect(() => {
    initializeCSRFProtection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Sanitize les données
    const sanitizedData = {
      name: sanitizeName(pseudo),
      email: sanitizeEmail(email),
      phone: sanitizePhone(phone),
      password: password,
      city: sanitizeCity(city)
    };

    // Valider le formulaire
    const validation = validateRegisterForm(sanitizedData);
    if (!validation.valid) {
      const firstError = Object.values(validation.errors)[0];
      setError(firstError);
      setIsSubmitting(false);
      return;
    }

    if (!acceptTerms) {
      setError('Vous devez accepter les conditions générales pour créer un compte.');
      setIsSubmitting(false);
      return;
    }

    // Vérifier le rate limiting
    const rateLimitCheck = checkRateLimit('register', sanitizedData.email);
    if (!rateLimitCheck.allowed) {
      if (rateLimitCheck.blocked) {
        const blockedMinutes = Math.ceil((rateLimitCheck.resetTime - Date.now()) / 60000);
        setError(`Trop de tentatives d'inscription. Réessayez dans ${blockedMinutes} minute(s).`);
      } else {
        setError('Trop de tentatives. Veuillez réessayer plus tard.');
      }
      setIsSubmitting(false);
      return;
    }

    try {
      const { user, session } = await register({
        name: sanitizedData.name,
        email: sanitizedData.email,
        password: sanitizedData.password,
        phone: sanitizedData.phone,
        city: sanitizedData.city
      });

      if (user && !session) {
        alert('Compte créé avec succès ! Veuillez vérifier vos emails pour confirmer votre inscription.');
        navigate('/connexion');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      if (err.message && err.message.includes('User already registered')) {
        setError('Un compte existe déjà avec cette adresse email.');
      } else {
        setError('Une erreur est survenue lors de l\'inscription : ' + (err.message || 'Erreur inconnue'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      {/* Halos lumineux d'ambiance */}
      <div className="register-bg-blob blob-1" />
      <div className="register-bg-blob blob-2" />

      <div className="register-glass-card">
        {/* Bouton retour */}
        <Link to="/connexion" className="register-back-link" aria-label="Retour à la connexion">
          <FaChevronLeft />
        </Link>

        {/* En-tête avec logo */}
        <div className="register-brand-header">
          <Link to="/" className="register-logo-link">
            <img src="/imageLOGO.png" alt="Matlou7ch Logo" className="register-brand-logo" />
            <span className="register-brand-name">MATLOU7CH</span>
          </Link>
          <h1 className="register-card-title">Rejoignez la communauté</h1>
          <p className="register-card-subtitle">
            Créez votre compte gratuit en 1 minute pour donner et recevoir.
          </p>
        </div>

        {error && <div className="register-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-fields-grid">
            {/* Colonne Gauche */}
            <div className="register-grid-col">
              <div className="register-input-group">
                <label htmlFor="pseudo">Pseudo / Nom d'affichage *</label>
                <div className="reg-input-wrap">
                  <FaUser className="reg-icon" />
                  <input
                    type="text"
                    id="pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    placeholder="Ex: Yassine_Casa"
                    required
                  />
                </div>
                <span className="reg-hint">De 2 à 30 caractères</span>
              </div>

              <div className="register-input-group">
                <label htmlFor="phone">Numéro de téléphone *</label>
                <div className="reg-input-wrap">
                  <FaPhone className="reg-icon" />
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06XXXXXXXX"
                    required
                  />
                </div>
                <span className="reg-hint">Format marocain valide</span>
              </div>

              <div className="register-input-group">
                <label htmlFor="city">Ville de résidence *</label>
                <div className="reg-input-wrap">
                  <FaMapMarkerAlt className="reg-icon" />
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: Casablanca, Rabat, Marrakech..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Colonne Droite */}
            <div className="register-grid-col">
              <div className="register-input-group">
                <label htmlFor="email">Adresse email *</label>
                <div className="reg-input-wrap">
                  <FaEnvelope className="reg-icon" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    required
                  />
                </div>
              </div>

              <div className="register-input-group">
                <label htmlFor="password">Mot de passe *</label>
                <div className="reg-input-wrap">
                  <FaLock className="reg-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Au moins 6 caractères"
                    required
                  />
                  <button
                    type="button"
                    className="reg-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Masquer' : 'Afficher'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <span className="reg-hint">6 caractères minimum</span>
              </div>
            </div>
          </div>

          {/* Checkboxes Conditions */}
          <div className="register-checkboxes-block">
            <label className="custom-check-row">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <span className="check-custom-box">
                <FaCheck className="check-mark-icon" />
              </span>
              <span className="check-text">
                J'accepte les{' '}
                <Link to="/cgu" className="reg-highlight-link" target="_blank">
                  Conditions Générales
                </Link>{' '}
                et la{' '}
                <Link to="/confidentialite" className="reg-highlight-link" target="_blank">
                  Politique de Confidentialité
                </Link>
                . *
              </span>
            </label>

            <label className="custom-check-row">
              <input
                type="checkbox"
                id="rejectNewsletter"
                checked={rejectNewsletter}
                onChange={(e) => setRejectNewsletter(e.target.checked)}
              />
              <span className="check-custom-box">
                <FaCheck className="check-mark-icon" />
              </span>
              <span className="check-text">Je ne souhaite pas recevoir la newsletter</span>
            </label>

            <label className="custom-check-row">
              <input
                type="checkbox"
                id="rejectNotifications"
                checked={rejectNotifications}
                onChange={(e) => setRejectNotifications(e.target.checked)}
              />
              <span className="check-custom-box">
                <FaCheck className="check-mark-icon" />
              </span>
              <span className="check-text">Je ne souhaite pas recevoir de notifications</span>
            </label>
          </div>

          <button type="submit" className="register-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="btn-loading-content">
                <span className="reg-spinner" /> Création du compte...
              </span>
            ) : (
              'Valider mon inscription'
            )}
          </button>
        </form>

        <div className="register-card-footer">
          <span>Vous avez déjà un compte ?</span>{' '}
          <Link to="/connexion" className="reg-footer-link">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
