import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Meals({ user }) {
  const [searchTerm, setSearchTerm] = useState(''); // Empty search term initially
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track any error

  // Fetch meals when searchTerm or user changes
  useEffect(() => {
    if (!user) return; // If no user, don't fetch meals

    const fetchMeals = async () => {
      if (!searchTerm) return; // Don't fetch if searchTerm is empty

      setLoading(true);
      setError(null); // Reset any previous error

      try {
        console.log("Fetching meals with searchTerm:", searchTerm); // Debug log
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        console.log(response.data); // Debug log to check API response
        if (response.data.meals) {
          setMeals(response.data.meals);
        } else {
          setMeals([]);
        }
      } catch (err) {
        setError('Error fetching meals');
        console.error('Error fetching meals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [searchTerm, user]); // Re-fetch meals when searchTerm or user changes

  // Automatically trigger a search when the component mounts
  useEffect(() => {
    if (user) {
      setSearchTerm(''); // Default empty search term to fetch a general list
    }
  }, [user]); // This will only run once when the user is set

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (user) {
      setMeals([]); // Clear meals before searching
      setSearchTerm(e.target.elements.search.value); // Set search term from input field
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-8">Recipe Finder</h1>
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          name="search"
          type="text"
          placeholder="Search for a recipe"
          className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-blue-500">Loading...</p>} {/* Display loading state */}
      {error && <p className="text-center text-red-500">{error}</p>} {/* Display error message */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.idMeal} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-lg w-full h-48 object-cover" />
              <h2 className="text-xl font-semibold mt-4">{meal.strMeal}</h2>
              <p className="text-gray-700 mt-2">{meal.strCategory}</p>
              <a
                href={meal.strSource || `https://www.themealdb.com/meal/${meal.idMeal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-4 inline-block hover:underline"
              >
                View Recipe
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full col-span-4">
            {searchTerm ? "No results found." : "Start searching for recipes!"}
          </p>
        )}
      </div>
    </div>
  );
}

export default Meals;
