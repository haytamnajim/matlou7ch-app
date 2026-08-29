import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaUsers,
  FaBoxOpen,
  FaChartLine,
  FaFlag,
  FaSignOutAlt,
  FaCog,
  FaBell,
  FaExternalLinkAlt,
  FaShieldAlt
} from 'react-icons/fa';
import './Admin.css';

function AdminLayout({ children, title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-executive-dashboard">
      {/* 1. Sidebar Exécutive */}
      <aside className="admin-executive-sidebar">
        <div className="admin-sidebar-top">
          <Link to="/" className="admin-brand-header">
            <img src="/logo.png" alt="Matlou7ch Logo" className="admin-logo-img" />
            <div className="admin-brand-text">
              <span className="admin-brand-name">MATLOU7CH</span>
              <span className="admin-portal-badge">
                <FaShieldAlt className="portal-shield" /> ESPACE ADMIN
              </span>
            </div>
          </Link>
        </div>

        <nav className="admin-nav-list">
          <span className="nav-group-title">GESTION PRINCIPALE</span>
          <Link to="/admin" className={`admin-nav-link ${isActive('/admin') ? 'active' : ''}`}>
            <FaChartLine className="nav-link-icon" />
            <span>Tableau de bord</span>
          </Link>

          <Link to="/admin/users" className={`admin-nav-link ${isActive('/admin/users') ? 'active' : ''}`}>
            <FaUsers className="nav-link-icon" />
            <span>Utilisateurs</span>
          </Link>

          <Link to="/admin/listings" className={`admin-nav-link ${isActive('/admin/listings') ? 'active' : ''}`}>
            <FaBoxOpen className="nav-link-icon" />
            <span>Annonces</span>
          </Link>

          <Link to="/admin/reports" className={`admin-nav-link ${isActive('/admin/reports') ? 'active' : ''}`}>
            <FaFlag className="nav-link-icon" />
            <span>Signalements</span>
            <span className="admin-nav-badge">4</span>
          </Link>

          <span className="nav-group-title" style={{ marginTop: '20px' }}>SYSTÈME</span>
          <Link to="/admin/settings" className={`admin-nav-link ${isActive('/admin/settings') ? 'active' : ''}`}>
            <FaCog className="nav-link-icon" />
            <span>Paramètres</span>
          </Link>
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-public-site-btn" target="_blank">
            <FaExternalLinkAlt /> <span>Voir le site public</span>
          </Link>

          <button onClick={handleLogout} className="admin-logout-action-btn">
            <FaSignOutAlt /> <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Executive Content */}
      <main className="admin-executive-main">
        <header className="admin-top-header">
          <div className="header-title-block">
            <h1 className="header-page-title">{title}</h1>
            <span className="header-subtitle">Portail de supervision & modération</span>
          </div>

          <div className="admin-header-user-actions">
            <button className="admin-notif-btn" aria-label="Notifications">
              <FaBell />
              <span className="notif-pulse-dot" />
            </button>

            <div className="admin-avatar-pill">
              <div className="admin-avatar-circle">A</div>
              <div className="admin-info-labels">
                <span className="admin-username">Administrateur</span>
                <span className="admin-role-tag">Super Admin</span>
              </div>
              <span className="online-status-dot" />
            </div>
          </div>
        </header>

        <div className="admin-page-body">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;