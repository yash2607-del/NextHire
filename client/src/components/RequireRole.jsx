import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, hasRole, getCurrentUser } from "../utils/auth";
import { ROUTES, getUnauthorizedRedirect } from "../config/routes";

/**
 * Protected Route Component
 * Ensures user is authenticated and has required role
 * @param {string} role - Required role (e.g., 'recruiter', 'applicant')
 * @param {React.ReactNode} children - Child components to render
 */
export default function RequireRole({ role, children }) {
  const location = useLocation();
  
  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login with return URL
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  
  // Check if user has required role
  if (!hasRole(role)) {
    const user = getCurrentUser();
    const redirectPath = getUnauthorizedRedirect(location.pathname, user?.role);
    
    // Redirect to appropriate dashboard for user's role
    return <Navigate to={redirectPath} replace />;
  }
  
  // User is authenticated and has correct role
  return children;
}
