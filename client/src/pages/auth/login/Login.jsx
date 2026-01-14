import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { setAuthToken, getCurrentUser } from '../../../utils/auth';
import { getDashboardRoute, ROUTES } from '../../../config/routes';
import { loginUser } from '../../../api';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await loginUser({ email, password });
      const { token, role, userId } = response.data;

      // Store token and user data
      setAuthToken(token, { role, userId, email });
      
      toast.success("Login successful!");

      // Get redirect path from location state or use role-based dashboard
      const from = location.state?.from?.pathname || getDashboardRoute(role);
      
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
      
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = error.response?.data?.error || "An error occurred. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="auth-wrapper">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-logo">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to your NextHire account</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {error && (
                <div className="error-message" role="alert" aria-live="polite">
                  <svg className="error-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="login-email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="login-email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  aria-label="Email Address"
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password" className="form-label">Password</label>
                <input
                  type="password"
                  id="login-password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  aria-label="Password"
                  aria-required="true"
                />
              </div>

              <div className="auth-actions">
                <button type="submit" className="btn-auth btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>

              <div className="auth-links">
                <Link to="/forgot" className="auth-link">Forgot password?</Link>
              </div>
            </form>

            <div className="auth-footer">
              <p className="auth-footer-text">
                Don't have an account?
                <Link to="/signup" className="auth-footer-link">Sign up</Link>
              </p>
              <p className="auth-footer-text" style={{ marginTop: '0.5rem' }}>
                <Link to="/" className="auth-link">← Back to home</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
