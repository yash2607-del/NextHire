import './Card.css';
import PropTypes from 'prop-types';

function Card({ icon, title, text, buttonText }) {
  return (
    <div className="card text-white bg-white shadow-sm flex-grow-1"  style={{ maxWidth: "20rem" }}>
      <div className="card-body d-flex flex-column">
        <div>
          <span className="fs-3">{icon}</span>
          <h2 className="card-title h3 fw-semibold text-primary mt-4">{title}</h2>
          <p className="card-text text-secondary fs-5 mb-4 mt-4">{text}</p>
        </div>
        <button type="button" className="btn btn-primary w-100 mt-auto">{buttonText}</button>
      </div>
    </div>
  );
}

Card.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Card;