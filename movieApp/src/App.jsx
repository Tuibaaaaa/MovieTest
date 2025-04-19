import { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import MovieList from "./components/MovieList";
import { MovieProvider } from "./context/MovieProvider";
import { FaSpinner } from "react-icons/fa6";

function App() {
    const [movie, setMovie] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [movieRate, setMovieRate] = useState([]);
    const [currentBanner, setCurrentBanner] = useState(null);

    const [filteredMovies, setFilteredMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [showBanner, setShowBanner] = useState(true);
    const [loading, setLoading] = useState(false);
    // const handleSearch = async (search) => {
    //     setMovieSearch([]);
    //     try {
    //         const options = {
    //             method: "GET",
    //             headers: {
    //                 accept: "application/json",
    //                 // Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    //             },
    //         };
    //         const response = await fetch(
    //             `${import.meta.env.VITE_API_URL}/search?query=${search}`,
    //             options
    //         );
    //         const data = await response.json();
    //         console.log(data);

    //         setMovieSearch(data.results);
    //     } catch (error) {
    //         console.error("Error fetching movie search results:", error);
    //     }
    // };

    async function fetchMovies(keyword = "") {
        setLoading(true);
        try {
            // Fetch phim thịnh hành (từ API của bạn)
            const response1 = await fetch(
                `http://127.0.0.1:8000/api/movies/?search=${keyword}`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                    },
                }
            );
            const data1 = await response1.json();
            console.log({ data1 });
            setMovie(data1); // Lưu vào movie (phim thịnh hành)
            setCurrentBanner(data1[0]); // Lưu phim đầu tiên làm banner
            setFilteredMovies(data1);
            setLoading(false);

            // Fetch phim đề cử nếu có (có thể cần lấy từ một API khác nếu có)
            const response2 = await fetch(`${import.meta.env.VITE_API_KEY}`);
            const data2 = await response2.json();
            setMovieRate(data2.results); // Lưu vào movieRate (phim đề cử)
        } catch (error) {
            console.error("Error fetching movies:", error);
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     const fetchMovies = async () => {
    //         const options = {
    //             method: "GET",
    //             headers: {
    //                 accept: "application/json",
    //                 Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    //             },
    //         };
    //         const response = await fetch(
    //             "http://127.0.0.1:8000/api/movies/",
    //             options
    //         );
    //         const response2 = await fetch(
    //             `https://api.themoviedb.org/3/movie/top_rated?api_key=${
    //                 import.meta.env.VITE_API_KEY
    //             }&language=en-US&page=1`,
    //             options
    //         );
    //         const data1 = await response.json();
    //         const data2 = await response2.json();

    //         setMovie(data1.results);
    //         setMovieRate(data2.results);
    //     };
    //     console.log(import.meta.env.VITE_API_KEY);
    //     fetchMovies();
    // }, []);

    const handleGenreSelection = (genre) => {
        setSelectedGenre(genre);
        const filtered = movie.filter((m) => m.genre.includes(genre));
        setFilteredMovies(filtered);
        setShowBanner(false); // Hide banner when filtering by genre
    };

    const handleMovieClick = () => {
        // setSelectedGenre(''); // Reset selected genre
        // setFilteredMovies(movie); // Show all movies again
        setShowBanner(true); // Show banner again
        // setCurrentBanner(null);
    };

    const handleHomeClick = () => {
        setSelectedGenre(""); // Reset selected genre
        setFilteredMovies(movie); // Show all movies again
        setShowBanner(true); // Show banner
    };

    const MOVIE_ID = 3; // Set this dynamically or pass it as a prop

    useEffect(() => {
        fetchMovies();
    }, []); // Chỉ gọi khi component mount

    return (
        <>
            <MovieProvider>
                <div className="bg-black pb-10">
                    <Header
                        onSearch={fetchMovies}
                        onSelectGenre={handleGenreSelection}
                        onHomeClick={handleHomeClick}
                    />
                    {showBanner && (
                        <Banner
                            data={currentBanner}
                            setMovie={setMovie}
                            setBanner={setCurrentBanner}
                        />
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <FaSpinner className="animate-spin text-white text-4xl" />
                        </div>
                    ) : (
                        <MovieList
                            title={
                                selectedGenre
                                    ? `${selectedGenre}`
                                    : "All Movies"
                            }
                            data={filteredMovies}
                            setBanner={setCurrentBanner}
                            onMovieClick={handleMovieClick}
                        />
                    )}
                    {/* <MovieList
                        title={"Phim Thịnh Hành"}
                        data={movie}
                        setBanner={setCurrentBanner}
                        // onMovieClick={handleMovieClick}
                    /> */}

                    {/* {movieSearch.length > 0 ? (
                        <MovieList
                            title={"Kết Quả Tìm Kiếm"}
                            data={movieSearch.slice(0, 10)}
                        />
                    ) : (
                        <>
                            <MovieList
                                title={"Phim Thịnh Hành"}
                                data={movie}
                                apiUrl="http://127.0.0.1:8000/myapps/movies/"
                            />
                            <MovieList
                            // title={"Phim Đề Cử"}
                            // data={movieRate.slice(0, 5)}
                            />
                        </>
                    )} */}
                </div>
            </MovieProvider>
        </>
    );
}

export default App;
