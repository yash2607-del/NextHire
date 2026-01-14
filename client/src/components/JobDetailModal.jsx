import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './JobDetailModal.css';

/**
 * Job Detail Modal Component
 * Displays job details in a popup with blurred background (SaaS-style)
 */
export default function JobDetailModal({ job, isOpen, onClose, isApplied = false }) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !job) return null;

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div className="job-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-company-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="2" width="16" height="20" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 22V18H15V22M9 6H11M9 10H11M9 14H11M15 6H13M15 10H13M15 14H13" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="modal-header-text">
            <h2 className="modal-job-title">{job.title}</h2>
            <p className="modal-company-name">{job.companyName || 'Company'}</p>
          </div>
          {isApplied && (
            <span className="modal-applied-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Applied
            </span>
          )}
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Job Meta Info */}
          <div className="modal-meta-grid">
            <div className="modal-meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <div>
                <span className="meta-label">Location</span>
                <span className="meta-value">{job.location || 'Remote'}</span>
              </div>
            </div>

            <div className="modal-meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <div>
                <span className="meta-label">Job Type</span>
                <span className="meta-value">{job.jobType || job.type || 'Full-time'}</span>
              </div>
            </div>

            <div className="modal-meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <span className="meta-label">Posted</span>
                <span className="meta-value">
                  {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
                </span>
              </div>
            </div>

            {job.salary && (
              <div className="modal-meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <span className="meta-label">Salary</span>
                  <span className="meta-value">{job.salary}</span>
                </div>
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="modal-section">
            <h3 className="modal-section-title">Job Description</h3>
            <p className="modal-description">
              {job.jobDescription || job.description || 'No description available.'}
            </p>
          </div>

          {/* Requirements */}
          {job.requirements && (
            <div className="modal-section">
              <h3 className="modal-section-title">Requirements</h3>
              <p className="modal-description">{job.requirements}</p>
            </div>
          )}

          {/* Skills */}
          {job.skills && Array.isArray(job.skills) && job.skills.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">Required Skills</h3>
              <div className="modal-skills-list">
                {job.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {isApplied ? (
            <button className="modal-btn modal-btn-secondary" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Already Applied
            </button>
          ) : (
            <Link to={`/applicant/jobs/${job._id}/apply`} className="modal-btn modal-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Apply for this Job
            </Link>
          )}
          <button className="modal-btn modal-btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
