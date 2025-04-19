import PropTypes from "prop-types";
import { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { MovieContext } from "../context/MovieProvider";
import { FaSpinner } from "react-icons/fa";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 10,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 7,
    },
    tablet: {
        breakpoint: { max: 1200, min: 600 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 2,
    },
};

const MovieList = ({ title, data, setBanner, onMovieClick }) => {
    console.log({ data });
    const { handleVideoTrailer } = useContext(MovieContext);

    const handleMovieClick = (item) => {
        // Show loading effect
        onMovieClick();
        setBanner(item);

        // Show loading indicator
        const loadingIndicator = document.getElementById("loading-indicator");
        loadingIndicator.style.display = "flex"; // Set loading spinner visible

        // Scroll to the top
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Simulate a delay for the loading effect (2 seconds)
        setTimeout(() => {
            loadingIndicator.style.display = "none"; // Hide spinner after delay
        }, 2000);
    };

    return (
        <div className="my-10 px-10 max-w-full">
            <h2 className="text-xl uppercase mb-4 text-white">{title}</h2>

            {/* Loading Indicator */}
            <div
                id="loading-indicator"
                className="flex justify-center items-center absolute inset-0 bg-black bg-opacity-50 z-50"
                style={{ display: "none" }}
            >
                <FaSpinner className="animate-spin text-white text-4xl" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data?.map((item) => {
                    // Construct the poster URL dynamically or fallback to default
                    const posterUrl = item.poster_image
                        ? `${item.poster_image}`
                        : "/default-poster.png"; // Default image if no poster_path

                    return (
                        <div
                            key={item.id}
                            className="relative cursor-pointer hover:scale-110 transition-transform duration-500 ease-in-out"
                            onClick={() => {
                                // handleVideoTrailer(item.id);
                                handleMovieClick(item); // Set the current banner to the clicked item
                            }} // On click, trigger trailer
                        >
                            <div
                                className="w-full h-[300px] bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${posterUrl})`, // Set dynamic poster image
                                }}
                            >
                                <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-4 z-10">
                                <h3 className="text-md text-white uppercase">
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

MovieList.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    setBanner: PropTypes.func.isRequired,
    onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;
