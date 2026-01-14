import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useA11y } from '../../context/A11yContext';
import { getCurrentUser } from '../../utils/auth';
import './Settings.css';

export default function Settings() {
  const navigate = useNavigate();
  const { fontSize, setFontSize, highContrast, setHighContrast, reducedMotion, setReducedMotion } = useA11y();
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);
  const [notificationsLevel, setNotificationsLevel] = useState('minimal');
  const [inlineValidation, setInlineValidation] = useState(true);

  const restoreDefaults = () => {
    setFontSize('medium');
    setHighContrast(false);
    setReducedMotion(false);
    setShortcutsEnabled(true);
    setNotificationsLevel('minimal');
    setInlineValidation(true);
  };

  const handleSave = () => {
    // In real app, save to backend
    alert('✓ Preferences saved successfully!');
  };

  const goHome = () => {
    const user = getCurrentUser();
    if (user?.role === 'recruiter') return navigate('/dashboard');
    if (user?.role === 'applicant') return navigate('/applicant/dashboard');
    navigate('/');
  };

  return (
    <main className="settings-container" aria-labelledby="settings-heading">
      <div className="settings-header">
        <div className="settings-header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m-9-9h6m6 0h6M5.64 5.64l4.24 4.24m6.36 6.36l4.24 4.24M5.64 18.36l4.24-4.24m6.36-6.36l4.24-4.24"/>
          </svg>
        </div>
        <h1 id="settings-heading" className="settings-title">Settings</h1>
        <button onClick={goHome} className="btn-home" style={{ marginLeft: 'auto' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Back to Home
        </button>
      </div>

      <section aria-labelledby="accessibility-heading" className="settings-section" style={{ '--section-index': 0 }}>
        <div className="settings-section-header">
          <span className="section-icon">♿</span>
          <h2 id="accessibility-heading" className="section-title">Accessibility</h2>
        </div>

        <div className="settings-group">
          <label className="settings-label">Font Size</label>
          <div className="radio-group">
            <label className="radio-option">
              <input type="radio" name="fontSize" checked={fontSize==='small'} onChange={()=>setFontSize('small')} />
              <span className="radio-label">Small</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="fontSize" checked={fontSize==='medium'} onChange={()=>setFontSize('medium')} />
              <span className="radio-label">Medium</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="fontSize" checked={fontSize==='large'} onChange={()=>setFontSize('large')} />
              <span className="radio-label">Large</span>
            </label>
          </div>
        </div>

        <div className="settings-group">
          <label className="checkbox-option">
            <input type="checkbox" checked={highContrast} onChange={(e)=>setHighContrast(e.target.checked)} />
            <span className="checkbox-label">High Contrast Mode</span>
          </label>
        </div>

        <div className="settings-group">
          <label className="checkbox-option">
            <input type="checkbox" checked={reducedMotion} onChange={(e)=>setReducedMotion(e.target.checked)} />
            <span className="checkbox-label">Reduced Motion</span>
          </label>
        </div>
      </section>

      <section aria-labelledby="appearance-heading" className="settings-section" style={{ '--section-index': 1 }}>
        <div className="settings-section-header">
          <span className="section-icon">🎨</span>
          <h2 id="appearance-heading" className="section-title">Appearance</h2>
        </div>
        <div className="settings-group">
          <label className="settings-label">Theme</label>
          <p className="settings-note">Light / Dark theme follows your system preferences</p>
        </div>
      </section>

      <section aria-labelledby="keyboard-heading" className="settings-section" style={{ '--section-index': 2 }}>
        <div className="settings-section-header">
          <span className="section-icon">⌨️</span>
          <h2 id="keyboard-heading" className="section-title">Keyboard & Shortcuts</h2>
        </div>
        <div className="settings-group">
          <label className="checkbox-option">
            <input type="checkbox" checked={shortcutsEnabled} onChange={(e)=>setShortcutsEnabled(e.target.checked)} />
            <span className="checkbox-label">Enable keyboard shortcuts (Ctrl/Cmd+Alt+A for accessibility panel)</span>
          </label>
        </div>
      </section>

      <section aria-labelledby="notifications-heading" className="settings-section" style={{ '--section-index': 3 }}>
        <div className="settings-section-header">
          <span className="section-icon">🔔</span>
          <h2 id="notifications-heading" className="section-title">Notifications</h2>
        </div>
        <div className="settings-group">
          <label className="settings-label">Notification Level</label>
          <select 
            value={notificationsLevel} 
            onChange={(e)=>setNotificationsLevel(e.target.value)} 
            className="settings-select"
          >
            <option value="off">Off</option>
            <option value="minimal">Minimal</option>
            <option value="verbose">Verbose</option>
          </select>
        </div>
      </section>

      <section aria-labelledby="forms-heading" className="settings-section" style={{ '--section-index': 4 }}>
        <div className="settings-section-header">
          <span className="section-icon">📝</span>
          <h2 id="forms-heading" className="section-title">Forms & Validation</h2>
        </div>
        <div className="settings-group">
          <label className="checkbox-option">
            <input type="checkbox" checked={inlineValidation} onChange={(e)=>setInlineValidation(e.target.checked)} />
            <span className="checkbox-label">Enable inline validation (real-time feedback)</span>
          </label>
        </div>
      </section>

      <div className="settings-actions">
        <button className="btn-settings btn-settings-secondary" onClick={restoreDefaults}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          Restore Defaults
        </button>
        <button className="btn-settings btn-settings-primary" onClick={handleSave}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Save Preferences
        </button>
      </div>
    </main>
  );
}
