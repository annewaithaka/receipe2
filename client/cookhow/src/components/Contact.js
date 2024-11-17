import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData);
    // Here you can send the data to your backend or a service like email
  };

  return (
    <div className="contact-page">
      {/* Contact Form Section */}
      <section className="contact-form">
        <h2>Contact Us</h2>
        <p>If you have any questions or would like to get in touch, feel free to reach out. We’d love to hear from you!</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Contact Details Section */}
      <section className="contact-details">
        <h3>Our Contact Details</h3>
        <p>If you prefer to get in touch with us directly, here’s how you can reach us:</p>

        <ul>
          <li><strong>Email:</strong> <a href="mailto:RecipeRoom@gmail.com">RecipeRoom@gmail.com</a></li>
          <li><strong>Phone:</strong> <a href="tel:+254700076984">+254 700 076 984</a></li>
          <li><strong>Office:</strong> 123 Recipe Street, Kitchen City, Country</li>
        </ul>
      </section>

      {/* Footer Section */}
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
            <a href="#">Contacts Us</a>
          </div>

          <div className="footer-column">
            <h4>Social</h4>
            <a href="#">Recipe Room</a>
            <a href="#">Recipe Room</a>
            <a href="mailto:RecipeRoom@gmail.com">RecipeRoom@gmail.com</a>
            <a href="tel:+254700076984">+254700076984</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
