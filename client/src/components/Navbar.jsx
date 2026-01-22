import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { isAuthenticated, clearAuth, getCurrentUser } from "../utils/auth";
import { getDashboardRoute, ROUTES } from "../config/routes";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const authenticated = isAuthenticated();
    setIsLoggedIn(authenticated);
    
    if (authenticated) {
      const user = getCurrentUser();
      setUserRole(user?.role);
    }
  }, []);

  const handleSignOut = () => {
    clearAuth();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate(ROUTES.LANDING);
  };

  const getDashboardLink = () => {
    if (userRole) {
      return getDashboardRoute(userRole);
    }
    return ROUTES.HOME;
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg bg-white py-3 border-bottom"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container">

          {/* Logo */}
          <Link
            className="navbar-brand fw-bold fs-4 d-flex align-items-center"
            to="/"
            aria-label="NextHire home"
            style={{ color: "rgba(0, 106, 255, 0.2)" }}
          >
            NextHire
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links */}
          <div className="collapse navbar-collapse" id="navbarMain">

            {/* Center nav links */}
            <ul className="navbar-nav mx-auto gap-4 fw-medium">
              <li className="nav-item">
                <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>

            {/* Right-aligned actions */}
            <div className="d-flex align-items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Link to={getDashboardLink()} className="btn btn-outline-primary px-4 rounded-pill nav-btn-animate">
                    Dashboard
                  </Link>
                  <button onClick={handleSignOut} className="btn btn-light px-3 rounded-pill nav-btn-animate">Sign out</button>
                </>
              ) : (
                <>
                  <Link to={ROUTES.LOGIN} className="btn btn-light px-4 rounded-pill nav-btn-animate">
                    Log in
                  </Link>
                  <Link to={ROUTES.SIGNUP} className="btn btn-primary px-4 rounded-pill nav-btn-animate" style={{background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)', border: 'none'}}>
                    Start Now
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
