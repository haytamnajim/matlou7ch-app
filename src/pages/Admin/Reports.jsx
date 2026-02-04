import React, { useState, useEffect } from 'react';
import { FaFlag, FaSearch, FaEye, FaCheck, FaBan, FaTrash } from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import { reportService } from '../../services/supabaseDataService';
import './Admin.css';

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  // Charger les signalements depuis Supabase
  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await reportService.getAll();
      setReports(data);
    } catch (error) {
      console.error('Erreur lors du chargement des signalements:', error);
      alert('Impossible de charger les signalements.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolveReport = async (reportId) => {
    if (window.confirm('Marquer ce signalement comme résolu ?')) {
      try {
        await reportService.update(reportId, { status: 'resolved', resolved_at: new Date() });
        setReports(reports.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
        alert('Signalement marqué comme résolu.');
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la mise à jour.');
      }
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce signalement de l\'historique ?')) {
      try {
        await reportService.delete(reportId);
        setReports(reports.filter(r => r.id !== reportId));
        alert('Signalement supprimé.');
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression.');
      }
    }
  };

  // Filtrer les signalements
  const filteredReports = reports.filter(report => {
    const matchesSearch = (report.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (report.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (report.listing_title?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || report.reason === typeFilter; // Note: 'reason' column in DB matches filter 'type' logic

    return matchesSearch && matchesType;
  });

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReportReasonLabel = (reason) => {
    switch (reason) {
      case 'inappropriate': return 'Contenu inapproprié';
      case 'spam': return 'Spam';
      case 'scam': return 'Arnaque';
      case 'offensive': return 'Contenu offensant';
      case 'duplicate': return 'Doublon';
      case 'other': return 'Autre';
      default: return reason;
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
          <option value="duplicate">Doublon</option>
          <option value="other">Autre</option>
        </select>
      </div>

      {currentReports.length > 0 ? (
        currentReports.map(report => (
          <div key={report.id} className={`report-item ${report.status === 'resolved' ? 'resolved' : ''}`}>
            <div className="report-header">
              <span className="report-type">{getReportReasonLabel(report.reason)}</span>
              <span className="report-date">{formatDate(report.created_at)}</span>
              {report.status === 'resolved' && <span className="status-badge active" style={{ marginLeft: '10px' }}>Résolu</span>}
            </div>

            <div className="report-content">
              <h3>{report.listing_title || 'Annonce supprimée'}</h3>
              <p><strong>Signalé par:</strong> {report.reporter_name || report.reported_by}</p>
              <p>{report.description}</p>
            </div>

            <div className="report-actions">
              <button className="report-btn view" title="Voir l'annonce">
                <FaEye /> Voir
              </button>
              {report.status === 'pending' && (
                <button
                  className="report-btn resolve"
                  onClick={() => handleResolveReport(report.id)}
                  title="Marquer comme résolu"
                >
                  <FaCheck /> Résoudre
                </button>
              )}
              <button
                className="report-btn ignore"
                onClick={() => handleDeleteReport(report.id)}
                title="Supprimer le signalement"
              >
                <FaTrash /> Suppr
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">Aucun signalement trouvé</div>
      )}

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
              return page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;
            })
            .map((page, index, array) => {
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