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
import Catalogue from './pages/Catalogue';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import PostAd from './components/PostAd';
import NotreADN from './pages/NotreADN';
import CGU from './pages/CGU';
import FAQ from './pages/FAQ';
import InformationsLegales from './pages/InformationsLegales';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  
  // Pages qui utilisent le Footer complet (uniquement ces 3 pages)
  const fullFooterPages = ['/', '/catalogue', '/notre-adn'];
  
  // Déterminer quel footer utiliser
  const useFullFooter = fullFooterPages.some(path => location.pathname === path);
  // Toutes les autres pages utilisent le SimpleFooter
  const useSimpleFooter = !useFullFooter;
  
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
          <Route path="/informations-legales" element={<InformationsLegales />} />
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
          <Route path="/contact" element={<Contact />} />
          {/* Nouvelles routes pour connexion et inscription */}
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
        </Routes>
      </main>
      {useSimpleFooter && <SimpleFooter />}
      {useFullFooter && <Footer type={location.pathname === '/' ? 'home' : location.pathname === '/catalogue' ? 'catalogue' : 'notre-adn'} />}
    </div>
  );
}

export default App;
