import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import { FaTrash, FaEdit } from 'react-icons/fa';


axios.defaults.withCredentials = true;

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
    const [editingFoodId, setEditingFoodId] = useState(null);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [likedFoods, setLikedFoods] = useState(new Set()); // Track liked foods by ID
    const [foodLikes, setFoodLikes] = useState({});

    const userId = 1;

    useEffect(() => {
        // Load likes from localStorage
        const storedLikedFoods = JSON.parse(localStorage.getItem('likedFoods') || '{}');
        const storedFoodLikes = JSON.parse(localStorage.getItem('foodLikes')) || {};
        setLikedFoods(storedLikedFoods);
        setFoodLikes(storedFoodLikes);
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            const response = await axios.get('//localhost:5000/foods');
            setFoods(response.data);
            

            // Initialize likes state
            const foodLikesData = {};
            response.data.forEach(food => {
                foodLikesData[food.id] = food.likes || 0; // Default to 0 if no likes
            });
            setFoodLikes(foodLikesData);

            // Initialize liked foods set for the user
            const userLikedFoods = new Set();
            response.data.forEach(food => {
                if (food.likes && food.likes.includes(userId)) {
                    userLikedFoods.add(food.id);
                }
            });
            setLikedFoods(userLikedFoods);
        } catch (error) {
            console.error('Error fetching foods:', error.response ? error.response.data : error);
        }
    };
   

    const likeFood = async (id, ) => {
        try {
            const response = await axios.patch(
                `//localhost:5000/foods/${id}/like`, 
                {userId}, 
                { headers: { 'Content-Type': 'application/json' } }
            );

            setFoodLikes((prevLikes) => ({
                ...prevLikes,
                [id]: response.data.likes,
            }));

            setLikedFoods((prevLikes) => {
                const newLikes = new Set(prevLikes);
                newLikes.add(id);
                return newLikes;
            });

            console.log("Food liked successfully:", response.data.message);
        } catch (error) {
            console.error('Error liking food:', error.response ? error.response.data : error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFood({ ...newFood, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const addOrUpdateFood = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(newFood).forEach((key) => formData.append(key, newFood[key]));
            if (image) formData.append('image', image);

            if (editingFoodId) {
                await axios.put(`//localhost:5000/foods/${editingFoodId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setEditingFoodId(null);
            } else {
                const response = await axios.post('//localhost:5000/foods', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setFoods([...foods, response.data]);
            }

            fetchFoods();
            resetForm();
        } catch (error) {
            console.error('Error saving food:', error.response ? error.response.data : error);
        }
    };

    const resetForm = () => {
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
    };

    const deleteFood = async (id) => {
        try {
            await axios.delete(`//localhost:5000/foods/${id}`);
            setFoods(foods.filter(food => food.id !== id));
        } catch (error) {
            console.error('Error deleting food:', error.response ? error.response.data : error);
        }
    };

    const editFood = (food) => {
        setNewFood(food);
        setEditingFoodId(food.id);
        setIsFormVisible(true);
    };

    const addComment = async (id) => {
        try {
            const response = await axios.post(`//localhost:5000/foods/${id}/comments`, { text: newComment });
            setComments({
                ...comments,
                [id]: [...(comments[id] || []), response.data.comment],
            });
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error.response ? error.response.data : error);
        }
    };

    const handleRatingChange = async (id, newRating) => {
        try {
            const response = await axios.patch(`//localhost:5000/foods/${id}/rate`, { rating: newRating });
            setFoods(foods.map(food => food.id === id ? { ...food, rating: response.data.rating } : food));
        } catch (error) {
            console.error('Error updating rating:', error.response ? error.response.data : error);
        }
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
        setEditingFoodId(null);
    };
//grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6
const renderFoods = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
                <div
                    key={food.id}
                    className="food-item bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex flex-col justify-between"
                >
                    <img
                        src={`//localhost:5000/uploads/${food.image_url}`}
                        alt={food.food_name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <div className="mb-4">
                        <h3 className="text-3xl font-bold mb-2">{food.food_name}</h3>
                        <p className="text-gray-500">
                            <span className="font-medium">{food.food_type}</span>
                        </p>
                        <p className="text-gray-500">
                            <span className="font-medium">{food.food_country}</span>
                        </p>
                        <p className="text-gray-500">
                            Rating: <span className="font-medium">{food.rating}</span>
                        </p>
                    </div>

                    <div className="comments mb-4">
                        <h4 className="text-lg text-gray-700 font-semibold">Comments:</h4>
                        {(comments[food.id] || []).map((comment, index) => (
                            <p key={index} className="text-gray-600 mt-2">{comment.content}</p>
                        ))}
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-50 text-black"
                        />
                        <button
                            onClick={() => addComment(food.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-700"
                        >
                            Comment
                        </button>
                    </div>

                    <div className="flex justify-between items-center mt-4 border-t pt-4">
                        <div className="like-section flex items-center">
                            <button
                                onClick={() => likeFood(food.id, userId)}
                                className={`text-2xl ${
                                    likedFoods.has(food.id) ? 'text-red-500' : 'text-gray-400'
                                } hover:text-red-600 transition-colors`}
                            >
                                {likedFoods.has(food.id) ? '❤️' : '🤍'}
                            </button>
                            <p className="text-gray-500 ml-2">{foodLikes[food.id] || 0} Likes</p>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => editFood(food)}
                                className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 flex items-center"
                            >
                                <FaEdit className="mr-1" />
                                Edit
                            </button>
                            <button
                                onClick={() => deleteFood(food.id)}
                                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 flex items-center"
                            >
                                <FaTrash className="mr-1" />
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="rating mt-4">
                        <StarRating food={food} handleRatingChange={handleRatingChange} />
                    </div>
                </div>
            ))}
        </div>
    );
};

    return (
        <div className="container mx-auto p-6 text-white">
            <h1 className="text-4xl font-bold text-center mb-8">Food Posts</h1>
            {isFormVisible && (
                <form onSubmit={addOrUpdateFood} className="form bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-3xl font-semibold mb-6">{editingFoodId ? 'Edit' : 'Add'} Food</h2>
                    <input
                        type="text"
                        name="food_name"
                        value={newFood.food_name}
                        onChange={handleInputChange}
                        placeholder="Food Name"
                        className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-800 text-white"
                    />
                    <input
                        type="text"
                        name="food_type"
                        value={newFood.food_type}
                        onChange={handleInputChange}
                        placeholder="Food Type"
                        className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-800 text-white"
                    />
                    <input
                        type="text"
                        name="food_country"
                        value={newFood.food_country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-800 text-white"
                    />
                    <textarea
                        name="ingredients"
                        value={newFood.ingredients}
                        onChange={handleInputChange}
                        placeholder="Ingredients"
                        className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-800 text-white"
                    />
                    <textarea
                        name="preparation_steps"
                        value={newFood.preparation_steps}
                        onChange={handleInputChange}
                        placeholder="Preparation Steps"
                        className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-800 text-white"
                    />
                    <input
                        type="number"
                        name="cooking_time"
                        value={newFood.cooking_time}
                        onChange={handleInputChange}
                        placeholder="Cooking Time (minutes)"
                        className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-800 text-white"
                    />
                    <input
                        type="text"
                        name="cooking_method"
                        value={newFood.cooking_method}
                        onChange={handleInputChange}
                        placeholder="Cooking Method"
                        className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-800 text-white"
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-800 text-white"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-700"
                    >
                        {editingFoodId ? 'Update Food' : 'Add Food'}
                    </button>
                </form>
            )}

            <div className="food-list">
                {renderFoods()}
            </div>
            <button 
                onClick={toggleFormVisibility} 
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-8 hover:bg-green-600"
            >
                {isFormVisible ? 'Cancel' : 'Add New Food'}
            </button>
        </div>
    );
};

export default Posts;
