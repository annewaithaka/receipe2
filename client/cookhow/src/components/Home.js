import React, { useEffect, useState } from 'react';
import Meals from './Meals';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  // 'navigate' instead of 'history'

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get("http://localhost:5000/@me", {
          withCredentials: true, // Ensure credentials are sent with requests
        });
        setUser(resp.data);
      } catch (error) {
        console.log("Not authorized", error);
        navigate('/login');  // Correct method for redirect in v6
      }
    })();
  }, [navigate]);  // Use 'navigate' in the dependency array

  return (
    <div>
      {user ? (
        <div>
          <h1>You are logged in... {user.name}</h1>
          <Meals />
        </div>
      ) : (
        <div>
          <h2>You are not logged in...</h2>
          <a href="/login"><button>Login</button></a>
          <a href="/register"><button>Register</button></a>
        </div>
      )}
    </div>
  );
}

export default Home;
