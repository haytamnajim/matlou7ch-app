import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
  return useContext(AuthContext);
}

// Fournisseur du contexte
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sécurité : Si le chargement prend plus de 10 secondes, on force l'affichage
    const timer = setTimeout(() => {
      if (loading) {
        console.warn("AuthContext: Timeout de chargement atteint ! Force de l'arrêt...");
        setLoading(false);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    console.log("AuthContext: Initialisation...");
    // 1. Récupérer la session actuelle
    const getSession = async () => {
      console.log("AuthContext: Récupération de la session...");
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("AuthContext: Erreur getSession:", error);
          setLoading(false);
          return;
        }
        console.log("AuthContext: Session récupérée:", !!session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("AuthContext: Exception getSession:", err);
        setLoading(false);
      }
    };

    getSession();

    // 2. Écouter les changements d'état (connexion, déconnexion)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("AuthContext: État Auth changé:", event);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Récupérer le profil utilisateur depuis public.users
  const fetchProfile = async (userId) => {
    console.log("AuthContext: Chargement du profil pour:", userId);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('AuthContext: Erreur fetchProfile:', error);
      } else {
        console.log("AuthContext: Profil chargé.");
        setProfile(data);
      }
    } catch (err) {
      console.error('AuthContext: Exception fetchProfile:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion (Email/Mot de passe)
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  // Fonction de déconnexion
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
  };

  // Fonction d'inscription
  const register = async (userData) => {
    const { email, password, name, phone, city } = userData;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          city
        }
      }
    });

    if (error) throw error;
    return data;
  };

  // Login social (Google, Facebook)
  const loginWithSocial = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider.toLowerCase(),
      options: {
        redirectTo: window.location.origin,
      }
    });
    if (error) throw error;
    return data;
  };

  const value = {
    user,
    profile,
    loading,
    login,
    logout,
    register,
    loginWithSocial,
    isAuthenticated: !!user,
    isAdmin: profile?.email === 'admin@matlou7ch.ma' || false
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#4a56e2'
        }}>
          <div className="spinner" style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #4a56e2',
            borderRadius: '50%',
            marginBottom: '20px'
          }}></div>
          Chargement de Matlou7ch...
        </div>
      ) : children}
    </AuthContext.Provider>
  );
}