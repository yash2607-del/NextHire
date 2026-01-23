import Card from './Card'
import './Features.css'


function Features() {
  return (
    <section id="features" role="region" aria-labelledby="features-heading" className="features-section">
      <div className="features-header">
        <span className="features-badge">FEATURES</span>
        <h2 id="features-heading" className="features-title">Experience that grows with your career</h2>
        <p className="features-description">An accessible platform that puts you in control of your job search journey.</p>
      </div>

      <div className="features-grid" aria-label="Platform features">
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