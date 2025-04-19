import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "../context/MovieProvider"; // Importing MovieContext
import axios from "axios"; // Importing axios
import { FaRegHeart, FaHeart, FaPlay } from "react-icons/fa6";
import StarRating from "./StarRating"; // Importing StarRating component

const Banner = ({ data, setMovie, setBanner }) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const movie = data; // Assuming data is passed as a prop\

    // console.log("Short Description:", movie?.short_description);

    const handleRating = async (rating) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/movies/${movie?.id}/`,
                {
                    ...movie,
                    star: rating, // Send the rating to the server
                }
            );

            if (response.status === 200) {
                setMovie((prev) => {
                    return prev.map((item) => {
                        if (item.id === movie?.id) {
                            return response.data;
                        }
                        return item;
                    });
                });
                setBanner(response.data); // Update the banner with the new movie data
            }
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };
    // let videoId = null;

    // if (movie?.short_description && movie?.short_description.includes("/d/")) {
    //     const urlParts = movie.short_description.split("/d/");
    //     if (urlParts.length > 1) {
    //         videoId = urlParts[1].split("/")[0];
    //     }
    // }
    // console.log("Extracted Video ID:", videoId);

    // const finalVideoUrl = videoId
    //     ? `https://drive.google.com/uc?export=download&id=${videoId}`
    //     : movie?.video_url;

    // console.log("Final Video URL:", finalVideoUrl);

    // const startVideo = () => {
    //     console.log("Full Short Description:", movie?.short_description);

    //     // Regular expression to capture the video ID from the Google Drive URL, handling extra parameters.
    //     const regex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;

    //     // Extract the video ID using the regex
    //     const matches = movie?.short_description.match(regex);

    //     if (matches && matches[1]) {
    //         const videoId = matches[1]; // Extracted video ID
    //         console.log("Extracted Video ID:", videoId);

    //         // Construct the final video URL
    //         const finalVideoUrl = `https://drive.google.com/uc?export=download&id=${videoId}`;
    //         setVideoUrl(finalVideoUrl); // Set the video URL to be used
    //         setIsVideoPlaying(true); // Start playing the video
    //     } else {
    //         console.error(
    //             "Error: Invalid video URL format or short_description is missing."
    //         );
    //     }
    // };

    // if (!videoId) {
    //     console.error(
    //         "Error: Invalid video URL or short_description is missing."
    //     );
    //     return null; // Return early if videoId is invalid
    // }
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // const movieId = 3; // Set this dynamically or pass it as a prop

    // Fetch movie data when component mounts
    // useEffect(() => {
    //     const fetchMovieData = async (id) => {
    //         if (!id) {
    //             console.error("Invalid movie ID");
    //             return;
    //         }
    //         try {
    //             const response = await axios.get(
    //                 `http://127.0.0.1:8000/api/movies/${id}/` // Your API endpoint
    //             );
    //             console.log({ response });
    //             setMovie(response.data); // Save movie data
    //             setLoading(false); // Set loading to false once data is fetched
    //         } catch (error) {
    //             setError("Error fetching movie data: " + error.message);
    //             setLoading(false); // Set loading to false even on error
    //         }
    //     };

    //     fetchMovieData(movieId); // Pass the movie ID here
    // }, [movieId]); // Only fetch data when movieId changes
    const startVideo = (videoUrl) => {
        setVideoUrl(videoUrl);
        setIsVideoPlaying(true);

        //     // if (videoId) {
        //     //     const modifiedUrl = videoUrl.replace(
        //     //         "drive.google.com/file/d/",
        //     //         "drive.google.com/uc?export=download&id="
        //     //     );
        //     //     setVideoUrl(modifiedUrl); // Save the modified URL
        //     //     setIsVideoPlaying(true); // Set video playing state to true
        //     // } else {
        //     //     console.error("Invalid video URL or short_description is missing.");
        //     // }
    };

    const closeVideo = () => {
        setIsVideoPlaying(false); // Đóng video
    };

    const { handleVideoTrailer } = useContext(MovieContext);
    // If the movie is still loading, show a loading message
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // // If there was an error fetching data, display the error
    // if (error) {
    //     return <div>{error}</div>;
    // }

    const genreType =
        movie && movie.genre.includes("Movie") ? "Movies" : "TV Show";

    const handleLike = async () => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/movies/${movie?.id}/`,
                {
                    director: movie?.director,
                    genre: movie?.genre,
                    release_date: movie?.release_date,
                    title: movie?.title,
                    trailer_url: movie?.trailer_url,
                    video_url: movie?.video_url,
                    like: !movie?.like, // Toggle the like state
                }
            );

            if (response.status == 200) {
                setMovie((prev) => {
                    return prev.map((item) => {
                        if (item.id == movie?.id) {
                            return response.data;
                        }
                        return item;
                    });
                });
                setBanner(response.data); // Update the banner with the new movie data
            }
        } catch (error) {
            console.error("Error updating like status:", error);
        }
    };

    // If movie data is available, render it
    return (
        <div
            className="w-full h-[600px] bg-center bg-no-repeat bg-cover relative"
            style={{
                backgroundImage: `url(${movie?.cover_image})`, // Dynamically set the cover image as the background
            }}
        >
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40" />
            <div className="w-full h-full flex items-center justify-center space-x-[30px] p-4 relative z-20">
                <div className="flex flex-col space-y-5 items-baseline w-[50%]">
                    <p className="text-white bg-gradient-to-r from-red-600 to-red-300 text-x1 py-1 px-3">
                        {genreType}
                    </p>
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-white text-[40px] font-bold">
                            {movie?.title} {/* Movie title */}
                        </h2>
                        <div className="flex items-center space-x-3">
                            {/* Display rating if available */}
                            {/* <Rating /> */}
                        </div>

                        <p className="text-white text-[16px] w-[500px]">
                            {movie?.detailed_description ||
                                "No description available."}{" "}
                            {/* Detailed description */}
                        </p>
                        <StarRating
                            movieId={movie?.id}
                            initialRating={movie?.star}
                            handleRating={handleRating}
                        />

                        <p className="text-white text-[10px] w-[500px]">
                            Đạo diễn:{" "}
                            {movie?.director || "No director available."}{" "}
                            {/* Detailed description */}
                        </p>
                        <p className="text-white text-[10px] w-[500px]">
                            Diễn viên: {movie?.actors || "No actors available."}{" "}
                            {/* Detailed description */}
                        </p>
                        <p className="text-white text-[10px] w-[500px]">
                            Thể loại: {movie?.genre || "No genre available."}{" "}
                            {/* Detailed description */}
                        </p>
                        <p className="text-white text-[10px] w-[500px]">
                            Ngày phát hành:{" "}
                            {movie?.release_date ||
                                "No release date available."}{" "}
                            {/* Detailed description */}
                        </p>
                        <div className="flex space-x-4">
                            <button
                                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                                // onClick={() => handleVideoTrailer(movie?.id)}
                                onClick={() => startVideo(movie?.video_url)}
                            >
                                <i className="fa-solid fa-play" /> Play
                            </button>
                            <button className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
                                <i className="fa-solid fa-plus" /> My List
                            </button>
                            <button
                                className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                                onClick={handleLike}
                            >
                                {movie?.like ? (
                                    <FaHeart className="text-red-600" />
                                ) : (
                                    <FaRegHeart className="text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-[50%]">
                    <div className="w-[300px] h-[400px] relative group cursor-pointer">
                        <button
                            className="w-full top-0 left-0 h-full absolute flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                            onClick={() => handleVideoTrailer(movie?.id)}
                        >
                            <FaPlay className="fas fa-play fa-6x w-[30px] h-[40px]" />
                        </button>
                        <img
                            src={`${movie?.poster_image}`}
                            alt="post"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                {isVideoPlaying && (
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
                        <div className="relative w-full max-w-[80%] h-[80%]">
                            <video
                                className="w-full h-full"
                                controls
                                autoPlay
                                onEnded={closeVideo} // Đóng video khi kết thúc
                            >
                                <source
                                    // src={`https://drive.google.com/uc?export=download&id=${videoId}`}
                                    src={videoUrl} // Sử dụng videoUrl đã được sửa đổi
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                            <button
                                className="absolute top-5 right-5 text-white bg-red-600 p-2 rounded-full"
                                onClick={closeVideo} // Đóng video khi click vào nút Close
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;
