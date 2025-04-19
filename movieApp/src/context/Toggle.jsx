import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function HeartToggle() {
    // Create a state to toggle the heart icon
    const [isLiked, setIsLiked] = useState(false);
    const [count, setCount] = useState(0); // State to track the count of likes

    // Handle the click event to toggle the state
    const handleClick = () => {
        setIsLiked(!isLiked);
        setCount(count + 1); // Toggle the isLiked state
    };

    return (
        <div>
            {/* Display the heart icon based on isLiked state */}
            <span onClick={handleClick}>
                {isLiked ? <FaHeart /> : <FaRegHeart />}{" "}
                {/* Toggle between filled and outlined heart */}
            </span>
        </div>
    );
}

export default HeartToggle;
