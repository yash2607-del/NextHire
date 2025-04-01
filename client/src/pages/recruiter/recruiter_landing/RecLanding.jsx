import React from "react";
import "./RecLanding.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

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
    <div className="bg-warning-subtle w-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-start">
            <h2 className="fw-bold fs-1">
              Save time and effort in your recruitment journey.
            </h2>
            <p className="fs-5 text-secondary mt-3">
              NextHire helps you find best fit for your job. No more hard work to find people to work.
            </p>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </>
  );
};

export default RecLanding;
