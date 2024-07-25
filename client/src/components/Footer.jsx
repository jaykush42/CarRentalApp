import React from 'react';
import './Footer.css'; 
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer py-1 text-black">
      <div className="container d-flex flex-wrap justify-content-between align-items-center my-2">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary ">© 2024 Rent&Go Company, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-center">
          <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
          <li className="nav-item"><a href="/cars" className="nav-link px-2 text-body-secondary">Features</a></li>
          <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
          <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
        </ul>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-body-secondary" href="#"><FaFacebookSquare style={{width:'20px',height:'20px'}}/></a></li>
          <li className="ms-3"><a className="text-body-secondary" href="#"><GrInstagram style={{width:'20px',height:'20px'}}/></a></li>
          <li className="ms-3"><a className="text-body-secondary" href="#"><BsTwitterX style={{width:'20px',height:'20px'}}/></a></li>
         </ul>
      </div>
    </footer>
  );
};

export default Footer;
