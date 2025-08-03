import express from 'express';
import { body } from 'express-validator';
import { createJob, getAllJobs, getJobById } from '../controllers/Recruiter.js';

const router = express.Router();

// Validation rules
const jobValidationRules = [
  body('recruiterId').notEmpty().withMessage('Recruiter ID is required'),
  body('title').notEmpty().withMessage('Job title is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('jobType').notEmpty().withMessage('Job type is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('jobDescription').notEmpty().withMessage('Job description is required'),
  body('deadline').notEmpty().withMessage('Deadline is required'),
  body('contactNumber').notEmpty().withMessage('Contact number is required')
];

// Routes
router.post('/Recruiter_Form', jobValidationRules, createJob);
//router.get('/api/jobs', getAllJobs);
//router.get('/api/jobs/:id', getJobById);

export default router;
