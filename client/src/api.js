import axios from "axios";
import { setupAxiosInterceptor } from "./utils/auth";

// Use environment variable or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup automatic token injection and 401 handling
setupAxiosInterceptor(API);

// Auth endpoints
// Server mounts auth routes at /api and defines POST /login and POST /user
export const loginUser = (credentials) => API.post("/login", credentials);
export const registerUser = (userData) => API.post("/user", userData);

// Recruiter endpoints
export const submitRecruiterForm = (formData) => API.post("/Recruiter_Form", formData);
export const getJobs = () => API.get("/jobs");
export const getRecruiterJobs = () => API.get("/jobs/recruiter");
export const getMyJobs = () => API.get("/jobs/my");
export const getJobById = (jobId) => API.get(`/jobs/${jobId}`);
export const deleteJob = (jobId) => API.delete(`/jobs/${jobId}`);
export const updateJobStatus = (jobId, status) => API.patch(`/jobs/${jobId}/status`, { status });

// Applicant endpoints
export const getApplications = () => API.get("/applications");
export const submitApplication = (jobId, applicationData) => 
  API.post(`/applications/${jobId}`, applicationData);
export const getApplication = (applicationId) => API.get(`/applications/${applicationId}`);
// Get applications for current user (backend: /applications/user)
export const getUserApplications = () => API.get("/applications/user");

// Profile endpoints
export const getUserProfile = () => API.get("/profile");
export const updateUserProfile = (profileData) => API.put("/profile", profileData);

// Default export
export default API;