import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from '../../api';
import { getAuthToken } from '../../utils/auth';
import { extractError } from '../../lib/utils';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ApplicantCard from "../../components/ApplicantCard";

function ApplicantList() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      setError("");
      try {
        const token = getAuthToken();
        if (!token) throw new Error('Not authenticated');
        const res = await API.get(`/applications/job/${jobId}`);
        setApplicants(res.data.applications || []);
      } catch (err) {
        setError(extractError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (applicationId, status) => {
    try {
      await API.patch(`/applications/${applicationId}`, { status });
      setApplicants((prev) => prev.map((a) => a._id === applicationId ? { ...a, status } : a));
    } catch (err) {
      alert(extractError(err));
    }
  };

  const filteredApplicants = applicants.filter(applicant => {
    const name = applicant.userId?.name || applicant.name || "";
    const email = applicant.userId?.email || applicant.email || "";
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || applicant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: applicants.length,
    applied: applicants.filter(a => a.status === "applied").length,
    shortlisted: applicants.filter(a => a.status === "shortlisted").length,
    rejected: applicants.filter(a => a.status === "rejected").length,
  };

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/recruiter/dashboard')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              marginBottom: '1rem',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9';
              e.currentTarget.style.color = '#5B9BD5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#64748b';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Dashboard
          </button>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Applicants</h1>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>Review and manage job applications</p>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ position: 'relative' }}>
                <svg
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" stroke="#94a3b8" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="search"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#5B9BD5'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
                
              </div>
            </div>

            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['all', 'applied', 'shortlisted', 'rejected'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    border: filterStatus === status ? 'none' : '2px solid #e2e8f0',
                    background: filterStatus === status
                      ? (status === 'shortlisted' ? '#10b981' : status === 'rejected' ? '#ef4444' : 'linear-gradient(135deg, #5B9BD5 0%, #6BA8DE 100%)')
                      : 'white',
                    color: filterStatus === status ? 'white' : '#64748b',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'capitalize'
                  }}
                >
                  {status} ({statusCounts[status]})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '1.5rem',
            color: '#991b1b',
            textAlign: 'center'
          }}>{error}</div>
        ) : filteredApplicants.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto 1rem' }}>
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#cbd5e1" strokeWidth="2"/>
              <circle cx="12" cy="7" r="4" stroke="#cbd5e1" strokeWidth="2"/>
            </svg>
            <h3 style={{ color: '#64748b', fontSize: '1.25rem', marginBottom: '0.5rem' }}>No applicants found</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              {searchQuery || filterStatus !== 'all' ? 'Try adjusting your filters' : 'No applications received yet'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredApplicants.map((applicant) => (
              <ApplicantCard
                key={applicant._id}
                applicant={applicant.userId ? { ...applicant.userId, status: applicant.status, resumeUrl: applicant.resumeUrl } : { ...applicant, status: applicant.status }}
                onStatusChange={(status) => handleStatusChange(applicant._id, status)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicantList;
