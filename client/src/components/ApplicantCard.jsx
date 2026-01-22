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

  const getStatusStyle = () => {
    switch(status) {
      case 'shortlisted':
        return { background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' };
      case 'rejected':
        return { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' };
      default:
        return { background: '#e0f2fe', color: '#075985', border: '1px solid #bae6fd' };
    }
  };

  return (
    <div
      tabIndex={0}
      aria-label={`Applicant: ${name}`}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        outline: 'none',
        border: '2px solid transparent'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '700',
              flexShrink: 0
            }}>
              {name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', margin: '0 0 0.25rem 0' }}>{name || 'Unknown'}</h3>
              <span
                style={{
                  ...getStatusStyle(),
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}
              >
                {status}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#64748b" strokeWidth="2"/>
                <path d="M22 6L12 13L2 6" stroke="#64748b" strokeWidth="2"/>
              </svg>
              <a
                href={`mailto:${email}`}
                style={{ color: '#2563EB', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                {email}
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#64748b" strokeWidth="2"/>
                <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="#64748b" strokeWidth="2"/>
              </svg>
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2563EB', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  View Resume
                </a>
              ) : (
                <span style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Resume not provided</span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
          <button
            onClick={handleShortlist}
            disabled={isDecided}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              border: isDecided ? '2px solid #e2e8f0' : '2px solid #10b981',
              background: isDecided ? '#f1f5f9' : 'white',
              color: isDecided ? '#94a3b8' : '#10b981',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: isDecided ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isDecided ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (!isDecided) {
                e.currentTarget.style.background = '#10b981';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (!isDecided) {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#10b981';
              }
            }}
          >
            Shortlist
          </button>
          <button
            onClick={handleReject}
            disabled={isDecided}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              border: isDecided ? '2px solid #e2e8f0' : '2px solid #ef4444',
              background: isDecided ? '#f1f5f9' : 'white',
              color: isDecided ? '#94a3b8' : '#ef4444',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: isDecided ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isDecided ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (!isDecided) {
                e.currentTarget.style.background = '#ef4444';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (!isDecided) {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#ef4444';
              }
            }}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicantCard;
