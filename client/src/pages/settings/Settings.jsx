import React, { useState } from 'react';
import { useA11y } from '../../context/A11yContext';

export default function Settings() {
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

  return (
    <main className="container py-5" aria-labelledby="settings-heading">
      <h1 id="settings-heading" style={{ color: '#0d47a1' }}>Settings</h1>

      <section aria-labelledby="accessibility-heading" className="my-4">
        <h2 id="accessibility-heading">Accessibility</h2>
        <div className="mb-3">
          <label className="form-label">Font size</label>
          <div>
            <label className="me-2"><input type="radio" name="fontSize" checked={fontSize==='small'} onChange={()=>setFontSize('small')} /> Small</label>
            <label className="me-2"><input type="radio" name="fontSize" checked={fontSize==='medium'} onChange={()=>setFontSize('medium')} /> Medium</label>
            <label><input type="radio" name="fontSize" checked={fontSize==='large'} onChange={()=>setFontSize('large')} /> Large</label>
          </div>
        </div>

        <div className="mb-3">
          <label><input type="checkbox" checked={highContrast} onChange={(e)=>setHighContrast(e.target.checked)} /> High contrast mode</label>
        </div>

        <div className="mb-3">
          <label><input type="checkbox" checked={reducedMotion} onChange={(e)=>setReducedMotion(e.target.checked)} /> Reduced motion</label>
        </div>
      </section>

      <section aria-labelledby="appearance-heading" className="my-4">
        <h2 id="appearance-heading">Appearance</h2>
        <div className="mb-3">
          <label>Theme (system respects OS):</label>
          <div><small>Light / Dark will follow system in this starter.</small></div>
        </div>
      </section>

      <section aria-labelledby="keyboard-heading" className="my-4">
        <h2 id="keyboard-heading">Keyboard & Shortcuts</h2>
        <div className="mb-3">
          <label><input type="checkbox" checked={shortcutsEnabled} onChange={(e)=>setShortcutsEnabled(e.target.checked)} /> Enable keyboard shortcuts (Ctrl/Cmd+Alt+A to open A11y panel)</label>
        </div>
      </section>

      <section aria-labelledby="notifications-heading" className="my-4">
        <h2 id="notifications-heading">Notifications</h2>
        <div className="mb-3">
          <label>Verbosity</label>
          <select value={notificationsLevel} onChange={(e)=>setNotificationsLevel(e.target.value)} className="form-select w-auto">
            <option value="off">Off</option>
            <option value="minimal">Minimal</option>
            <option value="verbose">Verbose</option>
          </select>
        </div>
      </section>

      <section aria-labelledby="forms-heading" className="my-4">
        <h2 id="forms-heading">Forms & Validation</h2>
        <div className="mb-3">
          <label><input type="checkbox" checked={inlineValidation} onChange={(e)=>setInlineValidation(e.target.checked)} /> Inline validation (instant)</label>
        </div>
      </section>

      <div className="mt-4 d-flex gap-2">
        <button className="btn btn-secondary" onClick={restoreDefaults}>Restore defaults</button>
        <button className="btn btn-primary" onClick={()=>alert('Preferences saved locally')}>Save preferences</button>
      </div>
    </main>
  );
}
