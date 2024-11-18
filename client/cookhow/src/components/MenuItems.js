// import React, { useState } from 'react';
// import './Menu.css'; // Add your CSS here or link it appropriately.

// const MenuItems = () => {
//   const [isMenuVisible, setMenuVisible] = useState(false);

//   const toggleMenu = () => {
//     setMenuVisible(!isMenuVisible);
//   };

//   const handleClickOutside = (event) => {
//     if (
//       !event.target.closest('.menu-items') &&
//       !event.target.closest('.menu-toggle')
//     ) {
//       setMenuVisible(false);
//     }
//   };

//   React.useEffect(() => {
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div>
//       <button className="menu-toggle" onClick={toggleMenu}>
//         ☰
//       </button>
//       <div
//         id="menuItems"
//         className={`menu-items ${isMenuVisible ? 'visible' : 'hidden'}`}
//       >
//         <div className="logo">
//           <a href="index.html">
//             <img src="client/cookhow/src/assets/logo.png" alt="Logo" />
//           </a>
//         </div>
//         <a href="Home.js">
//           <i className="fa fa-home" aria-hidden="true"></i> Home
//         </a>
//         <a href="Discover.js">
//           <i className="fa fa-cogs" aria-hidden="true"></i> Discover
//         </a>
//         <a href="About.js">
//           <i className="fa fa-info-circle" aria-hidden="true"></i> About Us
//         </a>
//         <a href="DetailedFood.js">
//           <i className="fa fa-tasks" aria-hidden="true"></i> DetailedFood
//         </a>
//         <a href="CreatePost.js">
//           <i className="fa fa-comments" aria-hidden="true"></i> CreatePost
//         </a>
//         <a href="Contact.js">
//           <i className="fa fa-phone" aria-hidden="true"></i>{' '}
//           <i className="fa fa-user" aria-hidden="true"></i> Contact Us
//         </a>
//       </div>
//     </div>
//   );
// };

// export default MenuItems;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Menu.css'; // Ensure the CSS is correctly linked.

// const MenuItems = ({ user }) => {
//   const [isMenuVisible, setMenuVisible] = useState(false);

//   const toggleMenu = () => {
//     // setMenuVisible(!isMenuVisible);
//     setMenuVisible((prev) => !prev);

//   };

//   const handleClickOutside = (event) => {
//     if (
//       !event.target.closest('.menu-items') &&
//       !event.target.closest('.menu-toggle')
//     ) {
//       setMenuVisible(false);
//     }
//   };

//   React.useEffect(() => {
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div>
//       <button className="menu-toggle" onClick={toggleMenu}>
//         ☰
//       </button>
//       <div
//         id="menuItems"
//         className={`menu-items ${isMenuVisible ? 'visible' : 'hidden'}`}>
//         <div className="logo">
//           <Link to="/">
//             <img src="/assets/logo.png" alt="Logo" />
//           </Link>
//         </div>
//         <Link to="/">
//           <i className="fa fa-home" aria-hidden="true"></i> Home
//         </Link>
//         <Link to="/discover">
//           <i className="fa fa-cogs" aria-hidden="true"></i> Discover
//         </Link>
//         <Link to="/about">
//           <i className="fa fa-info-circle" aria-hidden="true"></i> About Us
//         </Link>
//         <Link to="/foods/:id">
//           <i className="fa fa-tasks" aria-hidden="true"></i> Detailed Food
//         </Link>
//         <Link to="/MealGrid">
//           <i className="fa fa-th"></i> Meal Grid
//         </Link>
//         <Link to="/contact">
//           <i className="fa fa-phone" aria-hidden="true"></i>{' '}
//           <i className="fa fa-user" aria-hidden="true"></i> Contact Us
//         </Link>
//         <Link to="/profilepage">
//           <i className="fa fa-user-circle" aria-hidden="true"></i> Profile
//         </Link>
//         {!user ? (
//           <>
//             <Link to="/login">
//               <i className="fa fa-sign-in" aria-hidden="true"></i> Login
//             </Link>
//             <Link to="/register">
//               <i className="fa fa-user-plus" aria-hidden="true"></i> Register
//             </Link>
//           </>
//         ) : (
//           <Link to="/" onClick={() => setMenuVisible(false)}>
//             <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenuItems;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import logo from '../assets/logo.png';

const MenuItems = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      !event.target.closest('.menu-items') &&
      !event.target.closest('.menu-toggle')
    ) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div
        id="menuItems"
        className={`menu-items ${isMenuVisible ? 'visible' : 'hidden'}`}
      >
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <Link to="/">Home</Link>
        <Link to="/discover">Discover</Link>
        <Link to="/about">About Us</Link>
        <Link to="/foods/:id">Detailed Food</Link>
        <Link to="/MealGrid">Meal Grid</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/profilepage">Profile</Link>
      </div>
    </div>
  );
};

export default MenuItems;
