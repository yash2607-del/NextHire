import React from 'react'

function Card() {
  return (
    <>

    <div className="feautres">
        <h1>Why us? </h1>
    </div>
<div className="card text-white bg-white shadow-sm ms-3 my-5" style={{ maxWidth: "20rem" }}>
  <img
    src="https://source.unsplash.com/301x301/?random"
    alt=""
    className="card-img-top"
    style={{ height: "18rem", objectFit: "cover" }}
  />
  <div className="card-body d-flex flex-column justify-content-between">
    <div>
      <h2 className="card-title h3 fw-semibold text-primary">Lorem</h2>
      <p className="card-text text-secondary fs-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio tempora ipsum
        soluta amet corporis accusantium aliquid consectetur eaque!
      </p>
    </div>
    <button type="button" className="btn btn-primary w-100">
      Read more
    </button>
  </div>
</div>

    
    </>
  )
}

export default Card