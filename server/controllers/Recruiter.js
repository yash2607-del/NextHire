// Delete a job (recruiter-only, must own job)
export const deleteJob = async (req, res) => {
  try {
    const recruiterId = req.user && (req.user.userId || req.user.id);
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.recruiterId.toString() !== recruiterId) {
      return res.status(403).json({ error: 'Not authorized to delete this job' });
    }
    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all jobs for the logged-in recruiter, including applications and their statuses

import Job from '../models/Job.js';
import Application from '../models/Application.js';

export const getRecruiterJobsWithApplications = async (req, res) => {
  try {
    const recruiterId = req.user && (req.user.userId || req.user.id);
    if (!recruiterId) return res.status(401).json({ error: 'Unauthorized' });
    // Find all jobs for this recruiter
    const jobs = await Job.find({ recruiterId }).sort({ createdAt: -1 }).lean();
    // For each job, populate applications and their statuses
    const jobsWithApplications = await Promise.all(jobs.map(async (job) => {
      const applications = await Application.find({ jobId: job._id });
      return {
        ...job,
        applications: applications.map(app => ({ status: app.status })),
      };
    }));
    res.json(jobsWithApplications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getMyJobs = async (req, res) => {
  try {
    const recruiterId = req.user && (req.user.userId || req.user.id);
    if (!recruiterId) return res.status(401).json({ error: 'Unauthorized' });
    const jobs = await Job.find({ recruiterId }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
import { validationResult } from 'express-validator';

export const createJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Normalize arrays and trim values to avoid enum mismatches
    const normalizeArray = (arr) => Array.isArray(arr) ? arr.map((v) => (v || "").toString().trim()).filter(Boolean) : [];
    const inclusivityArr = normalizeArray(req.body.inclusivity);
    const accommodationsArr = normalizeArray(req.body.accommodations);
    const skillsArr = Array.isArray(req.body.skills) ? req.body.skills.map(s => (s||"").toString().trim()).filter(Boolean) : [];

    const newJob = new Job({
      recruiterId: req.user && (req.user.userId || req.user.id) ? (req.user.userId || req.user.id) : req.body.recruiterId,
      title: req.body.title,
      category: req.body.category,
      jobType: req.body.jobType,
      location: req.body.location,
      salary: req.body.salary,
      jobDescription: req.body.jobDescription,
      skills: skillsArr,
      inclusivity: inclusivityArr,
      accommodations: accommodationsArr,
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

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('recruiterId');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
