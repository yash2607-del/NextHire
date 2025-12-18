
function Hero() {
  return (
    <section id="hero" role="region" aria-labelledby="hero-heading" className="container-fluid py-5">
      <div className="container-fluid">
        <img
          src="/assets/hire.png"
          className="rounded float-end w-50 h-100 hero-img"
          alt="People collaborating on hiring platform"
        />
      </div>

      <div className="left-section">
        <h1 id="hero-heading" className="ms-4 heading">Welcome to NextHire</h1>
        <p className="ms-4">"Connecting Talent with Opportunity"</p>
        <p className="ms-4">"Your Dream Job, Just a Click Away!"</p>
        <div className="mx-4 py-4">
          <button aria-label="Hire talent" className="btn btn-primary rounded-3 mx-2 px-3">Hire</button>
          <button aria-label="Apply for jobs" className="btn btn-primary rounded-3 px-3">Apply</button>
        </div>
      </div>
    </section>
  )
}

export default Hero