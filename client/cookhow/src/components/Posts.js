// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// axios.defaults.withCredentials = true;

// const Posts = () => {
//     const [foods, setFoods] = useState([]);
//     const [newFood, setNewFood] = useState({
//         food_name: '',
//         food_type: '',
//         food_country: '',
//         ingredients: '',
//         preparation_steps: '',
//         cooking_time: '',
//         cooking_method: '',
//         rating: 0,
//     });
//     const [image, setImage] = useState(null);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingFoodId, setEditingFoodId] = useState(null);
//     const [comments, setComments] = useState({});
//     const [newComment, setNewComment] = useState('');
    

//     useEffect(() => {
//         fetchFoods();
//     }, []);

//     const fetchFoods = async () => {
//         try {
//             const response = await axios.get('//localhost:5000/foods');
//             setFoods(response.data);
//         } catch (error) {
//             console.error('Error fetching foods:', error.response ? error.response.data : error);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewFood({ ...newFood, [name]: value });
//     };

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const addOrUpdateFood = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = new FormData();
//             Object.keys(newFood).forEach((key) => formData.append(key, newFood[key]));
//             formData.append('image', image);

//             if (editingFoodId) {
//                 await axios.put(`//localhost:5000/foods/${editingFoodId}`, formData);
//                 setEditingFoodId(null);
//             } else {
//                 const response = await axios.post('//localhost:5000/foods', formData);
//                 setFoods([...foods, response.data]);
//             }
            
//             fetchFoods();
//             resetForm();
//         } catch (error) {
//             console.error('Error saving food:', error.response ? error.response.data : error);
//         }
//     };

//     const resetForm = () => {
//         setNewFood({
//             food_name: '',
//             food_type: '',
//             food_country: '',
//             ingredients: '',
//             preparation_steps: '',
//             cooking_time: '',
//             cooking_method: '',
//             rating: 0,
//         });
//         setImage(null);
//         setIsFormVisible(false);
//     };

//     const deleteFood = async (id) => {
//         try {
//             await axios.delete(`//localhost:5000/foods/${id}`);
//             setFoods(foods.filter(food => food.id !== id));
//         } catch (error) {
//             console.error('Error deleting food:', error.response ? error.response.data : error);
//         }
//     };

//     const editFood = (food) => {
//         setNewFood(food);
//         setEditingFoodId(food.id);
//         setIsFormVisible(true);
//     };

//     const likeFood = async (id, userId) => {
//         try {
//             const response = await axios.patch(
//                 `//localhost:5000/foods/${id}/like`, // Correct URL format
//                 { user_id: userId }, // Pass user_id in the request body
//                 {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
    
//             // Update state with new likes count
//             setFoods(foods.map(food => food.id === id ? { ...food, likes: response.data.likes } : food));
//         } catch (error) {
//             console.error('Error liking food:', error.response ? error.response.data : error);
//         }
//     };
    
    
    

//     const addComment = async (id) => {
//         try {
//             const response = await axios.post(`//localhost:5000/foods/${id}/comments`, { comment: newComment });
//             setComments({
//                 ...comments,
//                 [id]: [...(comments[id] || []), response.data.comment],
//             });
//             setNewComment('');
//         } catch (error) {
//             console.error('Error adding comment:', error.response ? error.response.data : error);
//         }
//     };

//     const handleRatingChange = async (id, newRating) => {
//         try {
//             const response = await axios.patch(`//localhost:5000/foods/${id}/rate`, { rating: newRating });
//             setFoods(foods.map(food => food.id === id ? { ...food, rating: response.data.rating } : food));
//         } catch (error) {
//             console.error('Error updating rating:', error.response ? error.response.data : error);
//         }
//     };

//     const toggleFormVisibility = () => {
//         setIsFormVisible(!isFormVisible);
//         setEditingFoodId(null);
//     };

