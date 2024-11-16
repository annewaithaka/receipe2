// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function ExternalLinkPage() {
//   const { mealId } = useParams();
//   const [meal, setMeal] = useState(null);

//   useEffect(() => {
//     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setMeal(data.meals[0]);
//       })
//       .catch((error) => console.error('Error fetching meal details:', error));
//   }, [mealId]);

//   if (!meal) {
//     return <p className="text-center text-gray-600">Loading meal details...</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">{meal.strMeal}</h2>
//       <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-64 object-cover rounded-lg mb-4" />
//       <p className="text-gray-700 mb-4">{meal.strInstructions}</p>
//       <a
//         href={meal.strSource}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-500 hover:underline"
//       >
//         Go to Recipe Source
//       </a>
//     </div>

    
//   );
// }

// export default ExternalLinkPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ExternalLinkPage() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        setMeal(data.meals[0]);
      })
      .catch((error) => console.error('Error fetching meal details:', error));
  }, [mealId]);

  // Filter meal details based on search query
  const filteredMealDetails = meal
    ? Object.entries(meal).filter(([key, value]) =>
        value && key.toLowerCase().includes(searchQuery.toLowerCase()) // simple filtering by keys
      )
    : [];

  if (!meal) {
    return <p className="text-center text-gray-600">Loading meal details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Search Bar Section */}
      <div className="search-bar mb-6">
        <input
          type="text"
          className="search-input"
          placeholder="Search for ingredients or steps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
        />
        <button className="search-button">Search</button>
      </div>

      {/* Meal Details */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-64 object-cover rounded-lg mb-4" />
      
      {/* Display filtered meal details */}
      <div>
        {filteredMealDetails.length > 0 ? (
          filteredMealDetails.map(([key, value]) => (
            <p key={key} className="text-gray-700 mb-4">
              <strong>{key}: </strong>{value}
            </p>
          ))
        ) : (
          <p className="text-gray-700 mb-4">No matching details found.</p>
        )}
      </div>
      
      {/* Recipe Instructions */}
      <p className="text-gray-700 mb-4">{meal.strInstructions}</p>

      <a
        href={meal.strSource}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Go to Recipe Source
      </a>
    </div>
  );
}

export default ExternalLinkPage;

