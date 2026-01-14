import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruiterForm } from "../../../context/RecruiterContext";
import './RecruiterForm.css';

function RecruiterForm() {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { formData, setFormData } = useRecruiterForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    (formData.companyName?.trim() || "") !== "" &&
    (formData.companyWebsite?.trim() || "") !== "";

  const handleContinue = (e) => {
    if (isFormValid) {
      navigate("/recruiter/form/step2");
    } else {
      setStatus("Please fill in all required fields.");
      const el = document.querySelector('#CompanyName, #website');
      if (el) el.focus();
    }
  };

  const goHome = () => {
    navigate('/recruiter/dashboard');
  };

  return (
    <div className="recruiter-form-wrapper">
      <div className="recruiter-form-container">
        <div className="form-nav-header">
          <div className="form-header" style={{ border: 'none', padding: 0, margin: 0 }}>
            <div className="form-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <h2 className="form-title">Company Information</h2>
          </div>
          <button onClick={goHome} className="btn-back-home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>
        </div>

        <div className="form-status" role="status" aria-live="polite">
          {status}
        </div>

        <form role="form" aria-labelledby="company-info-form">
          <div className="form-group">
            <label htmlFor="CompanyName" className="form-label">
              Company Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              className="form-input"
              id="CompanyName"
              placeholder="Enter your company name"
              value={formData.companyName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="website" className="form-label">
              Company Website <span className="required">*</span>
            </label>
            <input
              type="url"
              name="companyWebsite"
              className="form-input"
              id="website"
              placeholder="https://example.com"
              value={formData.companyWebsite || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyDescription" className="form-label">
              Company Description <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span>
            </label>
            <textarea
              name="companyDescription"
              className="form-textarea"
              id="companyDescription"
              rows="4"
              value={formData.companyDescription || ""}
              onChange={handleChange}
              placeholder="Enter a brief description of your company"
            ></textarea>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-form btn-form-primary"
              onClick={handleContinue}
              aria-label="Continue to next step"
            >
              Continue
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecruiterForm;
