import React, {useState } from "react";
import MealGrid from './MealGrid'
import {Link } from "react-router-dom"; // Updated imports for routing
import heroIcon from "../assets/arrow.png";
import top1 from "../assets/top1.png";
import "./Discover.css"; // Include styling from the second repo
import searchIcon from "../assets/search1.png";




const Discover = () => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    console.log("Search query: ", searchQuery);
    // You can integrate search filtering here
  };

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Top pick this week</h1>
          <h2>How to make egg fried rice</h2>
          <Link to="/signup">
            <button className="join-button">Join Us Today{" "}
              <img src={heroIcon} alt="arrow"/> 
            </button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={top1} alt="Egg Fried Rice" />
        </div>
      </section>

      {/* Search Bar Section */}
      <div className="search-bar">
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      

      <MealGrid />
    </div>
  )
}

export default Discover
