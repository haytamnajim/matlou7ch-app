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
  const [cityData, setCityData] = useState({});
  const [categoryData, setCategoryData] = useState({});
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

  const barChartData = {
    labels: Object.keys(cityData),
    datasets: [
      {
        label: "Nombre d'annonces par ville",
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

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Catégories d'annonces",
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
    // Charger toutes les données depuis Supabase
    const fetchData = async () => {
      try {
        // Stats globales
        const globalStats = await statsService.getGlobalStats();
        setStats(globalStats);

        // Derniers utilisateurs
        const allUsers = await userService.getAll();
        setRecentUsers(allUsers.slice(0, 3));

        // Dernières annonces
        const allListings = await listingService.getAll();
        setRecentListings(allListings.slice(0, 3));

        // Données pour graphiques
        const citiesData = await listingService.getByCity();
        setCityData(citiesData);

        const categoriesData = await listingService.getByCategory();
        setCategoryData(categoriesData);

        setLoading(false);
      } catch (error) {
        console.error('Erreur Supabase:', error);
        setLoading(false);
      }
    };

    fetchData();
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
      <div className="dashboard-container">
        {/* Cartes de statistiques */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#4A56E2' }}>
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>{stats.users}</h3>
              <p>Utilisateurs</p>
              <span className="stat-trend up">+{stats.newUsers} cette semaine</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#28A745' }}>
              <FaBoxOpen />
            </div>
            <div className="stat-content">
              <h3>{stats.listings}</h3>
              <p>Annonces totales</p>
              <span className="stat-trend">{stats.activeListings} actives</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#17A2B8' }}>
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h3>87%</h3>
              <p>Taux d'engagement</p>
              <span className="stat-trend up">+5%</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#DC3545' }}>
              <FaFlag />
            </div>
            <div className="stat-content">
              <h3>{stats.reports}</h3>
              <p>Signalements</p>
              <span className="stat-trend">En attente</span>
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="charts-grid">
          <div className="chart-panel full">
            <h2>Croissance mensuelle</h2>
            <div className="chart-wrapper">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          <div className="chart-row">
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
                        <div className="user-avatar" style={{ backgroundColor: user.avatar_color }}>{user.avatar}</div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{new Date(user.created_at).toLocaleString('fr-FR', {
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
                    <td>{listing.user_name}</td>
                    <td>{new Date(listing.created_at).toLocaleString('fr-FR', {
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
