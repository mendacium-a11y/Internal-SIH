import React from 'react'
import { Link } from "react-router-dom";


const NavbarMain = () => {


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark ">
        <div className="container-fluid mt-2 ms-3">
          <Link className="navbar-brand text-light" to="/"><h2>LegalBuddy</h2></Link>
          <button className="navbar-toggler border-1 border-light " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            {/* <span className="navbar-toggler-icon text-light"></span> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-list" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-3">
              <li className="nav-item  mx-3 d-flex align-items-center">
                <Link className="navbar-brand text-light " to="/rapidserve"><p className=''>Rapid Serve</p></Link>
              </li>
              <li className="nav-item mx-3 d-flex align-items-center">
                <Link className="navbar-brand text-light" to="/peoplenearme"><p>People Near You</p></Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavbarMain