import React, { useEffect, useState } from "react";
import { getUserApplications } from '../../api';
import "./MyApplications.css";
import { initScrollReveal, initStaggerReveal, pageTransition } from "../../utils/animations";
import { extractError } from '../../lib/utils';

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    // Initialize animations
    pageTransition();
    initScrollReveal();
    initStaggerReveal();

    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getUserApplications();
        // server returns { applications: [...] } — handle both shapes
        const appsData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.applications)
          ? res.data.applications
          : [];
        setApps(appsData);
        setFilteredApps(appsData);
      } catch (err) {
        setError(extractError(err));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filterApplications = (status) => {
    setActiveFilter(status);
    if (status === "all") {
      setFilteredApps(apps);
    } else {
      setFilteredApps(apps.filter(app => app.status?.toLowerCase() === status.toLowerCase()));
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('pending') || statusLower.includes('applied')) return 'pending';
    if (statusLower.includes('review')) return 'reviewed';
    if (statusLower.includes('interview')) return 'interviewing';
    if (statusLower.includes('accept') || statusLower.includes('offer')) return 'accepted';
    if (statusLower.includes('reject')) return 'rejected';
    return 'pending';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getInitials = (title) => {
    if (!title) return '?';
    return title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="my-applications-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-applications-page">
        <div className="error-container">
          <div className="error-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-applications-page page-enter">
      {/* Header */}
      <div className="applications-header fade-in-up" style={{'--delay': '0.1s'}}>
        <div className="applications-header-top">
          <div className="applications-title-section">
            <div className="applications-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 12H15M9 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="applications-title-text">
              <h1>My Applications</h1>
              <p className="applications-subtitle">
                {apps.length} {apps.length === 1 ? 'application' : 'applications'} submitted
              </p>
            </div>
          </div>

          <div className="applications-actions">
            <button className="filter-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Filter
            </button>
            <button className="export-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Status Filters */}
        <div className="applications-filters">
          <div 
            className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => filterApplications('all')}
          >
            All ({apps.length})
          </div>
          <div 
            className={`filter-chip ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => filterApplications('pending')}
          >
            Pending ({apps.filter(a => a.status?.toLowerCase().includes('pending')).length})
          </div>
          <div 
            className={`filter-chip ${activeFilter === 'reviewed' ? 'active' : ''}`}
            onClick={() => filterApplications('reviewed')}
          >
            Reviewed ({apps.filter(a => a.status?.toLowerCase().includes('review')).length})
          </div>
          <div 
            className={`filter-chip ${activeFilter === 'interviewing' ? 'active' : ''}`}
            onClick={() => filterApplications('interviewing')}
          >
            Interviewing ({apps.filter(a => a.status?.toLowerCase().includes('interview')).length})
          </div>
          <div 
            className={`filter-chip ${activeFilter === 'accepted' ? 'active' : ''}`}
            onClick={() => filterApplications('accepted')}
          >
            Accepted ({apps.filter(a => a.status?.toLowerCase().includes('accept')).length})
          </div>
          <div 
            className={`filter-chip ${activeFilter === 'rejected' ? 'active' : ''}`}
            onClick={() => filterApplications('rejected')}
          >
            Rejected ({apps.filter(a => a.status?.toLowerCase().includes('reject')).length})
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApps.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="empty-title">
            {activeFilter === 'all' ? 'No Applications Yet' : `No ${activeFilter} Applications`}
          </h2>
          <p className="empty-message">
            {activeFilter === 'all' 
              ? "Start applying to jobs that match your skills and interests."
              : `You don't have any ${activeFilter} applications at the moment.`}
          </p>
          <button className="empty-action">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="applications-grid stagger-container">
          {filteredApps.map((app) => {
            const job = app.jobId || app.job || app.jobData || {};
            const title = job?.title || app.jobTitle || "Job Position";
            const company = job?.company || job?.companyName || "Company";
            const location = job?.location || "Location not specified";
            const jobType = job?.jobType || app.jobType || "Full-time";
            const description = job?.jobDescription || job?.description || "";
            const skills = Array.isArray(job?.skills) ? job.skills : [];
            const status = app.status || "Pending";
            const appliedDate = app.appliedAt || app.createdAt;

            return (
              <div key={app._id} className="application-card stagger-item hover-card" data-scroll-reveal>
                <div className="application-card-header">
                  <div className="application-logo">
                    {getInitials(title)}
                  </div>
                  <div className="application-info">
                    <h3 className="application-job-title">{title}</h3>
                    <p className="application-company">{company}</p>
                  </div>
                  <div className={`status-badge ${getStatusBadgeClass(status)}`}>
                    <span className="status-icon"></span>
                    {status}
                  </div>
                </div>

                <div className="application-card-body">
                  {description && (
                    <p className="application-description">{description}</p>
                  )}

                  <div className="application-details">
                    <div className="detail-row">
                      <svg className="detail-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{location}</span>
                    </div>

                    <div className="detail-row">
                      <svg className="detail-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span className="detail-label">Job Type:</span>
                      <span className="detail-value">{jobType}</span>
                    </div>
                  </div>

                  {skills.length > 0 && (
                    <div className="application-skills">
                      {skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="skill-badge">{skill}</span>
                      ))}
                      {skills.length > 3 && (
                        <span className="skill-badge">+{skills.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="application-card-footer">
                  <div className="application-date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Applied {formatDate(appliedDate)}
                  </div>

                  <div className="application-actions">
                    <button className="action-button" title="View details">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                    <button className="action-button" title="Download resume">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 10L12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="action-button danger" title="Withdraw application">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
