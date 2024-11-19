// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function RecipeGrid() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(
//           `https://api.spoonacular.com/recipes/complexSearch?apiKey=7127498922d944088bca2c1b90670ec4`
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setRecipes(data.results || []); // Ensure it defaults to an empty array
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching recipes:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-gray-600">Loading...</p>;
//   }

//   if (error) {
//     return (
//       <p className="text-center text-red-500">
//         Failed to load recipes: {error}
//       </p>
//     );
//   }

//   if (!recipes.length) {
//     return (
//       <p className="text-center text-gray-600">No recipes found.</p>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
//       {recipes.map((recipe) => (
//         <div
//           key={recipe.id}
//           className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
//         >
//           <img
//             src={recipe.image}
//             alt={recipe.title}
//             className="w-full h-48 object-cover"
//           />
//           <div className="p-4">
//             <h3 className="text-lg font-semibold text-gray-800">
//               {recipe.title}
//             </h3>
//             <Link
//               to={`/recipe/${recipe.id}`}
//               className="text-blue-500 hover:underline mt-2 inline-block"
//             >
//               View Recipe
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default RecipeGrid;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipeGrid() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=7127498922d944088bca2c1b90670ec4`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.results || []); // Ensure it defaults to an empty array
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Failed to load recipes: {error}
      </p>
    );
  }

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full p-2 border border-gray-300 text-black rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.length ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {recipe.title}
                </h3>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No recipes match your search.</p>
        )}
      </div>
    </div>
  );
}

export default RecipeGrid;
