import React, { useState } from "react";
import './signup.css';

function Signup() {
  const [role, setRole] = useState("Applicant");

  const toggleRole = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <>
      <section className="wrapper">
        <div className="container">
          <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
            <form className="rounded bg-white shadow p-5">
              <h6 className="text-dark fw-bolder fs-4 mb-2">Sign In as</h6>

              <div className="btn-group w-100 mb-5" role="group">
                <button
                  type="button"
                  className={`btn ${role === "Recruiter" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => toggleRole("Recruiter")}
                >
                  Recruiter
                </button>
                <button
                  type="button"
                  className={`btn ${role === "Applicant" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => toggleRole("Applicant")}
                >
                  Applicant
                </button>
              </div>

              {/* Common Fields */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floating-input"
                  placeholder="xyz@company.com"
                />
                <label htmlFor="floatingInput">Email Address </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Confirm Password"
                />
                <label htmlFor="floatingConfirmPassword">
                  Confirm Password
                </label>
              </div>

              {/* Conditional Fields */}
              {role === "Recruiter" && (
                <>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingCompany"
                      placeholder="Enter your company name"
                    />
                    <label htmlFor="floatingCompany">Company Name</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingLocation"
                      placeholder="Enter company location"
                    />
                    <label htmlFor="floatingLocation">Company Location</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select className="form-select" id="floatingJobTitle">
                      <option selected disabled>
                        Select Job Title
                      </option>
                      <option value="manager">Manager</option>
                      <option value="developer">Developer</option>
                      <option value="designer">Designer</option>
                      <option value="analyst">Analyst</option>
                    </select>
                    <label htmlFor="floatingJobTitle">Job Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select className="form-select" id="floatingIndustryType">
                      <option selected disabled>
                        Select Industry Type
                      </option>
                      <option value="it">IT</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                    </select>
                    <label htmlFor="floatingIndustryType">Industry Type</label>
                  </div>

                  <div className="btn-group w-25  mb-6">

<button className="btn btn-primary mb-3">Sign Up</button>
</div>

<br />

                  <div className="text-center text-muted text-uppercase mb-2">{" "} or </div>
                  <div className="linkedin-button">
                    <button type="submit" className="linkedin-btn">
                      <img src="/assets/linkedin-icon.svg" className="linkedin-icon" alt="LinkedIn Icon" />
                      <span className="linkedin-text">Sign in with LinkedIn</span>
                    </button>
                    
                  </div>

                  <br />

                  <p className="mt-2 text-center text-sm text-gray-600 mb-5">
                Already have an account?
                <a className="sign-in" href="#"> Login</a>
              </p>

                  
                 
                </>
              )}

              {role === "Applicant" && (
                <>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingFullName"
                      placeholder="Enter your full name"
                    />
                    <label htmlFor="floatingFullName">Full Name</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingLocation"
                      placeholder="Enter your location"
                    />
                    <label htmlFor="floatingLocation">Location</label>
                  </div>

                  <h6 className="text-dark mb-1">Experience Level</h6>
                  <div className="btn-group w-100 mb-3" role="group">
                    <button type="button" className="btn btn-outline-primary">
                      Fresher
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                      1-3 years
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                      3+ years
                    </button>
                  </div>

                  <div className="form-floating mb-3">
                    <select className="form-select" id="floatingJobType">
                      <option selected disabled>
                        Select Job Type
                      </option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="onsite">On-Site</option>
                      <option value="any">Any</option>
                    </select>
                    <label htmlFor="floatingJobType">Which Job Type you prefer?</label>
                  </div>

                  <div className="btn-group w-25  mb-6">

<button className="btn btn-primary mb-3">Sign Up</button>
</div>

<br />

                  <div className="text-center text-muted text-uppercase mb-2">
                {" "}
                or
              </div>

              <div className="google-button">
                <button type="submit" className="google-btn">
                  <img src="/assets/google-icon.svg" className="google-icon" alt="Google Icon" />
                  <span className="google-text">Sign in with Google</span>
                </button>
              </div>
              <br />

          
              <p className="mt-2 text-center text-sm text-gray-600 mb-5">
                Already have an account?
                <a className="sign-in" href="/login"> Login</a>
              </p>
                </>
              )}

             
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;