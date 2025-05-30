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
import UserProducts from './pages/UserProducts';
import UserProfile from './pages/UserProfile';
import EditProduct from './pages/EditProduct';

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
        
        {/* Routes principales du site avec Footer complet */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/catalogue" element={
          <>
            <Navbar />
            <Catalogue />
            <Footer />
          </>
        } />
        <Route path="/notre-adn" element={
          <>
            <Navbar />
            <NotreADN />
            <Footer />
          </>
        } />

        {/* Routes avec SimpleFooter */}
        <Route path="/connexion" element={
          <>
            <Navbar />
            <Login />
            <SimpleFooter />
          </>
        } />
        <Route path="/inscription" element={
          <>
            <Navbar />
            <Register />
            <SimpleFooter />
          </>
        } />
        <Route path="/faq" element={
          <>
            <Navbar />
            <FAQ />
            <SimpleFooter />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Contact />
            <SimpleFooter />
          </>
        } />
        <Route path="/cgu" element={
          <>
            <Navbar />
            <CGU />
            <SimpleFooter />
          </>
        } />
        <Route path="/informations-legales" element={
          <>
            <Navbar />
            <InformationsLegales />
            <SimpleFooter />
          </>
        } />
        <Route path="/produit/:id" element={
          <>
            <Navbar />
            <ProductDetail />
            <SimpleFooter />
          </>
        } />
        <Route path="/favoris" element={
          <>
            <Navbar />
            <Favoris />
            <SimpleFooter />
          </>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Messages />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Profile />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/mes-annonces" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <MesAnnonces />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/profil-public" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <PublicProfile />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/modifier-profil" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <EditProfile />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/parametres" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Settings />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/parametres/notifications" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <NotificationSettings />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/parametres/email" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <EmailSettings />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/parametres/mot-de-passe" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <PasswordSettings />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/parametres/utilisateurs-bloques" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <BlockedUsers />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/parametres/supprimer-compte" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <DeleteAccount />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/post-ad" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <PostAd />
              <SimpleFooter />
            </>
          </ProtectedRoute>
        } />
        <Route path="/utilisateur/:userId" element={<UserProducts />} />
        <Route path="/profil/:userId" element={<UserProfile />} />
        <Route path="/modifier-produit/:productId" element={
          <>
            <Navbar />
            <EditProduct />
            <SimpleFooter />
          </>
        } />
        
        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
