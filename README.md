# NextHire

NextHire is a production-ready, accessibility-first hiring platform built for recruiters and applicants. It provides secure authentication, role-based workflows, job and application management, and an inclusive user experience following modern web standards.

The project uses a scalable MERN architecture and is designed for real-world deployment and extension.

## 🚀 Tech Stack

- Frontend: React
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT (JSON Web Tokens)
- Accessibility Standards: WCAG-aligned UI practices
- Development Environment: Windows (PowerShell / CMD)

## ✨ Features

### 🔐 Authentication & Authorization

- Secure JWT-based authentication
- Role-based access control (Applicant / Recruiter)
- Protected frontend routes and backend APIs
- Secure password hashing
- Persistent login sessions
- Centralized authentication middleware

### 👤 Applicant Experience

- Applicant dashboard
- Profile and account settings
- Browse and view job listings
- Apply to jobs through a structured application flow
- Resume submission support
- "My Applications" tracking dashboard
- Real-time application status updates
- Accessible and responsive UI across devices

### 🧑‍💼 Recruiter Experience

- Recruiter dashboard with persistent sidebar layout
- Multi-step job posting workflow
- Manage posted jobs
- View applicants per job
- Shortlist or reject candidates
- Resume viewing and applicant data access
- Clean recruiter-specific navigation and pages
- Ownership-based access control for jobs and applicants

### 💼 Job & Application Management

- Job creation, listing, viewing, and deletion
- Job ownership enforcement
- Public job listings
- Job-specific applicant tracking
- Application status lifecycle: Applied, Shortlisted, Rejected
- Data consistency across jobs and applications

### ♿ Accessibility (Core Platform Principle)

- Semantic HTML structure
- Keyboard-accessible navigation
- Screen-reader friendly components
- ARIA labels and roles
- Visible focus indicators
- High color contrast UI
- Accessible form validation and error messaging
- Inclusive design across recruiter and applicant flows

### 🧠 Backend Architecture

- Modular Express application
- RESTful API design
- Clean separation of controllers, routes, middleware, and models
- Mongoose schema-based data modeling
- Centralized error handling
- Secure request validation patterns
- Scalable codebase structure

### 🧪 Quality, Testing & Reliability

- Clean and maintainable codebase
- Lint-ready project structure
- API-level testing readiness
- Frontend flow test readiness
- CI-friendly architecture
- Accessibility testing compatibility

### 🚀 Deployment & DevOps Ready

- Environment-based configuration
- Secure secrets handling
- Production-safe server setup
- Cloud-ready architecture
- Compatible with common deployment platforms (Render, AWS, Vercel)
- Logging and monitoring friendly design

## 📦 Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas or local MongoDB instance

Optional:

- SMTP provider (email)
- Object storage (resume uploads)

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory (do not commit this file).

Required:

```
MONGO_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secure_jwt_secret
```

### Frontend (Vite) env

The frontend reads the backend base URL from `VITE_API_URL`.

- If you set `VITE_API_URL` to the server origin (e.g. `https://nexthire-hfj1.onrender.com`), the client will automatically target the API under `/api`.
- If you set `VITE_API_URL` including `/api` (e.g. `https://nexthire-hfj1.onrender.com/api`), that also works.

Defaults in this repo:

- Production: `client/.env.production`
- Development: `client/.env.development`

Vercel recommendation:

- Set `VITE_API_URL` in Vercel Project Settings → Environment Variables for both **Production** and **Preview** to `https://nexthire-hfj1.onrender.com/api`.

Optional:

```
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

S3_BUCKET=
S3_KEY=
S3_SECRET=
S3_REGION=
```

## ⚡ Quick Start (Windows PowerShell)

### Backend

```powershell
cd c:\Users\dishi\nexthire\NextHire\server
npm install
copy .env.example .env
npm run dev
```

### Frontend

```powershell
cd c:\Users\dishi\nexthire\NextHire\client
npm install
npm run dev
```

