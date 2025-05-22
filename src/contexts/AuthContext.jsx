import React, { createContext, useState, useContext, useEffect } from 'react';

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
  return useContext(AuthContext);
}

// Fournisseur du contexte
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Fonction d'inscription
  const register = (userData) => {
    // Dans une application réelle, vous enverriez ces données à votre API
    // Pour l'instant, nous simulons simplement une inscription réussie
    const newUser = {
      ...userData,
      id: Date.now(), // Simuler un ID unique
    };
    login(newUser); // Connecter l'utilisateur après l'inscription
    return newUser;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}