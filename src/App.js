import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SimpleFooter from './components/SimpleFooter';
import Home from './pages/Home';
import Favoris from './pages/Favoris';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import MesAnnonces from './pages/MesAnnonces';
import PublicProfile from './pages/PublicProfile';
import EditProfile from './pages/EditProfile';
import Settings from './pages/Settings';
import NotificationSettings from './pages/NotificationSettings';
import EmailSettings from './pages/EmailSettings';
import PasswordSettings from './pages/PasswordSettings';
import BlockedUsers from './pages/BlockedUsers';
import DeleteAccount from './pages/DeleteAccount';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import NotreADN from './pages/NotreADN';
import CGU from './pages/CGU';
import FAQ from './pages/FAQ';
import InformationsLegales from './pages/InformationsLegales';
import PostAd from './components/PostAd';

// Pages d'administration
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminListings from './pages/Admin/Listings';
import AdminReports from './pages/Admin/Reports';

import './App.css';

// Composant pour protéger les routes qui nécessitent une authentification
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading-screen">Chargement...</div>;
  }

  if (!user) {
    // Rediriger vers la page de connexion avec l'URL de retour
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  return children;
}

// Composant pour protéger les routes d'administration
function AdminRoute({ children }) {
  const adminToken = localStorage.getItem('adminToken');
  const location = useLocation();
  
  if (!adminToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return children;
}

function App() {
  const { currentUser } = useAuth();
  
  return (
    <Router>
      <Routes>
        {/* Routes d'administration */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        } />
        <Route path="/admin/listings" element={
          <AdminRoute>
            <AdminListings />
          </AdminRoute>
        } />
        <Route path="/admin/reports" element={
          <AdminRoute>
            <AdminReports />
          </AdminRoute>
        } />
        
        {/* Routes principales du site */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        
        {/* Autres routes existantes */}
        <Route path="/favoris" element={
          <>
            <Navbar />
            <Favoris />
            <Footer />
          </>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/mes-annonces" element={
          <ProtectedRoute>
            <MesAnnonces />
          </ProtectedRoute>
        } />
        <Route path="/profil-public" element={
          <ProtectedRoute>
            <PublicProfile />
          </ProtectedRoute>
        } />
        <Route path="/modifier-profil" element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />
        <Route path="/parametres" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/parametres/notifications" element={
          <ProtectedRoute>
            <NotificationSettings />
          </ProtectedRoute>
        } />
        <Route path="/parametres/email" element={
          <ProtectedRoute>
            <EmailSettings />
          </ProtectedRoute>
        } />
        <Route path="/parametres/mot-de-passe" element={
          <ProtectedRoute>
            <PasswordSettings />
          </ProtectedRoute>
        } />
        <Route path="/parametres/utilisateurs-bloques" element={
          <ProtectedRoute>
            <BlockedUsers />
          </ProtectedRoute>
        } />
        <Route path="/parametres/supprimer-compte" element={
          <ProtectedRoute>
            <DeleteAccount />
          </ProtectedRoute>
        } />
        <Route path="/post-ad" element={
          <ProtectedRoute>
            <PostAd />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/produit/:id" element={<ProductDetail />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/cgu" element={<CGU />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/informations-legales" element={<InformationsLegales />} />
        <Route path="/notre-adn" element={<NotreADN />} />
        
        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
