import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { useRecruiterForm } from "../../../context/RecruiterContext";

function RecruiterForm() {
  const navigate = useNavigate();
  const { formData, setFormData } = useRecruiterForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    (formData.companyName?.trim() || "") !== "" &&
    (formData.companyWebsite?.trim() || "") !== "";

  const handleContinue = () => {
    if (isFormValid) {
      navigate("/RecForm2");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div>
     
    

      <div className="container d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <h3>Company Information</h3>

          <div className="mb-3">
            <label htmlFor="CompanyName" className="form-label fw-bold">
              Company name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              className="form-control"
              id="CompanyName"
              placeholder="Enter your company name"
              value={formData.companyName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="website" className="form-label fw-bold">
              Company Website <span className="text-danger">*</span>
            </label>
            <input
              type="url"
              name="companyWebsite"
              className="form-control"
              id="website"
              placeholder="https://example.com"
              value={formData.companyWebsite || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="companyDescription" className="form-label fw-bold">
              Company Description (Optional)
            </label>
            <textarea
              name="companyDescription"
              className="form-control"
              id="companyDescription"
              rows="4"
              value={formData.companyDescription || ""}
              onChange={handleChange}
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
