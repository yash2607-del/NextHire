// PATCH /api/applications/:applicationId - recruiter only, must own job, status validation
export const updateApplicationStatus = async (req, res) => {
  try {
    const recruiterId = req.user && (req.user.userId || req.user.id);
    const { applicationId } = req.params;
    const { status } = req.body;
    if (!['shortlisted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ error: 'Application not found' });
    const job = await Job.findById(application.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.recruiterId.toString() !== recruiterId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    application.status = status;
    await application.save();
    res.json({ message: 'Status updated', application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyForJob = async (req, res) => {
  try {
    const userId = req.user && (req.user.userId || req.user.id);
    const { jobId, resumeUrl } = req.body;
    if (!jobId) return res.status(400).json({ message: "jobId is required" });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existing = await Application.findOne({ userId, jobId });
    if (existing) return res.status(400).json({ message: "Already applied to this job" });

    const application = await Application.create({ userId, jobId, resumeUrl });
    return res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId })
      .populate("userId", "name email role")
      .sort({ appliedAt: -1 });
    return res.json({ applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const userId = req.user && (req.user.userId || req.user.id);
    const applications = await Application.find({ userId }).populate("jobId");
    return res.json({ applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
