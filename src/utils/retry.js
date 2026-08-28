/**
 * Utilitaire de retry pour les requêtes qui peuvent échouer temporairement
 * @param {Function} fn - Fonction à réessayer
 * @param {Object} options - Options de retry
 * @param {number} options.maxRetries - Nombre maximum de tentatives (défaut: 3)
 * @param {number} options.delay - Délai entre les tentatives en ms (défaut: 1000)
 * @param {Function} options.shouldRetry - Fonction pour déterminer si on doit réessayer
 * @returns {Promise} - Résultat de la fonction ou erreur après maxRetries
 */
export async function retry(fn, options = {}) {
  const {
    maxRetries = 3,
    delay = 1000,
    shouldRetry = (error) => true,
  } = options;

  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Si c'est la dernière tentative ou si on ne doit pas réessayer
      if (i === maxRetries - 1 || !shouldRetry(error)) {
        throw error;
      }

      // Attendre avant de réessayer avec backoff exponentiel
      const backoffDelay = delay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
    }
  }

  throw lastError;
}

/**
 * Détermine si une erreur est réessayable
 * @param {Error} error - L'erreur à analyser
 * @returns {boolean} - True si l'erreur est réessayable
 */
export function isRetryableError(error) {
  // Erreurs réseau
  if (error.message?.includes('fetch') || error.message?.includes('network')) {
    return true;
  }

  // Erreurs de timeout
  if (error.message?.includes('timeout') || error.code === 'ETIMEDOUT') {
    return true;
  }

  // Erreurs de serveur (5xx)
  if (error.status >= 500) {
    return true;
  }

  // Erreurs de rate limiting (429)
  if (error.status === 429) {
    return true;
  }

  return false;
}
