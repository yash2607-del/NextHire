/**
 * Authentication Utility Module
 * Centralized auth token management with best practices
 * Handles token storage, validation, and user state
 */

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

/**
 * Store authentication token and user data
 * @param {string} token - JWT token from backend
 * @param {object} user - User data (role, userId, email)
 */
export const setAuthToken = (token, user = null) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

/**
 * Get current authentication token
 * @returns {string|null} JWT token or null
 */
export const getAuthToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return null;
  }
};

/**
 * Parse and decode JWT token payload
 * @param {string} token - JWT token
 * @returns {object|null} Decoded token payload or null
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    // Add 5 second buffer
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime + 5;
  } catch {
    return true;
  }
};

/**
 * Get current user from stored token
 * @returns {object|null} User object with role, userId, email
 */
export const getCurrentUser = () => {
  try {
    const token = getAuthToken();
    if (!token || isTokenExpired(token)) {
      return null;
    }
    
    const decoded = decodeToken(token);
    return decoded ? {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    } : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated with valid token
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  return token && !isTokenExpired(token);
};

/**
 * Check if current user has specific role
 * @param {string} requiredRole - Role to check
 * @returns {boolean} True if user has the role
 */
export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  return user && user.role === requiredRole;
};

/**
 * Clear all authentication data (logout)
 */
export const clearAuth = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Legacy keys used in older components
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
};

/**
 * Create Authorization header for API requests
 * @returns {object|null} Headers object or null
 */
export const getAuthHeader = () => {
  const token = getAuthToken();
  if (!token || isTokenExpired(token)) {
    return null;
  }
  return {
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Setup axios interceptor for automatic token injection
 * @param {object} axiosInstance - Axios instance
 */
export const setupAxiosInterceptor = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token && !isTokenExpired(token)) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        clearAuth();
        // App uses HashRouter; redirect to landing where Login/Signup are available
        window.location.hash = '#/';
      }
      return Promise.reject(error);
    }
  );
};

export default {
  setAuthToken,
  getAuthToken,
  decodeToken,
  isTokenExpired,
  getCurrentUser,
  isAuthenticated,
  hasRole,
  clearAuth,
  getAuthHeader,
  setupAxiosInterceptor
};
