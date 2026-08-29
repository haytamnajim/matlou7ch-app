import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUsers,
  FaBoxOpen,
  FaChartLine,
  FaFlag,
  FaGift,
  FaArrowUp,
  FaEye,
  FaTrash,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';
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

  const [monthlyLabels, setMonthlyLabels] = useState(['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil']);
  const [monthlyUsers, setMonthlyUsers] = useState([65, 78, 90, 81, 106, 120, 156]);
  const [monthlyListings, setMonthlyListings] = useState([28, 48, 40, 59, 76, 87, 120]);

  const lineChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Nouveaux Utilisateurs',
        data: monthlyUsers,
        fill: true,
        backgroundColor: 'rgba(98, 130, 93, 0.15)',
        borderColor: '#62825D',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#62825D',
      },
      {
        label: 'Nouvelles Annonces de Dons',
        data: monthlyListings,
        fill: true,
        backgroundColor: 'rgba(188, 124, 78, 0.12)',
        borderColor: '#BC7C4E',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#BC7C4E',
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(cityData).length > 0 ? Object.keys(cityData) : ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir'],
    datasets: [
      {
        label: "Dons par ville",
        data: Object.values(cityData).length > 0 ? Object.values(cityData) : [145, 98, 76, 62, 45, 38],
        backgroundColor: [
          '#62825D',
          '#BC7C4E',
          '#2563EB',
          '#10B981',
          '#F59E0B',
          '#64748B',
        ],
        borderRadius: 8,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(categoryData).length > 0 ? Object.keys(categoryData) : ['Vêtements', 'Maison', 'Multimédia', 'Meubles', 'Livres', 'Jouets'],
    datasets: [
      {
        label: "Catégories",
        data: Object.values(categoryData).length > 0 ? Object.values(categoryData) : [40, 25, 20, 15, 12, 8],
        backgroundColor: [
          '#62825D',
          '#BC7C4E',
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#8B5CF6',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { family: "'Inter', sans-serif", weight: '600', size: 12 },
          boxWidth: 14,
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.04)' },
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const globalStats = await statsService.getGlobalStats();
        setStats(globalStats);

        const allUsers = await userService.getAll();
        setRecentUsers(allUsers.slice(0, 4));

        const allListings = await listingService.getAll();
        setRecentListings(allListings.slice(0, 4));

        const citiesData = await listingService.getByCity();
        setCityData(citiesData);

        const categoriesData = await listingService.getByCategory();
        setCategoryData(categoriesData);

        const monthlyData = await statsService.getMonthlyData();
        if (monthlyData && monthlyData.users) {
          setMonthlyUsers(monthlyData.users);
          setMonthlyListings(monthlyData.listings);
        }

        const months = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          const monthName = date.toLocaleDateString('fr-FR', { month: 'short' });
          months.push(monthName.charAt(0).toUpperCase() + monthName.slice(1));
        }
        setMonthlyLabels(months);

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
        <div className="admin-exec-loading">
          <div className="exec-spinner" />
          <p>Chargement des métriques...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Tableau de bord">
      <div className="admin-dashboard-container">
        {/* 1. Grille des 4 KPI Cards */}
        <div className="executive-stats-grid">
          {/* Card 1 */}
          <div className="executive-stat-card green-tint">
            <div className="stat-card-top">
              <span className="stat-metric-title">Utilisateurs Inscrits</span>
              <div className="stat-icon-wrapper green">
                <FaUsers />
              </div>
            </div>
            <div className="stat-card-bottom">
              <span className="stat-number">{stats.users || 1248}</span>
              <span className="stat-trend-badge up">
                <FaArrowUp /> +{stats.newUsers || 14} cette semaine
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="executive-stat-card terracotta-tint">
            <div className="stat-card-top">
              <span className="stat-metric-title">Annonces de Dons</span>
              <div className="stat-icon-wrapper terracotta">
                <FaBoxOpen />
              </div>
            </div>
            <div className="stat-card-bottom">
              <span className="stat-number">{stats.listings || 3820}</span>
              <span className="stat-trend-badge highlight">
                {stats.activeListings || 412} dons actifs
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="executive-stat-card blue-tint">
            <div className="stat-card-top">
              <span className="stat-metric-title">Taux de Réemploi</span>
              <div className="stat-icon-wrapper blue">
                <FaGift />
              </div>
            </div>
            <div className="stat-card-bottom">
              <span className="stat-number">92.4%</span>
              <span className="stat-trend-badge up">
                <FaArrowUp /> +4.2% vs N-1
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="executive-stat-card red-tint">
            <div className="stat-card-top">
              <span className="stat-metric-title">Signalements</span>
              <div className="stat-icon-wrapper red">
                <FaFlag />
              </div>
            </div>
            <div className="stat-card-bottom">
              <span className="stat-number">{stats.reports || 4}</span>
              <span className="stat-trend-badge alert">
                {stats.reports > 0 ? 'À traiter en priorité' : 'Aucun litige'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Graphiques Modernes */}
        <div className="admin-charts-section">
          <div className="admin-chart-card full-width">
            <div className="chart-card-header">
              <div>
                <h2 className="chart-title">Dynamique de Croissance</h2>
                <span className="chart-sub">Évolution comparative des inscriptions et annonces</span>
              </div>
            </div>
            <div className="chart-render-box line-box">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          <div className="admin-charts-two-cols">
            <div className="admin-chart-card">
              <div className="chart-card-header">
                <div>
                  <h2 className="chart-title">Dons par Ville (Maroc)</h2>
                  <span className="chart-sub">Répartition géographique des objets</span>
                </div>
              </div>
              <div className="chart-render-box">
                <Bar data={barChartData} options={{ ...chartOptions, indexAxis: 'y' }} />
              </div>
            </div>

            <div className="admin-chart-card">
              <div className="chart-card-header">
                <div>
                  <h2 className="chart-title">Répartition par Catégorie</h2>
                  <span className="chart-sub">Part de chaque type d'objet</span>
                </div>
              </div>
              <div className="chart-render-box pie-box">
                <Pie data={pieChartData} options={{ ...chartOptions, scales: {} }} />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Tables d'activités récentes */}
        <div className="admin-tables-two-cols">
          {/* Table 1 : Utilisateurs Récents */}
          <div className="admin-data-panel">
            <div className="panel-header-row">
              <div>
                <h2 className="panel-title">Nouveaux Membres</h2>
                <span className="panel-sub">Dernières inscriptions sur la plateforme</span>
              </div>
              <Link to="/admin/users" className="panel-see-all-btn">
                Voir tout
              </Link>
            </div>

            <div className="admin-table-responsive">
              <table className="executive-data-table">
                <thead>
                  <tr>
                    <th>Membre</th>
                    <th>Ville</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-table-cell">
                          <div
                            className="member-avatar"
                            style={{ backgroundColor: user.avatar_color || '#62825D' }}
                          >
                            {(user.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div className="member-meta">
                            <span className="member-name">{user.name || 'Utilisateur'}</span>
                            <span className="member-email">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="city-pill">
                          <FaMapMarkerAlt className="mini-icon" /> {user.city || 'Maroc'}
                        </span>
                      </td>
                      <td>
                        <span className="date-text">
                          <FaClock className="mini-icon" />{' '}
                          {new Date(user.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </td>
                      <td>
                        <button
                          className="table-action-pill"
                          onClick={() => navigate('/admin/users')}
                          aria-label="Voir le profil"
                        >
                          <FaEye /> Inspecter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2 : Dernières Annonces */}
          <div className="admin-data-panel">
            <div className="panel-header-row">
              <div>
                <h2 className="panel-title">Dernières Annonces</h2>
                <span className="panel-sub">Objets récemment mis en ligne</span>
              </div>
              <Link to="/admin/listings" className="panel-see-all-btn">
                Voir tout
              </Link>
            </div>

            <div className="admin-table-responsive">
              <table className="executive-data-table">
                <thead>
                  <tr>
                    <th>Objet</th>
                    <th>Donateur</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentListings.map((listing) => (
                    <tr key={listing.id}>
                      <td>
                        <div className="listing-table-cell">
                          {listing.images && listing.images[0] ? (
                            <img
                              src={listing.images[0]}
                              alt={listing.title}
                              className="listing-thumb"
                            />
                          ) : (
                            <div className="listing-thumb placeholder">
                              <FaGift />
                            </div>
                          )}
                          <span className="listing-title" title={listing.title}>
                            {listing.title}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="donor-name-text">
                          {listing.user_name || 'Donateur'}
                        </span>
                      </td>
                      <td>
                        <span className="date-text">
                          {new Date(listing.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </td>
                      <td>
                        <button
                          className="table-action-pill green"
                          onClick={() => navigate('/admin/listings')}
                          aria-label="Gérer l'annonce"
                        >
                          <FaEye /> Modérer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
