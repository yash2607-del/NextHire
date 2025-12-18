import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruiterForm } from "../../../context/RecruiterContext";

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
      navigate("/RecForm3");
    } else {
      // set an accessible status and focus the first missing field
      const first = document.querySelector('#JobTitle, #jobCategory, #jobType, #jobLocation, #jobDescription');
      if (first) first.focus();
      const statusEl = document.getElementById('recform2-status');
      if (statusEl) statusEl.textContent = 'Please fill in all required fields.';
    }
  };

  return (
    <>
      <h2 className="mb-4" style={{ color: '#0d47a1', fontWeight: 700 }}>Add Job Details</h2>
      <div id="recform2-status" role="status" aria-live="polite" style={{minHeight:20}}></div>
      <div className="w-100" style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <label htmlFor="JobTitle" className="form-label fw-bold">
              Job Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="JobTitle"
              name="JobTitle"
              value={formData.JobTitle || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="jobCategory" className="form-label fw-bold">
              Job Category <span className="text-danger">*</span>
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

          <div className="mb-3">
            <label htmlFor="jobType" className="form-label fw-bold">
              Job Type <span className="text-danger">*</span>
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

          <div className="mb-3">
            <label htmlFor="jobLocation" className="form-label fw-bold">
              Job Location <span className="text-danger">*</span>
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
            <div className="mb-3">
              <label htmlFor="jobCity" className="form-label fw-bold">
                City <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="jobCity"
                name="jobCity"
                value={formData.jobCity || ""}
                onChange={handleChange}
                placeholder="Enter job city"
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="salaryRange" className="form-label fw-bold">
              Salary Range <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="salaryRange"
              name="salaryRange"
              value={formData.salaryRange || ""}
              onChange={handleChange}
              placeholder="e.g. ₹30,000 - ₹50,000 per month"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="jobDescription" className="form-label fw-bold">
              Job Description <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="jobDescription"
              name="jobDescription"
              rows="5"
              value={formData.jobDescription || ""}
              onChange={handleChange}
              placeholder="Describe the roles, responsibilities, expectations, etc."
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="requiredSkills" className="form-label fw-bold">
              Required Skills <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="requiredSkills"
              placeholder="Type a skill and press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <div className="mt-2 d-flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge bg-primary d-flex align-items-center"
                >
                  {skill}
                  <button
                    type="button"
                    className="btn-close btn-close-white btn-sm ms-2"
                    aria-label="Remove"
                    onClick={() => removeSkill(index)}
                  ></button>
                </span>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-end mb-5 mt-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
    </>
  );
}

export default RecForm2;
