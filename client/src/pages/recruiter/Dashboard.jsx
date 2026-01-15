import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getRecruiterJobs, deleteJob } from '../../api';
import { initScrollReveal, initStaggerReveal, pageTransition } from '../../utils/animations';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const statusRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize animations
    pageTransition();
    initScrollReveal();
    initStaggerReveal();

    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getRecruiterJobs();
        const data = Array.isArray(res.data) ? res.data : [];
        // show most recent jobs first
        data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Search and filter logic
  useEffect(() => {
    let result = jobs;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(job => 
        job.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        job.title?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    setFilteredJobs(result);
  }, [searchQuery, selectedCategory, jobs]);

  useEffect(() => {
    if (statusMsg && statusRef.current) {
      statusRef.current.focus();
    }
  }, [statusMsg]);

  const handleViewApplicants = (jobId) => {
    navigate(`/recruiter/jobs/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) return;
    setDeleting(jobId);
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter((job) => job._id !== jobId));
      setStatusMsg("Job deleted successfully.");
    } catch (err) {
      setStatusMsg(err.response?.data?.error || err.message);
    } finally {
      setDeleting("");
    }
  };

  return (
    <main className="flex-grow-1 p-4" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #f8fafc 100%)' }}>
      <div className="container-fluid">
        {/* Top search + quick actions */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <form role="search" className="flex-grow-1 me-3" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group" style={{ maxWidth: 760 }}>
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
                placeholder="Search jobs, applicants..." 
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
          </form>

          <div className="d-flex align-items-center gap-2">
            <button 
              onClick={() => navigate('/recruiter/dashboard')}
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
              onClick={() => navigate('/recruiter/profile')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="row gx-4">
          {/* Left: Main content */}
          <div className="col-12">
            {/* Hero banner */}
            <div className="p-4 rounded-4 mb-4 shadow-sm dashboard-hero-banner" style={{ background: 'var(--gradient-primary)', color: '#fff', border: 'none' }}>
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.8rem', marginBottom: '0.5rem' }}>Manage Your Jobs & Applicants</h3>
                  <p className="mb-3" style={{ color:'#ffffff',fontSize: '1rem' }}>Create, review and track your job postings from one accessible dashboard.</p>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-light btn-sm dashboard-action-btn" 
                      style={{ padding: '0.5rem 1.25rem', borderRadius: 10, fontWeight: 600, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      onClick={() => navigate('/recruiter/form')}
                      aria-label="Create new job"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px', verticalAlign: 'middle'}}>
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Post New Job
                    </button>
                  
                  </div>
                </div>
                <div className="mt-3 mt-md-0">
                  <div style={{ width: 200, height: 80, background: 'rgba(255,255,255,0.08)', borderRadius: 12 }}></div>
                </div>
              </div>
            </div>

            {/* Chips / categories */}
            <div className="d-flex gap-2 mb-4 overflow-auto py-2" aria-hidden="false" role="list">
              {['Engineering','Design','Product','Marketing','Sales','Remote','Internship'].map((t) => (
                <button 
                  key={t} 
                  className={`btn btn-sm rounded-pill shadow-sm ${selectedCategory === t ? 'btn-primary' : 'btn-light'}`}
                  style={{ minWidth: 110, fontWeight: selectedCategory === t ? 600 : 400 }} 
                  aria-label={`Filter ${t}`}
                  onClick={() => setSelectedCategory(selectedCategory === t ? '' : t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div aria-live="polite" aria-atomic="true" tabIndex={-1} ref={statusRef} style={{ outline: 'none' }} className="visually-hidden">
              {statusMsg}
            </div>

            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
                <div className="spinner-border text-primary" role="status" aria-label="Loading">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger text-center" role="alert">{error}</div>
            ) : (
              <>
                {/* Continue / My Jobs section header */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h4 className="mb-0" style={{ color: '#0d47a1', fontWeight: 700 }}>My Jobs</h4>
                  <small className="text-muted">{filteredJobs.length} {filteredJobs.length === 1 ? 'posting' : 'postings'}</small>
                </div>

                {filteredJobs.length === 0 ? (
                  <div className="alert alert-info text-center" role="status" style={{ borderRadius: 12, border: '2px solid #bfdbfe', background: '#eff6ff', color: '#1e40af' }}>
                    {jobs.length === 0 ? 'You have not posted any jobs yet. Click "Post New Job" to get started.' : 'No jobs match your search criteria.'}
                  </div>
                ) : (
                  <div className="d-grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {filteredJobs.map((job) => (
                      <article 
                        key={job._id} 
                        className="card h-100 shadow-sm border-0" 
                        tabIndex={0} 
                        aria-label={`Job: ${job.title}`} 
                        style={{ 
                          background: '#fff', 
                          borderRadius: 16, 
                          border: '2px solid #e2e8f0',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 12px 24px rgba(14, 165, 233, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
                        }}
                      >
                        <div className="card-body p-4">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <div style={{ 
                                  width: 40, 
                                  height: 40, 
                                  borderRadius: 10, 
                                  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" y="2" width="16" height="20" stroke="white" strokeWidth="2"/>
                                    <path d="M9 22V18H15V22M9 6H11M9 10H11M9 14H11M15 6H13M15 10H13M15 14H13" stroke="white" strokeWidth="2"/>
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="card-title mb-0" style={{ color: '#0f172a', fontWeight: 600, fontSize: '1.1rem' }}>{job.title}</h5>
                                  <p className="mb-0 text-muted d-flex align-items-center gap-1" style={{ fontSize: 14 }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z\" stroke="currentColor" strokeWidth="2"/>
                                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    {job.location || 'Remote'}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-end">
                              <span style={{ 
                                fontSize: 12, 
                                color: '#64748b',
                                background: '#f1f5f9',
                                padding: '4px 10px',
                                borderRadius: 8,
                                fontWeight: 500
                              }}>
                                {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : '-'}
                              </span>
                            </div>
                          </div>
                          
                          <div style={{
                            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                            padding: '1rem',
                            borderRadius: 12,
                            marginBottom: '1rem',
                            border: '1px solid #bae6fd'
                          }}>
                            <div className="d-flex align-items-center gap-2">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#0284c7" strokeWidth="2"/>
                                <circle cx="9" cy="7" r="4" stroke="#0284c7" strokeWidth="2"/>
                                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#0284c7" strokeWidth="2"/>
                                <path d="M17 3.13C17.8604 3.35031 18.623 3.85071 19.1676 4.55232C19.7122 5.25392 20.0078 6.11683 20.0078 7.005C20.0078 7.89318 19.7122 8.75608 19.1676 9.45769C18.623 10.1593 17.8604 10.6597 17 10.88" stroke="#0284c7" strokeWidth="2"/>
                              </svg>
                              <div>
                                <p className="mb-0" style={{ fontSize: 14, color: '#0369a1', fontWeight: 600 }}>
                                  {Array.isArray(job.applications) ? job.applications.length : 0} Applicants
                                </p>
                                <p className="mb-0" style={{ fontSize: 12, color: '#0891b2' }}>
                                  {Array.isArray(job.applications) && job.applications.length > 0 ? 'Review applications' : 'Waiting for applicants'}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="d-flex gap-2 mt-3">
                            <button 
                              className="btn btn-sm flex-grow-1" 
                              style={{ 
                                background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)', 
                                border: 'none',
                                color: 'white',
                                fontWeight: 600,
                                borderRadius: 10,
                                padding: '0.5rem 1rem',
                                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)'
                              }} 
                              onClick={() => handleViewApplicants(job._id)} 
                              aria-label={`View applicants for ${job.title}`}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px', verticalAlign: 'middle'}}>
                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z\" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                              View Applicants
                            </button>
                            <button 
                              className="btn btn-sm" 
                              style={{
                                border: '2px solid #fecaca',
                                background: '#fef2f2',
                                color: '#dc2626',
                                fontWeight: 600,
                                borderRadius: 10,
                                padding: '0.5rem 1rem'
                              }}
                              onClick={() => handleDeleteJob(job._id)} 
                              disabled={deleting === job._id} 
                              aria-label={`Delete job ${job.title}`}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px', verticalAlign: 'middle'}}>
                                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z\" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                              {deleting === job._id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar removed per request: Good Morning and Team sections */}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
