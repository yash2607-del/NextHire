import React, { useEffect, useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const API_BASE = import.meta.env.VITE_API_URL ;
  const decoded = (() => {
    try {
      if (!token) return null;
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    } catch (e) { return null; }
  })();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const url = `${API_BASE}/api/profile`;
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) {
          const data = await res.json().catch(()=>({}));
          setError(data.error || `Failed to load profile (status ${res.status})`);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Network error loading profile — check backend URL and CORS');
      } finally { setLoading(false); }
    };
    fetchProfile();
  }, [token]);

  return (
    <section className="container py-5" aria-labelledby="profile-heading">
      <h1 id="profile-heading" style={{ color: '#0d47a1' }}>My Profile</h1>
      {loading && <p>Loading profile…</p>}
      {error && <div role="alert" className="text-danger">{error}</div>}

      {!loading && !token && (
        <div>
          <p>You are not logged in. Please <a href="/login">login</a> to see your profile.</p>
        </div>
      )}

      {!loading && token && (
        <div className="card p-4" style={{ maxWidth: 720 }}>
          <div className="mb-3">
            <strong>Name:</strong> {profile?.name || decoded?.name || decoded?.user || '—'}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {profile?.email || decoded?.email || '—'}
          </div>
          <div className="mb-3">
            <strong>Role:</strong> {decoded?.role || '—'}
          </div>

          {decoded?.role === 'recruiter' && (
            <div>
              
             
              <a className="btn btn-primary" href="/dashboard">Go to Dashboard</a>
            </div>
          )}

          {decoded?.role === 'applicant' && (
            <div>
              
             
              <a className="btn btn-primary" href="/applicant/jobs">View Jobs</a>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Profile;
