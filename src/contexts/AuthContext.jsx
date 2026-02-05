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
    console.log("AuthContext: Tentative de déconnexion...");

    // Réinitialiser l'état local immédiatement
    setUser(null);
    setProfile(null);
    console.log("AuthContext: État local réinitialisé");

    // NETTOYAGE FORCÉ DU LOCALSTORAGE
    // Suppression manuelle des tokens Supabase pour empêcher la reconnexion automatique
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => {
        console.log("AuthContext: Suppression de la clé:", key);
        localStorage.removeItem(key);
      });
    } catch (e) {
      console.warn("AuthContext: Erreur lors du nettoyage localStorage:", e);
    }

    // Tenter de se déconnecter de Supabase en arrière-plan avec timeout
    try {
      // Créer une promesse avec timeout de 2 secondes
      const signOutPromise = supabase.auth.signOut();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 2000)
      );

      await Promise.race([signOutPromise, timeoutPromise]);
      console.log("AuthContext: Déconnexion Supabase réussie");
    } catch (err) {
      console.warn("AuthContext: Supabase signOut échoué ou timeout (ignoré):", err.message);
    }

    console.log("AuthContext: Déconnexion terminée");
    return { success: true };
  };

  // Fonction de suppression de compte
  const deleteAccount = async () => {
    if (!user) return;
    console.log("AuthContext: Suppression du compte pour:", user.id);

    try {
      // 1. Supprimer le profil dans public.users
      // Note: La row level security doit autoriser l'utilisateur à supprimer sa propre ligne
      const { error: profileError } = await supabase
        .from('users')
        .delete()
        .eq('id', user.id);

      if (profileError) {
        console.error("AuthContext: Erreur suppression profil:", profileError);
        throw profileError;
      }

      // 2. Déconnexion
      await logout();

      console.log("AuthContext: Compte supprimé avec succès.");
      return { success: true };
    } catch (err) {
      console.error("AuthContext: Exception suppression compte:", err);
      throw err;
    }
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
    deleteAccount,
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