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
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  // Fonctions pour gérer les actions sur les utilisateurs
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser({ ...user });
    setShowEditModal(true);
  };

  const handleToggleUserStatus = (userId) => {
    // Confirmer l'action
    const userToToggle = users.find(user => user.id === userId);
    const isBlocking = userToToggle.status === 'active';
    const confirmMessage = isBlocking
      ? `Êtes-vous sûr de vouloir bloquer l'utilisateur ${userToToggle.name} ?`
      : `Êtes-vous sûr de vouloir débloquer l'utilisateur ${userToToggle.name} ?`;

    if (window.confirm(confirmMessage)) {
      // Mettre à jour le statut de l'utilisateur
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            status: user.status === 'active' ? 'blocked' : 'active'
          };
        }
        return user;
      });

      setUsers(updatedUsers);

      // Afficher un message de confirmation
      const actionMessage = isBlocking
        ? `L'utilisateur ${userToToggle.name} a été bloqué avec succès.`
        : `L'utilisateur ${userToToggle.name} a été débloqué avec succès.`;
      alert(actionMessage);
    }
  };

  const handleSaveEdit = () => {
    if (!selectedUser) return;

    // Mettre à jour l'utilisateur dans la liste
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return selectedUser;
      }
      return user;
    });

    setUsers(updatedUsers);
    setShowEditModal(false);
    alert(`Les informations de ${selectedUser.name} ont été mises à jour avec succès.`);
  };

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

  // Composant Modal pour voir les détails d'un utilisateur
  const ViewUserModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="admin-modal-overlay" onClick={() => setShowViewModal(false)}>
        <div className="admin-modal" onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header">
            <h2>Profil de l'utilisateur</h2>
            <button className="modal-close-btn" onClick={() => setShowViewModal(false)}>×</button>
          </div>
          <div className="admin-modal-body">
            <div className="user-profile-header">
              <div className="user-profile-avatar-placeholder">
                {selectedUser.name.charAt(0)}
              </div>
              <div className="user-profile-info">
                <h3>{selectedUser.name}</h3>
                <p>{selectedUser.email}</p>
                <span className={`status-badge ${selectedUser.status}`}>
                  {selectedUser.status === 'active' ? 'Actif' : 'Bloqué'}
                </span>
              </div>
            </div>

            <div className="user-profile-details">
              <div className="detail-item">
                <span className="detail-label">Ville:</span>
                <span className="detail-value">{selectedUser.city}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date d'inscription:</span>
                <span className="detail-value">{formatDate(selectedUser.registrationDate)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Nombre d'annonces:</span>
                <span className="detail-value">{selectedUser.listings}</span>
              </div>
            </div>
          </div>
          <div className="admin-modal-footer">
            <button
              className="admin-btn secondary"
              onClick={() => setShowViewModal(false)}
            >
              Fermer
            </button>
            <button
              className="admin-btn primary"
              onClick={() => {
                setShowViewModal(false);
                handleEditUser(selectedUser);
              }}
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Composant Modal pour modifier un utilisateur
  const EditUserModal = () => {
    if (!selectedUser) return null;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectedUser(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <div className="admin-modal-overlay" onClick={() => setShowEditModal(false)}>
        <div className="admin-modal" onClick={e => e.stopPropagation()}>
          <div className="admin-modal-header">
            <h2>Modifier l'utilisateur</h2>
            <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>×</button>
          </div>
          <div className="admin-modal-body">
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={selectedUser.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={selectedUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                name="city"
                value={selectedUser.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Statut</label>
              <select
                id="status"
                name="status"
                value={selectedUser.status}
                onChange={handleChange}
              >
                <option value="active">Actif</option>
                <option value="blocked">Bloqué</option>
              </select>
            </div>
          </div>
          <div className="admin-modal-footer">
            <button
              className="admin-btn secondary"
              onClick={() => setShowEditModal(false)}
            >
              Annuler
            </button>
            <button
              className="admin-btn primary"
              onClick={handleSaveEdit}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    );
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
                    <div className="user-avatar-placeholder">
                      {user.name.charAt(0)}
                    </div>
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
                    <button
                      className="action-btn view"
                      title="Voir le profil"
                      onClick={() => handleViewUser(user)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="action-btn edit"
                      title="Modifier"
                      onClick={() => handleEditUser(user)}
                    >
                      <FaEdit />
                    </button>
                    {user.status === 'active' ? (
                      <button
                        className="action-btn delete"
                        title="Bloquer"
                        onClick={() => handleToggleUserStatus(user.id)}
                      >
                        <FaBan />
                      </button>
                    ) : (
                      <button
                        className="action-btn view"
                        title="Débloquer"
                        onClick={() => handleToggleUserStatus(user.id)}
                      >
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

      {/* Modals */}
      {showViewModal && <ViewUserModal />}
      {showEditModal && <EditUserModal />}
    </AdminLayout>
  );
}

export default Users;
