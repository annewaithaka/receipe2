import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'; // Ensure correct path
import Home from './components/Home'; // Ensure correct path
import Login from './components/Login'; // Ensure correct path
import Register from './components/Register'; // Ensure correct path

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
