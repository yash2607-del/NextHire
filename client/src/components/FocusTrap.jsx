import React, { useEffect, useRef } from 'react';

// Basic focus trap for modal/dialog usage. Mount around a dialog when visible.
export default function FocusTrap({ children, open }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const node = ref.current;
    const focusable = node.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        // allow parent to close via Escape by not preventing default here
        return;
      }
      if (e.key === 'Tab') {
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    // focus first
    setTimeout(()=> first && first.focus(), 0);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return <div ref={ref}>{children}</div>;
}
