import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import './Admin.css';

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dans une application réelle, vous feriez un appel API ici
      if (credentials.email === 'admin@matlouch.ma' && credentials.password === 'admin123') {
        // Stocker le token d'authentification dans localStorage ou un cookie
        localStorage.setItem('adminToken', 'sample-admin-token');
        navigate('/admin');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h1 className="admin-title">Matlou7ch Admin</h1>
            <FaLock className="lock-icon" />
            <h2>Connexion Administrateur</h2>
            <p>Veuillez vous connecter pour accéder au panneau d'administration</p>
          </div>
          
          {error && <div className="admin-login-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="admin@matlouch.ma"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="admin-login-button"
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
          
          <div className="admin-login-footer">
            <a href="#forgot-password" className="forgot-password-link">Mot de passe oublié?</a>
            <Link to="/" className="back-to-site-link">
              <FaArrowLeft className="back-icon" /> Retour au site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

