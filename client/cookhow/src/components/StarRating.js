import { useState } from "react";

const StarRating = ({ food, handleRatingChange }) => {
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleStarClick = (rating) => {
        handleRatingChange(food.id, rating);
    };

    return (
        <div className="mt-4">
            <label className="text-gray-600">Rate:</label>
            <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className={`w-6 h-6 cursor-pointer ${
                            star <= (hoveredStar || food.rating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.381 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.539 1.118l-3.381-2.455a1 1 0 00-1.175 0l-3.381 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.24 9.397c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                ))}
            </div>
        </div>
    );
};

export default StarRating;