import React, { useEffect, useState } from "react";
import { getUserApplications, getJobs } from '../../api';
import { Link, useNavigate } from "react-router-dom";
import JobDetailModal from '../../components/JobDetailModal';
import "./ApplicantDashboard.css";

function parseTokenRole(token) {
  try {
    const p = JSON.parse(atob(token.split('.')[1]));
    return p.role;
  } catch (e) {
    return null;
  }
}

function ApplicantDashboard() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applications, setApplications] = useState([]);
  const [postText, setPostText] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch jobs
        const res = await getJobs();
        const data = Array.isArray(res.data) ? res.data : [];
        data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        
        // Fetch user's applications (uses API instance with auth interceptor)
        try {
          const appsRes = await getUserApplications();
          const apps = Array.isArray(appsRes.data.applications) ? appsRes.data.applications : Array.isArray(appsRes.data) ? appsRes.data : appsRes.data || [];
          setApplications(apps);
          const appliedIds = new Set(apps.map(a => (a.jobId && a.jobId._id) || a.jobId || a.job));
          data.forEach(j => { j.__applied = appliedIds.has(j._id); });
        } catch (e) {
          console.error("Error fetching applications:", e);
        }
        const recentJobs = data.slice(0, 12);
        setJobs(recentJobs);
        setFilteredJobs(recentJobs);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Search filter
  useEffect(() => {
    if (!searchQuery) {
      setFilteredJobs(jobs);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = jobs.filter(job => 
      job.title?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.companyName?.toLowerCase().includes(query) ||
      job.jobDescription?.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  }, [searchQuery, jobs]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const recentApplications = applications.slice(0, 5);

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="dashboard-topbar" style={{
        background: '#fff',
        borderBottom: '2px solid #e2e8f0',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Search */}
        <form role="search" className="flex-grow-1" onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 760 }}>
          <div className="input-group">
            <span className="input-group-text bg-white" style={{ borderTopLeftRadius: 12, borderBottomLeftRadius: 12, borderRight: 'none', border: '2px solid #e2e8f0' }} aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="#64748b" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="#64748b" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <input 
              type="search" 
              className="form-control" 
              style={{ border: '2px solid #e2e8f0', borderLeft: 'none', borderTopRightRadius: 12, borderBottomRightRadius: 12 }}
              placeholder="Search jobs by title, location, company..." 
              aria-label="Search jobs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="d-flex align-items-center gap-2">
          <button 
            onClick={() => navigate('/applicant/dashboard')}
            className="btn btn-light btn-sm" 
            style={{ padding: '0.5rem 1rem', borderRadius: 10, border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
            aria-label="Go to home"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>
          <button 
            className="btn btn-light btn-sm" 
            style={{ width: 40, height: 40, borderRadius: 12, border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Messages"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          <button 
            className="btn btn-light btn-sm" 
            style={{ width: 40, height: 40, borderRadius: 12, border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Notifications"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="btn btn-light btn-sm" 
            style={{ width: 40, height: 40, borderRadius: 12, border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Profile"
            onClick={() => navigate('/applicant/profile')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="dashboard-container">
      {/* Center Feed */}
      <main className="dashboard-feed">

        {/* Recent Job Openings */}
        <div className="feed-section">
          <h3 className="feed-section-title">Recent Job Openings</h3>
          {loading ? (
            <div className="loading-state">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : filteredJobs.length === 0 ? (
            <div className="empty-state">
              <p>{jobs.length === 0 ? 'No job openings available at the moment.' : 'No jobs match your search criteria.'}</p>
            </div>
          ) : (
            <div className="stories-grid">
              {filteredJobs.map((job, index) => (
                <div 
                  className="story-card" 
                  key={job._id} 
                  style={{'--card-index': index}}
                  onClick={() => handleJobClick(job)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && handleJobClick(job)}
                >
                  <div className="story-header">
                    <div className="story-avatar">
                      <div className="company-avatar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="4" y="2" width="16" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 22V18H15V22M9 6H11M9 10H11M9 14H11M15 6H13M15 10H13M15 14H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="story-meta">
                      <h4 className="story-author">{job.companyName || "Company"}</h4>
                      <span className="story-time">
                        {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recently posted"}
                      </span>
                    </div>
                    <button className="story-menu" aria-label="More options">⋯</button>
                  </div>
                  
                  <h5 className="job-title">{job.title}</h5>
                  
                  <div className="story-image">
                    <img 
                      src={job.image || "/assets/hiring.png"} 
                      alt={`${job.title} position`}
                      onError={(e) => { e.target.src = "/assets/hiring.png"; }}
                    />
                    <div className="job-overlay">
                      <span className="job-location">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '4px', verticalAlign: 'middle'}}>
                          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {job.location}
                      </span>
                      <span className="job-type">{job.jobType || job.type || "Full-time"}</span>
                    </div>
                  </div>

                  <p className="job-description">
                    {job.jobDescription?.slice(0, 120)}
                    {job.jobDescription && job.jobDescription.length > 120 ? "..." : ""}
                  </p>

                  <div className="job-actions">
                    <button className="btn-view-details" onClick={(e) => { e.stopPropagation(); handleJobClick(job); }}>
                      View Details
                    </button>
                    {job.__applied && (
                      <span className="applied-indicator">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Applied
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Jobs Link */}
        <div className="view-all-section">
          <Link to="/applicant/jobs" className="view-all-link">
            View All Job Openings →
          </Link>
        </div>
      </main>

      {/* Right Sidebar - Notifications & Activity */}
      <aside className="dashboard-sidebar">
        {/* Application Status */}
        <div className="sidebar-card">
          <div className="sidebar-header">
            <span className="sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3V21H21V3H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 7H15M9 12H15M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <h3 className="sidebar-title">Application Status</h3>
            <span className="sidebar-count">{applications.length}</span>
          </div>
          <div className="sidebar-content">
            {recentApplications.length === 0 ? (
              <p className="empty-text">No applications yet. Start applying!</p>
            ) : (
              recentApplications.map((app, idx) => (
                <div className="status-item" key={idx}>
                  <div className="status-avatar">
                    <div className="mini-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="2" width="16" height="20" stroke="currentColor" strokeWidth="2"/>
                        <path d="M9 22V18H15V22M9 6H11M9 10H11M9 14H11M15 6H13M15 10H13M15 14H13" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  <div className="status-info">
                    <p className="status-name">{app.jobId?.title || "Position"}</p>
                    <span className="status-time">
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                  <span className={`status-badge status-${app.status?.toLowerCase() || 'applied'}`}>
                    {app.status || "Applied"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="sidebar-card">
          <div className="sidebar-header">
            <span className="sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M18 8V13M6 21V16M12 13V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="6" cy="21" r="3" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M18 13C19.6569 13 21 14.3431 21 16C21 17.6569 19.6569 19 18 19C16.3431 19 15 17.6569 15 16C15 14.3431 16.3431 13 18 13Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
            <h3 className="sidebar-title">Recent Activity</h3>
          </div>
          <div className="sidebar-content">
            <div className="activity-item">
              <div className="activity-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="activity-text">
                <p><strong>New job matches</strong> available based on your profile</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="activity-text">
                <p><strong>Message from recruiter</strong> about your application</p>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="activity-text">
                <p><strong>Profile viewed</strong> by 3 recruiters this week</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions removed per request */}

        {/* Tips removed per request */}
      </aside>
    </div>

    {/* Job Detail Modal */}
    <JobDetailModal 
      job={selectedJob}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      isApplied={selectedJob?.__applied}
    />
    </>
  );
}

export default ApplicantDashboard;
