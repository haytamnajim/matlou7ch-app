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
    // 1. Récupérer la session actuelle
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    };

    getSession();

    // 2. Écouter les changements d'état (connexion, déconnexion)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Récupérer le profil utilisateur depuis public.users
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erreur lors du chargement du profil:', error);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Exception lors du chargement du profil:', err);
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

    // Inscription dans Supabase Auth
    // Les métadonnées seront utilisées par le trigger SQL pour créer le profil public
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone, // Optionnel, stocké dans les métadonnées auth
          city   // Optionnel, stocké dans les métadonnées auth
        }
      }
    });

    if (error) throw error;

    // Si l'inscription réussit, on met à jour le profil localement si nécessaire
    // Mais le trigger s'en chargera côté DB
    return data;
  };

  // Login social (Google, Facebook)
  const loginWithSocial = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider.toLowerCase(),
      options: {
        redirectTo: window.location.origin, // Rediriger vers l'accueil après connexion
      }
    });
    if (error) throw error;
    return data;
  };

  const value = {
    user,      // L'utilisateur authentifié (Auth Supabase)
    profile,   // Le profil public (Table public.users)
    loading,
    login,
    logout,
    register,
    loginWithSocial,
    isAuthenticated: !!user,
    isAdmin: profile?.email === 'admin@matlou7ch.ma' || false // TODO: Remplacer par un vrai rôle admin plus tard
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}