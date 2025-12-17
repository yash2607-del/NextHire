import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ApplicantCard from "../../components/ApplicantCard";

function ApplicantList() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/api/applications/job/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplicants(res.data.applications || []);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:8000/api/applications/${applicationId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplicants((prev) => prev.map((a) => a._id === applicationId ? { ...a, status } : a));
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
    
      <div className="container py-5">
        <h2 className="mb-4 text-center">Applicants</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : applicants.length === 0 ? (
          <div className="alert alert-info text-center">No applicants yet.</div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {applicants.map((applicant) => (
                <ApplicantCard
                  key={applicant._id}
                  applicant={applicant.userId ? { ...applicant.userId, status: applicant.status, resumeUrl: applicant.resumeUrl } : { ...applicant, status: applicant.status }}
                  onStatusChange={(status) => handleStatusChange(applicant._id, status)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    
    </div>
  );
}

export default ApplicantList;
