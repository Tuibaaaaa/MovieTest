import React, { useState } from "react";
import axios from "axios";

const StarRating = ({ movieId, initialRating }) => {
    const [rating, setRating] = useState(initialRating || 0);

    const handleRatingChange = async (newRating) => {
        console.log(movieId); // Kiểm tra giá trị của movieId
        setRating(newRating);
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/movies/${movieId}/rate_movie/`,
                { rating: newRating }
            );
            if (response.status === 200) {
                alert("Rating submitted successfully");
            }
        } catch (error) {
            console.error("Error submitting rating", error);
        }
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    className={`star ${star <= rating ? "filled" : ""}`}
                    onClick={() => handleRatingChange(star)}
                >
                    ★
                </button>
            ))}
        </div>
    );
};

export default StarRating;
