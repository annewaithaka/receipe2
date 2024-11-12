import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;  // Ensure credentials are included in requests

const Posts = () => {
    const [foods, setFoods] = useState([]);
    const [newFood, setNewFood] = useState({
        food_name: '',
        food_type: '',
        food_country: '',
        ingredients: '',
        preparation_steps: '',
        cooking_time: '',
        cooking_method: '',
        rating: 0,
    });
    const [image, setImage] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        fetchFoods();
    }, []);

    // Fetch all food items from the server
    const fetchFoods = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/foods');
            setFoods(response.data);
        } catch (error) {
            console.error('Error fetching foods:', error.response ? error.response.data : error);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFood({ ...newFood, [name]: value });
    };

    // Handle image selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Add a new food item
    const addFood = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(newFood).forEach((key) => formData.append(key, newFood[key]));
            formData.append('image', image);

            const response = await axios.post('//localhost:5000/foods', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Update foods state with the newly added food item
            setFoods([...foods, response.data]);
            
            // Reset form
            setNewFood({
                food_name: '',
                food_type: '',
                food_country: '',
                ingredients: '',
                preparation_steps: '',
                cooking_time: '',
                cooking_method: '',
                rating: 0,
            });
            setImage(null);
            setIsFormVisible(false);
        } catch (error) {
            console.error('Error adding food:', error.response ? error.response.data : error);
        }
    };

    // Show or hide the form
    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    // Render foods list
    const renderFoods = () => {
        return foods.map((food) => (
            <div key={food.id} className="food-item bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow mb-6">
                <img src={`//localhost:5000/uploads/${food.image_url}`} alt={food.food_name} className="w-full h-64 object-cover rounded-md mb-4" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{food.food_name}</h3>
                <p className="text-gray-600">Type: <span className="font-semibold">{food.food_type}</span></p>
                <p className="text-gray-600">Country: <span className="font-semibold">{food.food_country}</span></p>
                <p className="text-gray-600">Ingredients: <span className="font-semibold">{food.ingredients}</span></p>
                <p className="text-gray-600">Steps: <span className="font-semibold">{food.preparation_steps}</span></p>
                <p className="text-gray-600">Cooking Time: <span className="font-semibold">{food.cooking_time}</span></p>
                <p className="text-gray-600">Cooking Method: <span className="font-semibold">{food.cooking_method}</span></p>
                <p className="text-gray-600">Rating: <span className="font-semibold">{food.rating}</span></p>
            </div>
        ));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Foods</h1>
            <div className="text-center mb-6">
                <button 
                    onClick={toggleFormVisibility} 
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    {isFormVisible ? "Hide Form" : "Add New Food"}
                </button>
            </div>

            {isFormVisible && (
                <form onSubmit={addFood} encType="multipart/form-data" className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Food</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Food Name:</label>
                        <input
                            type="text"
                            name="food_name"
                            value={newFood.food_name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Food Type:</label>
                        <input
                            type="text"
                            name="food_type"
                            value={newFood.food_type}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Food Country:</label>
                        <input
                            type="text"
                            name="food_country"
                            value={newFood.food_country}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Ingredients:</label>
                        <textarea
                            name="ingredients"
                            value={newFood.ingredients}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Preparation Steps:</label>
                        <textarea
                            name="preparation_steps"
                            value={newFood.preparation_steps}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Cooking Time:</label>
                        <input
                            type="text"
                            name="cooking_time"
                            value={newFood.cooking_time}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Cooking Method:</label>
                        <input
                            type="text"
                            name="cooking_method"
                            value={newFood.cooking_method}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            value={newFood.rating}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full">Add Food</button>
                </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {renderFoods()}
            </div>
        </div>
    );
};

export default Posts;
