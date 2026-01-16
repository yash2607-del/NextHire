import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await API.get(`/jobs/${jobId}`);
        setJob(res.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : !job ? (
          <div className="alert alert-info text-center">Job not found.</div>
        ) : (
          <div className="card mx-auto" style={{ maxWidth: 600 }}>
            <div className="card-body">
              <h2 className="card-title mb-3">{job.title}</h2>
              <p><b>Category:</b> {job.category}</p>
              <p><b>Type:</b> {job.jobType}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Description:</b> {job.jobDescription}</p>
              <p><b>Skills:</b> {(job.skills || []).join(", ")}</p>
              <p><b>Inclusivity:</b> {(job.inclusivity || []).join(", ")}</p>
              <p><b>Accommodations:</b> {(job.accommodations || []).join(", ")}</p>
              <p><b>Deadline:</b> {job.deadline ? new Date(job.deadline).toLocaleDateString() : "-"}</p>
              <p><b>Contact:</b> {job.contactNumber}</p>
              <p><b>Posted:</b> {job.createdAt ? new Date(job.createdAt).toLocaleString() : "-"}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default JobDetails;

