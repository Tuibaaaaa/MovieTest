import PropTypes from "prop-types";
import { useContext } from "react";
import { MovieContext } from "../context/MovieProvider";

const MovieSearch = ({ data }) => {
    const { handleVideoTrailer } = useContext(MovieContext);

    return (
        <div className="my-10 px-10 max-w-full">
            <h2 className="text-xl uppercase mb-4">Kết quả tìm kiếm</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {data.map((item) => {
                    // Construct the poster URL dynamically or fallback to default
                    const posterUrl = item.poster_image
                        ? `http://127.0.0.1:8000${item.poster_image}`
                        : "/default-poster.png"; // Default image if no poster_path

                    return (
                        <div
                            key={item.id}
                            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
                            style={{
                                backgroundImage: `url(${posterUrl})`, // Set dynamic poster image
                            }}
                            onClick={() => handleVideoTrailer(item.id)} // On click, trigger trailer
                        >
                            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
                            <div className="relative p-4 flex flex-col items-center justify-end h-full">
                                <h3 className="text-md uppercase text-white">
                                    {item.name ||
                                        item.title ||
                                        item.original_title}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

MovieSearch.propTypes = {
    data: PropTypes.array.isRequired, // Ensures that data is passed as an array
};

export default MovieSearch;
