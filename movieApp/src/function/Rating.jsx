import iconRating from "../assets/rating.png";
import iconRatingHalf from "../assets/rating-half.png";

const ratingCount = 5; // Số lượng sao (hoặc hình ảnh)
const Rating = () => {
    return (
        <div className="flex items-center space-x-2">
            {Array(ratingCount)
                .fill()
                .map((_, index) => (
                    <img
                        key={index}
                        src={iconRating}
                        alt="rating"
                        className="w-[20px] h-[20px]"
                    />
                ))}
        </div>
    );
};

export default Rating;
