/**
 * Rate Limiting
 * Matlou7ch Application
 */

/**
 * Store pour le rate limiting en mémoire
 */
const rateLimitStore = new Map();

/**
 * Configuration du rate limiting
 */
const RATE_LIMIT_CONFIG = {
  // Login: 5 tentatives par 15 minutes
  login: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDuration: 30 * 60 * 1000 // 30 minutes
  },
  // Register: 3 tentatives par heure
  register: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 heure
    blockDuration: 60 * 60 * 1000 // 1 heure
  },
  // Message: 20 messages par heure
  message: {
    maxRequests: 20,
    windowMs: 60 * 60 * 1000, // 1 heure
    blockDuration: 15 * 60 * 1000 // 15 minutes
  },
  // Listing: 5 annonces par heure
  listing: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 heure
    blockDuration: 30 * 60 * 1000 // 30 minutes
  },
  // Contact: 10 contacts par heure
  contact: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 heure
    blockDuration: 15 * 60 * 1000 // 15 minutes
  },
  // Search: 30 recherches par minute
  search: {
    maxRequests: 30,
    windowMs: 60 * 1000, // 1 minute
    blockDuration: 5 * 60 * 1000 // 5 minutes
  }
};

/**
 * Vérifie si une action est autorisée selon le rate limiting
 * @param {string} action - Type d'action (login, register, message, etc.)
 * @param {string} identifier - Identifiant unique (email, userId, IP, etc.)
 * @returns {Object} - { allowed: boolean, remainingRequests: number, resetTime: number }
 */
export const checkRateLimit = (action, identifier) => {
  const config = RATE_LIMIT_CONFIG[action];
  
  if (!config) {
    console.warn(`Rate limit config not found for action: ${action}`);
    return { allowed: true, remainingRequests: Infinity, resetTime: 0 };
  }
  
  const key = `${action}:${identifier}`;
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  // Si aucun record existe, créer un nouveau
  if (!record) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
      blockedUntil: null
    });
    
    return {
      allowed: true,
      remainingRequests: config.maxRequests - 1,
      resetTime: now + config.windowMs
    };
  }
  
  // Si l'utilisateur est bloqué
  if (record.blockedUntil && now < record.blockedUntil) {
    return {
      allowed: false,
      remainingRequests: 0,
      resetTime: record.blockedUntil,
      blocked: true
    };
  }
  
  // Si la fenêtre de temps est expirée, réinitialiser
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + config.windowMs;
    record.blockedUntil = null;
    rateLimitStore.set(key, record);
    
    return {
      allowed: true,
      remainingRequests: config.maxRequests - 1,
      resetTime: record.resetTime
    };
  }
  
  // Vérifier si la limite est dépassée
  if (record.count >= config.maxRequests) {
    // Bloquer l'utilisateur
    record.blockedUntil = now + config.blockDuration;
    rateLimitStore.set(key, record);
    
    return {
      allowed: false,
      remainingRequests: 0,
      resetTime: record.blockedUntil,
      blocked: true
    };
  }
  
  // Incrémenter le compteur
  record.count++;
  rateLimitStore.set(key, record);
  
  return {
    allowed: true,
    remainingRequests: config.maxRequests - record.count,
    resetTime: record.resetTime
  };
};

/**
 * Réinitialise le rate limiting pour un identifiant
 * @param {string} action - Type d'action
 * @param {string} identifier - Identifiant unique
 */
export const resetRateLimit = (action, identifier) => {
  const key = `${action}:${identifier}`;
  rateLimitStore.delete(key);
};

/**
 * Nettoie les anciens enregistrements de rate limiting
 */
export const cleanupRateLimitStore = () => {
  const now = Date.now();
  
  for (const [key, record] of rateLimitStore.entries()) {
    // Supprimer les records expirés (non bloqués)
    if (!record.blockedUntil && now > record.resetTime) {
      rateLimitStore.delete(key);
    }
    // Supprimer les records bloqués expirés
    if (record.blockedUntil && now > record.blockedUntil) {
      rateLimitStore.delete(key);
    }
  }
};

/**
 * Obtient les informations de rate limiting pour un identifiant
 * @param {string} action - Type d'action
 * @param {string} identifier - Identifiant unique
 * @returns {Object|null} - Informations de rate limiting ou null
 */
export const getRateLimitInfo = (action, identifier) => {
  const key = `${action}:${identifier}`;
  return rateLimitStore.get(key) || null;
};

/**
 * Hook React pour le rate limiting
 */
export const useRateLimit = (action, identifier) => {
  const check = () => checkRateLimit(action, identifier);
  const reset = () => resetRateLimit(action, identifier);
  const getInfo = () => getRateLimitInfo(action, identifier);
  
  return { check, reset, getInfo };
};

// Nettoyer le store toutes les 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
