import React from "react";

function JobCard({ job, onDelete, onViewApplicants }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text mb-1"><b>Location:</b> {job.location}</p>
        <p className="card-text mb-1"><b>Posted:</b> {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "-"}</p>
        <p className="card-text mb-2"><b>Applicants:</b> {job.applicantCount ?? 0}</p>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary"
            aria-label={`View applicants for ${job.title}`}
            onClick={() => onViewApplicants(job)}
          >
            View Applicants
          </button>
          <button
            className="btn btn-outline-danger"
            aria-label={`Delete job ${job.title}`}
            onClick={() => onDelete(job)}
          >
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;