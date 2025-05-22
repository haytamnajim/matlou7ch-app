import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

function Register() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [rejectNewsletter, setRejectNewsletter] = useState(false);
  const [rejectNotifications, setRejectNotifications] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validation basique
    if (!pseudo || !email || !password || !city) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    if (pseudo.length < 2 || pseudo.length > 30) {
      setError('Le pseudo doit contenir entre 2 et 30 caractères');
      return;
    }
    
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    if (!acceptTerms) {
      setError('Vous devez accepter les conditions générales');
      return;
    }
    
    // Simulation d'inscription
    try {
      register({ name: pseudo, email, password, city });
      navigate('/');
    } catch (error) {
      setError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="back-button">
          <Link to="/connexion">←</Link>
        </div>
        
        <h1 className="register-title">Créer mon compte</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pseudo">Pseudo</label>
            <input
              type="text"
              id="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              placeholder="Choisissez un pseudo"
              required
            />
            <div className="input-hint">De 2 à 30 caractères comprenant des lettres, chiffres, espaces ou tirets.</div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Créer un mot de passe"
              required
            />
            <div className="input-hint">8 caractères min. 64 caractères max. 1 min. 1 maj. 1 chiffre</div>
          </div>
          
          <div className="form-group">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Entrez le nom de votre ville"
              required
            />
          </div>
          
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
            <label htmlFor="acceptTerms">
              En vous inscrivant, vous acceptez les <Link to="/cgu" className="link-highlight">CGU</Link> et la <Link to="/confidentialite" className="link-highlight">politique de confidentialité</Link>
            </label>
          </div>
          
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="rejectNewsletter"
              checked={rejectNewsletter}
              onChange={(e) => setRejectNewsletter(e.target.checked)}
            />
            <label htmlFor="rejectNewsletter">
              En cochant cette case, je confirme que je ne souhaite pas recevoir de newsletter de la part de Matlou7ch
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
              En cochant cette case, je confirme que je ne souhaite pas recevoir de notification de la part de Matlou7ch
            </label>
          </div>
          
          <button type="submit" className="register-button">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
