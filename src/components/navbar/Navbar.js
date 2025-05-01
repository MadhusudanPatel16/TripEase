import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./Logo.png"; 
import LogoutButton from "../../components/Logout";

const Header = () => {
  return (
    <header className="header">
      <div className="logo d-flex justify-content-center align-items-center">
        <img style= {{height:"80px"}}src={logo} alt="logo"/>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/userBookings">Your Trips</Link></li>
          <li><Link to="/admin/login">Admin Login</Link></li>
          {/* <li><Link to="/testing">testing</Link></li> */}
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/user/login" className="btn">Sign In</Link>
        <Link to="/user/register" className="btn btn-signup">SignUp</Link>
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
