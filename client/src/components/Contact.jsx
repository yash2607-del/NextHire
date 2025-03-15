


function Contact() {
  return (
    <>
       <section className="container my-5">
        <h1 className="text-center mb-4 text-primary query-heading">
          Any Query?
        </h1>
        <form className="mx-auto" style={{ maxWidth: "500px" }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Your Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </section>
    </>
  )
}

export default Contact