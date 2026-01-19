import axios from "axios";
import { setupAxiosInterceptor } from "./utils/auth";

function resolveApiBaseUrl() {
  const raw = import.meta.env.VITE_API_URL;
  if (raw && typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed) {
      // If someone supplied just a hostname like "nexthire-production.up.railway.app",
      // prepend https:// so axios treats it as an absolute URL instead of a path.
      if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`;
      }
      return trimmed;
    }
  }

  // If deployed as a single app (same origin), default to the current origin.
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  // Fallback to localhost for local dev/test
  return "http://localhost:5000";
}

const rawApiUrl = resolveApiBaseUrl();
// Log the resolved API base in development to help debugging wrong configs
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  console.debug("Resolved API_BASE_URL:", rawApiUrl);
}

// Ensure base URL always ends with `/api` so client calls target the server routes
const API_BASE_URL = rawApiUrl.endsWith("/api")
  ? rawApiUrl
  : rawApiUrl.replace(/\/+$/, "") + "/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup automatic token injection and 401 handling
setupAxiosInterceptor(API);

// Normalize backend error payloads into string messages so components
// rendering `error` don't accidentally attempt to render objects.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const data = error?.response?.data;
      if (data) {
        if (typeof data.error === 'object' && data.error !== null) {
          const msg = data.error.message || JSON.stringify(data.error);
          error.response.data.error = msg;
          error.message = msg;
        } else if (typeof data.message === 'object' && data.message !== null) {
          const msg = data.message.message || JSON.stringify(data.message);
          error.response.data.message = msg;
          error.message = msg;
        } else if (data.error) {
          error.message = data.error;
        } else if (data.message) {
          error.message = data.message;
        }
      }
    } catch (e) {
      // swallow any normalization errors
    }
    return Promise.reject(error);
  }
);

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