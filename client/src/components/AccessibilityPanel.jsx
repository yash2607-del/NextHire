import React from 'react';
import { useA11y } from '../context/A11yContext';

export default function AccessibilityPanel() {
  const { fontSize, setFontSize, highContrast, setHighContrast, reducedMotion, setReducedMotion, panelOpen, setPanelOpen } = useA11y();

  if (!panelOpen) return null;

  return (
    <aside aria-label="Accessibility settings" role="dialog" aria-modal="true" tabIndex={-1} style={{position:'fixed', right:20, top:80, zIndex:1200, background:'#fff', padding:16, borderRadius:8, boxShadow:'0 6px 24px rgba(0,0,0,0.15)'}}>
      <h3 style={{marginTop:0}}>Accessibility Settings</h3>
      <div style={{display:'flex', gap:8, flexDirection:'column', minWidth:260}}>
        <label>Font size</label>
        <div role="radiogroup" aria-label="Font size">
          <label style={{marginRight:8}}><input type="radio" name="fontSize" checked={fontSize==='small'} onChange={()=>setFontSize('small')} /> Small</label>
          <label style={{marginRight:8}}><input type="radio" name="fontSize" checked={fontSize==='medium'} onChange={()=>setFontSize('medium')} /> Medium</label>
          <label><input type="radio" name="fontSize" checked={fontSize==='large'} onChange={()=>setFontSize('large')} /> Large</label>
        </div>

        <label><input type="checkbox" checked={highContrast} onChange={(e)=>setHighContrast(e.target.checked)} /> High contrast</label>
        <label><input type="checkbox" checked={reducedMotion} onChange={(e)=>setReducedMotion(e.target.checked)} /> Reduced motion</label>

        <div style={{display:'flex', justifyContent:'space-between', marginTop:8}}>
          <button className="btn btn-outline-secondary" onClick={()=>setPanelOpen(false)} aria-label="Close accessibility settings">Close</button>
        </div>
      </div>
    </aside>
  );
}
