import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaArrowLeft, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import './AdminLogin.css';

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simuler une vérification d'authentification
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Dans une application réelle, vous feriez un appel API ici
      const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'admin@matlou7ch.ma';
      const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';
      
      if (credentials.email === adminEmail && credentials.password === adminPassword) {
        // Stocker le token d'authentification dans localStorage ou un cookie
        localStorage.setItem('adminToken', 'sample-admin-token');
        navigate('/admin');
      } else {
        setError('Identifiants administrateur incorrects');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* Halo lumineux d'arrière-plan */}
      <div className="admin-ambient-glow glow-1"></div>
      <div className="admin-ambient-glow glow-2"></div>

      <div className="admin-login-card">
        {/* Badge & Titre de sécurité */}
        <div className="admin-login-header">
          <div className="admin-security-badge">
            <FaShieldAlt className="shield-icon" />
            <span>ACCÈS SÉCURISÉ</span>
          </div>

          <div className="admin-brand-row">
            <img src="/imageLOGO.png" alt="Matlou7ch Logo" className="admin-brand-logo" />
            <span className="admin-brand-name">Matlou7ch Admin</span>
          </div>

          <h1 className="admin-heading">Console d'Administration</h1>
          <p className="admin-subheading">Connectez-vous pour gérer les annonces, les utilisateurs et les signalements.</p>
        </div>

        {/* Message d'erreur stylisé */}
        {error && (
          <div className="admin-error-box">
            <FaExclamationTriangle className="admin-error-icon" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulaire de connexion admin */}
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-input-group">
            <label htmlFor="admin-email" className="admin-input-label">Email Administrateur</label>
            <div className="admin-input-wrapper">
              <FaEnvelope className="admin-field-icon" />
              <input
                type="email"
                id="admin-email"
                name="email"
                className="admin-input"
                value={credentials.email}
                onChange={handleChange}
                placeholder="admin@matlou7ch.ma"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label htmlFor="admin-password" className="admin-input-label">Mot de passe</label>
            <div className="admin-input-wrapper">
              <FaLock className="admin-field-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="admin-password"
                name="password"
                className="admin-input admin-password-input"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-pwd-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer mot de passe" : "Afficher mot de passe"}
                tabIndex="-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="admin-btn-loader">
                <span className="admin-spinner"></span>
                Vérification des accès...
              </span>
            ) : (
              'Accéder au Dashboard'
            )}
          </button>
        </form>

        {/* Pied de carte avec lien de retour */}
        <div className="admin-card-footer">
          <Link to="/" className="admin-back-btn">
            <FaArrowLeft /> Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

