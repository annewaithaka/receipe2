import React from "react";
import "./ProfileSection.css";

const ProfileSection = () => {
  return (
    <section className="profile-section">
      <div className="profile-pic">
        <img
          src="https://placeholder.pics/svg/304x307"
          alt="Profile"
          className="profile-img"
        />
        <button className="upload-btn">Upload Image</button>
      </div>
      <div className="profile-info">
        <h2 className="profile-name">Larry Mecha</h2>
        <div className="bio">
          <label className="bio-label">Bio</label>
          <textarea placeholder="Write your bio..." className="bio-textarea"></textarea>
        </div>
        <div className="recipe-price">
          <label className="price-label">Total Recipe Price</label>
          <input type="text" placeholder="Enter price" className="price-input" />
        </div>
        <div className="action-buttons">
          <button className="upload-recipe">Upload Recipe</button>
          <button className="add-to-kitchen">Add to Kitchen</button>
        </div>
      </div>
    </section>
  );
};

const ActivitySection = () => {
  const activities = [
    "Your recipe got a like.",
    "Andrew commented.",
    "Your upload was successful.",
    "Preparing upload.",
    "New recipes for you.",
  ];

  return (
    <section className="activity-section">
      <h2>Your Activity</h2>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <span>{activity}</span>
            <span className="activity-time">Thur 24th Sep 00:00</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const RecipeCard = ({ title, ratings, views, image }) => {
  return (
    <div className="recipe-card">
      <img src={image} alt={title} className="recipe-image" />
      <div className="recipe-content">
        <h3 className="recipe-title">{title}</h3>
        <div className="ratings">
          <span>{ratings} ratings</span>
          <div className="stars">★★★★☆</div>
        </div>
        <p>{views} people viewed</p>
        <div className="card-actions">
          <div><img src="https://placeholder.pics/svg/24x24" alt="Comment" />Comment</div>
          <div><img src="https://placeholder.pics/svg/24x24" alt="Save" />Save</div>
          <div><img src="https://placeholder.pics/svg/24x24" alt="Share" />Share</div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="subscribe-section">
        <p>Join us for the latest updates on upcoming events.</p>
        <div className="subscribe-form">
          <input type="email" placeholder="Enter your email" className="subscribe-input" />
          <button className="subscribe-btn">Subscribe</button>
        </div>
        <p>By signing up, you agree to our privacy policies.</p>
      </div>
      <div className="footer-links">
        <div>
          <h4>Navigate</h4>
          <ul>
            <li>Home</li>
            <li>Recipes</li>
            <li>About us</li>
          </ul>
        </div>
        <div>
          <h4>Official</h4>
          <ul>
            <li>Privacy</li>
            <li>Terms</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>Email: RecipeRoom@gmail.com</li>
            <li>Phone: +254700976984</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

function ProfilePage() {
  const recipes = [
    { title: "Mojito Mocktail", ratings: "4.5", views: "200", image: "https://placeholder.pics/svg/368x404" },
    { title: "Chapaiz Fam", ratings: "4.5", views: "200", image: "https://placeholder.pics/svg/368x404" },
    { title: "Intestines Recipe", ratings: "4.5", views: "200", image: "https://placeholder.pics/svg/368x404" },
    { title: "Garlic Butter Thighs", ratings: "4.5", views: "200", image: "https://placeholder.pics/svg/368x404" },
    { title: "Fish & Chips", ratings: "4.5", views: "200", image: "https://placeholder.pics/svg/368x404" },
    { title: "Air Fried Pork Ribs", ratings: "4.5", views: "200", image: "https://placeholder.pics/svg/368x404" }
  ];

  return (
    <div className="profile-page">
      <ProfileSection />
      <ActivitySection />
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} {...recipe} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
