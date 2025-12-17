# NextHire

NextHire is a hiring & accessibility-first platform for recruiters and applicants. This repository contains a Node/Express backend and a React frontend. The app includes auth, recruiter multi-step forms, job posting scaffolding, and basic APIs.

## Tech stack
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React
- Auth: JWT
- Dev OS instructions use Windows (PowerShell/CMD)

## Features (implemented)
- User signup & login UI
- Basic forgot/new password pages (frontend)
- Landing, home, navbar, hero, and card components
- Recruiter multi-step job form (frontend)
- Backend controllers and Mongoose models scaffolded
- JWT middleware present

## Missing / Roadmap (MVP)
- Secure secret handling (remove committed .env, rotate credentials)
- Job listing, search & detail pages
- Apply flow & Application model (resume upload)
- Email verification & password reset backend wiring
- Recruiter dashboard (manage jobs & applicants)
- Input validation, role-based authorization, logging, tests, CI
- Accessibility polish and automated checks

## Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas or connection string
- Optional: AWS S3 / object storage for uploads, SMTP provider for emails

## Environment variables
Create a `.env` in `server/` (do NOT commit). Required keys:
- MONGO_URL=your_mongodb_connection_string
- PORT=8000
- JWT_SECRET=your_jwt_secret
Optional keys (if implemented):
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- S3_BUCKET, S3_KEY, S3_SECRET, S3_REGION

Example (.env — DO NOT COMMIT):
MONGO_URL=your_mongo_uri
PORT=8000
JWT_SECRET=change_this_to_a_strong_secret

## Quick start (Windows PowerShell)
1. Backend
   - Open terminal, run:
     cd c:\Users\dishi\nexthire\NextHire\server
     npm install
     copy .env.example .env && edit .env
     npm run dev   # or npm start

2. Frontend
   - In a new terminal:
     cd c:\Users\dishi\nexthire\NextHire\client
     npm install
     npm run dev   # or npm start

Run backend and frontend in separate terminals. Adjust scripts if your package.json uses different script names.

## Running both concurrently
- Use two terminals or a process manager (pm2) / `concurrently` package if desired.

## Security & important notes
- Remove committed `.env` from repository and rotate exposed credentials immediately.
- Add `.env` to `.gitignore`.
- Do not store secrets in source control. Use environment or secret management for deployments.
- Enforce role-based checks for recruiter actions and validate/sanitize all inputs.

## Tests & CI
- Add unit/integration tests for critical backend controllers and frontend flows.
- Add GitHub Actions for linting, tests, and basic accessibility checks (axe/pa11y).

## Contributing
- Create issues for features/bugs.
- Fork, branch per feature, and open PRs with clear descriptions.
- Keep commits small and focused.

## License
Add a LICENSE file (e.g., MIT) as needed.

If you want, I can generate a .env.example, CI workflow, or a detailed file-level TODO checklist for the top-priority items.