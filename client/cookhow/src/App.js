import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'; // Ensure correct path
import Home from './components/Home'; // Ensure correct path
import Login from './components/Login'; // Ensure correct path
import Register from './components/Register'; // Ensure correct path
import MealGrid from './components/MealGrid';
import ExternalLinkPage from './components/ExternalLinkPage'; // Ensure correct path
import About from './components/About';
import Contact from './components/Contact';
import DetailedFood from './components/DetailedFood';
import Discover from './components/Discover';

// import Display from './components/Display';
import axios from "axios";
import RecipeGrid from './components/RecipeGrid';
import Rep from './components/Rep';
import ProfileSection from './components/ProfileSection';



function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/@me", {
          withCredentials: true, // Include cookies for authentication
        });
        setUser(response.data); // Assuming response.data contains user info
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null); // Ensure user is set to null if not logged in
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/MealGrid" element={<MealGrid />} />
        <Route path="/meal/:mealId" element={<ExternalLinkPage />} />
        <Route path="/about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/foods/:id" element={<DetailedFood />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/ProfileSection " element={<ProfileSection />} />
        <Route path="/RecipeGrid" element={<RecipeGrid />} />
        <Route path="/recipe/:id" element={<Rep />} />


       

        {/* <Route path="/" element={<Display user={user} setUser={setUser} />} /> */}

      </Routes>
    </Router>
  );
}

export default App;