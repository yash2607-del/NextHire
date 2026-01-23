import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecruiterSettings.css';

export default function RecruiterSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    // Profile Settings
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    showCompanyDetails: true,
    
    // Hiring Preferences
    candidateAlerts: true,
    alertFrequency: 'daily',
    autoScreening: false,
    experienceFilter: 'any',
    
    // Notifications
    emailNotifications: true,
    newApplications: true,
    candidateMessages: true,
    weeklyReport: true,
    marketingEmails: false,
    
    // Privacy
    allowDirectMessages: true,
    shareJobsPublicly: true,
    
    // Appearance
    theme: 'light',
    language: 'en'
  });

  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('recruiterSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('recruiterSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <div className="recruiter-settings">
      {/* Header */}
      <div className="settings-page-header">
        <div className="settings-header-content">
          <div className="settings-icon-wrapper">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <div>
            <h1 className="settings-page-title">Settings</h1>
            <p className="settings-page-subtitle">Manage your recruiter account and preferences</p>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <nav className="settings-nav">
          <button 
            className={`settings-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Profile Settings
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'hiring' ? 'active' : ''}`}
            onClick={() => setActiveSection('hiring')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Hiring Preferences
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSection('notifications')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            Notifications
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveSection('privacy')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Privacy
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveSection('appearance')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            Appearance
          </button>
        </nav>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Settings Section */}
          {activeSection === 'profile' && (
            <section className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Profile Settings</h2>
                <p className="section-description">Control how your recruiter profile appears</p>
              </div>

              <div className="settings-group">
                <label className="settings-label">Profile Visibility</label>
                <div className="radio-group">
                  {['public', 'private', 'verified'].map(option => (
                    <label key={option} className={`radio-option ${settings.profileVisibility === option ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="profileVisibility"
                        value={option}
                        checked={settings.profileVisibility === option}
                        onChange={(e) => handleChange('profileVisibility', e.target.value)}
                      />
                      <span className="radio-label">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                    </label>
                  ))}
                </div>
                <p className="settings-hint">Public profiles allow candidates to view your company information</p>
              </div>

              <div className="settings-group">
                <label className="settings-label">Contact Information</label>
                <div className="checkbox-group">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={settings.showEmail}
                      onChange={(e) => handleChange('showEmail', e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">Show email address on profile</span>
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={settings.showPhone}
                      onChange={(e) => handleChange('showPhone', e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">Show phone number on profile</span>
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={settings.showCompanyDetails}
                      onChange={(e) => handleChange('showCompanyDetails', e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">Display company information</span>
                  </label>
                </div>
              </div>
            </section>
          )}

          {/* Hiring Preferences Section */}
          {activeSection === 'hiring' && (
            <section className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Hiring Preferences</h2>
                <p className="section-description">Customize your recruitment workflow</p>
              </div>

              <div className="settings-group">
                <label className="settings-label">Candidate Alerts</label>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.candidateAlerts}
                    onChange={(e) => handleChange('candidateAlerts', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Receive alerts for matching candidates</span>
                </label>
              </div>

              {settings.candidateAlerts && (
                <div className="settings-group">
                  <label className="settings-label">Alert Frequency</label>
                  <select 
                    className="settings-select"
                    value={settings.alertFrequency}
                    onChange={(e) => handleChange('alertFrequency', e.target.value)}
                  >
                    <option value="instant">Instant</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Summary</option>
                  </select>
                </div>
              )}

              <div className="settings-group">
                <label className="settings-label">Auto-Screening</label>
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={settings.autoScreening}
                    onChange={(e) => handleChange('autoScreening', e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">Enable AI-powered resume screening</span>
                </label>
                <p className="settings-hint">Automatically filter candidates based on job requirements</p>
              </div>

              <div className="settings-group">
                <label className="settings-label">Default Experience Filter</label>
                <select 
                  className="settings-select"
                  value={settings.experienceFilter}
                  onChange={(e) => handleChange('experienceFilter', e.target.value)}
                >
                  <option value="any">Any Experience</option>
                  <option value="0-1">Entry Level (0-1 years)</option>
                  <option value="1-3">Junior (1-3 years)</option>
                  <option value="3-5">Mid-Level (3-5 years)</option>
                  <option value="5-10">Senior (5-10 years)</option>
                  <option value="10+">Expert (10+ years)</option>
                </select>
              </div>
            </section>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <section className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Notification Preferences</h2>
                <p className="section-description">Choose what updates you want to receive</p>
              </div>

              <div className="settings-group">
                <label className="settings-label">Email Notifications</label>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Enable email notifications</span>
                </label>
              </div>

              {settings.emailNotifications && (
                <div className="notification-options">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={settings.newApplications}
                      onChange={(e) => handleChange('newApplications', e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <div className="checkbox-content">
                      <span className="checkbox-label">New Applications</span>
                      <span className="checkbox-hint">Get notified when someone applies to your jobs</span>
                    </div>
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={settings.candidateMessages}
                      onChange={(e) => handleChange('candidateMessages', e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <div className="checkbox-content">
                      <span className="checkbox-label">Candidate Messages</span>
                      <span className="checkbox-hint">Receive alerts for candidate inquiries</span>
                    </div>
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={settings.weeklyReport}
                      onChange={(e) => handleChange('weeklyReport', e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <div className="checkbox-content">
                      <span className="checkbox-label">Weekly Report</span>
                      <span className="checkbox-hint">Summary of your hiring activity and analytics</span>
                    </div>
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={settings.marketingEmails}
                      onChange={(e) => handleChange('marketingEmails', e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <div className="checkbox-content">
                      <span className="checkbox-label">Platform Updates</span>
                      <span className="checkbox-hint">New features, tips, and platform news</span>
                    </div>
                  </label>
                </div>
              )}
            </section>
          )}

          {/* Privacy Section */}
          {activeSection === 'privacy' && (
            <section className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Privacy Settings</h2>
                <p className="section-description">Control your data and visibility</p>
              </div>

              <div className="settings-group">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.allowDirectMessages}
                    onChange={(e) => handleChange('allowDirectMessages', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Allow candidates to message you directly</span>
                </label>
                <p className="settings-hint">Candidates can send inquiries about your job postings</p>
              </div>

              <div className="settings-group">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.shareJobsPublicly}
                    onChange={(e) => handleChange('shareJobsPublicly', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Make job postings publicly searchable</span>
                </label>
                <p className="settings-hint">Your jobs will appear in search engines and job boards</p>
              </div>

              <div className="danger-zone">
                <h3 className="danger-title">Danger Zone</h3>
                <div className="danger-actions">
                  <button className="btn-danger-outline">Export All Data</button>
                  <button className="btn-danger">Delete Account</button>
                </div>
              </div>
            </section>
          )}

          {/* Appearance Section */}
          {activeSection === 'appearance' && (
            <section className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Appearance</h2>
                <p className="section-description">Customize how NextHire looks for you</p>
              </div>

              <div className="settings-group">
                <label className="settings-label">Theme</label>
                <div className="theme-options">
                  <label className={`theme-option ${settings.theme === 'light' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={settings.theme === 'light'}
                      onChange={(e) => handleChange('theme', e.target.value)}
                    />
                    <div className="theme-preview light">
                      <div className="theme-preview-header"></div>
                      <div className="theme-preview-content"></div>
                    </div>
                    <span>Light</span>
                  </label>
                  <label className={`theme-option ${settings.theme === 'dark' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={settings.theme === 'dark'}
                      onChange={(e) => handleChange('theme', e.target.value)}
                    />
                    <div className="theme-preview dark">
                      <div className="theme-preview-header"></div>
                      <div className="theme-preview-content"></div>
                    </div>
                    <span>Dark</span>
                  </label>
                  <label className={`theme-option ${settings.theme === 'system' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="system"
                      checked={settings.theme === 'system'}
                      onChange={(e) => handleChange('theme', e.target.value)}
                    />
                    <div className="theme-preview system">
                      <div className="theme-preview-header"></div>
                      <div className="theme-preview-content"></div>
                    </div>
                    <span>System</span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <label className="settings-label">Language</label>
                <select 
                  className="settings-select"
                  value={settings.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="hi">हिंदी</option>
                </select>
              </div>
            </section>
          )}

          {/* Save Button */}
          <div className="settings-footer">
            <button className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button className="btn-save" onClick={handleSave}>
              {saved ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Saved!
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
