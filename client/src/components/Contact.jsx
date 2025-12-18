


import React, { useState } from 'react';

function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic client-side validation example
    const form = e.currentTarget;
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    if (!name || !email || !message) {
      setStatus('Please fill all required fields.');
      return;
    }
    setStatus('Thank you — your message has been submitted.');
    form.reset();
  };

  return (
    <section id="contact" role="region" aria-labelledby="contact-heading" className="container my-5">
      <h2 id="contact-heading" className="text-center mb-4 text-primary query-heading">Any Query?</h2>
      <form className="mx-auto" style={{ maxWidth: '500px' }} onSubmit={handleSubmit} role="form" aria-describedby="contact-status">
        <div id="contact-status" role="status" aria-live="polite" style={{minHeight:20}}> 
          {status && <span className="text-muted">{status}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter your name" required aria-required="true" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" required aria-required="true" />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Your Message</label>
          <textarea className="form-control" id="message" rows="4" placeholder="Enter your message" required aria-required="true"></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100" aria-label="Submit contact form">Submit</button>
      </form>
    </section>
  )
}

export default Contact