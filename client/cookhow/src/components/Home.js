// import React, { useEffect, useState } from 'react';
// // import Meals from './Meals';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import MealGrid from './MealGrid';
// import  Posts  from './Posts';

// const Home = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();  // 'navigate' instead of 'history'

//   useEffect(() => {
//     (async () => {
//       try {
//         const resp = await axios.get("http://localhost:5000/@me", {
//           withCredentials: true, // Ensure credentials are sent with requests
//         });
//         setUser(resp.data);
//       } catch (error) {
//         console.log("Not authorized", error);
//         navigate('/login');  // Correct method for redirect in v6
//       }
//     })();
//   }, [navigate]);  // Use 'navigate' in the dependency array

//   return (
//     <div>
//       {user ? (
//         <div>
//           <h1>You are logged in... {user.name}</h1>
//           <Posts/>
//           <MealGrid />
//         </div>
//       ) : (
//         <div>
//           <h2>You are not logged in...</h2>
//           <a href="/login"><button>Login</button></a>
//           <a href="/register"><button>Register</button></a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Updated imports for routing
import axios from "axios";
import "./Home.css"; // Include styling from the second repo
import heroImage from "../assets/hero1.jpeg";
import searchIcon from "../assets/search1.png";
import MealGrid from "./MealGrid";
import Posts from "./Posts";

const Home = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search functionality
  const navigate = useNavigate();

  // Check user authentication on component mount
  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get("http://localhost:5000/@me", {
          withCredentials: true,
        });
        setUser(resp.data);
      } catch (error) {
        console.log("Not authorized", error);
        navigate("/login");
      }
    })();
  }, [navigate]);

  const handleSearch = () => {
    console.log("Search query: ", searchQuery);
    // You can integrate search filtering here
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="content">
          <h1>Where Taste Meets Perfection.</h1>
          <p>
            Let your cooking find its way to new heights by posting in this
            global kitchen.
          </p>
          <div className="buttons">
            {/* Conditional buttons based on login state */}
            {user ? (
              <Link to="/discover">
                <button className="view-btn">View Recipes</button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <button className="join-btn">Join Us Today</button>
                </Link>
                <Link to="/login">
                  <button className="view-btn">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="image">
          <img src={heroImage} alt="Hero" />
        </div>
      </section>

      

      {/* Dynamic Content */}
      <div>
        {user ? (
          <div>
            <h1>Welcome back, {user.name}!</h1>
            <Posts />
            <MealGrid />
          </div>
        ) : (
          <div>
            <h2>Please log in or sign up to explore recipes.</h2>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-section">
          <h3>Join us to get the latest updates on upcoming events.</h3>
          <div className="subscribe">
            <input type="email" placeholder="Email address" />
            <button>Subscribe</button>
          </div>
          <p>By signing up, you agree to our privacy policies.</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Navigate</h4>
            <a href="#">Home</a>
            <a href="#">Recipes</a>
            <a href="#">About Us</a>
          </div>
          <div className="footer-column">
            <h4>Official</h4>
            <a href="#">Privacy</a>
            <a href="#">Accessibility</a>
            <a href="#">FAQs</a>
            <a href="#">Terms</a>
            <a href="#">Contacts</a>
          </div>
          <div className="footer-column">
            <h4>Social</h4>
            <a href="#">Recipe Room</a>
            <a href="#">Recipe Room</a>
            <a href="#">RecipeRoom@gmail.com</a>
            <a href="#">+254700076984</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

