function Google() {
  return (
    <div className="google-button">
      <button type="submit" className="google-btn">
        <img
          src="/assets/google-icon.svg"
          className="google-icon"
          alt="Google Icon"
        />
        <span className="google-text">Sign in with Google</span>
      </button>
    </div>
  );
}

export default Google;
