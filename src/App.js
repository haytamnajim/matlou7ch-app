import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Favoris from './pages/Favoris';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import MesAnnonces from './pages/MesAnnonces';
import PublicProfile from './pages/PublicProfile';
import EditProfile from './pages/EditProfile';
import Settings from './pages/Settings';
import EmailSettings from './pages/EmailSettings';
import BlockedUsers from './pages/BlockedUsers';
import './App.css';

// Pages temporaires simples
const Home = () => <div style={{padding: '20px'}}><h1>Page d'accueil</h1></div>;
const Catalogue = () => <div style={{padding: '20px'}}><h1>Catalogue</h1></div>;
const NotreADN = () => <div style={{padding: '20px'}}><h1>Notre ADN</h1></div>;
const FAQ = () => <div style={{padding: '20px'}}><h1>FAQ</h1></div>;
const CGU = () => <div style={{padding: '20px'}}><h1>Conditions Générales d'Utilisation</h1></div>;

function App() {
  return (
    <Router>
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
            <Route path="/parametres/email" element={<EmailSettings />} />
            <Route path="/parametres/utilisateurs-bloques" element={<BlockedUsers />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;






