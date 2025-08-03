import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useRecruiterForm } from "../../../context/RecruiterContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RecForm4() {
  const navigate = useNavigate();
  const { formData, setFormData } = useRecruiterForm();

  const [deadline, setDeadline] = useState(formData.deadline || "");
  const [contactNumber, setContactNumber] = useState(formData.contactNumber || "");
  const [additionalInfo, setAdditionalInfo] = useState(formData.additionalInfo || "");

  const handleSubmit = async () => {
    // Basic validation
    if (!deadline) {
      toast.error("Please select an application deadline.");
      return;
    }
    if (!contactNumber || !/^\d{10}$/.test(contactNumber)) {
      toast.error("Please enter a valid 10-digit contact number.");
      return;
    }

    // Merge current data into context
    const updatedData = {
      ...formData,
      deadline,
      contactNumber,
      additionalInfo
    };
    setFormData(updatedData);

    try {
      // Post to backend
      const response = await axios.post("http://localhost:8000/api/Recruiter_Form",
        updatedData
      );

      toast.success(response.data.message || "Form submitted successfully!");
      setTimeout(() => {
        navigate("/Review");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Unexpected Error occurred.");
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="container-fluid d-flex flex-column align-items-center text-center py-5">
        <div className="landing-container">
          <div className="text-section">
            <h2>You are all set to post your hiring post.</h2>
            <h4>Last few details.</h4>
          </div>
          <div className="image-section">
            <img src="/assets/form4.jpg" className="w-50" alt="Form" />
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "600px" }}>
          {/* Deadline */}
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label fw-bold">
              Deadline to Apply <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              id="deadline"
              className="form-control"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          {/* Contact Number */}
          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label fw-bold">
              Contact Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              id="contactNumber"
              className="form-control"
              placeholder="Enter your contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          {/* Additional Info */}
          <div className="mb-3">
            <label htmlFor="additionalInfo" className="form-label fw-bold">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              className="form-control"
              rows="4"
              placeholder="Any other relevant details"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-end mb-5 mt-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecForm4;
