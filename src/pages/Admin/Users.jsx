import React, { useState, useEffect } from 'react';
import { FaUsers, FaSearch, FaEdit, FaTrash, FaEye, FaBan, FaUserCheck } from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import './Admin.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const usersPerPage = 10;

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      // Dans une application réelle, vous feriez un appel API ici
      const mockUsers = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Utilisateur ${i + 1}`,
        email: `user${i + 1}@example.com`,
        city: ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès'][Math.floor(Math.random() * 5)],
        status: Math.random() > 0.2 ? 'active' : 'blocked',
        registrationDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        listings: Math.floor(Math.random() * 20),
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      }));
      
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    // La recherche est déjà gérée par le filtrage en temps réel
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <AdminLayout title="Utilisateurs">
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Chargement des utilisateurs...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Utilisateurs">
      <div className="users-header">
        <h2><FaUsers /> Gestion des utilisateurs</h2>
        
        <form onSubmit={handleSearch} className="users-search">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"><FaSearch /></button>
        </form>
      </div>
      
      <div className="users-filters">
        <select 
          className="filter-select"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actifs</option>
          <option value="blocked">Bloqués</option>
        </select>
      </div>
      
      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Ville</th>
              <th>Date d'inscription</th>
              <th>Annonces</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="user-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        const initials = user.name.split(' ').map(n => n[0]).join('');
                        const colors = ['#FF5252', '#448AFF', '#69F0AE', '#FFAB40', '#7C4DFF'];
                        const colorIndex = user.id % colors.length;
                        const div = document.createElement('div');
                        div.className = 'user-avatar';
                        div.style.backgroundColor = colors[colorIndex];
                        div.textContent = initials;
                        e.target.parentNode.replaceChild(div, e.target);
                      }}
                    />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td>{formatDate(user.registrationDate)}</td>
                <td>{user.listings}</td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status === 'active' ? 'Actif' : 'Bloqué'}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="action-btn view" title="Voir le profil">
                      <FaEye />
                    </button>
                    <button className="action-btn edit" title="Modifier">
                      <FaEdit />
                    </button>
                    {user.status === 'active' ? (
                      <button className="action-btn delete" title="Bloquer">
                        <FaBan />
                      </button>
                    ) : (
                      <button className="action-btn view" title="Débloquer">
                        <FaUserCheck />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // Afficher seulement les pages proches de la page actuelle
                return page === 1 || 
                       page === totalPages || 
                       Math.abs(page - currentPage) <= 1;
              })
              .map((page, index, array) => {
                // Ajouter des points de suspension si nécessaire
                if (index > 0 && array[index - 1] !== page - 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <span className="pagination-ellipsis">...</span>
                      <button 
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                }
                
                return (
                  <button 
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}
            
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Users;