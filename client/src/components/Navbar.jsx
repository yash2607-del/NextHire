 

function navbar() {
  return (
    <>
     <nav className="navbar navbar-expand-lg bg-light py-2">
    <div className="container-fluid">
    <a className="navbar-brand fs-3 logo-name" href="#">
            <img src="/assets/hire_1.png" alt="NextHire Logo" style={{ width: "30px", height: "30px", marginRight: "10px" }} />
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
        <ul className="navbar-nav me-auto d-flex gap-5 mb-2 mb-lg-0 ">
          <li className="nav-item fs-5 nav-font ">
            <a className="nav-link " href="#">
              {" "}
              Home
            </a>
          </li>
          <li className="nav-item active fs-5 nav-font">
            <a className="nav-link" href="#">
              Features
            </a>
          </li>
          <li className="nav-item fs-5 nav-font">
            <a className="nav-link" href="#">
              About Us
            </a>
          </li>
          <li className="nav-item fs-5 nav-font">
            <a className="nav-link" href="#">
              Contact Us
            </a>
          </li>
        </ul>
      
      </div>
    </div>
  </nav>
    </>
   

  )
}

export default navbar