//     const renderFoods = () => {
//         return foods.map((food) => (
//             <div key={food.id} className="food-item bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow mb-6">
//                 <img src={`//localhost:5000/uploads/${food.image_url}`} alt={food.food_name} className="w-full h-64 object-cover rounded-md mb-4" />
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-2">{food.food_name}</h3>
//                 <p className="text-gray-600">Type: <span className="font-semibold">{food.food_type}</span></p>
//                 <p className="text-gray-600">Country: <span className="font-semibold">{food.food_country}</span></p>
//                 <p className="text-gray-600">Ingredients: <span className="font-semibold">{food.ingredients}</span></p>
//                 <p className="text-gray-600">Steps: <span className="font-semibold">{food.preparation_steps}</span></p>
//                 <p className="text-gray-600">Cooking Time: <span className="font-semibold">{food.cooking_time}</span></p>
//                 <p className="text-gray-600">Cooking Method: <span className="font-semibold">{food.cooking_method}</span></p>
//                 <p className="text-gray-600">Rating: <span className="font-semibold">{food.rating}</span></p>
//                 <p className="text-gray-600">Likes: <span className="font-semibold">{food.likes || 0}</span></p>
//                 <button onClick={() => deleteFood(food.id)} className="bg-red-500 text-white px-4 py-2 rounded-md mt-2">Delete</button>
//                 <button onClick={() => editFood(food)} className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-2 ml-2">Edit</button>
//                 <button onClick={() => likeFood(food.id)} className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Like</button>
//                 <div className="mt-4">
//                     <h4 className="text-gray-700 font-semibold">Comments:</h4>
//                     {(comments[food.id] || []).map((comment, index) => (
//                         <p key={index} className="text-gray-600 mt-1">{comment}</p>
//                     ))}
//                     <input
//                         type="text"
//                         placeholder="Add a comment..."
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         className="w-full p-2 mt-2 border rounded-md"
//                     />
//                     <button
//                         onClick={() => addComment(food.id)}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
//                         Submit Comment
//                     </button>
//                 </div>
//                 <div className="mt-4">
//                     <label className="text-gray-600">Update Rating:</label>
//                     <input
//                         type="number"
//                         min="0"
//                         max="5"
//                         value={food.rating}
//                         onChange={(e) => handleRatingChange(food.id, e.target.value)}
//                         className="w-full p-2 border rounded-md mt-1"
//                     />
//                 </div>
//             </div>
//         ));
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Foods</h1>
//             <div className="text-center mb-6">
//                 <button 
//                     onClick={toggleFormVisibility} 
//                     className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
//                     {isFormVisible ? 'Cancel' : 'Add New Food'}
//                 </button>
//             </div>
//             {isFormVisible && (
//                 <form onSubmit={addOrUpdateFood} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
//                     <input
//                         type="text"
//                         name="food_name"
//                         value={newFood.food_name}
//                         onChange={handleInputChange}
//                         placeholder="Food Name"
//                         required
//                         className="w-full p-2 border rounded-md mb-4"
//                     />
//                     <input
//                         type="text"
//                         name="food_type"
//                         value={newFood.food_type}
//                         onChange={handleInputChange}
//                         placeholder="Food Type"
//                         required
//                         className="w-full p-2 border rounded-md mb-4"
//                     />
//                     <input
//                         type="text"
//                         name="food_country"
//                         value={newFood.food_country}
//                         onChange={handleInputChange}
//                         placeholder="Country of Origin"
//                         required
//                         className="w-full p-2 border rounded-md mb-4"
//                     />
//                     <textarea
//                         name="ingredients"
//                         value={newFood.ingredients}
//                         onChange={handleInputChange}
//                         placeholder="Ingredients"
//                         required
//                         className="w-full p-2 border rounded-md mb-4"
//                     />
//                     <textarea
//                         name="preparation_steps"
//                         value={newFood.preparation_steps}
//                         onChange={handleInputChange}
//                         placeholder="Preparation Steps"
//                         required
//                         className="w-full p-2 border rounded-md mb-4"
//                     />
//                     <input
//                         type="text"
//                         name="cooking_time"
//                         value={newFood.cooking_time}
//                         onChange={handleInputChange}
//                         placeholder="Cooking Time"
//                         required
//                         className="w-full p-2 border rounded-md mb-4"
//                     />
//                     <input
//                         type="text"
//                         name="cooking_method"
//                         value={newFood.cooking_method}
//                         onChange={handleInputChange}
//                         placeholder="Cooking Method"
//                         required
//                         className="w-full p-2 border rounded-md mb-4"
//                     />
//                     <input
//                         type="number"
//                         name="rating"
//                         value={newFood.rating}
//                         onChange={handleInputChange}
//                         placeholder="Rating"
//                         required
//                         className="w-full p-2 border rounded-md mb-4"
//                     />
//                     <input
//                         type="file"
//                         onChange={handleImageChange}
//                         className="w-full p-2 mb-4"
//                     />
//                     <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full">
//                         {editingFoodId ? 'Update Food' : 'Add Food'}
//                     </button>
//                 </form>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {renderFoods()}
//             </div>
//         </div>
//     );
// };

