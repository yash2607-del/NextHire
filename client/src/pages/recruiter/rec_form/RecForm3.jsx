import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruiterForm } from "../../../context/RecruiterContext";
import './RecruiterForm.css';

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

  const [status, setStatus] = useState("");

  const handleContinue = () => {
    if (selectedDisabilities.length === 0) {
      setStatus("Please select at least one disability option.");
      const firstCheckbox = document.querySelector('input[id^="disability-"]');
      if (firstCheckbox) firstCheckbox.focus();
      return;
    }

    setFormData({
      ...formData,
      selectedDisabilities,
      accessibilities,
      otherAssistiveTools: otherAssistiveTools.trim(),
    });

    navigate("/recruiter/form/step4");
  };

  const goBack = () => navigate('/recruiter/form/step2');
  const goHome = () => navigate('/recruiter/dashboard');

  return (
    <div className="recruiter-form-wrapper">
      <div className="recruiter-form-container">
        <div className="form-nav-header">
          <div className="form-header" style={{ border: 'none', padding: 0, margin: 0 }}>
            <div className="form-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <polyline points="17 11 19 13 23 9"/>
              </svg>
            </div>
            <h2 className="form-title">Accessibility & Inclusion</h2>
          </div>
          <button onClick={goHome} className="btn-back-home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>
        </div>
        <div className="form-status" role="status" aria-live="polite">{status}</div>
          <div className="form-group">
            <fieldset aria-required="true" aria-labelledby="disabilities-legend">
              <legend id="disabilities-legend" className="form-label">Job is inclusive for <span className="required">*</span></legend>
              <div className="checkbox-grid">
                {disabilities.map((disability, index) => (
                  <label className="checkbox-item" key={index}>
                    <input
                      type="checkbox"
                      id={`disability-${index}`}
                      checked={selectedDisabilities.includes(disability)}
                      onChange={() => handleDisabilityChange(disability)}
                    />
                    <span className="checkbox-label">{disability}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="form-group">
            <fieldset aria-labelledby="accommodations-legend">
              <legend id="accommodations-legend" className="form-label">Accommodations Provided</legend>
              <div className="checkbox-grid">
                {options.map((option, idx) => (
                  <label className="checkbox-item" key={idx}>
                    <input
                      type="checkbox"
                      id={`access-${idx}`}
                      checked={accessibilities.includes(option)}
                      onChange={() => handleAccessibilityChange(option)}
                    />
                    <span className="checkbox-label">{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="form-group">
            <label htmlFor="additionalTools" className="form-label">Other Assistive Tools <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span></label>
            <input
              type="text"
              className="form-input"
              id="additionalTools"
              placeholder="e.g. Braille printer, magnification software"
              value={otherAssistiveTools}
              onChange={(e) => setOtherAssistiveTools(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-form btn-form-back" onClick={goBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back
            </button>
            <button
              type="button"
              className="btn-form btn-form-primary"
              onClick={handleContinue}
              disabled={selectedDisabilities.length === 0}
              aria-disabled={selectedDisabilities.length === 0}
              aria-label="Continue to final review"
            >
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

export default RecForm3;
