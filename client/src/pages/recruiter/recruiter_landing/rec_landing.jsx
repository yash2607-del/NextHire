import React from "react";
import "./rec_landing.css";

function rec_landing(){
  return (
    <div className="landing-container">
      <div className="text-section">
        <h1>Let's hire your next great candidate. <span>Fast.</span></h1>
        <button className="cta-button">Post a free job*</button>
        <p className="terms-link">*Terms, conditions, quality standards, and usage limits apply.</p>
      </div>
      <div className="image-section">
        <img src="/images/hiring-illustration.png" alt="Hiring Illustration" />
      </div>
    </div>
  );
};

export default rec_landing;
