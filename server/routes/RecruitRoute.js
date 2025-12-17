import express from 'express';
import { body } from 'express-validator';
import { createJob, getAllJobs, getJobById, getMyJobs, getRecruiterJobsWithApplications, deleteJob } from '../controllers/Recruiter.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const jobValidationRules = [
  body('title').notEmpty().withMessage('Job title is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('jobType').notEmpty().withMessage('Job type is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('jobDescription').notEmpty().withMessage('Job description is required'),
  body('deadline').notEmpty().withMessage('Deadline is required'),
  body('contactNumber').notEmpty().withMessage('Contact number is required')
];

router.post('/jobs', protect(['recruiter']), jobValidationRules, createJob);
router.get('/jobs', getAllJobs);
router.get('/jobs/my', protect(['recruiter']), getMyJobs);
router.get('/jobs/recruiter', protect(['recruiter']), getRecruiterJobsWithApplications);
router.delete('/jobs/:id', protect(['recruiter']), deleteJob);
router.get('/jobs/:id', getJobById);

export default router;
