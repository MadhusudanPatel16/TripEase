// import React from "react";
// import { Link } from "react-router-dom";
// import "./Footer.css";
// import logoImage from "./Logo.png"; 
// import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         {/* Logo & Brand Name */}
//         <div className="footer-logo">
//           <img src={logoImage} alt="TripEase Logo" className="footer-logo-img" />
//           <h2>TripEase</h2>
//         </div>

//         {/* Navigation Links */}
//         <div className="footer-links">
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/trips">Trips</Link>
//           <Link to="/contact">Contact</Link>
//         </div>

//         {/* Social Media Icons */}
//         <div className="footer-social">
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             <FaFacebook />
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//             <FaInstagram />
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             <FaTwitter />
//           </a>
//           <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
//             <FaYoutube />
//           </a>
//         </div>

//         {/* Copyright Section */}
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} TripEase. All Rights Reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logoImage from "./Logo.png"; // Update path if needed
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & About Us */}
        <div className="footer-section about">
          <div className="footer-logo">
            <img src={logoImage} alt="TripEase Logo" className="footer-logo-img" />
            <h2>TripEase</h2>
          </div>
          <p>
            Welcome to Tripease, your trusted travel companion! We’re more than just a travel company; we’re your ticket to hassle-free adventures.<br/>
            TripEase is your travel companion, helping you explore the best destinations, plan seamless trips, and create unforgettable memories.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/trips">Trips</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><FaMapMarkerAlt /> 123 Khandwa Naka, Indore, India</p>
          <p><FaPhone /> +91 82174-10864</p>
          <p><FaEnvelope /> support@tripease.com</p>
        </div>

        {/* Social Media */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TripEase. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