// export default Posts;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import { FaTrash,FaEdit } from 'react-icons/fa';
import { Link } from'react-router-dom';




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
    const userId = 1;
    

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            const response = await axios.get('//localhost:5000/foods');
            setFoods(response.data);
        } catch (error) {
            console.error('Error fetching foods:', error.response ? error.response.data : error);
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
            formData.append('image', image);

            if (editingFoodId) {
                await axios.put(`//localhost:5000/foods/${editingFoodId}`, formData);
                setEditingFoodId(null);
            } else {
                const response = await axios.post('//localhost:5000/foods', formData);
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

    // const likeFood = async (id, userId) => {
    //     try {
    //         const response = await axios.patch(
    //             `//localhost:5000/foods/${id}/like`, // Correct URL format
    //             { user_id: userId }, // Pass user_id in the request body
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             }
    //         );
    
    //         // Update state with new likes count
    //         setFoods(foods.map(food => food.id === id ? { ...food, likes: response.data.likes } : food));
    //     } catch (error) {
    //         console.error('Error liking food:', error.response ? error.response.data : error);
    //     }
    // };
    const likeFood = async (id, userId) => {
        try {
          const response = await axios.patch(
            `//localhost:5000/foods/${id}/like`, 
            { user_id: userId }, 
            { headers: { 'Content-Type': 'application/json' } }
          );
          
          if (response.data.likes) {
            setLikedFoods((prevLikes) => {
              const newLikes = new Set(prevLikes);
              newLikes.add(id); // Add to liked set
              return newLikes;
            });
          }
        } catch (error) {
          console.error("Error liking the food item:", error);
        }
      };
    
    
    

    const addComment = async (id) => {
        try {
            const response = await axios.post(`//localhost:5000/foods/${id}/comments`, { comment: newComment });
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

    const renderFoods = () => {
        return foods.map((food) => (
          <div key={food.id} className="food-item bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow mb-6">
            <img src={`//localhost:5000/uploads/${food.image_url}`} alt={food.food_name} className="w-full h-64 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{food.food_name}</h3>
            <p className="text-gray-600">Type: <span className="font-semibold">{food.food_type}</span></p>
            <p className="text-gray-600">Country: <span className="font-semibold">{food.food_country}</span></p>
            
            <p className="text-gray-600">Rating: <span className="font-semibold">{food.rating}</span></p>
            <p className="text-gray-600">Likes: <span className="font-semibold">{food.likes || 0}</span></p>
      
            {/* Like Button */}
            <button
              onClick={() => likeFood(food.id, userId)} 
              className={`text-2xl ${likedFoods.has(food.id) ? 'text-red-500' : 'text-gray-500'}`}
            >
              {likedFoods.has(food.id) ? '❤️' : '🤍'} {/* Heart icon changes */}
            </button>
            
            <button onClick={() => deleteFood(food.id)} className="text-gray-500 hover:text-red-500">
                    <FaTrash className="mr-2" />
                </button>
            <button onClick={() => editFood(food)} className=" text-red px-4 py-2 w-4  rounded-md mt-2 ml-2">
                <FaEdit className="mr-2" /></button>
      
            {/* Comments Section */}
            <div className="mt-4">
              <h4 className="text-gray-700 font-semibold">Comments:</h4>
              {(comments[food.id] || []).map((comment, index) => (
                <p key={index} className="text-gray-600 mt-1">{comment}</p>
              ))}
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-md"
                    />
                    <Link
                    to={`/foods/${food.id}`}
                    className="text-blue-500 hover:text-blue-700 mt-4 block"
                >
                    View More
                </Link>
                    <button
                        onClick={() => addComment(food.id)}
                        className="bg-blue-500 text-white px-4  py-2 rounded-md mt-2">
                         Comment
                    </button>
                </div>
                <div className="mt-4">
                    <label className="text-gray-600"> </label>
                    <StarRating food={food} handleRatingChange={handleRatingChange} />

                </div>
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
                    {isFormVisible ? 'Cancel' : 'Add New Food'}
                </button>
            </div>
            {isFormVisible && (
                <form onSubmit={addOrUpdateFood} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
                    <input
                        type="text"
                        name="food_name"
                        value={newFood.food_name}
                        onChange={handleInputChange}
                        placeholder="Food Name"
                        required
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <input
                        type="text"
                        name="food_type"
                        value={newFood.food_type}
                        onChange={handleInputChange}
                        placeholder="Food Type"
                        required
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <input
                        type="text"
                        name="food_country"
                        value={newFood.food_country}
                        onChange={handleInputChange}
                        placeholder="Country of Origin"
                        required
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <textarea
                        name="ingredients"
                        value={newFood.ingredients}
                        onChange={handleInputChange}
                        placeholder="Ingredients"
                        required
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <textarea
                        name="preparation_steps"
                        value={newFood.preparation_steps}
                        onChange={handleInputChange}
                        placeholder="Preparation Steps"
                        required
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <input
                        type="text"
                        name="cooking_time"
                        value={newFood.cooking_time}
                        onChange={handleInputChange}
                        placeholder="Cooking Time"
                        required
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <input
                        type="text"
                        name="cooking_method"
                        value={newFood.cooking_method}
                        onChange={handleInputChange}
                        placeholder="Cooking Method"
                        required
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <input
                        type="number"
                        name="rating"
                        value={newFood.rating}
                        onChange={handleInputChange}
                        placeholder="Rating"
                        required
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-2 mb-4"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full">
                        {editingFoodId ? 'Update Food' : 'Add Food'}
                    </button>
                </form>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {renderFoods()}
            </div>
        </div>
    );
};

export default Posts;
