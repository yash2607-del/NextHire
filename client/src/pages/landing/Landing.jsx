import React from "react";
import "./Landing.css";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

function Landing() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-light py-2">
        <div className="container-fluid">
          <a className="navbar-brand fs-3 logo-name" href="#">
            NextHire
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <div className="d-flex me-auto"></div>
            <ul className="navbar-nav me-auto d-flex gap-5 mb-2 mb-lg-0">
              <li className="nav-item fs-5 nav-font">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item active fs-5 nav-font">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item fs-5 nav-font">
                <a className="nav-link" href="#">About Us</a>
              </li>
              <li className="nav-item fs-5 nav-font">
                <a className="nav-link" href="#">Contact Us</a>
              </li>
            </ul>
            <button className="btn btn-outline-primary started fs-6" type="submit">
              Get Started
            </button>
            <button className="btn btn-outline-primary fs-6" type="submit">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container-fluid">
        <img
          src="/assets/recruitees-img.png"
          className="rounded float-end w-50 h-100 hero-img"
          alt="landing"
        />
      </div>

      <div className="container-fluid py-5 left-section">
        <p className="ms-4 heading">Welcome to NextHire</p>
        <h5 className="ms-4">"Connecting Talent with Opportunity"</h5>
        <h5 className="ms-4">"Your Dream Job, Just a Click Away!"</h5>
        <div className="mx-4 py-4">
          <button className="btn btn-primary btn-lg mx-2 px-3">Hire</button>
          <button className="btn btn-primary rounded-3 px-3">Apply</button>
        </div>
      </div>

      {/* Features Section */}
      <div className="d-flex flex-column justify-content-center align-items-center text-center">
        <p className="feature-heading text-primary fs-1 fw-bold">Connect. Hire. Grow.</p>
        <p className="feature-subheading text-primary fs-5 fw-semibold mb-5">
          "Connecting Top Talent with the Right Employers Effortlessly."
        </p>
      </div>

      <div className="d-flex justify-content-center align-items-stretch flex-wrap gap-4 container-fluid px-4">
        <Card 
          icon="🔍" 
          title="Smart Job Matching" 
          text="AI-powered job matching based on skills and experience." 
          buttonText="Learn More" 
        />
        <Card  
          icon="📎⚡" 
          title="One-Click Apply" 
          text="Apply to multiple jobs seamlessly with a single click—quick, easy, and hassle-free!"
          buttonText="Apply Now"  
        />
        <Card 
          icon="📢⏳" 
          title="Real-time Updates" 
          text="Stay updated with real-time application tracking and recruiter feedback!"
          buttonText="Track Progress"  
        />
      </div>

      {/* Query Section */}
      <section className="container my-5">
        <h1 className="text-center mb-4 text-primary query-heading">Any Query?</h1>
        <form className="mx-auto" style={{ maxWidth: "500px" }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Your Message</label>
            <textarea className="form-control" id="message" rows="4" placeholder="Enter your message" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </section>

      <Footer/>
    </>
  );
}

export default Landing;
