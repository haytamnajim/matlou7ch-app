import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaChartLine, FaFlag, FaSignOutAlt, FaCog, FaBell } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import AdminLayout from './AdminLayout';
import { statsService, listingService, userService } from '../../services/supabaseDataService';
import './Admin.css';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    listings: 0,
    activeListings: 0,
    reports: 0,
    newUsers: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Données pour les graphiques
  const lineChartData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
    datasets: [
      {
        label: 'Nouveaux utilisateurs',
        data: [65, 78, 90, 81, 106, 120, 156],
        fill: false,
        backgroundColor: 'rgba(74, 86, 226, 0.2)',
        borderColor: 'rgba(74, 86, 226, 1)',
        tension: 0.4,
      },
      {
        label: 'Nouvelles annonces',
        data: [28, 48, 40, 59, 76, 87, 120],
        fill: false,
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        borderColor: 'rgba(40, 167, 69, 1)',
        tension: 0.4,
      },
    ],
  };

  const cityData = listingService.getByCity();
  const barChartData = {
    labels: Object.keys(cityData),
    datasets: [
      {
        label: 'Nombre d\'annonces par ville',
        data: Object.values(cityData),
        backgroundColor: [
          'rgba(74, 86, 226, 0.7)',
          'rgba(40, 167, 69, 0.7)',
          'rgba(23, 162, 184, 0.7)',
          'rgba(220, 53, 69, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(108, 117, 125, 0.7)',
        ],
      },
    ],
  };

  const categoryData = listingService.getByCategory();
  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Catégories d\'annonces',
        data: Object.values(categoryData),
        backgroundColor: [
          'rgba(74, 86, 226, 0.7)',
          'rgba(40, 167, 69, 0.7)',
          'rgba(23, 162, 184, 0.7)',
          'rgba(220, 53, 69, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(108, 117, 125, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistiques mensuelles',
      },
    },
  };

  useEffect(() => {
    // Charger les données réelles depuis localStorage
    const timer = setTimeout(() => {
      const globalStats = statsService.getGlobalStats();
      setStats(globalStats);

      // Charger les 3 derniers utilisateurs
      const allUsers = userService.getAll();
      const sortedUsers = allUsers.sort((a, b) =>
        new Date(b.registrationDate) - new Date(a.registrationDate)
      );
      setRecentUsers(sortedUsers.slice(0, 3));

      // Charger les 3 dernières annonces
      const allListings = listingService.getAll();
      const sortedListings = allListings.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentListings(sortedListings.slice(0, 3));

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Tableau de bord">
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Chargement du tableau de bord...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Tableau de bord">
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
              <p className="stat-change neutral">{Math.round(stats.activeListings / stats.listings * 100)}% du total</p>
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

        {/* Section des graphiques */}
        <div className="charts-container">
          <div className="chart-panel">
            <h2>Évolution des utilisateurs et annonces</h2>
            <div className="chart-wrapper">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-panel half">
              <h2>Annonces par ville</h2>
              <div className="chart-wrapper">
                <Bar data={barChartData} options={{ ...chartOptions, indexAxis: 'y' }} />
              </div>
            </div>

            <div className="chart-panel half">
              <h2>Répartition par catégorie</h2>
              <div className="chart-wrapper">
                <Pie data={pieChartData} options={chartOptions} />
              </div>
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
                {recentUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar" style={{ backgroundColor: user.avatarColor }}>{user.avatar}</div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{new Date(user.registrationDate).toLocaleString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</td>
                    <td>{user.city}</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn view" onClick={() => navigate('/admin/users')}>Voir</button>
                        <button className="action-btn edit">Éditer</button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                {recentListings.map(listing => (
                  <tr key={listing.id}>
                    <td>{listing.title}</td>
                    <td>{listing.userName}</td>
                    <td>{new Date(listing.createdAt).toLocaleString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn view" onClick={() => navigate('/admin/listings')}>Voir</button>
                        <button className="action-btn delete">Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/admin/listings" className="view-all-link">Voir toutes les annonces</Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
