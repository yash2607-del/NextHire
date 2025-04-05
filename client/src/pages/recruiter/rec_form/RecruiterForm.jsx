import React from "react";
import Navbar from "../../../components/Navbar";

function RecruiterForm(){
  return (
    <div>
    <Navbar />
      <div className="container-fluid d-flex flex-column align-items-center text-center py-5">
        <div className="landing-container">
            <div className="text-section">
            <h2>Hiring made easier. Fill a short form to post a job. </h2>
            <p>
                <a href="#" className="text-primary fw-medium">
                I'm looking for a job →
                </a>
            </p>
            </div>
            <div className="image-section">
            <img src="/assets/building.jpg" alt="Form" />
            </div>
        </div> 
      </div>

    <div className="container d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "600px" }}>
            <div className="mb-3">
            <label
                htmlFor="formGroupExampleInput"
                className="form-label fw-bold"
            >
            Company name <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="CompanyName"
                    placeholder="Enter your company name"
                    required
                />
            </div>
        </div>
    </div>

    </div>   
  );
};

export default RecruiterForm;
