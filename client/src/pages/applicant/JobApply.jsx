import React, { useEffect, useState } from "react";
import API from "../../api";
import { extractError } from '../../lib/utils';
import { useParams, useNavigate } from "react-router-dom";

export default function JobApply() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${jobId}`);
        setJob(res.data);
      } catch (err) {
        setError(extractError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      // basic resume URL validation
      if (resumeUrl && !/^https?:\/\/.+/.test(resumeUrl)) {
        alert("Please provide a valid URL for your resume or leave blank.");
        return;
      }
      const payload = { jobId, resumeUrl };
      const res = await API.post("/applications", payload);
      alert(res.data.message || "Applied successfully");
      navigate("/applicant/applications");
    } catch (err) {
      alert(extractError(err));
    }
  };

  if (loading) return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2 style={{ color: "#0d47a1", fontWeight: 700 }}>Apply: {job?.title}</h2>
      <p><strong>Location:</strong> {job?.location}</p>
      <div className="mb-3">
        <label className="form-label">Resume URL (or upload elsewhere)</label>
        <input className="form-control" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} placeholder="https://..." />
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleApply}>Submit Application</button>
      </div>
    </div>
  );
}
