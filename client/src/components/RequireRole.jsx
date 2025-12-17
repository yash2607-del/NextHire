import React from "react";
import { Navigate } from "react-router-dom";

function parseTokenRole(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch (e) {
    return null;
  }
}

export default function RequireRole({ role, children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  const userRole = parseTokenRole(token);
  if (userRole !== role) return <Navigate to="/login" replace />;
  return children;
}
