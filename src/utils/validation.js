/**
 * Utilitaires de validation et sanitization des données
 * Matlou7ch Application
 */

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Valide un email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un mot de passe (min 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre)
 */
export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 8 caractères' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une majuscule' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une minuscule' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un chiffre' };
  }
  
  return { valid: true };
};

/**
 * Valide un numéro de téléphone marocain
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^(0|(\+212))[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valide une URL
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valide un texte (longueur min et max)
 */
export const validateText = (text, min = 1, max = 500) => {
  if (!text || text.length < min) {
    return { valid: false, message: `Le texte doit contenir au moins ${min} caractère(s)` };
  }
  
  if (text.length > max) {
    return { valid: false, message: `Le texte ne peut pas dépasser ${max} caractères` };
  }
  
  return { valid: true };
};

/**
 * Valide un nom (lettres, espaces, tirets uniquement)
 */
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Zàâäéèêëïîôùûüç\s'-]+$/;
  if (!nameRegex.test(name)) {
    return { valid: false, message: 'Le nom ne peut contenir que des lettres, espaces et tirets' };
  }
  return { valid: true };
};

/**
 * Valide une ville marocaine
 */
export const validateCity = (city) => {
  const moroccanCities = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir',
    'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Safi', 'El Jadida',
    'Beni Mellal', 'Nador', 'Khouribga', 'Settat', 'Mohammedia',
    'Kénitra', 'Taza', 'Essaouira', 'Larache', 'Guelmim'
  ];
  
  return moroccanCities.some(c => c.toLowerCase() === city.toLowerCase());
};

// ============================================================================
// SANITIZATION
// ============================================================================

/**
 * Sanitize une chaîne de caractères contre XSS
 */
export const sanitizeString = (str) => {
  if (!str) return '';
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Sanitize un email
 */
export const sanitizeEmail = (email) => {
  if (!email) return '';
  
  // Convertir en minuscules
  const sanitized = email.toLowerCase().trim();
  
  // Valider le format
  if (!validateEmail(sanitized)) {
    return '';
  }
  
  return sanitized;
};

/**
 * Sanitize un numéro de téléphone
 */
export const sanitizePhone = (phone) => {
  if (!phone) return '';
  
  // Garder uniquement les chiffres et le +
  const sanitized = phone.replace(/[^\d+]/g, '');
  
  // Valider le format
  if (!validatePhone(sanitized)) {
    return '';
  }
  
  return sanitized;
};

/**
 * Sanitize une URL
 */
export const sanitizeUrl = (url) => {
  if (!url) return '';
  
  const sanitized = url.trim();
  
  // Ajouter https:// si nécessaire
  if (!sanitized.startsWith('http://') && !sanitized.startsWith('https://')) {
    return `https://${sanitized}`;
  }
  
  // Valider l'URL
  if (!validateUrl(sanitized)) {
    return '';
  }
  
  return sanitized;
};

/**
 * Sanitize un nom
 */
export const sanitizeName = (name) => {
  if (!name) return '';
  
  // Garder uniquement les lettres, espaces et tirets
  const sanitized = name.replace(/[^a-zA-Zàâäéèêëïîôùûüç\s'-]/g, '').trim();
  
  // Capitaliser la première lettre
  return sanitized.charAt(0).toUpperCase() + sanitized.slice(1).toLowerCase();
};

/**
 * Sanitize une ville
 */
export const sanitizeCity = (city) => {
  if (!city) return '';
  
  const sanitized = city.trim();
  
  // Valider que c'est une ville marocaine
  if (!validateCity(sanitized)) {
    return '';
  }
  
  // Capitaliser correctement
  return sanitized.charAt(0).toUpperCase() + sanitized.slice(1).toLowerCase();
};

/**
 * Sanitize un texte (description, message, etc.)
 */
export const sanitizeText = (text, maxLength = 5000) => {
  if (!text) return '';
  
  let sanitized = text.trim();
  
  // Limiter la longueur
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  // Sanitize contre XSS
  sanitized = sanitizeString(sanitized);
  
  return sanitized;
};

/**
 * Sanitize un objet (récursif)
 */
export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  
  const sanitized = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      
      if (typeof value === 'string') {
        sanitized[key] = sanitizeString(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized;
};

// ============================================================================
// VALIDATION DE FORMULAIRE
// ============================================================================

/**
 * Valide un formulaire d'inscription
 */
export const validateRegisterForm = (data) => {
  const errors = {};
  
  if (!data.email) {
    errors.email = 'L\'email est requis';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Email invalide';
  }
  
  if (!data.password) {
    errors.password = 'Le mot de passe est requis';
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.message;
    }
  }
  
  if (!data.name) {
    errors.name = 'Le nom est requis';
  } else {
    const nameValidation = validateName(data.name);
    if (!nameValidation.valid) {
      errors.name = nameValidation.message;
    }
  }
  
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Numéro de téléphone invalide';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valide un formulaire de connexion
 */
export const validateLoginForm = (data) => {
  const errors = {};
  
  if (!data.email) {
    errors.email = 'L\'email est requis';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Email invalide';
  }
  
  if (!data.password) {
    errors.password = 'Le mot de passe est requis';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valide un formulaire de publication d'annonce
 */
export const validateListingForm = (data) => {
  const errors = {};
  
  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'Le titre doit contenir au moins 5 caractères';
  } else if (data.title.length > 100) {
    errors.title = 'Le titre ne peut pas dépasser 100 caractères';
  }
  
  if (!data.description || data.description.trim().length < 20) {
    errors.description = 'La description doit contenir au moins 20 caractères';
  } else if (data.description.length > 2000) {
    errors.description = 'La description ne peut pas dépasser 2000 caractères';
  }
  
  if (!data.category) {
    errors.category = 'La catégorie est requise';
  }
  
  if (!data.location) {
    errors.location = 'La ville est requise';
  } else if (!validateCity(data.location)) {
    errors.location = 'Ville invalide';
  }
  
  if (!data.condition) {
    errors.condition = 'L\'état est requis';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valide un formulaire de message
 */
export const validateMessageForm = (data) => {
  const errors = {};
  
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères';
  } else if (data.message.length > 1000) {
    errors.message = 'Le message ne peut pas dépasser 1000 caractères';
  }
  
  if (!data.recipientId) {
    errors.recipientId = 'Le destinataire est requis';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
