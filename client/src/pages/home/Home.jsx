import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import './home.css';
import { getCurrentUser } from '../../utils/auth';

function Home() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setUserRole(user?.role || null);
  }, []);

  // Scroll-driven interaction setup
  useEffect(() => {
    // ===== SCROLL-REVEAL ANIMATIONS =====
    const scrollRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });

    // Apply scroll-reveal to elements
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
      scrollRevealObserver.observe(el);
    });

    // Apply parallax effect to hero visual
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const heroVisual = document.querySelector('.hero-visual');
      const heroGrid = document.querySelector('.hero-grid');
      
      if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
      
      if (heroGrid) {
        heroGrid.style.transform = `translateY(${scrolled * 0.08}px) scale(1.02)`;
      }
    };

    window.addEventListener('scroll', handleParallax, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.2) {
            entry.target.classList.add('animate-in');
          }
          if (entry.intersectionRatio >= 0.5) {
            entry.target.classList.add('is-active');
          } else {
            entry.target.classList.remove('is-active');
          }
        } else {
          entry.target.classList.remove('animate-in');
          entry.target.classList.remove('is-active');
        }
      });
    }, observerOptions);

    // Observe accessibility cards
    const accessibilityCards = document.querySelectorAll('.accessibility-feature-card');
    accessibilityCards.forEach((card, index) => {
      card.setAttribute('data-index', index);
      card.style.setProperty('--card-index', index);
      observer.observe(card);
    });

    // Handle scroll-driven interaction with checkpoints and progress
    const scrollContainer = document.querySelector('.accessibility-cards-scroll');
    const parentContainer = scrollContainer?.closest('.accessibility-content');
    
    if (scrollContainer && parentContainer) {
      let scrollTimeout;
      let visitedIndices = new Set();
      
      const handleScroll = () => {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        
        // Update progress indicator
        parentContainer.classList.remove('progress-10', 'progress-30', 'progress-50', 'progress-70', 'progress-90');
        if (scrollPercentage > 80) {
          parentContainer.classList.add('progress-90');
        } else if (scrollPercentage > 60) {
          parentContainer.classList.add('progress-70');
        } else if (scrollPercentage > 40) {
          parentContainer.classList.add('progress-50');
        } else if (scrollPercentage > 20) {
          parentContainer.classList.add('progress-30');
        } else if (scrollPercentage > 5) {
          parentContainer.classList.add('progress-10');
        }
        
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
          const containerRect = scrollContainer.getBoundingClientRect();
          const containerCenter = containerRect.top + containerRect.height / 2;
          
          accessibilityCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + cardRect.height / 2;
            const distance = Math.abs(cardCenter - containerCenter);
            
            // Check if card is centered in viewport
            if (distance < containerRect.height * 0.3) {
              card.classList.add('is-active');
              visitedIndices.add(index);
              
              // Mark all previous cards as visited
              accessibilityCards.forEach((c, i) => {
                if (i < index && visitedIndices.has(i)) {
                  c.classList.add('was-active');
                }
                if (i !== index) {
                  c.classList.remove('is-active');
                }
              });
            }
          });
        }, 100);
      };
      
      // Smooth wheel scroll
      const handleWheel = (e) => {
        if (Math.abs(e.deltaY) > 0) {
          e.preventDefault();
          scrollContainer.scrollBy({ 
            top: e.deltaY > 0 ? window.innerHeight : -window.innerHeight, 
            behavior: 'smooth' 
          });
        }
      };
      
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
      scrollContainer.addEventListener('scroll', handleScroll);
      
      // Keyboard navigation for cards
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          const activeCard = Array.from(accessibilityCards).find(card => 
            card.classList.contains('is-active')
          );
          
          if (!activeCard) return;
          
          const currentIndex = parseInt(activeCard.getAttribute('data-index'));
          let targetIndex;
          
          if (e.key === 'ArrowDown' && currentIndex < accessibilityCards.length - 1) {
            targetIndex = currentIndex + 1;
            e.preventDefault();
          } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            targetIndex = currentIndex - 1;
            e.preventDefault();
          }
          
          if (targetIndex !== undefined) {
            const targetCard = accessibilityCards[targetIndex];
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      };
      
      scrollContainer.addEventListener('keydown', handleKeyDown);
      scrollContainer.setAttribute('tabindex', '0');
      scrollContainer.setAttribute('role', 'region');
      scrollContainer.setAttribute('aria-label', 'Scroll through features');
      
      // Initial check
      setTimeout(handleScroll, 100);
      
      return () => {
        observer.disconnect();
        scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer.removeEventListener('wheel', handleWheel);
        scrollContainer.removeEventListener('keydown', handleKeyDown);
        clearTimeout(scrollTimeout);
      };
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      
      {userRole === 'recruiter' ? <RecruiterHome /> : <ApplicantHome />}
      
      <Contact />
      <Footer />
    </>
  );
}

