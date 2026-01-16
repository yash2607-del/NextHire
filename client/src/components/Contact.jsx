


import React, { useState } from 'react';
import API from '../api';
import './Contact.css';

function Contact() {
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    setSubmitting(true);
    
    try {
      const response = await API.post('/contact', formData);
      
      if (response.data.success) {
        setStatus('success');
        setTimeout(() => {
          setStatus('');
          setFormData({ name: '', subject: '', email: '', phone: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" role="region" aria-labelledby="contact-heading" className="contact-section-modern">
      <div className="contact-background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="contact-container">
        {/* Left side - Contact Form */}
        <div className="contact-form-wrapper">
          <div className="contact-header">
            <h2 id="contact-heading" className="contact-title">Get In Touch</h2>
            <p className="contact-subtitle">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
          
          {status && (
            <div className={`contact-status ${status}`} role="status" aria-live="polite">
              {status === 'success' ? (
                <div className="status-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Thank you! We'll get back to you soon.</span>
                </div>
              ) : (
                <div className="status-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Please fill all required fields.</span>
                </div>
              )}
            </div>
          )}
          
          <form onSubmit={handleSubmit} role="form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  required 
                  aria-required="true"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email *</label>
                <input 
                  type="email" 
                  className="form-input" 
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  required 
                  aria-required="true"
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input 
                  type="text" 
                  className="form-input" 
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message *</label>
              <textarea 
                className="form-input form-textarea" 
                id="message" 
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your inquiry..." 
                required 
                aria-required="true"
              ></textarea>
            </div>

            <button type="submit" className="submit-button" disabled={submitting}>
              <span>{submitting ? 'Sending...' : 'Send Message'}</span>
              {submitting ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="spinner">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </form>
        </div>

        {/* Right side - Contact Info Cards */}
        <div className="contact-info-wrapper">         <div className="contact-info-header">
            <h3 className="info-title">Connect With Us</h3>
            <p className="info-subtitle">Choose your preferred way to reach out</p>
          </div>

          <a href="https://twitter.com/NextHireCareers" target="_blank" rel="noopener noreferrer" className="contact-info-card">
            <div className="contact-icon twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.95718 14.8821 3.28445C14.0247 3.61173 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="contact-info-text">
              <h4>Twitter</h4>
              <p>@NextHireCareers</p>
              <span className="link-arrow">→</span>
            </div>
          </a>

          <a href="https://linkedin.com/company/nexthire" target="_blank" rel="noopener noreferrer" className="contact-info-card">
            <div className="contact-icon linkedin">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="contact-info-text">
              <h4>LinkedIn</h4>
              <p>NextHire Careers</p>
              <span className="link-arrow">→</span>
            </div>
          </a>

          <a href="mailto:support@nexthire.com" className="contact-info-card">
            <div className="contact-icon email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="contact-info-text">
              <h4>Email Support</h4>
              <p>support@nexthire.com</p>
              <span className="link-arrow">→</span>
            </div>
          </a>

          <div className="contact-stats">
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Support</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">&lt;2h</div>
              <div className="stat-label">Response Time</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">99%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;