/**
 * Centralized Routes Configuration
 * All application routes defined in one place
 */

export const ROUTES = {
  // Public routes
  LANDING: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot',
  RESET_PASSWORD: '/newpass',
  
  // Common routes
  HOME: '/home',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Recruiter routes
  RECRUITER: {
    DASHBOARD: '/recruiter/dashboard',
    FORM_START: '/recruiter/form',
    FORM_STEP2: '/recruiter/form/step2',
    FORM_STEP3: '/recruiter/form/step3',
    FORM_STEP4: '/recruiter/form/step4',
    FORM_REVIEW: '/recruiter/form/review',
    JOB_DETAILS: '/recruiter/jobs/:jobId',
    PROFILE: '/recruiter/profile',
    SETTINGS: '/recruiter/settings',
    // Legacy routes for backward compatibility
    LEGACY_DASHBOARD: '/dashboard',
    LEGACY_FORM: '/RecruiterForm',
  },
  
  // Applicant routes
  APPLICANT: {
    JOBS: '/applicant/jobs',
    APPLICATIONS: '/applicant/applications',
    PROFILE: '/applicant/profile',
    SETTINGS: '/applicant/settings',
    JOB_APPLY: '/applicant/jobs/:jobId/apply',
  },
  
  // Job routes
  JOB_DETAILS: '/jobs/:jobId',
};

/**
 * Get role-based dashboard route
 * @param {string} role - User role
 * @returns {string} Dashboard route
 */
export const getDashboardRoute = (role) => {
  switch (role) {
    case 'recruiter':
      return ROUTES.RECRUITER.DASHBOARD;
    case 'applicant':
      return ROUTES.APPLICANT.JOBS;
    default:
      return ROUTES.HOME;
  }
};

/**
 * Get role-based profile route
 * @param {string} role - User role
 * @returns {string} Profile route
 */
export const getProfileRoute = (role) => {
  switch (role) {
    case 'recruiter':
      return ROUTES.RECRUITER.PROFILE;
    case 'applicant':
      return ROUTES.APPLICANT.PROFILE;
    default:
      return ROUTES.PROFILE;
  }
};

/**
 * Get role-based settings route
 * @param {string} role - User role
 * @returns {string} Settings route
 */
export const getSettingsRoute = (role) => {
  switch (role) {
    case 'recruiter':
      return ROUTES.RECRUITER.SETTINGS;
    case 'applicant':
      return ROUTES.APPLICANT.SETTINGS;
    default:
      return ROUTES.SETTINGS;
  }
};

/**
 * Check if route requires authentication
 * @param {string} path - Route path
 * @returns {boolean} True if auth required
 */
export const isProtectedRoute = (path) => {
  const publicRoutes = [
    ROUTES.LANDING,
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
  ];
  return !publicRoutes.includes(path);
};

/**
 * Get redirect path for unauthorized access
 * @param {string} currentPath - Current path
 * @param {string} userRole - User role
 * @returns {string} Redirect path
 */
export const getUnauthorizedRedirect = (currentPath, userRole) => {
  // If no user role, redirect to login
  if (!userRole) {
    return ROUTES.LOGIN;
  }
  
  // If trying to access recruiter routes as applicant
  if (currentPath.startsWith('/recruiter') || currentPath === '/dashboard') {
    if (userRole === 'applicant') {
      return ROUTES.APPLICANT.JOBS;
    }
  }
  
  // If trying to access applicant routes as recruiter
  if (currentPath.startsWith('/applicant')) {
    if (userRole === 'recruiter') {
      return ROUTES.RECRUITER.DASHBOARD;
    }
  }
  
  // Default to dashboard
  return getDashboardRoute(userRole);
};

export default ROUTES;
