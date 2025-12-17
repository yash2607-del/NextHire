import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruiterForm } from "../../../context/RecruiterContext";
import axios from "axios";

function RecForm4() {
  const navigate = useNavigate();
  const { formData, setFormData } = useRecruiterForm();

  const [deadline, setDeadline] = useState(formData.deadline || "");
  const [contactNumber, setContactNumber] = useState(formData.contactNumber || "");
  const [additionalInfo, setAdditionalInfo] = useState(formData.additionalInfo || "");

  useEffect(() => {
    setDeadline(formData.deadline || "");
    setContactNumber(formData.contactNumber || "");
    setAdditionalInfo(formData.additionalInfo || "");
  }, [formData]);

  const handleSubmit = async () => {
    // Get JWT token from localStorage (or your auth context)
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as a recruiter to post a job.");
      navigate("/login");
      return;
    }

    // Debug: Decode token to show role
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Debug: Token payload:', payload);
      alert(`Debug: Token role: ${payload.role}, userId: ${payload.userId}`);
    } catch (e) {
      console.error('Debug: Failed to decode token:', e);
    }

    const payload = {
      // recruiterId is NOT sent; server uses token
      title: formData.JobTitle,
      category: formData.jobCategory,
      jobType: formData.jobType,
      location: formData.jobLocation,
      jobDescription: formData.jobDescription,
      deadline,
      contactNumber,
      additionalInfo,
      skills: formData.skills || [],
      inclusivity: formData.selectedDisabilities || [],
      accommodations: formData.accessibilities || [],
      salary: formData.salaryRange ? Number(formData.salaryRange.replace(/[^0-9]/g, "")) : undefined,
    };

    // Frontend validation
    const missing = [];
    ["title","category","location","jobDescription","deadline","contactNumber"].forEach(key => {
      if (!payload[key]) missing.push(key);
    });
    if (missing.length) {
      alert("Missing required: " + missing.join(", "));
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/jobs", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message || "Job posted successfully!");
      navigate("/Review");
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        alert("You are not authorized. Please login as a recruiter.");
        navigate("/login");
        return;
      }
      console.error("Submission error:", err.response?.data || err.message);
      alert("Backend validation failed:\n" + JSON.stringify(err.response?.data?.errors || err.response?.data || err.message, null, 2));
    }
  };

  return (
    <>
      <h2 className="mb-4 text-center" style={{ color: '#0d47a1', fontWeight: 700 }}>Confirm & Submit Job Posting</h2>
      <div className="mx-auto" style={{ maxWidth: 600 }}>
        <p><b>Title:</b> {formData.JobTitle}</p>
        <p><b>Category:</b> {formData.jobCategory}</p>
        <p><b>Type:</b> {formData.jobType}</p>
        <p><b>Location:</b> {formData.jobLocation}</p>
        <p><b>City:</b> {formData.jobCity}</p>
        <p><b>Description:</b> {formData.jobDescription}</p>
        <p><b>Skills:</b> {(formData.skills || []).join(", ")}</p>
        <p><b>Inclusivity:</b> {(formData.selectedDisabilities || []).join(", ")}</p>
        <p><b>Accommodations:</b> {(formData.accessibilities || []).join(", ")}</p>

        <div className="mb-3">
          <label className="form-label">Deadline to Apply *</label>
          <input type="date" className="form-control" value={deadline} onChange={e => setDeadline(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Number (10 digits) *</label>
          <input type="tel" className="form-control" value={contactNumber} onChange={e => setContactNumber(e.target.value)} placeholder="1234567890" />
        </div>

        <div className="mb-3">
          <label className="form-label">Additional Info (Optional)</label>
          <textarea className="form-control" value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} rows={3}></textarea>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Job
          </button>
        </div>
      </div>
    </>
  );
}

export default RecForm4;
