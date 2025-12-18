import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light py-2" role="navigation" aria-label="Main navigation">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 logo-name d-flex align-items-center" to="/" aria-label="NextHire home">
            <img src="/assets/hire_1.png" alt="NextHire Logo" style={{ width: "30px", height: "30px", marginRight: "10px" }} />
            NextHire
          </Link>
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
            <div className="d-flex me-auto" />
            <ul className="navbar-nav me-auto d-flex gap-5 mb-2 mb-lg-0 ">
              <li className="nav-item fs-5 nav-font ">
                <Link className="nav-link " to="/home">Home</Link>
              </li>
              <li className="nav-item active fs-5 nav-font">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item fs-5 nav-font">
                <a className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item fs-5 nav-font">
                <a className="nav-link" href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
