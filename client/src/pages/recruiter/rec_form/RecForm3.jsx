import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruiterForm } from "../../../context/RecruiterContext";

function RecForm3() {
  const navigate = useNavigate();
  const { formData, setFormData } = useRecruiterForm();

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
    if (selectedDisabilities.length === 0) {
      alert("Please select at least one disability option.");
      return;
    }

    setFormData({
      ...formData,
      selectedDisabilities,
      accessibilities,
      otherAssistiveTools: otherAssistiveTools.trim(),
    });

    navigate("/RecForm4");
  };

  return (
    <>
      <h2 className="mb-4" style={{ color: '#0d47a1', fontWeight: 700 }}>Accessibility and Disability Inclusion Details</h2>
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
              disabled={selectedDisabilities.length === 0}
            >
              Continue
            </button>
        </div>
      </div>
    </>
  );
}

export default RecForm3;
