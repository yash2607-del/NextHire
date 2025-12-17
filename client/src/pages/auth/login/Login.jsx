import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");

        // decode JWT payload to decide where to land the user
        const parseJwt = (token) => {
          try {
            const payload = token.split('.')[1];
            const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
            return decoded;
          } catch (err) {
            return null;
          }
        };

        const decoded = parseJwt(data.token);
        const role = decoded?.role;
        const target = role === 'recruiter' ? '/dashboard' : '/applicant/jobs';

        setTimeout(() => {
          window.location.href = target;
        }, 800);
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="wrapper">
        <div className="container">
          <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
            <form className="rounded bg-white shadow p-5" onSubmit={handleSubmit}>
              <h1 className="text-dark fw-bolder fs-4 mb-2">Login Form</h1>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floating-input"
                  placeholder="xyz@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="floatingInput">Email Address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="btn-group w-100 mb-3">
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </div>

              <p className="mt-2 text-center text-sm text-gray-600 mb-5">
                New Member?
                <a className="sign-in" href="/signup"> Sign Up</a>
              </p>

              <a href='/forgot' className='mt-2 text-center text-sm text-gray-600 mb-5'> Forgot Password?</a>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
