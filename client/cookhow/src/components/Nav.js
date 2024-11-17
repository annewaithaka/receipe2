import React from 'react';
import { Link } from 'react-router-dom';
// import log2 from '../assets/log2.png';
import "./Nav.css";
import log2 from '../assets/logo.png';



function Nav({ user }) {
  // return (
  //   <div className="h-20 max-w-7xl mx-auto p-6 bg-slate-700 rounded-lg shadow-lg m-4 flex items-center justify-between px-6">
  //     {/* Logo Section */}
  //     <div className="flex items-center space-x-3">
  //       <img src={log2} alt="logo" className="h-12 w-12 rounded-lg" />
  //       <span className="text-white text-2xl ml-20 font-bold">LEARN HOW TO PREPARE DELICIOUS MEALS</span>
  //     </div>

  //     {/* Navigation Links */}
  //     <div className="flex items-center space-x-6">
  //       {!user ? (
  //         <>
  //           <Link to="/Login" className="text-slate-100 font-semibold hover:text-blue-300 transition-colors">
  //             Login
  //           </Link>
  //           <Link to="/Register" className="text-slate-100 font-semibold hover:text-blue-300 transition-colors">
  //             Register
  //           </Link>
  //           <Link to="/MealGrid" className="text-slate-100 font-semibold hover:text-blue-300 transition-colors">
  //           Discover
  //           </Link>
  //           <Link to="/" className="text-slate-100 font-semibold hover:text-blue-300 transition-colors">
  //           Home
  //           </Link>
  //         </>
  //       ) : (
  //         <div className="flex items-center space-x-4">
  //           <span className="text-slate-100 font-semibold">{user.name}</span>
  //           <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
  //             {user.name.charAt(0).toUpperCase()}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <img src={log2} alt="logo" />
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/MealGrid">Discover</Link>
        <Link to="/Contact">Contact Us</Link>
        <Link to="/About">About Us</Link>
      </div>

      {/* Buttons Section */}
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
            <span className="user-name">{user.name}</span>
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;