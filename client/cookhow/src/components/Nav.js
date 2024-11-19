import React from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";
import log2 from '../assets/logo.png';
import MenuItems from "./MenuItems";

function Nav({ user }) {
  return (
    <div className="navbar">
      <MenuItems />

      {/* Logo Section */}
      <div className="navbar-logo">
        <img src={log2} alt="logo" />
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/Discover">Discover Us</Link>
        <Link to="/About">About Us</Link>
        <Link to="/Contact">Contact Us</Link>
        <Link to="/ProfileSection ">Profile</Link>
      </div>

      {/* User Section */}
      <div className="navbar-buttons">
        {!user ? (
          <>
            <Link to="/Login">
              <button className="signup">Login</button>
            </Link>
            <Link to="/Register">
              <button className="login">Sign Up</button>
            </Link>
          </>
        ) : (
          <div className="user-info">
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            {/* <span className="user-name">{user.name}</span> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
