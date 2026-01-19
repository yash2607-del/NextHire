import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuthToken } from '../../utils/auth';
import { getUserProfile } from '../../api';
import { extractError } from '../../lib/utils';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = getAuthToken();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await getUserProfile();
        setProfile(res.data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(extractError(err) || 'Failed to load profile');
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
          <p>You are not logged in. Please <Link to="/login">login</Link> to see your profile.</p>
        </div>
      )}

      {!loading && token && (
        <div className="card p-4" style={{ maxWidth: 720 }}>
          <div className="mb-3">
            <strong>Name:</strong> {profile?.name || '—'}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {profile?.email || '—'}
          </div>
          <div className="mb-3">
            <strong>Role:</strong> {profile?.role || '—'}
          </div>

          {profile?.role === 'recruiter' && (
            <div>
             
            
              <Link className="btn btn-primary" to="/dashboard">Go to Dashboard</Link>
            </div>
          )}

          {profile?.role === 'applicant' && (
            <div>
             
            
              <Link className="btn btn-primary" to="/applicant/jobs">View Jobs</Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Profile;
