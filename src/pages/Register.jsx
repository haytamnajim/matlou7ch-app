import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

function Register() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [rejectNewsletter, setRejectNewsletter] = useState(false);
  const [rejectNotifications, setRejectNotifications] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation basique
    if (!pseudo || !email || !password || !city || !phone) {
      setError('Veuillez remplir tous les champs');
      setIsSubmitting(false);
      return;
    }

    if (pseudo.length < 2 || pseudo.length > 30) {
      setError('Le pseudo doit contenir entre 2 et 30 caractères');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) { // Supabase requiert 6 char min par défaut
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setIsSubmitting(false);
      return;
    }

    // Validation du numéro de téléphone (format marocain)
    const phoneRegex = /^(0|\+212)[5-7][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      setError('Veuillez entrer un numéro de téléphone valide');
      setIsSubmitting(false);
      return;
    }

    if (!acceptTerms) {
      setError('Vous devez accepter les conditions générales');
      setIsSubmitting(false);
      return;
    }

    // Inscription avec Supabase
    try {
      const { user, session } = await register({
        name: pseudo,
        email,
        password,
        phone,
        city
      });

      // Si l'inscription réussit mais pas de session (email confirm required), informer l'utilisateur
      if (user && !session) {
        alert('Compte créé avec succès ! Veuillez vérifier votre email pour confirmer votre inscription.');
        navigate('/connexion');
      } else {
        // Redirection directe
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      if (err.message.includes('User already registered')) {
        setError('Un compte existe déjà avec cette adresse email.');
      } else {
        setError('Une erreur est survenue lors de l\'inscription : ' + err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="back-button">
          <Link to="/connexion"><FaChevronLeft /></Link>
        </div>

        <h1 className="register-title">Créer mon compte</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Colonne Gauche */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="pseudo">
                  <FaUser /> Pseudo
                </label>
                <input
                  type="text"
                  id="pseudo"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  placeholder="Choisissez un pseudo"
                  required
                />
                <div className="input-hint">De 2 à 30 caractères.</div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhone /> Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="06XXXXXXXX"
                  required
                />
                <div className="input-hint">Format marocain valide.</div>
              </div>

              <div className="form-group">
                <label htmlFor="city">
                  <FaMapMarkerAlt /> Ville
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Votre ville"
                  required
                />
              </div>
            </div>

            {/* Colonne Droite */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: nom@exemple.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <FaLock /> Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Créer un mot de passe"
                  required
                />
                <div className="input-hint">6 caractères minimum.</div>
              </div>
            </div>
          </div>

          <div className="checkbox-section">
            <div className="checkbox-group">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                  style={{ marginTop: '4px', flexShrink: 0 }}
                />
                <span>
                  J'accepte les <Link to="/cgu" className="link-highlight">Conditions Générales</Link> et la <Link to="/confidentialite" className="link-highlight">Politique de Confidentialité</Link>
                </span>
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rejectNewsletter"
                checked={rejectNewsletter}
                onChange={(e) => setRejectNewsletter(e.target.checked)}
              />
              <label htmlFor="rejectNewsletter">
                Je ne souhaite pas recevoir la newsletter
              </label>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rejectNotifications"
                checked={rejectNotifications}
                onChange={(e) => setRejectNotifications(e.target.checked)}
              />
              <label htmlFor="rejectNotifications">
                Je ne souhaite pas recevoir de notifications
              </label>
            </div>
          </div>

          <button type="submit" className="register-button" disabled={isSubmitting}>
            {isSubmitting ? 'Inscription en cours...' : 'Valider mon inscription'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
