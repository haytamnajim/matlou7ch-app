import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/ModernNavbar';
import Footer from './components/Footer';
import SimpleFooter from './components/SimpleFooter';
import Loader from './components/Loader';
import './App.css';

// Pages principales
const Home = React.lazy(() => import('./pages/Home'));
const Favoris = React.lazy(() => import('./pages/Favoris'));
const Messages = React.lazy(() => import('./pages/Messages'));
const Profile = React.lazy(() => import('./pages/Profile'));
const MesAnnonces = React.lazy(() => import('./pages/MesAnnonces'));
const PublicProfile = React.lazy(() => import('./pages/PublicProfile'));
const EditProfile = React.lazy(() => import('./pages/EditProfile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const NotificationSettings = React.lazy(() => import('./pages/NotificationSettings'));
const EmailSettings = React.lazy(() => import('./pages/EmailSettings'));
const PasswordSettings = React.lazy(() => import('./pages/PasswordSettings'));
const BlockedUsers = React.lazy(() => import('./pages/BlockedUsers'));
const DeleteAccount = React.lazy(() => import('./pages/DeleteAccount'));
const Catalogue = React.lazy(() => import('./pages/Catalogue'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const NotreADN = React.lazy(() => import('./pages/NotreADN'));
const CGU = React.lazy(() => import('./pages/CGU'));
const FAQ = React.lazy(() => import('./pages/FAQ'));
const UserProducts = React.lazy(() => import('./pages/UserProducts'));
const UserProfile = React.lazy(() => import('./pages/UserProfile'));
const EditProduct = React.lazy(() => import('./pages/EditProduct'));

// Composants
const PostAd = React.lazy(() => import('./components/PostAd'));

// Pages d'administration
const AdminLogin = React.lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/Dashboard'));
const AdminUsers = React.lazy(() => import('./pages/Admin/Users'));
const AdminListings = React.lazy(() => import('./pages/Admin/Listings'));
const AdminReports = React.lazy(() => import('./pages/Admin/Reports'));

// Composant pour protéger les routes qui nécessitent une authentification
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    // Rediriger vers la page de connexion avec l'URL de retour
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  return children;
}

// Composant pour protéger les routes d'administration
// DÉSACTIVÉ : Accès direct sans mot de passe
function AdminRoute({ children }) {
  // const adminToken = localStorage.getItem('adminToken');
  // const location = useLocation();

  // if (!adminToken) {
  //   return <Navigate to="/admin/login" state={{ from: location }} replace />;
  // }

  return children;
}

function App() {
  return (
    <Router>
      <React.Suspense fallback={<Loader />}>
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
              <CGU />
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
          <Route path="/utilisateur/:userId" element={
            <>
              <Navbar />
              <UserProducts />
              <SimpleFooter />
            </>
          } />
          <Route path="/profil/:userId" element={
            <>
              <Navbar />
              <UserProfile />
              <SimpleFooter />
            </>
          } />
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
      </React.Suspense>
    </Router>
  );
}

export default App;
