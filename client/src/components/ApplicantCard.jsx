import React from "react";

function ApplicantCard({ applicant, onStatusChange }) {
  const { name, email, resumeUrl, status } = applicant;
  const isDecided = status === "shortlisted" || status === "rejected";

  const handleShortlist = () => {
    if (!isDecided) onStatusChange("shortlisted");
  };
  const handleReject = () => {
    if (!isDecided) onStatusChange("rejected");
  };

  return (
    <div className="card mb-3 shadow-sm" tabIndex={0} aria-label={`Applicant: ${name}`}
      style={{ outline: "none" }}>
      <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between">
        <div>
          <h5 className="card-title mb-1">{name}</h5>
          <p className="mb-1"><b>Email:</b> <a href={`mailto:${email}`}>{email}</a></p>
          <p className="mb-1">
            <b>Resume:</b> {resumeUrl ? (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
            ) : (
              <span className="text-muted">Not provided</span>
            )}
          </p>
        </div>
        <div className="d-flex flex-column align-items-end gap-2 mt-3 mt-md-0">
          <span className={`badge fs-6 mb-2 ${
            status === "shortlisted" ? "bg-success" : status === "rejected" ? "bg-danger" : "bg-secondary"
          }`} aria-label={`Status: ${status}`}>{status}</span>
          <div className="btn-group" role="group" aria-label="Applicant actions">
            <button
              className="btn btn-outline-success btn-sm"
              onClick={handleShortlist}
              disabled={isDecided}
              tabIndex={0}
              aria-disabled={isDecided}
            >
              Shortlist
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleReject}
              disabled={isDecided}
              tabIndex={0}
              aria-disabled={isDecided}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantCard;
