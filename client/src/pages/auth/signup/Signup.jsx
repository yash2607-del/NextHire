import React, { useState, useEffect } from "react";
import { registerUser } from '../../../api';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../login/Login.css";
import { pageTransition } from "../../../utils/animations";
import { extractError } from '../../../lib/utils';

function Signup() {
  const [role, setRole] = useState("Applicant");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Common
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Applicant
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");

  // Recruiter
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [industryType, setIndustryType] = useState("");

  useEffect(() => {
    // Initialize page transition animation
    pageTransition();
  }, []);

  const toggleRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    let payload = {
      name: role === "Applicant" ? fullName : email.split("@")[0],
      email,
      password,
      role,
      additionalData: {},
    };

    if (role === "Applicant") {
      payload.additionalData = {
        location,
        experience,
        jobType,
      };
    } else {
      payload.additionalData = {
        company: companyName,
        location: companyLocation,
        jobTitle,
        industry: industryType,
      };
    }

    try {
      const response = await registerUser(payload);
      toast.success(response.data.message);
      setTimeout(()=>{
        window.location.href='/login';
      },1500)
    } catch (error) {
      const msg = extractError(error) || "Signup failed";
      setError(msg);
      toast.error(msg);
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
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 8V14M17 11H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join NextHire and start your journey</p>
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

              <div className="role-toggle" role="group" aria-label="Select role">
                <button
                  type="button"
                  className={`role-btn ${role === "Recruiter" ? "active" : ""}`}
                  onClick={() => toggleRole("Recruiter")}
                  disabled={loading}
                >
                  <svg className="role-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Recruiter
                </button>
                <button
                  type="button"
                  className={`role-btn ${role === "Applicant" ? "active" : ""}`}
                  onClick={() => toggleRole("Applicant")}
                  disabled={loading}
                >
                  <svg className="role-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Applicant
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="signup-email" className="form-label">Email Address</label>
                <input
                  id="signup-email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  aria-label="Email Address"
                  aria-required="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password" className="form-label">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  className="form-input"
                  placeholder="Create a password"
                  aria-label="Password"
                  aria-required="true"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-confirm" className="form-label">Confirm Password</label>
                <input
                  id="signup-confirm"
                  type="password"
                  className="form-input"
                  placeholder="Confirm your password"
                  aria-label="Confirm Password"
                  aria-required="true"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Recruiter Fields */}
              {role === "Recruiter" && (
                <>
                  <div className="form-group">
                    <label htmlFor="company-name" className="form-label">Company Name</label>
                    <input
                      id="company-name"
                      type="text"
                      className="form-input"
                      placeholder="Acme Corporation"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-location" className="form-label">Company Location</label>
                    <input
                      id="company-location"
                      type="text"
                      className="form-input"
                      placeholder="New York, NY"
                      value={companyLocation}
                      onChange={(e) => setCompanyLocation(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="job-title" className="form-label">Job Title</label>
                    <select
                      id="job-title"
                      className="form-input"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Select Job Title</option>
                      <option value="Manager">Manager</option>
                      <option value="Developer">Developer</option>
                      <option value="Designer">Designer</option>
                      <option value="Analyst">Analyst</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="industry-type" className="form-label">Industry Type</label>
                    <select
                      id="industry-type"
                      className="form-input"
                      value={industryType}
                      onChange={(e) => setIndustryType(e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Select Industry Type</option>
                      <option value="Software">IT</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                </>
              )}

              {/* Applicant Fields */}
              {role === "Applicant" && (
                <>
                  <div className="form-group">
                    <label htmlFor="full-name" className="form-label">Full Name</label>
                    <input
                      id="full-name"
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                      id="location"
                      type="text"
                      className="form-input"
                      placeholder="San Francisco, CA"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Experience Level</label>
                    <div className="experience-group">
                      {["Fresher", "1-3 years", "3+ years"].map((level) => (
                        <button
                          type="button"
                          key={level}
                          className={`experience-btn ${experience === level ? "active" : ""}`}
                          onClick={() => setExperience(level)}
                          disabled={loading}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="job-type" className="form-label">Preferred Job Type</label>
                    <select
                      id="job-type"
                      className="form-input"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Select Job Type</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-Site">On-Site</option>
                      <option value="Any">Any</option>
                    </select>
                  </div>
                </>
              )}

              <div className="auth-actions">
                <button type="submit" className="btn-auth btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>

            <div className="auth-footer">
              <p className="auth-footer-text">
                Already have an account?
                <Link to="/login" className="auth-footer-link">Sign in</Link>
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

export default Signup;
