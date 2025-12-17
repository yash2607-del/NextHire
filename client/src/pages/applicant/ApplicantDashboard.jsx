import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:8000/api/jobs");
        const data = Array.isArray(res.data) ? res.data : [];
        data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        // if user logged in, fetch user's applications to mark applied jobs
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const appsRes = await axios.get("http://localhost:8000/api/applications/user", {
              headers: { Authorization: `Bearer ${token}` }
            });
            const apps = Array.isArray(appsRes.data.applications) ? appsRes.data.applications : appsRes.data || [];
            const appliedIds = new Set(apps.map(a => (a.jobId && a.jobId._id) || a.jobId || a.job));
            // annotate data
            data.forEach(j => { j.__applied = appliedIds.has(j._id); });
          } catch (e) {
            // ignore application fetch errors
          }
        }
        setJobs(data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <main className="p-4" style={{ minHeight: "100vh", background: "#f7faff" }}>
      <h2 style={{ color: "#0d47a1", fontWeight: 700 }}>Open Vacancies</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : jobs.length === 0 ? (
        <div className="alert alert-info">No vacancies available.</div>
      ) : (
        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-12 col-md-6 col-lg-4" key={job._id}>
              <article className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <div className="mb-3">
                    <h5 className="card-title" style={{ color: "#0d47a1" }}>{job.title}</h5>
                    <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                    <p className="mb-1"><strong>Type:</strong> {job.jobType || job.type || "-"}</p>
                    <p className="mb-1"><strong>Posted:</strong> {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "-"}</p>
                    <p className="mt-2">{job.jobDescription?.slice(0, 150)}{job.jobDescription && job.jobDescription.length > 150 ? "..." : ""}</p>
                  </div>
                  <div className="mt-auto d-flex justify-content-end">
                    {job.__applied ? (
                      <button className="btn btn-secondary btn-sm" disabled aria-label={`Already applied to ${job.title}`}>
                        Applied
                      </button>
                    ) : (
                      (() => {
                        const token = localStorage.getItem('token');
                        const role = token ? parseTokenRole(token) : null;
                        if (role === 'recruiter') {
                          return <button className="btn btn-outline-secondary btn-sm" disabled>Recruiter</button>;
                        }
                        return <Link to={`/applicant/jobs/${job._id}/apply`} className="btn btn-primary btn-sm" aria-label={`Apply to ${job.title}`}>Apply</Link>;
                      })()
                    )}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ApplicantDashboard;
