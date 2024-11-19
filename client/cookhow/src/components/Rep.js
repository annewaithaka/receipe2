import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Rep() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=7127498922d944088bca2c1b90670ec4`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full max-w-md mx-auto" />
      <p className="mt-4">{recipe.summary}</p>
    </div>
  );
}

export default Rep;
