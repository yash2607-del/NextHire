import React, { useRef } from "react";
import "./RecruiterForm.css";

function RecruiterForm() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const jobData = Object.fromEntries(formData.entries());
    console.log("Submitted Job Post:", jobData);
    alert("Job opening submitted successfully!");
  };

  return (
    <div className="container recruiter-form-container">
      <h2 className="heading">Create a Job Opening</h2>
      <form className="recruiter-form" ref={formRef} onSubmit={handleSubmit}>
        <label>Job Title:</label>
        <input type="text" name="jobTitle" required />

        <label>Company Name:</label>
        <input type="text" name="company" required />

        <label>Location:</label>
        <input type="text" name="location" required />

        <label>Job Type:</label>
        <select name="jobType">
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Project">Project</option>
        </select>

        <label>Job Description:</label>
        <textarea name="description" required></textarea>

        <label>Salary (Optional):</label>
        <input type="text" name="salary" />

        <label>Contact Email:</label>
        <input type="email" name="email" required />

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default RecruiterForm;
