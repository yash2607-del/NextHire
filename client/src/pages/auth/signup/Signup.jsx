import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";

function Signup() {
  const [role, setRole] = useState("Applicant");
  const [error, setError] = useState("");

  // Common
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Applicant
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");

  // Recruiter
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [industryType, setIndustryType] = useState("");

  const toggleRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    let payload = {
      name: role === "Applicant" ? fullName : email.split("@")[0],
      email,
      password,
      role,
      additionalData: {},
    };

    if (role === "Applicant") {
      payload.additionalData = {
        location,
        experience,
        jobType,
      };
    } else {
      payload.additionalData = {
        company: companyName,
        location: companyLocation,
        jobTitle,
        industry: industryType,
      };
    }

    try {
      const response = await axios.post("http://localhost:8000/api/user", payload);
      toast.success(response.data.message);
      setTimeout(()=>{
        window.location.href='/login';
      },1500)
    } catch (error) {
      const msg = error.response?.data?.error || "Signup failed";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="wrapper">
        <div className="container">
          <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
            <form className="rounded bg-white shadow p-5" onSubmit={handleSubmit}>
              <h6 className="text-dark fw-bolder fs-4 mb-2">Sign Up</h6>

              <div id="signup-error" role="alert" aria-live="polite" style={{minHeight:20}}>
                {error && <div className="text-danger">{error}</div>}
              </div>

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

              {/* Email and Password */}
              <div className="form-floating mb-3">
                <input
                  id="signup-email"
                  type="email"
                  className="form-control"
                  aria-label="Email Address"
                  aria-required="true"
                  aria-describedby={error ? "signup-error" : undefined}
                  placeholder="xyz@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="signup-email">Email Address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  id="signup-password"
                  type="password"
                  className="form-control"
                  aria-label="Password"
                  aria-required="true"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="signup-password">Password</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  id="signup-confirm"
                  type="password"
                  className="form-control"
                  aria-label="Confirm Password"
                  aria-required="true"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label htmlFor="signup-confirm">Confirm Password</label>
              </div>

              {/* Recruiter Fields */}
              {role === "Recruiter" && (
                <>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <label>Company Name</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Location"
                      value={companyLocation}
                      onChange={(e) => setCompanyLocation(e.target.value)}
                    />
                    <label>Company Location</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    >
                      <option disabled value="">Select Job Title</option>
                      <option value="Manager">Manager</option>
                      <option value="Developer">Developer</option>
                      <option value="Designer">Designer</option>
                      <option value="Analyst">Analyst</option>
                    </select>
                    <label>Job Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      value={industryType}
                      onChange={(e) => setIndustryType(e.target.value)}
                    >
                      <option disabled value="">Select Industry Type</option>
                      <option value="Software">IT</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                    </select>
                    <label>Industry Type</label>
                  </div>
                </>
              )}

              {/* Applicant Fields */}
              {role === "Applicant" && (
                <>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <label>Full Name</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <label>Location</label>
                  </div>

                  <h6 className="text-dark mb-1">Experience Level</h6>
                  <div className="btn-group w-100 mb-3" role="group">
                    {["Fresher", "1-3 years", "3+ years"].map((level) => (
                      <button
                        type="button"
                        key={level}
                        className={`btn ${experience === level ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setExperience(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>

                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                    >
                      <option disabled value="">Select Job Type</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-Site">On-Site</option>
                      <option value="Any">Any</option>
                    </select>
                    <label>Preferred Job Type</label>
                  </div>
                </>
              )}

              {/* Submit */}
              <div className="btn-group w-100 mb-4">
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </div>

              <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a className="sign-in" href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
