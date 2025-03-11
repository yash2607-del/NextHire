import React from 'react'
import './Landing.css'
import Card from '../../components/Card'


function Landing() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light py-2">
        <div className="container-fluid">
          <a className="navbar-brand fs-3 logo-name" href="#"> Recruitees</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <div className="d-flex me-auto"></div>
            <ul className="navbar-nav me-auto d-flex gap-5 mb-2 mb-lg-0 ">
              <li className="nav-item fs-5 nav-font ">
                <a className="nav-link " href="#"> Home</a>
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
            <button className="btn btn-outline-primary started fs-6" type="submit">Get Started</button>
            <button className="btn btn-outline-primary fs-6" type="submit">Login</button>
          </div>
        </div>
      </nav>


      {/* hero section */}

      <div className=" container-fluid">
        <img src="/assets/recruitees-img.png" className="rounded float-end w-50 h-100 hero-img" alt="landing-image" />
      </div>

      <div className="container-fluid py-5 left-section">
        <p className=' ms-4 heading'> Welcome to Recruitees</p>
        <h5 className='ms-4'> "Connecting Talent with Opportunity</h5>
        <h5 className='ms-4'> Your Dream Job, Just a Click Away!"</h5>
        <div className='mx-1 py-4'> 
        <button className='btn btn-primary bt-lg mx-4 px-3 rounded-2'> Hire</button>
        <button className='btn btn-primary rounded-3 px-3'> Apply </button>
        </div>

      </div>


      <Card/>

    </>
  )
}

export default Landing