import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailedFood = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);

    useEffect(() => {
        fetchFoodDetails();
    }, []);

    const fetchFoodDetails = async () => {
        try {
            const response = await axios.get(`//localhost:5000/foods/${id}`);
            setFood(response.data);
        } catch (error) {
            console.error('Error fetching food details:', error.response ? error.response.data : error);
        }
    };

    if (!food) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">{food.food_name}</h1>
            <img
                src={`//localhost:5000/uploads/${food.image_url}`}
                alt={food.food_name}
                className="w-full h-96 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600">Type: {food.food_type}</p>
            <p className="text-gray-600">Country: {food.food_country}</p>
            <p className="text-gray-600">Ingredients: {food.ingredients}</p>
            <p className="text-gray-600">Steps: {food.preparation_steps}</p>
            <p className="text-gray-600">Cooking Time: {food.cooking_time}</p>
            <p className="text-gray-600">Cooking Method: {food.cooking_method}</p>
        </div>
    );
};

export default DetailedFood;