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
    <main className="flex-grow-1 p-4" style={{ minHeight: '100vh', background: '#f7faff' }}>
        <h2 className="mb-4" style={{ color: '#0d47a1', fontWeight: 700 }}>My Jobs</h2>
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
            {jobs.length === 0 ? (
              <div className="alert alert-info text-center" role="status">You have not posted any jobs yet.</div>
            ) : (
              <div className="row g-4">
                {jobs.map((job) => (
                  <div className="col-12 col-md-6 col-lg-4" key={job._id}>
                    <section className="card h-100 shadow-sm border-0" tabIndex={0} aria-label={`Job: ${job.title}`} style={{ outline: 'none', background: '#fff' }}>
                      <div className="card-body">
                        <h5 className="card-title" style={{ color: '#0d47a1', fontWeight: 600 }}>{job.title}</h5>
                        <p className="mb-1"><b>Location:</b> {job.location}</p>
                        <p className="mb-1"><b>Posted:</b> {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "-"}</p>
                        <p className="mb-1"><b>Applicants:</b> {Array.isArray(job.applications) ? job.applications.length : 0}</p>
                        <div className="d-flex gap-2 mt-3">
                          <button className="btn btn-primary btn-sm" style={{ background: '#1565c0', border: 'none' }} onClick={() => handleViewApplicants(job._id)} aria-label={`View applicants for ${job.title}`}>View Applicants</button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteJob(job._id)} disabled={deleting === job._id} aria-label={`Delete job ${job.title}`}>{deleting === job._id ? "Deleting..." : "Delete Job"}</button>
                        </div>
                      </div>
                    </section>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
  );
}

export default Dashboard;
