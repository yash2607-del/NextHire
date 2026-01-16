import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruiterForm } from "../../../context/RecruiterContext";
import API from '../../../api';
import { getAuthToken } from '../../../utils/auth';
import './RecruiterForm.css';

function RecForm4() {
  const navigate = useNavigate();
  const { formData } = useRecruiterForm();

  const [deadline, setDeadline] = useState(formData.deadline || "");
  const [contactNumber, setContactNumber] = useState(formData.contactNumber || "");
  const [additionalInfo, setAdditionalInfo] = useState(formData.additionalInfo || "");

  useEffect(() => {
    setDeadline(formData.deadline || "");
    setContactNumber(formData.contactNumber || "");
    setAdditionalInfo(formData.additionalInfo || "");
  }, [formData]);

  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    // Get JWT token from auth helper
    const token = getAuthToken();
    if (!token) {
      setStatus("You must be logged in as a recruiter to post a job.");
      setTimeout(()=> navigate("/login"), 1200);
      return;
    }

    // Debug: Decode token to show role (no user-facing alert)
    try {
      const payloadDebug = JSON.parse(atob(token.split('.')[1]));
      console.debug('Token payload:', payloadDebug);
    } catch (e) {
      console.debug('Failed to decode token:', e);
    }

    const payload = {
      // recruiterId is NOT sent; server uses token
      title: formData.JobTitle,
      category: formData.jobCategory,
      jobType: formData.jobType,
      location: formData.jobLocation,
      jobDescription: formData.jobDescription,
      deadline,
      contactNumber,
      additionalInfo,
      skills: formData.skills || [],
      inclusivity: formData.selectedDisabilities || [],
      accommodations: formData.accessibilities || [],
      salary: formData.salaryRange ? Number(formData.salaryRange.replace(/[^0-9]/g, "")) : undefined,
    };

    // Frontend validation
    const missing = [];
    if (!payload.title) missing.push('title');
    if (!payload.category) missing.push('category');
    if (!payload.location) missing.push('location');
    if (!payload.jobDescription) missing.push('jobDescription');
    if (!payload.deadline) missing.push('deadline');
    if (!payload.contactNumber) missing.push('contactNumber');

    if (missing.length) {
      setStatus('Missing required: ' + missing.join(', '));
      const selector = missing[0] === 'title' ? '#JobTitle' : missing[0] === 'category' ? '#jobCategory' : missing[0] === 'location' ? '#jobLocation' : missing[0] === 'jobDescription' ? '#jobDescription' : missing[0] === 'deadline' ? 'input[type="date"]' : 'input[type="tel"]';
      const first = document.querySelector(selector);
      if (first) first.focus();
      return;
    }

    try {
      const res = await API.post("/jobs", payload);
      setStatus(res.data.message || "Job posted successfully!");
      setTimeout(function() { navigate("/recruiter/form/review"); }, 800);
    } catch (err) {
      const statusCode = err.response?.status;
      if (statusCode === 401 || statusCode === 403) {
        setStatus("You are not authorized. Please login as a recruiter.");
        setTimeout(()=> navigate("/login"), 1000);
        return;
      }
      console.error("Submission error:", err.response?.data || err.message);
      setStatus("Backend validation failed: " + JSON.stringify(err.response?.data?.errors || err.response?.data || err.message));
    }
  };

  const goBack = () => navigate('/recruiter/form/step3');
  const goHome = () => navigate('/recruiter/dashboard');

  return (
    <div className="recruiter-form-wrapper">
      <div className="recruiter-form-container">
        <div className="form-nav-header">
          <div className="form-header" style={{ border: 'none', padding: 0, margin: 0 }}>
            <div className="form-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
            <h2 className="form-title">Confirm & Submit</h2>
          </div>
          <button onClick={goHome} className="btn-back-home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>
        </div>
        <div className="form-status" role="status" aria-live="polite">{status}</div>
        
        <div role="region" aria-labelledby="review-heading">
          <h3 id="review-heading" className="form-label" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Review Job Details</h3>
          <div className="review-section">
            <div className="review-item"><span className="review-label">Title:</span><span className="review-value">{formData.JobTitle}</span></div>
            <div className="review-item"><span className="review-label">Category:</span><span className="review-value">{formData.jobCategory}</span></div>
            <div className="review-item"><span className="review-label">Type:</span><span className="review-value">{formData.jobType}</span></div>
            <div className="review-item"><span className="review-label">Location:</span><span className="review-value">{formData.jobLocation}</span></div>
            <div className="review-item"><span className="review-label">City:</span><span className="review-value">{formData.jobCity}</span></div>
            <div className="review-item"><span className="review-label">Description:</span><span className="review-value">{formData.jobDescription}</span></div>
            <div className="review-item"><span className="review-label">Skills:</span><span className="review-value">{(formData.skills || []).join(", ")}</span></div>
            <div className="review-item"><span className="review-label">Inclusivity:</span><span className="review-value">{(formData.selectedDisabilities || []).join(", ")}</span></div>
            <div className="review-item"><span className="review-label">Accommodations:</span><span className="review-value">{(formData.accessibilities || []).join(", ")}</span></div>
          </div>

          <div className="form-group">
            <label className="form-label">Deadline to Apply <span className="required">*</span></label>
            <input type="date" className="form-input" value={deadline} onChange={e => setDeadline(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Contact Number <span className="required">*</span></label>
            <input type="tel" className="form-input" value={contactNumber} onChange={e => setContactNumber(e.target.value)} placeholder="1234567890" />
          </div>

          <div className="form-group">
            <label className="form-label">Additional Info <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span></label>
            <textarea className="form-textarea" value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} rows={3}></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-form btn-form-back" onClick={goBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back
            </button>
            <button className="btn-form btn-form-primary" onClick={handleSubmit}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Submit Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecForm4;
