import "./landing.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import Navbar from "../../components/Navbar";
import { initScrollReveal, initStaggerReveal, pageTransition } from "../../utils/animations";

function Landing() {
  useEffect(() => {
    // Initialize animations
    pageTransition();
    initScrollReveal();
    initStaggerReveal();

    // Helper function to check if element is in viewport
    const isElementInViewport = (el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

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

    // Bi-directional scroll animation observer
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

    // Observe demo video section elements
    const demoElements = document.querySelectorAll(
      '.demo-video-card, .demo-video-icon, .demo-video-title, .demo-video-line, .demo-video-text'
    );
    demoElements.forEach(el => observer.observe(el));

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
      
      // Per-card snap wheel/touch handlers (throttled) for smooth one-card-at-a-time
      const sectionElem = parentContainer.closest('.accessibility-section');

      const wheelState = { last: 0 };

      const getCurrentCardIndex = (container) => {
        const scrollTop = container.scrollTop;
        const h = container.clientHeight;
        return Math.round(scrollTop / h);
      };

      const snapToCard = (container, targetIndex) => {
        const cards = container.querySelectorAll('.accessibility-feature-card');
        if (!cards || cards.length === 0) return;
        targetIndex = Math.max(0, Math.min(cards.length - 1, targetIndex));
        const target = cards[targetIndex];
        if (!target) return;
        container.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      };

      const handleWheel = (e) => {
        if (!sectionElem || !scrollContainer) return;
        if (!isElementInViewport(sectionElem)) return; // let page scroll when section not visible

        e.preventDefault();
        const now = Date.now();
        if (now - wheelState.last < 520) return; // simple throttle
        wheelState.last = now;

        const atBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 4;
        const atTop = scrollContainer.scrollTop <= 2;
        const current = getCurrentCardIndex(scrollContainer);

        if (e.deltaY > 0) {
          const nextIndex = Math.min(current + 1, accessibilityCards.length - 1);
          if (nextIndex > current) {
            snapToCard(scrollContainer, nextIndex);
            return;
          }
          if (atBottom) {
            const next = sectionElem.nextElementSibling;
            if (next) next.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          const prevIndex = Math.max(current - 1, 0);
          if (prevIndex < current) {
            snapToCard(scrollContainer, prevIndex);
            return;
          }
          if (atTop) {
            const prev = sectionElem.previousElementSibling;
            if (prev) prev.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };

      // Touch: accumulate and snap on end
      let touchStartY = 0;
      let touchLastY = 0;
      let touchMoved = false;
      const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; touchLastY = touchStartY; touchMoved = false; };
      const handleTouchMove = (e) => {
        if (!sectionElem || !scrollContainer) return;
        if (!isElementInViewport(sectionElem)) return;
        const y = e.touches[0].clientY;
        const delta = touchLastY - y;
        touchLastY = y;
        if (Math.abs(delta) > 6) {
          touchMoved = true;
          scrollContainer.scrollBy({ top: delta, behavior: 'auto' });
        }
      };
      const handleTouchEnd = () => {
        if (!scrollContainer || !touchMoved) return;
        const totalDelta = touchStartY - touchLastY;
        const threshold = Math.max(60, scrollContainer.clientHeight * 0.12);
        const current = getCurrentCardIndex(scrollContainer);
        if (totalDelta > threshold) {
          snapToCard(scrollContainer, Math.min(current + 1, accessibilityCards.length - 1));
        } else if (totalDelta < -threshold) {
          snapToCard(scrollContainer, Math.max(current - 1, 0));
        } else {
          snapToCard(scrollContainer, current);
        }
        touchMoved = false;
      };

      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
      // also listen on window so page-level wheel events are captured and fed into snapping logic
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      // also listen for native scroll on the container
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      
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
      scrollContainer.setAttribute('aria-label', 'Scroll through accessibility features');
      
      // Initial check
      setTimeout(handleScroll, 100);
      
      return () => {
        observer.disconnect();
        scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer.removeEventListener('wheel', handleWheel);
        scrollContainer.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        clearTimeout(scrollTimeout);
      };
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>    
      <Navbar />

      {/* Hero Section */}
      <section className="landing-hero page-enter">
        <div className="hero-grid" />
        <div className="hero-content container">
          <div className="hero-copy">
            <div className="hero-badge fade-in-up" style={{'--delay': '0.1s'}}>
              <span className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2C13.1046 2 14 2.89543 14 4V6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6V4C10 2.89543 10.8954 2 12 2Z" fill="currentColor"/>
                  <path d="M6 21L8 13H16L18 21M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              ACCESSIBLE • INCLUSIVE • FOR EVERYONE
            </div>
            <h1 className="hero-title fade-in-up" style={{'--delay': '0.2s'}}>
              An <span className="highlight">accessibility-first</span> hiring platform for everyone
            </h1>
            <p className="hero-sub fade-in-up" style={{'--delay': '0.3s'}}>
              NextHire is a production-ready, accessibility-first hiring platform built for recruiters and applicants. Experience seamless job posting, application tracking, and inclusive design that works for everyone.
            </p>
            <div className="hero-ctas fade-in-up" style={{'--delay': '0.4s'}}>
              <Link to="/signup" className="btn hero-btn-primary hover-lift">Get Started</Link>
              <Link to="/login" className="btn hero-btn-outline hover-lift">Sign In →</Link>
            </div>
          </div>

          <div className="hero-visual fade-in-up" style={{'--delay': '0.5s'}}>
            <img src="/assets/hire.png" alt="NextHire platform illustration showing inclusive hiring process" className="hero-illustration" />
            <img src="/assets/recruiter.png" className="avatar avatar-top-left" alt="Recruiter avatar" />
            <img src="/assets/form4.jpg" className="avatar avatar-top-right" alt="Application form" />
            <img src="/assets/inclusion.jpg" className="avatar avatar-bottom-left" alt="Inclusive team" />
            <img src="/assets/building.jpg" className="avatar avatar-bottom-right" alt="Modern workplace" />
          </div>
        </div>
      </section>

      {/* Core Features */}
        <section className="features-section">
          <div className="container">
            <div className="section-header" data-scroll-reveal>
          <span className="section-pill">FEATURES</span>  
          <h2 className="section-title">Experience that grows with your scale</h2>
          <p className="section-subtitle">Scale from startup to enterprise — designed to grow with your team.</p>
             </div>
            
            <div className="features-grid-simple stagger-container">
          <div className="feature-simple-card scroll-reveal-scale hover-card stagger-item" style={{'--card-index': 0}}>
            <div className="feature-simple-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Easy tracking</h3>
            <p>
              We support everyone to easily track their job application status with real-time updates and notifications.
            </p>
          </div>

          <div className="feature-simple-card scroll-reveal-scale" style={{'--card-index': 1}}>
            <div className="feature-simple-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Multiple accounts</h3>
            <p>
              Different user roles for recruiters and applicants with secure authentication and role-based access control.
            </p>
          </div>

          <div className="feature-simple-card scroll-reveal-scale" style={{'--card-index': 2}}>
            <div className="feature-simple-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Unlimited and security</h3>
            <p>
              We help hiring teams with full application data control with secure, WCAG-compliant workflows from both angles.
            </p>
          </div>
            </div>
          </div>
        </section>

        {/* Accessibility Features */}
      <section className="accessibility-section" aria-labelledby="accessibility-heading">
        <div className="container">
          <div className="accessibility-header scroll-reveal">
            <span className="section-pill" aria-hidden="true">ACCESSIBILITY FIRST</span>
            <h2 id="accessibility-heading" className="section-title">Designed for everyone</h2>
            <p className="section-subtitle">
              Accessibility is not a feature—it's our foundation. NextHire follows WCAG guidelines 
              to ensure everyone can use our platform effectively.
            </p>
          </div>
          <div className="accessibility-content">
            <div className="accessibility-image" role="img" aria-label="Diverse and inclusive team collaboration">
              <img src="/assets/inclusion.jpg" alt="" role="presentation" />
              <div className="accessibility-overlay">
                <span className="overlay-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 11V20M12 20L9 17M12 20L15 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 14H20C20.5523 14 21 14.4477 21 15V19C21 19.5523 20.5523 20 20 20H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 14H4C3.44772 14 3 14.4477 3 15V19C3 19.5523 3.44772 20 4 20H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  WCAG Compliant
                </span>
              </div>
            </div>
            <div className="accessibility-text" role="region" aria-label="Accessibility features list">
              <div className="accessibility-cards-scroll">
                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Semantic HTML structure</h3>
                      <span className="card-badge">FOUNDATION</span>
                      <p>Proper heading hierarchy and meaningful markup for screen readers</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Keyboard-accessible navigation</h3>
                      <span className="card-badge">INTERACTION</span>
                      <p>Full keyboard support with visible focus indicators throughout</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Screen-reader friendly</h3>
                      <span className="card-badge">ASSISTIVE TECH</span>
                      <p>Comprehensive ARIA labels, roles, and live regions</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>High contrast UI</h3>
                      <span className="card-badge">VISUAL</span>
                      <p>Carefully chosen colors meeting WCAG AA standards</p>
                    </div>
                  </div>
                </article>

                <article className="accessibility-feature-card">
                  <div>
                    <div className="card-icon-wrapper" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="card-text-content">
                      <h3>Inclusive design</h3>
                      <span className="card-badge">PHILOSOPHY</span>
                      <p>Built with diverse users in mind from the ground up</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="demo-video-section">
        <div className="container">
          <div className="demo-video-card">
            <div className="demo-video-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3L19 12L5 21V3Z" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="demo-video-title">Best Product For You. Check The Demo Video.</h2>
            <div className="demo-video-line"></div>
            <p className="demo-video-text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. 
              Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
            </p>
          </div>
        </div>
      </section>

      {/* Contact component */}
      <Contact />
      <Footer />
    </>
  );
}

export default Landing;
