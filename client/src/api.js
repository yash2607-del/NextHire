import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
});

export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const registerUser = (userData) => API.post("/auth/register", userData);
export const submitRecruiterForm = (formData) => API.post("/Recruiter_Form", formData);