import React from "react";
import { Link } from "react-router-dom";
import "./RecLanding.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

function RecLanding(){
  return (
    <div>
    <Navbar />
    <div className="container-fluid d-flex flex-column align-items-center text-center py-5">
      <div className="landing-container">
        <div className="text-section">
          <h1>Recruiter Portal</h1>
          <h5 className="mb-4">Manage your jobs, view applicants, and find your next hire.</h5>
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
            <Link to="/RecruiterForm" className="cta-button" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>Post a Job</Link>
            <Link to="/review" className="btn btn-outline-primary">My Jobs</Link>
          </div>
        </div>
        <div className="image-section">
          <img src="/assets/recruiter.png" alt="Recruiter" />
        </div>
      </div>
      <div className="mt-4 w-100">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold fs-1 mb-3">All your hiring tools in one place</h2>
            <p className="fs-5 text-secondary">Post jobs, track applications, and review candidates with ease. Use the dashboard to manage your postings and see real-time stats on your hiring process.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-warning-subtle w-100 py-3">
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

    <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="card bg-white shadow-sm flex-grow-1" style={{ maxWidth: "20rem" }}>
        <div className="card-body d-flex flex-column">
        <span className="fs-3">✅</span>
          <h2 className="card-title h3 fw-semibold text-primary mt-4">
          Get a verified account.
          </h2>
          <p className="card-text text-secondary fs-5 mb-4 mt-4">
          Fill up details to get a verified account to make your hiring process smooth and easy.
          </p>
        </div>
      </div>

      <div className="card bg-white shadow-sm flex-grow-1" style={{ maxWidth: "20rem" }}>
        <div className="card-body d-flex flex-column">
        <span className="fs-3">✍</span>
          <h2 className="card-title h3 fw-semibold text-primary mt-4">
          Fill the form to build a job post.
          </h2>
          <p className="card-text text-secondary fs-5 mb-4 mt-4">
          Fill up quick details to post a job and find eligible candidates for the position.
          </p>
        </div>
      </div>

      <div className="card bg-white shadow-sm flex-grow-1" style={{ maxWidth: "20rem" }}>
        <div className="card-body d-flex flex-column">
        <span className="fs-3">📶</span>
          <h2 className="card-title h3 fw-semibold text-primary mt-4">
          Post your job.
          </h2>
          <p className="card-text text-secondary fs-5 mb-4 mt-4">
          After you post your job, use our state-of-the-art tools to help you find dream talent.
          </p>
        </div>
      </div>
      <div className="card bg-white shadow-sm flex-grow-1" style={{ maxWidth: "20rem" }}>
        <div className="card-body d-flex flex-column">
        <span className="fs-3">☑️</span>
          <h2 className="card-title h3 fw-semibold text-primary mt-4">
          Review and find your perfect candidate.
          </h2>
          <p className="card-text text-secondary fs-5 mb-4 mt-4">
          Our tools help to review the resume and find the match for you to review. 
          </p>
        </div>
      </div>

    </div>
    </div>
    <div className="container-fluid d-flex flex-column align-items-center text-center py-5">
      <div className="landing-container">
        <div className="text-section">
          <h1>GET STARTED IN MINUTES✓</h1>
          <Link to="/RecruiterForm" className="cta-button" style={{ textDecoration: 'none', display: 'inline-block', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>
            <b>Post a job</b>
          </Link>
        </div>
      </div> 
    </div>


    <Footer />
  </div>
  );
};

export default RecLanding;
