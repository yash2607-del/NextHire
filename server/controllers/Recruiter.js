import Job from '../models/Recruit.js';
import { validationResult } from 'express-validator';

// Create a new job posting
export const createJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newJob = new Job({
      recruiterId: req.body.recruiterId,
      title: req.body.title,
      category: req.body.category,
      jobType: req.body.jobType,
      location: req.body.location,
      salary: req.body.salary,
      jobDescription: req.body.jobDescription,
      skills: req.body.skills || [],
      inclusivity: req.body.inclusivity || [],
      accommodations: req.body.accommodations || [],
      otherRequirements: req.body.otherRequirements,
      deadline: req.body.deadline,
      contactNumber: req.body.contactNumber,
      additionalInfo: req.body.additionalInfo
    });

    const savedJob = await newJob.save();
    res.status(201).json({
      message: 'Job posted successfully!',
      job: savedJob
    });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({
      error: 'An error occurred while posting the job',
      details: error.message
    });
  }
};

// Fetch all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('recruiterId');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a specific job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('recruiterId');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
