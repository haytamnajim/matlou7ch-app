import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaChartLine, FaFlag, FaSignOutAlt, FaCog, FaBell } from 'react-icons/fa';
import './Admin.css';

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    listings: 0,
    activeListings: 0,
    reports: 0,
    newUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      // Dans une application réelle, vous feriez un appel API ici
      setStats({
        users: 9876,
        listings: 15432,
        activeListings: 8765,
        reports: 42,
        newUsers: 156
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // Logique de déconnexion
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src="/images/logo.png" alt="Matlou7ch Admin" />
          <h2>Matlou7ch</h2>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item active">
            <FaChartLine /> Tableau de bord
          </Link>
          <Link to="/admin/users" className="admin-nav-item">
            <FaUsers /> Utilisateurs
          </Link>
          <Link to="/admin/listings" className="admin-nav-item">
            <FaBoxOpen /> Annonces
          </Link>
          <Link to="/admin/reports" className="admin-nav-item">
            <FaFlag /> Signalements
            {stats.reports > 0 && <span className="badge">{stats.reports}</span>}
          </Link>
          <Link to="/admin/settings" className="admin-nav-item">
            <FaCog /> Paramètres
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
          <h1>Tableau de bord</h1>
          
          <div className="admin-header-actions">
            <div className="admin-notifications">
              <FaBell />
              <span className="notification-badge">3</span>
            </div>
            
            <div className="admin-profile">
              <img 
                src="/images/admin-avatar.png" 
                alt="Admin" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/40?text=A';
                }}
              />
              <span>Admin</span>
            </div>
          </div>
        </header>
        
        <div className="admin-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon users">
                <FaUsers />
              </div>
              <div className="stat-details">
                <h3>Utilisateurs</h3>
                <p className="stat-value">{stats.users.toLocaleString()}</p>
                <p className="stat-change positive">+{stats.newUsers} cette semaine</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon listings">
                <FaBoxOpen />
              </div>
              <div className="stat-details">
                <h3>Annonces totales</h3>
                <p className="stat-value">{stats.listings.toLocaleString()}</p>
                <p className="stat-change positive">+243 cette semaine</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon active">
                <FaBoxOpen />
              </div>
              <div className="stat-details">
                <h3>Annonces actives</h3>
                <p className="stat-value">{stats.activeListings.toLocaleString()}</p>
                <p className="stat-change neutral">{Math.round(stats.activeListings/stats.listings*100)}% du total</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon reports">
                <FaFlag />
              </div>
              <div className="stat-details">
                <h3>Signalements</h3>
                <p className="stat-value">{stats.reports}</p>
                <p className="stat-change negative">Nécessite attention</p>
              </div>
            </div>
          </div>
          
          <div className="admin-panels">
            <div className="admin-panel recent-users">
              <h2>Nouveaux utilisateurs</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Utilisateur</th>
                    <th>Date d'inscription</th>
                    <th>Ville</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar" style={{backgroundColor: '#FF5252'}}>S</div>
                        <span>Sara Alaoui</span>
                      </div>
                    </td>
                    <td>Il y a 2 heures</td>
                    <td>Casablanca</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn view">Voir</button>
                        <button className="action-btn edit">Éditer</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar" style={{backgroundColor: '#448AFF'}}>K</div>
                        <span>Karim Benjelloun</span>
                      </div>
                    </td>
                    <td>Il y a 5 heures</td>
                    <td>Rabat</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn view">Voir</button>
                        <button className="action-btn edit">Éditer</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar" style={{backgroundColor: '#69F0AE'}}>F</div>
                        <span>Fatima Zahra</span>
                      </div>
                    </td>
                    <td>Il y a 8 heures</td>
                    <td>Marrakech</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn view">Voir</button>
                        <button className="action-btn edit">Éditer</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link to="/admin/users" className="view-all-link">Voir tous les utilisateurs</Link>
            </div>
            
            <div className="admin-panel recent-listings">
              <h2>Dernières annonces</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Annonce</th>
                    <th>Utilisateur</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Canapé en cuir</td>
                    <td>Mohammed A.</td>
                    <td>Il y a 1 heure</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn view">Voir</button>
                        <button className="action-btn delete">Supprimer</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Vélo de montagne</td>
                    <td>Yasmine B.</td>
                    <td>Il y a 3 heures</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn view">Voir</button>
                        <button className="action-btn delete">Supprimer</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Livres de cuisine</td>
                    <td>Hassan M.</td>
                    <td>Il y a 5 heures</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn view">Voir</button>
                        <button className="action-btn delete">Supprimer</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link to="/admin/listings" className="view-all-link">Voir toutes les annonces</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;