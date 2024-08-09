import React from 'react';
import './Footer.css'; 
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer shadow rounded-top text-black">
      <div className="footer-cont">
        <div className="col-md-3 text-center">
          <span className="text">© 2024 Rent&Go Company</span>
        </div>
        <ul className="nav col-md-3 justify-content-center list-unstyled d-flex">
          <li className="ms-3"><a className="text" href="#"><FaFacebookSquare style={{width:'20px',height:'20px'}}/></a></li>
          <li className="ms-3"><a className="text" href="#"><GrInstagram style={{width:'20px',height:'20px'}}/></a></li>
          <li className="ms-3"><a className="text" href="#"><BsTwitterX style={{width:'20px',height:'20px'}}/></a></li>
         </ul>
      </div>
    </footer>
  );
};

export default Footer;