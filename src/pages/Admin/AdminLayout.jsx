import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaChartLine, FaFlag, FaSignOutAlt, FaCog, FaBell } from 'react-icons/fa';
import './Admin.css';

function AdminLayout({ children, title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Logique de déconnexion
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Vérifier si le chemin actuel correspond à un élément de navigation
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="admin-logo-placeholder">M</div>
          <h2>Matlou7ch</h2>
        </div>

        <nav className="admin-nav">
          <Link to="/admin" className={`admin-nav-item ${isActive('/admin') ? 'active' : ''}`}>
            <FaChartLine /> <span>Tableau de bord</span>
          </Link>
          <Link to="/admin/users" className={`admin-nav-item ${isActive('/admin/users') ? 'active' : ''}`}>
            <FaUsers /> <span>Utilisateurs</span>
          </Link>
          <Link to="/admin/listings" className={`admin-nav-item ${isActive('/admin/listings') ? 'active' : ''}`}>
            <FaBoxOpen /> <span>Annonces</span>
          </Link>
          <Link to="/admin/reports" className={`admin-nav-item ${isActive('/admin/reports') ? 'active' : ''}`}>
            <FaFlag /> <span>Signalements</span>
            <span className="badge">42</span>
          </Link>
          <Link to="/admin/settings" className={`admin-nav-item ${isActive('/admin/settings') ? 'active' : ''}`}>
            <FaCog /> <span>Paramètres</span>
          </Link>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{title}</h1>

          <div className="admin-header-actions">
            <div className="admin-notifications">
              <FaBell />
              <span className="notification-badge">3</span>
            </div>

            <div className="admin-profile">
              <div className="admin-profile-avatar-placeholder">A</div>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;