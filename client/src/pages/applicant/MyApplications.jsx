import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/applications/user", {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        // server returns { applications: [...] } — handle both shapes
        const appsData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.applications)
          ? res.data.applications
          : [];
        setApps(appsData);
      } catch (err) {
        setError(err.response?.data?.message || err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <h2 style={{ color: "#0d47a1", fontWeight: 700 }}>My Applications</h2>
      {loading ? (
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : apps.length === 0 ? (
        <div className="alert alert-info">You have not applied to any jobs yet.</div>
      ) : (
        <div className="row g-4">
          {apps.map((a) => {
            const job = a.jobId || a.job || a.jobData || null;
            return (
              <div className="col-12" key={a._id}>
                <article className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{job?.title || a.jobTitle || "Job"}</h5>
                    {job?.jobDescription && (
                      <p className="card-text text-muted">
                        {job.jobDescription.length > 200 ? job.jobDescription.slice(0, 200) + '…' : job.jobDescription}
                      </p>
                    )}
                    <p className="mb-1"><strong>Location:</strong> {job?.location || '—'}</p>
                    <p className="mb-1"><strong>Type:</strong> {job?.jobType || '—'}</p>
                    {Array.isArray(job?.skills) && job.skills.length > 0 && (
                      <p className="mb-1"><strong>Skills:</strong> {job.skills.join(', ')}</p>
                    )}
                    <p className="mb-1"><strong>Status:</strong> {a.status}</p>
                    <p className="mb-1"><strong>Applied At:</strong> {a.appliedAt ? new Date(a.appliedAt).toLocaleString() : new Date(a.createdAt).toLocaleString()}</p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
