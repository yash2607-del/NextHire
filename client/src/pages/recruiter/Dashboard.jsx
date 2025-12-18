import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const statusRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not logged in");
        const res = await axios.get("http://localhost:8000/api/jobs/recruiter", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data) ? res.data : [];
        // show most recent jobs first
        data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setJobs(data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

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
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== jobId));
      setStatusMsg("Job deleted successfully.");
    } catch (err) {
      setStatusMsg(err.response?.data?.error || err.message);
    } finally {
      setDeleting("");
    }
  };

  return (
    <main className="flex-grow-1 p-4" style={{ minHeight: '100vh', background: '#f2f6fb' }}>
      <div className="container-fluid">
        {/* Top search + quick actions */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <form role="search" className="flex-grow-1 me-3" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group" style={{ maxWidth: 760 }}>
              <span className="input-group-text bg-white" style={{ borderTopLeftRadius: 999, borderBottomLeftRadius: 999, borderRight: 'none' }} aria-hidden>
                🔍
              </span>
              <input type="search" className="form-control rounded-pill" placeholder="Search your course..." aria-label="Search" />
            </div>
          </form>

          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-light btn-sm rounded-circle" aria-label="Messages">✉️</button>
            <button className="btn btn-light btn-sm rounded-circle" aria-label="Notifications">🔔</button>
            <button className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center" aria-label="Profile">
              <span style={{ width: 28, height: 28, display: 'inline-block', borderRadius: 14, background: '#eef2ff', textAlign: 'center', lineHeight: '28px', fontWeight: 700, color: '#3b2fbf' }}>JD</span>
            </button>
          </div>
        </div>

        <div className="row gx-4">
          {/* Left: Main content */}
          <div className="col-12">
            {/* Hero banner */}
            <div className="p-4 rounded-4 mb-4 shadow-sm" style={{ background: 'linear-gradient(90deg,#6c5ce7 0%, #9b8cf9 100%)', color: '#fff' }}>
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.6rem' }}>Manage your jobs and applicants</h3>
                  <p className="mb-2" style={{ opacity: 0.95 }}>Create, review and track your job postings from one place.</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-light btn-sm" onClick={() => navigate('/recruiter/new-job')}>Post Job</button>
                    <button className="btn btn-outline-light btn-sm">Analytics</button>
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
                <button key={t} className="btn btn-sm btn-light rounded-pill shadow-sm" style={{ minWidth: 110 }} aria-label={`Filter ${t}`}>{t}</button>
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
                  <small className="text-muted">{jobs.length} postings</small>
                </div>

                {jobs.length === 0 ? (
                  <div className="alert alert-info text-center" role="status">You have not posted any jobs yet.</div>
                ) : (
                  <div className="d-grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                    {jobs.map((job) => (
                      <article key={job._id} className="card h-100 shadow-sm border-0" tabIndex={0} aria-label={`Job: ${job.title}`} style={{ background: '#fff', borderRadius: 12 }}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h5 className="card-title mb-1" style={{ color: '#0d47a1', fontWeight: 600 }}>{job.title}</h5>
                              <p className="mb-1 text-muted" style={{ fontSize: 13 }}>{job.location || 'Remote'}</p>
                            </div>
                            <div className="text-end">
                              <small className="text-muted">{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : '-'}</small>
                            </div>
                          </div>
                          <p className="mb-2" style={{ fontSize: 13 }}><strong>Applicants:</strong> {Array.isArray(job.applications) ? job.applications.length : 0}</p>
                          <div className="d-flex gap-2 mt-3">
                            <button className="btn btn-primary btn-sm" style={{ background: '#1565c0', border: 'none' }} onClick={() => handleViewApplicants(job._id)} aria-label={`View applicants for ${job.title}`}>View</button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteJob(job._id)} disabled={deleting === job._id} aria-label={`Delete job ${job.title}`}>{deleting === job._id ? 'Deleting...' : 'Delete'}</button>
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
