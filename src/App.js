import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import './App.css';
import PostAd from './components/PostAd';

// Pages temporaires simples
const Catalogue = () => <div style={{padding: '20px'}}><h1>Catalogue</h1></div>;
const NotreADN = () => <div style={{padding: '20px'}}><h1>Notre ADN</h1></div>;
const FAQ = () => <div style={{padding: '20px'}}><h1>FAQ</h1></div>;
const CGU = () => <div style={{padding: '20px'}}><h1>Conditions Générales d'Utilisation</h1></div>;

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Composant pour gérer le footer
function AppContent() {
  const location = useLocation();
  const path = location.pathname;
  
  // Afficher le footer complet uniquement sur la page d'accueil
  const showFullFooter = path === '/';
  // Afficher le footer de catalogue uniquement sur la page catalogue
  const showCatalogueFooter = path === '/catalogue';
  
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/notre-adn" element={<NotreADN />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mes-annonces" element={<MesAnnonces />} />
          <Route path="/profil-public" element={<PublicProfile />} />
          <Route path="/modifier-profil" element={<EditProfile />} />
          <Route path="/parametres" element={<Settings />} />
          <Route path="/parametres/notifications" element={<NotificationSettings />} />
          <Route path="/parametres/email" element={<EmailSettings />} />
          <Route path="/parametres/mot-de-passe" element={<PasswordSettings />} />
          <Route path="/parametres/utilisateurs-bloques" element={<BlockedUsers />} />
          <Route path="/parametres/supprimer-compte" element={<DeleteAccount />} />
          <Route path="/post-ad" element={<PostAd />} />
        </Routes>
      </main>
      
      {showFullFooter ? (
        <Footer type="home" />
      ) : showCatalogueFooter ? (
        <Footer type="catalogue" />
      ) : (
        <SimpleFooter />
      )}
    </div>
  );
}

export default App;






