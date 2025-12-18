import Card from './Card'


function Features() {
  return (
    <section id="features" role="region" aria-labelledby="features-heading" className="py-5">
      <div className="d-flex flex-column justify-content-center align-items-center text-center">
        <h2 id="features-heading" className="feature-heading text-primary fs-1 fw-bold">Connect. Hire. Grow.</h2>
        <p className="feature-subheading text-primary fs-5 fw-semibold mb-5">"Connecting Top Talent with the Right Employers Effortlessly."</p>
      </div>

      <div className="d-flex justify-content-center align-items-stretch flex-wrap gap-4 container-fluid px-4" aria-label="Platform features">
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
    </section>
  )
}

export default Features