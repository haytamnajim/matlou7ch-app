/**
 * Utilitaire de logging amélioré pour l'application
 * Permet un logging structuré avec différents niveaux et contexte
 */

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

const LOG_LEVEL_PRIORITY = {
  [LOG_LEVELS.ERROR]: 0,
  [LOG_LEVELS.WARN]: 1,
  [LOG_LEVELS.INFO]: 2,
  [LOG_LEVELS.DEBUG]: 3,
};

// Configuration du niveau de log (peut être ajusté via variable d'environnement)
const CURRENT_LOG_LEVEL = process.env.REACT_APP_LOG_LEVEL || LOG_LEVELS.INFO;

class Logger {
  constructor(context = 'App') {
    this.context = context;
  }

  /**
   * Formate un message de log avec contexte et timestamp
   */
  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}] [${this.context}]`;
    return data ? `${prefix} ${message}` : `${prefix} ${message}`;
  }

  /**
   * Log un message de niveau ERROR
   */
  error(message, error = null, data = null) {
    if (this.shouldLog(LOG_LEVELS.ERROR)) {
      console.error(this.formatMessage(LOG_LEVELS.ERROR, message), error || '', data || '');
    }
  }

  /**
   * Log un message de niveau WARN
   */
  warn(message, data = null) {
    if (this.shouldLog(LOG_LEVELS.WARN)) {
      console.warn(this.formatMessage(LOG_LEVELS.WARN, message), data || '');
    }
  }

  /**
   * Log un message de niveau INFO
   */
  info(message, data = null) {
    if (this.shouldLog(LOG_LEVELS.INFO)) {
      console.log(this.formatMessage(LOG_LEVELS.INFO, message), data || '');
    }
  }

  /**
   * Log un message de niveau DEBUG
   */
  debug(message, data = null) {
    if (this.shouldLog(LOG_LEVELS.DEBUG)) {
      console.log(this.formatMessage(LOG_LEVELS.DEBUG, message), data || '');
    }
  }

  /**
   * Détermine si un message doit être loggé selon le niveau actuel
   */
  shouldLog(level) {
    return LOG_LEVEL_PRIORITY[level] <= LOG_LEVEL_PRIORITY[CURRENT_LOG_LEVEL];
  }

  /**
   * Crée un logger avec un contexte spécifique
   */
  withContext(newContext) {
    return new Logger(newContext);
  }
}

// Logger par défaut
export const logger = new Logger();

// Exporter les niveaux de log
export { LOG_LEVELS };

// Fonction helper pour créer un logger avec contexte
export function createLogger(context) {
  return new Logger(context);
}
