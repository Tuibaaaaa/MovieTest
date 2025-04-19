import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

// Context for managing movie data and trailer modal
const MovieContext = createContext();

const opts = {
    height: "390",
    width: "640",
    playerVars: {
        autoplay: 1,
    },
};

const MovieProvider = ({ children }) => {
    const [trailerUrl, setTrailerUrl] = useState(""); // State to store the trailer URL
    const [modalIsOpen, setIsOpen] = useState(false); // Modal visibility state

    // Function to handle video trailer click
    const handleVideoTrailer = async (id) => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        };

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/movies/${id}/`,
                options
            );

            const data = await response.json();
            if (data.trailer_url) {
                const youtubeUrlPattern =
                    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/|.*?[\?&]v=))([^"&?\/\s]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/;
                const match = data.trailer_url.match(youtubeUrlPattern);

                if (match && (match[1] || match[2])) {
                    setTrailerUrl(match[1] || match[2]); // Extract video ID from URL and set it
                    setIsOpen(true); // Open the modal to show the trailer
                } else {
                    console.error("Invalid YouTube URL.");
                    setTrailerUrl(""); // Reset trailer URL if invalid
                    setIsOpen(false); // Close modal if URL is invalid
                }
            } else {
                console.error("No trailer URL available.");
                setTrailerUrl(""); // Reset trailer URL if not found
                setIsOpen(false); // Close modal if no trailer URL
            }
        } catch (error) {
            console.error("Error fetching movie trailer:", error);
            setTrailerUrl(""); // Reset trailer URL on error
            setIsOpen(false); // Close modal on error
        }
    };

    return (
        <MovieContext.Provider value={{ handleVideoTrailer }}>
            {children}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={{
                    overlay: {
                        position: "fixed",
                        zIndex: 9999,
                    },
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}
                contentLabel="Trailer Modal"
            >
                {trailerUrl ? (
                    <div className="flex items-center justify-center mt-5">
                        <YouTube videoId={trailerUrl} opts={opts} />
                    </div>
                ) : (
                    <p>Trailer not available</p>
                )}
            </Modal>
        </MovieContext.Provider>
    );
};

MovieProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { MovieProvider, MovieContext };
