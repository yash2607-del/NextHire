import React from 'react'


function Newpass() {
  return (

    <>
    <section className="wrapper">
      <div className="container">
        <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
          <form className="rounded bg-white shadow p-5">

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingNewPassword"
                placeholder='New-password'
              />
              <label htmlFor="floatingInput">New Password</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type=""
                className="form-control"
                id="floatingConfirmPassword"
                placeholder="Confirm-password"
              />
              <label htmlFor="floatingPassword">Confirm Password </label>
            </div>

            <div className="btn-group w-100 mb-3">
              <button type="submit" className="btn btn-primary w-100">Ok</button>
            </div>

         
          </form>
        </div>
      </div>
    </section>
  </>

  )
}

export default Newpass