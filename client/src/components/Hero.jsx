
function Hero() {
  return (
    <>

<div className="container-fluid">
        <img
          src="/assets/hire.png"
          className="rounded float-end w-50 h-100 hero-img"
          alt="landing"
        />
      </div>

      <div className="container-fluid py-5 left-section">
        <p className="ms-4 heading">Welcome to NextHire</p>
        <h5 className="ms-4">&quot;Connecting Talent with Opportunity&quot;</h5>
        <h5 className="ms-4">&quot;Your Dream Job, Just a Click Away!&quot;</h5>
        <div className="mx-4 py-4">
          <button className="btn btn-primary rounded-3 mx-2 px-3">Hire</button>
          <button className="btn btn-primary rounded-3 px-3">Apply</button>
        </div>
      </div>

    
    </>
   
  )
}

export default Hero