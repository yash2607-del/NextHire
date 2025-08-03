import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useRecruiterForm } from "../../../context/RecruiterContext";

function RecForm3() {
  const navigate = useNavigate();
  const { formData, setFormData } = useRecruiterForm();

  // Pre-fill from context if available
  const [selectedDisabilities, setSelectedDisabilities] = useState(formData.selectedDisabilities || []);
  const [accessibilities, setAccessibilities] = useState(formData.accessibilities || []);
  const [otherAssistiveTools, setOtherAssistiveTools] = useState(formData.otherAssistiveTools || "");

  const disabilities = [
    "Visual impairment",
    "Hearing impairment",
    "Blindness",
    "Muteness",
    "Upper limbs impairments (hands, arms)",
    "Lower limbs impairments (legs, feet)",
    "Locomotor disability"
  ];

  const options = [
    "Wheelchair access / Ramps",
    "Accessible restrooms",
    "Sign language interpreter",
    "Assistive technology support",
    "Flexible work hours",
    "Remote work option",
    "Personal assistance"
  ];

  const handleDisabilityChange = (disability) => {
    setSelectedDisabilities((prev) =>
      prev.includes(disability) ? prev.filter((item) => item !== disability) : [...prev, disability]
    );
  };

  const handleAccessibilityChange = (item) => {
    setAccessibilities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleContinue = () => {
    // Optional validation
    if (selectedDisabilities.length === 0) {
      alert("Please select at least one disability option.");
      return;
    }

    // Save all fields at once to context
    setFormData({
      ...formData,
      selectedDisabilities,
      accessibilities,
      otherAssistiveTools
    });

    navigate("/RecForm4");
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid d-flex flex-column align-items-center text-center py-5">
        <div className="landing-container">
          <div className="text-section">
            <h2>Accessibility and Disability Inclusion Details</h2>
          </div>
          <div className="image-section">
            <img src="/assets/inclusion.jpg" alt="Form" />
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "600px" }}>
          {/* Disabilities */}
          <div className="mb-3">
            <label className="form-label fw-bold">
              Job is inclusive for (select all that apply)
            </label>
            <div className="row">
              {disabilities.map((disability, index) => (
                <div className="col-md-6" key={index}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`disability-${index}`}
                      checked={selectedDisabilities.includes(disability)}
                      onChange={() => handleDisabilityChange(disability)}
                    />
                    <label className="form-check-label" htmlFor={`disability-${index}`}>
                      {disability}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility options */}
          <div className="mb-3">
            <label className="form-label fw-bold">
              Accommodations Provided (select all that apply)
            </label>
            <div className="row">
              {options.map((option, idx) => (
                <div className="col-md-6" key={idx}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`access-${idx}`}
                      checked={accessibilities.includes(option)}
                      onChange={() => handleAccessibilityChange(option)}
                    />
                    <label className="form-check-label" htmlFor={`access-${idx}`}>
                      {option}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other tools */}
          <div className="mb-3">
            <label htmlFor="additionalTools" className="form-label fw-bold">
              Other Assistive Tools (Optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="additionalTools"
              placeholder="e.g. Braille printer, magnification software"
              value={otherAssistiveTools}
              onChange={(e) => setOtherAssistiveTools(e.target.value)}
            />
          </div>

          {/* Continue Button */}
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

export default RecForm3;
