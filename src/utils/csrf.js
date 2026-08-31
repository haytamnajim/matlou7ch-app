/**
 * Protection CSRF (Cross-Site Request Forgery)
 * Matlou7ch Application
 */

/**
 * Génère un token CSRF aléatoire
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Stocke le token CSRF dans le localStorage
 */
export const storeCSRFToken = () => {
  const token = generateCSRFToken();
  localStorage.setItem('csrf_token', token);
  localStorage.setItem('csrf_timestamp', Date.now().toString());
  return token;
};

/**
 * Récupère le token CSRF depuis le localStorage
 */
export const getCSRFToken = () => {
  const token = localStorage.getItem('csrf_token');
  const timestamp = localStorage.getItem('csrf_timestamp');
  
  if (!token || !timestamp) {
    return null;
  }
  
  // Token expire après 1 heure
  const tokenAge = Date.now() - parseInt(timestamp);
  if (tokenAge > 3600000) {
    clearCSRFToken();
    return null;
  }
  
  return token;
};

/**
 * Supprime le token CSRF
 */
export const clearCSRFToken = () => {
  localStorage.removeItem('csrf_token');
  localStorage.removeItem('csrf_timestamp');
};

/**
 * Vérifie si le token CSRF est valide
 */
export const validateCSRFToken = (token) => {
  const storedToken = getCSRFToken();
  return storedToken === token;
};

/**
 * Initialise le token CSRF au chargement de l'application
 */
export const initializeCSRFProtection = () => {
  if (!getCSRFToken()) {
    return storeCSRFToken();
  }
  return getCSRFToken();
};

/**
 * Ajoute le token CSRF aux headers d'une requête
 */
export const addCSRFToHeaders = (headers = {}) => {
  const token = getCSRFToken();
  if (token) {
    return {
      ...headers,
      'X-CSRF-Token': token
    };
  }
  return headers;
};
