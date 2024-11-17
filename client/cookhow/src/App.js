import React, { useState } from 'react';
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


function App() {
  const [user, setUser] = useState(null);

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

      </Routes>
    </Router>
  );
}

export default App;