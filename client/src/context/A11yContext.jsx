import React, { createContext, useContext, useEffect, useState } from 'react';

const A11yContext = createContext(null);

export function A11yProvider({ children }) {
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('a11y:fontSize') || 'medium');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('a11y:highContrast') === 'true');
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem('a11y:reducedMotion') === 'true');
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('font-small','font-medium','font-large');
    document.documentElement.classList.add(`font-${fontSize}`);
    localStorage.setItem('a11y:fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) document.documentElement.classList.add('hc');
    else document.documentElement.classList.remove('hc');
    localStorage.setItem('a11y:highContrast', highContrast ? 'true' : 'false');
  }, [highContrast]);

  useEffect(() => {
    if (reducedMotion) document.documentElement.classList.add('reduced-motion');
    else document.documentElement.classList.remove('reduced-motion');
    localStorage.setItem('a11y:reducedMotion', reducedMotion ? 'true' : 'false');
  }, [reducedMotion]);

  // keyboard shortcut: Ctrl+Alt+A to toggle panel
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setPanelOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <A11yContext.Provider value={{ fontSize, setFontSize, highContrast, setHighContrast, reducedMotion, setReducedMotion, panelOpen, setPanelOpen }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  return useContext(A11yContext);
}
