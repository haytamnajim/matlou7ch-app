import React, { useState, useEffect } from 'react';
import { FaFlag, FaSearch, FaEye, FaCheck, FaBan } from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import './Admin.css';

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      // Dans une application réelle, vous feriez un appel API ici
      const reportTypes = ['inappropriate', 'spam', 'scam', 'offensive', 'other'];
      
      const mockReports = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        type: reportTypes[Math.floor(Math.random() * reportTypes.length)],
        title: `Signalement #${i + 1}`,
        description: `Description détaillée du signalement concernant ${Math.random() > 0.5 ? 'une annonce' : 'un utilisateur'}.`,
        reportedItem: Math.random() > 0.5 ? `Annonce #${Math.floor(Math.random() * 100) + 1}` : `Utilisateur #${Math.floor(Math.random() * 50) + 1}`,
        reportedBy: `Utilisateur #${Math.floor(Math.random() * 50) + 1}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
      }));
      
      setReports(mockReports);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les signalements
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.reportedItem.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    // La recherche est déjà gérée par le filtrage en temps réel
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReportTypeLabel = (type) => {
    switch(type) {
      case 'inappropriate': return 'Contenu inapproprié';
      case 'spam': return 'Spam';
      case 'scam': return 'Arnaque';
      case 'offensive': return 'Contenu offensant';
      case 'other': return 'Autre';
      default: return type;
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Signalements">
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Chargement des signalements...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Signalements">
      <div className="users-header">
        <h2><FaFlag /> Gestion des signalements</h2>
        
        <form onSubmit={handleSearch} className="users-search">
          <input
            type="text"
            placeholder="Rechercher un signalement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"><FaSearch /></button>
        </form>
      </div>
      
      <div className="users-filters">
        <select 
          className="filter-select"
          value={typeFilter}
          onChange={handleTypeChange}
        >
          <option value="all">Tous les types</option>
          <option value="inappropriate">Contenu inapproprié</option>
          <option value="spam">Spam</option>
          <option value="scam">Arnaque</option>
          <option value="offensive">Contenu offensant</option>
          <option value="other">Autre</option>
        </select>
      </div>
      
      {currentReports.map(report => (
        <div key={report.id} className="report-item">
          <div className="report-header">
            <span className="report-type">{getReportTypeLabel(report.type)}</span>
            <span className="report-date">{formatDate(report.date)}</span>
          </div>
          
          <div className="report-content">
            <h3>{report.title}</h3>
            <p><strong>Élément signalé:</strong> {report.reportedItem}</p>
            <p><strong>Signalé par:</strong> {report.reportedBy}</p>
            <p>{report.description}</p>
          </div>
          
          <div className="report-actions">
            <button className="report-btn view">
              <FaEye /> Voir l'élément
            </button>
            <button className="report-btn resolve">
              <FaCheck /> Résoudre
            </button>
            <button className="report-btn ignore">
              <FaBan /> Ignorer
            </button>
          </div>
        </div>
      ))}
      
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
    </AdminLayout>
  );
}

export default Reports;