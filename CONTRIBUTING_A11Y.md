# Accessibility Contributing Checklist (Short)

This project follows accessibility-first principles. When contributing, please follow this checklist.

- Semantic structure
  - Use `<header>`, `<nav>`, `<main>`, `<footer>`, and proper `<section>` or `<article>` as landmarks.
  - Maintain logical heading order (one `h1` per page ideally; otherwise hierarchical `h2`, `h3`).

- Keyboard & Focus
  - Ensure all interactive elements are reachable by keyboard (Tab/Shift+Tab/Enter/Esc).
  - Provide visible focus styles (`:focus-visible`).
  - Add `aria-modal` and focus-trap for dialogs.

- Forms & Validation
  - Each input has a `<label>` linked via `htmlFor`/`id`.
  - Use `aria-required` for required fields and announce errors with an `aria-live` region.
  - Move focus to the first invalid field on submit.

- ARIA & Roles
  - Use `role` only when semantic element is not available.
  - Provide `aria-label` or `aria-labelledby` for non-text buttons/icons.

- Visual Accessibility
  - Ensure color contrast meets WCAG AA (4.5:1 for normal text).
  - Avoid conveying information by color alone—add icons or text.
  - Support text scaling (up to 200%) via responsive layouts.
  - Include a high-contrast mode toggle if possible.

- Motion & Media
  - Respect `prefers-reduced-motion` and provide reduced-motion mode.
  - Do not auto-play audio/video.
  - Avoid flashy animations.

- Content
  - Provide `alt` text for images and descriptive link text (no "click here").
  - Accessible tables use `<th scope="col">` and header rows.
  - Provide accessible versions of uploaded resumes (PDFs) where possible.

- Notifications
  - Use `role="status"` for non-blocking toast notifications and `role="alert"` for important errors.
  - Use `aria-live` for dynamic application updates.

- Testing & Automation
  - Run automated checks (axe, pa11y) and fix high-severity violations before merging.
  - Add accessibility tests to CI where possible.

- UX
  - Provide clear instructions before forms.
  - Use descriptive button/link text and status badges with text + icon.

If you add new interactive components, include a short usage note describing keyboard interactions and ARIA attributes.
