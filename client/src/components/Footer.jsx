import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="nexthire-footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-logo-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="#5B9BD5"/>
                  <path d="M7 14C7 14 8.5 16 12 16C15.5 16 17 14 17 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="9" cy="10" r="1.5" fill="white"/>
                  <circle cx="15" cy="10" r="1.5" fill="white"/>
                </svg>
              </div>
              <span className="footer-logo-text">NextHire</span>
            </div>
            <p className="footer-tagline">
              The accessibility-first hiring platform connecting talented professionals with amazing opportunities.
            </p>
            <div className="footer-socials">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="footer-column">
            <h4 className="footer-heading">For Job Seekers</h4>
            <ul className="footer-links">
              <li><Link to="/signup">Create Profile</Link></li>
              <li><Link to="/applicant/jobs">Browse Jobs</Link></li>
              <li><Link to="/applicant/applications">My Applications</Link></li>
              <li><Link to="/applicant/profile">My Profile</Link></li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div className="footer-column">
            <h4 className="footer-heading">For Recruiters</h4>
            <ul className="footer-links">
              <li><Link to="/recruiter/form">Post a Job</Link></li>
              <li><Link to="/recruiter/dashboard">My Jobs</Link></li>
              <li><Link to="/recruiter/profile">Company Profile</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-column">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to="/accessibility">Accessibility</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="footer-cta-banner">
        <div className="footer-cta-content">
          <div className="footer-cta-text">
            <h3>Ready to find your next great hire?</h3>
            <p>Join thousands of companies using NextHire to build amazing teams.</p>
          </div>
          <div className="footer-cta-actions">
            <Link to="/recruiter/form" className="footer-cta-btn primary">
              Post a Job
            </Link>
            <Link to="/signup" className="footer-cta-btn secondary">
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <span className="footer-copyright">© {new Date().getFullYear()} NextHire. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}