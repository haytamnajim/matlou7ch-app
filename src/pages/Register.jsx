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
  FaCheck,
  FaLeaf,
  FaArrowRight,
  FaShieldAlt,
  FaBolt,
  FaGift,
  FaUsers
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

  useEffect(() => {
    initializeCSRFProtection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const sanitizedData = {
      name: sanitizeName(pseudo),
      email: sanitizeEmail(email),
      phone: sanitizePhone(phone),
      password: password,
      city: sanitizeCity(city)
    };

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
      <div className="register-ambient-blob reg-blob-1" />
      <div className="register-ambient-blob reg-blob-2" />

      <div className="register-card-container">
        {/* ── Panneau Gauche : Valeurs & Impact avec fond cinématique ── */}
        <div className="register-brand-panel">
          <div
            className="register-brand-bg-layer"
            style={{
              backgroundImage: 'linear-gradient(145deg, rgba(14, 25, 17, 0.86) 0%, rgba(9, 16, 11, 0.94) 100%), url(/donner3.png)'
            }}
          />
          <div className="register-brand-content">
            <div className="register-brand-pill">
              <FaLeaf className="pill-badge-icon" />
              <span>100% Solidaire &amp; Écologique</span>
            </div>

            <h2 className="register-brand-title">
              Rejoignez le mouvement,<br />
              <span className="text-gradient-sage">partagez le bonheur.</span>
            </h2>

            <p className="register-brand-desc">
              Donnez une seconde vie à vos objets, faites de la place chez vous et aidez une personne près de chez vous partout au Maroc.
            </p>

            <div className="register-perks-list">
              <div className="register-perk-item">
                <div className="perk-icon-circle">
                  <FaBolt />
                </div>
                <div className="perk-text">
                  <strong>Inscription en 1 minute</strong>
                  <span>Zéro frais, zéro commission</span>
                </div>
              </div>

              <div className="register-perk-item">
                <div className="perk-icon-circle">
                  <FaShieldAlt />
                </div>
                <div className="perk-text">
                  <strong>Communauté de confiance</strong>
                  <span>Comptes vérifiés &amp; messagerie sécurisée</span>
                </div>
              </div>

              <div className="register-perk-item">
                <div className="perk-icon-circle">
                  <FaMapMarkerAlt />
                </div>
                <div className="perk-text">
                  <strong>Partout au Maroc</strong>
                  <span>12 Régions, des milliers de dons locaux</span>
                </div>
              </div>
            </div>

            <div className="register-trust-badge">
              <span className="trust-dot" />
              <span>Déjà plus de +12 000 membres solidaires actifs</span>
            </div>
          </div>
        </div>

        {/* ── Panneau Droit : Formulaire d'inscription ── */}
        <div className="register-form-panel">
          {/* Barre supérieure avec retour */}
          <div className="register-top-bar">
            <Link to="/connexion" className="register-back-btn">
              <FaChevronLeft className="back-chevron" />
              <span>Retour à la connexion</span>
            </Link>

            <div className="register-pill-badge">
              <FaLeaf className="badge-leaf" />
              <span>100% Gratuit</span>
            </div>
          </div>

          {/* En-tête principal */}
          <div className="register-header-group">
            <h1 className="register-main-title">
              Rejoignez la communauté <span className="wave-leaf">🌱</span>
            </h1>
            <p className="register-subtitle">
              Créez votre compte gratuit pour donner, réserver et échanger partout au Maroc.
            </p>
          </div>

          {error && (
            <div className="register-error-banner">
              <span>{error}</span>
            </div>
          )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-grid">
            {/* Ligne 1 : Identité */}
            <div className="register-input-group">
              <label htmlFor="pseudo" className="register-label">
                Pseudo / Nom d'affichage <span className="req-star">*</span>
              </label>
              <div className="register-input-shell">
                <FaUser className="reg-field-icon" />
                <input
                  type="text"
                  id="pseudo"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  placeholder="Ex: Yassine_Casa"
                  required
                />
              </div>
              <span className="register-field-hint">De 2 à 30 caractères</span>
            </div>

            <div className="register-input-group">
              <label htmlFor="email" className="register-label">
                Adresse email <span className="req-star">*</span>
              </label>
              <div className="register-input-shell">
                <FaEnvelope className="reg-field-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  required
                  autoComplete="email"
                />
              </div>
              <span className="register-field-hint">Utilisée pour confirmer votre compte</span>
            </div>

            {/* Ligne 2 : Coordonnées (Téléphone & Ville ensemble) */}
            <div className="register-input-group">
              <label htmlFor="phone" className="register-label">
                Numéro de téléphone <span className="req-star">*</span>
              </label>
              <div className="register-input-shell">
                <FaPhone className="reg-field-icon" />
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="06XXXXXXXX ou 07XXXXXXXX"
                  required
                />
              </div>
              <span className="register-field-hint">Format marocain valide</span>
            </div>

            <div className="register-input-group">
              <label htmlFor="city" className="register-label">
                Ville de résidence <span className="req-star">*</span>
              </label>
              <div className="register-input-shell">
                <FaMapMarkerAlt className="reg-field-icon" />
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Casablanca, Rabat, Fès..."
                  required
                />
              </div>
              <span className="register-field-hint">Pour trouver des dons proches de vous</span>
            </div>

            {/* Ligne 3 : Sécurité (Plein écran ou double) */}
            <div className="register-input-group full-width">
              <label htmlFor="password" className="register-label">
                Mot de passe <span className="req-star">*</span>
              </label>
              <div className="register-input-shell">
                <FaLock className="reg-field-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choisissez un mot de passe robuste"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="register-eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  tabIndex="-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <span className="register-field-hint">Au moins 6 caractères recommandés</span>
            </div>
          </div>

          {/* Section Conditions Générales & Checkboxes */}
          <div className="register-consent-section">
            <label className="register-check-item">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <span className="custom-box">
                <FaCheck className="box-check-icon" />
              </span>
              <span className="check-label-text">
                J'accepte les{' '}
                <Link to="/cgu" className="consent-link" target="_blank">
                  Conditions Générales
                </Link>{' '}
                et la{' '}
                <Link to="/confidentialite" className="consent-link" target="_blank">
                  Politique de Confidentialité
                </Link>
                . <span className="req-star">*</span>
              </span>
            </label>

            <label className="register-check-item">
              <input
                type="checkbox"
                id="rejectNewsletter"
                checked={rejectNewsletter}
                onChange={(e) => setRejectNewsletter(e.target.checked)}
              />
              <span className="custom-box">
                <FaCheck className="box-check-icon" />
              </span>
              <span className="check-label-text">Je ne souhaite pas recevoir la newsletter</span>
            </label>

            <label className="register-check-item">
              <input
                type="checkbox"
                id="rejectNotifications"
                checked={rejectNotifications}
                onChange={(e) => setRejectNotifications(e.target.checked)}
              />
              <span className="custom-box">
                <FaCheck className="box-check-icon" />
              </span>
              <span className="check-label-text">Je ne souhaite pas recevoir de notifications promotionnelles</span>
            </label>
          </div>

          {/* Bouton de validation */}
          <button type="submit" className="register-submit-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="submit-loading-content">
                <span className="reg-loader-spinner" /> Création du compte en cours...
              </span>
            ) : (
              <span className="submit-normal-content">
                <span>Créer mon compte</span>
                <FaArrowRight className="btn-arrow-icon" />
              </span>
            )}
          </button>
        </form>

        {/* Pied de carte */}
        <div className="register-card-bottom">
          <span>Vous possédez déjà un compte ?</span>{' '}
          <Link to="/connexion" className="bottom-login-link">
            Se connecter
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
