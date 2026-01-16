import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { getAuthToken } from '../../../utils/auth';
import API from '../../../api';


function Review() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const token = getAuthToken();
        if (!token) throw new Error("Not logged in");
        const res = await API.get("/jobs/my");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setJobs(res.data);
        } else {
          setJobs([]);
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container text-center py-5" role="main" aria-labelledby="myjobs-heading">
        <h2 id="myjobs-heading">My Jobs</h2>
        <p>All jobs you have posted are listed below.</p>
        <div role="status" aria-live="polite" style={{minHeight:20}}>
          {loading && <p>Loading your jobs...</p>}
          {error && <p className="text-danger">{error}</p>}
        </div>
        {(!loading && jobs.length === 0) && <p>You have not posted any jobs yet.</p>}
        <div className="row justify-content-center" role="list" aria-label="Your posted jobs">
          {jobs.map((job) => (
            <article role="listitem" aria-label={`Job ${job.title}`} className="card mt-4 mx-2" style={{ maxWidth: 400 }} key={job._id}>
              <div className="card-body">
                <h4 className="card-title">{job.title}</h4>
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
            </article>
          ))}
        </div>
        <Link to="/recruiter/dashboard" className="btn btn-primary mt-4" aria-label="Go to Recruiter Dashboard">Go to Recruiter Dashboard</Link>
      </main>
    </div>
  );
}

export default Review;
