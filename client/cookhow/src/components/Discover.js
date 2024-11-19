
import MealGrid from './MealGrid'
import {Link } from "react-router-dom"; // Updated imports for routing
import heroIcon from "../assets/arrow.png";
import top1 from "../assets/top1.png";
import "./Discover.css"; // Include styling from the second repo

import Posts from "./Posts";



const Discover = () => {
  
  

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

      <MealGrid />
      <Posts />
      
    </div>
  )
}

export default Discover
