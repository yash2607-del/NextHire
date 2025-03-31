import React from "react";
import "./RecLanding.css";
import Navbar from "../../../components/Navbar";
function RecLanding(){
  return (
    <>
    <Navbar />
    <div className="container-fluid d-flex flex-column align-items-center text-center py-5">
    <div className="landing-container">
      <div className="text-section">
        <h1>Hire your next great employee. <span>Fast.</span></h1>
        <h5>A hiring solution from job posting to post-placement support</h5>
        <button className="cta-button">Post a job</button>
      </div>
      <div className="image-section">
        <img src="/assets/recruiter.png" alt="Recruiter" />
      </div>
    </div>
  </div>
  </>
  );
};

export default RecLanding;
