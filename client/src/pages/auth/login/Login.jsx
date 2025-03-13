import React from 'react';
import Signup from '../signup/Signup.jsx';

function Login() {
  return (
    <>
      <section className="wrapper">
        <div className="container">
          <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
            <form className="rounded bg-white shadow p-5">
              <h1 className="text-dark fw-bolder fs-4 mb-2">Login Form</h1>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floating-input"
                  placeholder="xyz@company.com"
                />
                <label htmlFor="floatingInput">Email Address</label>
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