import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";

function RecruiterForm() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const isFormValid = companyName.trim() !== "" && companyWebsite.trim() !== "";

  const handleContinue = () => {
    if (isFormValid) {
      navigate("/RecForm2");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container-fluid d-flex flex-column align-items-center text-center py-5">
        <div className="landing-container">
          <div className="text-section">
            <h2>Hiring made easier. Fill a short form to post a job. </h2>
          </div>
          <div className="image-section">
            <img src="/assets/building.jpg" alt="Form" />
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <h3>Company Information</h3>

          <div className="mb-3">
            <label htmlFor="CompanyName" className="form-label fw-bold">
              Company name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="CompanyName"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="website" className="form-label fw-bold">
              Company Website <span className="text-danger">*</span>
            </label>
            <input
              type="url"
              className="form-control"
              id="website"
              placeholder="https://example.com"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="companyDescription" className="form-label fw-bold">
              Company Description (Optional)
            </label>
            <textarea
              className="form-control"
              id="companyDescription"
              rows="4"
              placeholder="Enter a brief description of the company"
            ></textarea>
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
      </div>
    </div>
  );
}

export default RecruiterForm;