// Recruiter Home Component
function RecruiterHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-grid" />
        <div className="hero-content container">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="badge-icon">👔</span>
              FOR RECRUITERS • ACCESSIBLE HIRING
            </div>
            <h1 className="hero-title">
              Find the <span className="highlight">perfect talent</span><br />
              with inclusive<br />
              hiring tools
            </h1>
            <p className="hero-sub">
              NextHire empowers recruiters with ownership-based job management, multi-step posting workflows, 
              applicant tracking, and clean navigation—all with accessibility at its core.
            </p>
            <div className="hero-ctas">
              <Link to="/RecruiterForm" className="btn hero-btn-primary">Post a Job</Link>
              <Link to="/dashboard" className="btn hero-btn-outline">View Dashboard →</Link>
            </div>
          </div>

          <div className="hero-visual">
            <img src="/assets/recruiter.png" alt="Recruiter dashboard interface" className="hero-illustration" />
            <img src="/assets/building.jpg" className="avatar avatar-top-left" alt="Company" />
            <img src="/assets/form4.jpg" className="avatar avatar-top-right" alt="Application form" />
            <img src="/assets/inclusion.jpg" className="avatar avatar-bottom-left" alt="Inclusive team" />
            <img src="/assets/hiring.png" className="avatar avatar-bottom-right" alt="Hiring process" />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">FEATURES</span>
            <h2 className="section-title">Everything you need to hire inclusively</h2>
            <p className="section-subtitle">
              Empower innovation with better workflow and secure collaboration to help everyone stay organized.
            </p>
          </div>
          
          <div className="features-grid-simple">
            <div className="feature-simple-card">
              <div className="feature-simple-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3V21H21V3H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 7H15M9 12H15M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Recruiter Dashboard</h3>
              <p>
                Persistent sidebar layout with clean navigation. Track all your posted jobs and manage applications.
              </p>
            </div>

            <div className="feature-simple-card">
              <div className="feature-simple-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Multi-Step Job Posting</h3>
              <p>
                Structured workflow to create comprehensive job listings with clear requirements and accessible forms.
              </p>
            </div>

            <div className="feature-simple-card">
              <div className="feature-simple-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Applicant Management</h3>
              <p>
                View applicants per job, access resumes, shortlist or reject with secure ownership-based access control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-Driven Features Section */}
      <section className="accessibility-section" aria-labelledby="recruiter-features-heading">
        <div className="container">
          <div className="accessibility-header">
            <span className="section-pill" aria-hidden="true">HIRING POWER</span>
            <h2 id="recruiter-features-heading" className="section-title">Everything for successful hiring</h2>
            <p className="section-subtitle">
              Streamlined recruitment workflow with powerful tools for managing jobs and applicants.
            </p>
          </div>
          <div className="accessibility-content">
            <div className="accessibility-image" role="img" aria-label="Recruiter managing hiring process">
              <img src="/assets/recruiter.png" alt="" role="presentation" />
              <div className="accessibility-overlay">
                <span className="overlay-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                  Full Control
                </span>
              </div>
            </div>
            <div className="accessibility-text" role="region" aria-label="Recruiter features list">
              <div className="accessibility-cards-scroll">
                
                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M9 7H15M9 12H15M9 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Persistent Dashboard</h3>
                      <span className="card-badge">COMMAND CENTER</span>
                      <p>Clean sidebar layout with instant access to all your jobs. Track openings, applications, and manage your hiring pipeline from one place.</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13" stroke="currentColor" strokeWidth="2"/>
                        <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Structured Job Posting</h3>
                      <span className="card-badge">CREATE</span>
                      <p>Multi-step form workflow ensures complete, professional job listings. Add details, requirements, and preferences with validation at every step.</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Applicant Overview</h3>
                      <span className="card-badge">REVIEW</span>
                      <p>View all applicants for each job with quick access to resumes and details. Filter, sort, and manage candidates efficiently.</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Application Actions</h3>
                      <span className="card-badge">DECIDE</span>
                      <p>Shortlist strong candidates or reject applications with clear feedback. Your decisions update applicant status in real-time.</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Ownership & Security</h3>
                      <span className="card-badge">CONTROL</span>
                      <p>Only see and manage your own job postings. Role-based access ensures secure, private recruitment workflows.</p>
                    </div>
                  </div>
                </article>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Applicant Home Component
function ApplicantHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-grid" />
        <div className="hero-content container">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="badge-icon">🎯</span>
              FOR JOB SEEKERS • ACCESSIBLE OPPORTUNITIES
            </div>
            <h1 className="hero-title">
              Land your <span className="highlight">dream job</span><br />
              with inclusive<br />
              job matching
            </h1>
            <p className="hero-sub">
              NextHire connects you with opportunities through structured application flows, 
              resume submission support, and real-time status updates—all designed with accessibility in mind.
            </p>
            <div className="hero-ctas">
              <Link to="/applicant/jobs" className="btn hero-btn-primary">Browse Jobs</Link>
              <Link to="/applicant/profile" className="btn hero-btn-outline">Update Profile →</Link>
            </div>
          </div>

          <div className="hero-visual">
            <img src="/assets/hire.png" alt="Job search and application process" className="hero-illustration" />
            <img src="/assets/hiring.png" className="avatar avatar-top-left" alt="Browse jobs" />
            <img src="/assets/form4.jpg" className="avatar avatar-top-right" alt="Application form" />
            <img src="/assets/inclusion.jpg" className="avatar avatar-bottom-left" alt="Inclusive team" />
            <img src="/assets/building.jpg" className="avatar avatar-bottom-right" alt="Track applications" />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">FEATURES</span>
            <h2 className="section-title">Experience that grows with your career</h2>
            <p className="section-subtitle">
              An accessible platform that puts you in control of your job search journey.
            </p>
          </div>
          
          <div className="features-grid-simple">
            <div className="feature-simple-card">
              <div className="feature-simple-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Browse & Discover</h3>
              <p>
                Public job listings with clear requirements. Filter and search with keyboard-accessible controls.
              </p>
            </div>

            <div className="feature-simple-card">
              <div className="feature-simple-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Easy Application</h3>
              <p>
                Apply through guided workflows with clear validation. Upload resume in accessible, step-by-step process.
              </p>
            </div>

            <div className="feature-simple-card">
              <div className="feature-simple-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Track Applications</h3>
              <p>
                Dashboard shows all submissions with real-time updates. See Applied, Shortlisted, or Rejected status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-Driven Features Section */}
      <section className="accessibility-section" aria-labelledby="applicant-features-heading">
        <div className="container">
          <div className="accessibility-header">
            <span className="section-pill" aria-hidden="true">YOUR JOURNEY</span>
            <h2 id="applicant-features-heading" className="section-title">Built for your success</h2>
            <p className="section-subtitle">
              Every feature designed to help you find and secure your next opportunity with confidence.
            </p>
          </div>
          <div className="accessibility-content">
            <div className="accessibility-image" role="img" aria-label="Job seekers discovering opportunities">
              <img src="/assets/hire.png" alt="" role="presentation" />
              <div className="accessibility-overlay">
                <span className="overlay-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Real-time Updates
                </span>
              </div>
            </div>
            <div className="accessibility-text" role="region" aria-label="Application features list">
              <div className="accessibility-cards-scroll">
                
                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Smart Job Search</h3>
                      <span className="card-badge">DISCOVERY</span>
                      <p>Browse public job listings with intelligent filters. Find opportunities that match your skills and interests with keyboard-accessible search.</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M14 2V8H20M16 13H8M16 17H8" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Guided Applications</h3>
                      <span className="card-badge">APPLY</span>
                      <p>Step-by-step application process with clear validation. Upload your resume, answer questions, and submit with confidence.</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Application Tracking</h3>
                      <span className="card-badge">MONITOR</span>
                      <p>Track all your applications in one place. See real-time status updates: Applied, Shortlisted, or Rejected.</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Profile Management</h3>
                      <span className="card-badge">PROFILE</span>
                      <p>Keep your professional information up to date. Edit your profile, skills, and resume anytime from your dashboard.</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Accessible Dashboard</h3>
                      <span className="card-badge">INTERFACE</span>
                      <p>Clean, intuitive interface with full keyboard navigation. WCAG-compliant design ensures everyone can use our platform effectively.</p>
                    </div>
                  </div>
                </article>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
