import React from 'react'
import "./About.css";


const About = () => {
  return (
    <div>
      <section className="content-section">
      <h2>Our Story</h2>
      <p>At Recipe-Room, we believe that great meals don’t need to be complicated or expensive. Founded with a passion for simple, accessible cooking, our mission is to make it easier for everyone whether you're a seasoned home cook or just starting out to find and share budget-friendly recipes that can be made with everyday ingredients.</p>
      
      <h2>Our Mission</h2>
      <p>Our mission is simple: To make cooking easy, affordable, and accessible to everyone. We want to provide a platform where you can:</p>
      <ul>
        <li>Discover recipes that are practical, budget-friendly, and perfect for everyday cooking.</li>
        <li>Share your culinary creations with the world and become part of a community that celebrates simple, delicious meals.</li>
        <li>Connect with others who share your love of cooking and explore new recipes from different cultures and backgrounds.</li>
      </ul>

      <h2>What We Offer</h2>
      <ul>
        <li>Simple Recipes: Find recipes for all occasions, from quick weekday meals to budget-friendly feasts. Filter by ingredients, ratings, country, or the number of people served.</li>
        <li>Community Connection: Share your favorite recipes, comment on others’ creations, bookmark your top picks, and connect with fellow food lovers.</li>
        <li>Personalized Experience: Create and manage your own recipe collections, rate meals, and follow other creators for inspiration.</li>
        <li>Social Sharing: Share your favorite recipes across platforms like Facebook, Twitter, and WhatsApp to inspire your friends and family.</li>
      </ul>

      <h2>Our Vision</h2>
      <p>Our vision is to create a global community where everyone feels empowered to cook and share recipes, no matter their background, budget, or skill level. In the future, we plan to expand Recipe-Room into a mobile app, making it even easier to access recipes on the go, connect with other users, and get notified when your favorite creators post new content.</p>
      
      <h2>Join Us!</h2>
      <p>At Recipe-Room, cooking is more than just a task—it’s a way to connect, share, and explore. Whether you’re here to find new recipes, share your own, or just be part of a growing community of passionate cooks, we’re excited to have you on board. Let’s make cooking simple, affordable, and fun—together!</p>
    </section>
    <footer className="footer">
        <div className="footer-section">
          <h3>Join us to get latest updates on upcoming events.</h3>
          <div className="subscribe">
            <input type="email" placeholder="Email address" />
            <button>Subscribe</button>
          </div>
          <p>By signing up you agree to our privacy policies.</p>
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
  )
}

export default About
