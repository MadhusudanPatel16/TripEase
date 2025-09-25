import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./Logo.png";
import LogoutButton from "../../components/Logout";
import { FaUserCircle } from "react-icons/fa";   // avatar icon

const Header = () => {
  const [open, setOpen] = useState(false);

  // Example: replace with your real user source
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <header className="header">
      <div className="logo d-flex justify-content-center align-items-center">
        <img style={{ height: "80px" }} src={logo} alt="logo" />
      </div>

      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/admin/login">Admin Login</Link></li>
        </ul>
      </nav>

      <div className="auth-buttons">
        {!user && (
          <>
            <Link to="/user/login" className="btn">Sign In</Link>
            <Link to="/user/register" className="btn btn-signup">SignUp</Link>
          </>
        )}
        {user && (
          <div className="profile-wrapper">
            <FaUserCircle
              className="profile-icon"
              size={32}
              
              onClick={() => setOpen(!open)}
              />
            {open && (
              <div className="profile-dropdown">
                <p><strong>{user.username}</strong></p>
                <li><Link to="/userBookings">Your Trips</Link></li>
                <p>{user.email}</p>
                <LogoutButton />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
