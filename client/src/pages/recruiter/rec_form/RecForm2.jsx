import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruiterForm } from "../../../context/RecruiterContext";
import './RecruiterForm.css';

function RecForm2() {
  const { formData, setFormData } = useRecruiterForm();
  const navigate = useNavigate();

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(formData.skills || []);

  const categories = [
    "Software Development",
    "Design",
    "Marketing",
    "Sales",
    "Customer Support",
    "Finance",
    "Human Resources",
    "Operations",
    "Legal",
    "Healthcare",
    "Education & Training",
    "Engineering",
    "Data Science & Analytics",
    "Information Technology (IT)",
    "Administrative",
    "Manufacturing",
    "Project Management",
    "Business Development",
    "Consulting",
    "Content Writing",
    "Media & Communication",
    "Product Management",
    "Supply Chain & Logistics",
    "Quality Assurance",
    "Research & Development",
    "Public Relations",
    "Security",
    "Real Estate",
    "Arts & Entertainment",
    "Government & Public Service",
    "Non-profit & NGO",
    "Other",
  ];

  const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"];
  const locationOptions = ["Online", "Hybrid", "Offline"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        const updatedSkills = [...skills, skillInput.trim()];
        setSkills(updatedSkills);
        setFormData({ ...formData, skills: updatedSkills });
      }
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const isFormValid =
    formData.JobTitle?.trim() &&
    formData.jobCategory?.trim() &&
    formData.jobType?.trim() &&
    formData.jobLocation?.trim() &&
    formData.jobDescription?.trim();

  const handleContinue = () => {
    if (isFormValid) {
      navigate("/recruiter/form/step3");
    } else {
      const first = document.querySelector('#JobTitle, #jobCategory, #jobType, #jobLocation, #jobDescription');
      if (first) first.focus();
      const statusEl = document.getElementById('recform2-status');
      if (statusEl) statusEl.textContent = 'Please fill in all required fields.';
    }
  };

  const goBack = () => navigate('/recruiter/form');
  const goHome = () => navigate('/recruiter/dashboard');

  return (
    <div className="recruiter-form-wrapper">
      <div className="recruiter-form-container">
        <div className="form-nav-header">
          <div className="form-header" style={{ border: 'none', padding: 0, margin: 0 }}>
            <div className="form-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <h2 className="form-title">Add Job Details</h2>
          </div>
          <button onClick={goHome} className="btn-back-home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>
        </div>
        <div className="form-status" id="recform2-status" role="status" aria-live="polite"></div>
          <div className="form-group">
            <label htmlFor="JobTitle" className="form-label">
              Job Title <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              id="JobTitle"
              name="JobTitle"
              value={formData.JobTitle || ""}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobCategory" className="form-label">
              Job Category <span className="required">*</span>
            </label>
            <select
              className="form-select"
              id="jobCategory"
              name="jobCategory"
              value={formData.jobCategory || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobType" className="form-label">
              Job Type <span className="required">*</span>
            </label>
            <select
              className="form-select"
              id="jobType"
              name="jobType"
              value={formData.jobType || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select job type</option>
              {jobTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobLocation" className="form-label">
              Job Location <span className="required">*</span>
            </label>
            <select
              className="form-select"
              id="jobLocation"
              name="jobLocation"
              value={formData.jobLocation || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select job location</option>
              {locationOptions.map((location, idx) => (
                <option key={idx} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {formData.jobLocation !== "Online" && formData.jobLocation !== "" && (
            <div className="form-group">
              <label htmlFor="jobCity" className="form-label">
                City <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                id="jobCity"
                name="jobCity"
                value={formData.jobCity || ""}
                onChange={handleChange}
                placeholder="Enter job city"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="salaryRange" className="form-label">
              Salary Range <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span>
            </label>
            <input
              type="text"
              className="form-input"
              id="salaryRange"
              name="salaryRange"
              value={formData.salaryRange || ""}
              onChange={handleChange}
              placeholder="e.g. ₹30,000 - ₹50,000 per month"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobDescription" className="form-label">
              Job Description <span className="required">*</span>
            </label>
            <textarea
              className="form-textarea"
              id="jobDescription"
              name="jobDescription"
              rows="5"
              value={formData.jobDescription || ""}
              onChange={handleChange}
              placeholder="Describe the roles, responsibilities, expectations, etc."
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="requiredSkills" className="form-label">
              Required Skills <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              id="requiredSkills"
              placeholder="Type a skill and press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <div className="skills-tags">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button
                    type="button"
                    className="skill-remove"
                    aria-label="Remove skill"
                    onClick={() => removeSkill(index)}
                  >×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-form btn-form-back" onClick={goBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back
            </button>
            <button type="button" className="btn-form btn-form-primary" onClick={handleContinue}>
              Continue
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
  );
}

export default RecForm2;
