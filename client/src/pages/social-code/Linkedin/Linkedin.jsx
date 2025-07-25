
function Linkedin() {
  return (
    <>
      <div className="text-center text-muted text-uppercase mb-2"> or </div>
      <div className="linkedin-button">
        <button type="submit" className="linkedin-btn">
          <img
            src="/assets/linkedin-icon.svg"
            className="linkedin-icon"
            alt="LinkedIn Icon"
          />
          <span className="linkedin-text">Sign in with LinkedIn</span>
        </button>
      </div>
    </>
  );
}

export default Linkedin;
