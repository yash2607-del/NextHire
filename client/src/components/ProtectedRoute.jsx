import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { ROUTES } from "../config/routes";

/**
 * Protected Route Component
 * Ensures user is authenticated (any role)
 * @param {React.ReactNode} children - Child components to render
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect to login with return URL
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  
  return children;
}
