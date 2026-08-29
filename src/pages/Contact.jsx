import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaTag,
  FaCommentDots,
  FaPaperPlane,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaQuestionCircle,
  FaPlusCircle,
  FaShieldAlt,
  FaClock
} from 'react-icons/fa';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="contact-page-wrapper">
      {/* 1. Hero Header */}
      <section className="contact-hero-section">
        <div className="contact-container">
          <span className="contact-pill-badge">
            <FaEnvelope className="pill-icon" /> SERVICE RELATION MEMBRES
          </span>
          <h1 className="contact-main-title">Une question ? Un partenariat ?</h1>
          <p className="contact-main-subtitle">
            Notre équipe bénévole et technique est à votre écoute pour vous aider et répondre à toutes vos demandes.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-layout-grid">
            {/* Colonne Gauche : Coordonnées & Infos */}
            <div className="contact-info-panel">
              <div className="info-panel-header">
                <span className="panel-tag">COORDONNÉES</span>
                <h2 className="panel-title">Restons en contact</h2>
                <p className="panel-desc">
                  N'hésitez pas à nous écrire directement ou via les réseaux sociaux.
                </p>
              </div>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="detail-icon-box">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="detail-text">
                    <strong>Adresse</strong>
                    <span>Casablanca, Maroc</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon-box">
                    <FaEnvelope />
                  </div>
                  <div className="detail-text">
                    <strong>Email direct</strong>
                    <span>contact@matlou7ch.ma</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon-box">
                    <FaPhoneAlt />
                  </div>
                  <div className="detail-text">
                    <strong>Téléphone / WhatsApp</strong>
                    <span>+212 522 00 00 00</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon-box">
                    <FaClock />
                  </div>
                  <div className="detail-text">
                    <strong>Disponibilité</strong>
                    <span>Du lundi au samedi (9h - 19h)</span>
                  </div>
                </div>
              </div>

              <div className="contact-social-wrap">
                <span className="social-label">Suivez la communauté :</span>
                <div className="social-links-row">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                    <FaFacebookF />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Formulaire interactif */}
            <div className="contact-form-panel">
              {submitted ? (
                <div className="contact-success-state">
                  <div className="success-icon-box">
                    <FaCheckCircle />
                  </div>
                  <h2 className="success-title">Message envoyé avec succès !</h2>
                  <p className="success-desc">
                    Merci de nous avoir contactés. Notre équipe vous répondra par email dans les plus brefs délais.
                  </p>
                  <button
                    type="button"
                    className="success-reset-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form className="contact-form-box" onSubmit={handleSubmit}>
                  <h2 className="form-heading">Envoyez-nous un message</h2>
                  <p className="form-subheading">
                    Remplissez ce formulaire et nous reviendrons vers vous au plus vite.
                  </p>

                  {error && <div className="contact-error-alert">{error}</div>}

                  <div className="form-field-group">
                    <label htmlFor="name">Nom complet *</label>
                    <div className="input-with-icon">
                      <FaUser className="input-icon" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="email">Adresse email *</label>
                    <div className="input-with-icon">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nom@exemple.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="subject">Sujet de la demande</label>
                    <div className="input-with-icon">
                      <FaTag className="input-icon" />
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Ex: Partenariat, Problème technique, Suggestion..."
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="message">Votre message *</label>
                    <div className="input-with-icon textarea-wrap">
                      <FaCommentDots className="input-icon top-align" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Écrivez votre message ici..."
                        rows="5"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="contact-submit-btn" disabled={loading}>
                    {loading ? (
                      'Envoi en cours...'
                    ) : (
                      <>
                        <FaPaperPlane /> Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 3. Cartes d'aide rapide */}
          <div className="contact-quick-cards">
            <Link to="/faq" className="quick-help-card">
              <div className="quick-icon green">
                <FaQuestionCircle />
              </div>
              <div className="quick-card-info">
                <h3>Centre d'aide / FAQ</h3>
                <p>Consultez instantanément nos questions fréquentes.</p>
              </div>
            </Link>

            <Link to="/post-ad" className="quick-help-card">
              <div className="quick-icon terracotta">
                <FaPlusCircle />
              </div>
              <div className="quick-card-info">
                <h3>Publier un don</h3>
                <p>Faites plaisir à un voisin en quelques clics.</p>
              </div>
            </Link>

            <Link to="/notre-adn" className="quick-help-card">
              <div className="quick-icon blue">
                <FaShieldAlt />
              </div>
              <div className="quick-card-info">
                <h3>Notre ADN & Valeurs</h3>
                <p>Découvrez notre mission pour un Maroc plus solidaire.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
