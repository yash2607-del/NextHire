import express from 'express';
import { applyForJob, getApplicationsForJob, getUserApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Recruiter updates application status
router.patch('/:applicationId', protect(['recruiter']), updateApplicationStatus);

// Applicants apply to a job
// Applicants apply to a job
router.post('/apply', protect(), applyForJob);
// allow POST /api/applications for clients that expect root endpoint
router.post('/', protect(), applyForJob);

// Recruiters view applications for a job
router.get('/job/:jobId', protect(['recruiter']), getApplicationsForJob);

// Logged-in user view own applications
router.get('/me', protect(), getUserApplications);
// alias for older client endpoints
router.get('/user', protect(), getUserApplications);

export default router;
