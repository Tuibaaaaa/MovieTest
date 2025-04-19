import React from "react";
import PropTypes from "prop-types";

const Header = ({ onSearch, onSelectGenre, onHomeClick }) => {
    const [textSearch, setTextSearch] = React.useState("");

    const handleSearch = () => {
        onSearch(textSearch); // Call onSearch function passed as a prop
    };
    return (
        <div className="p-4 bg-black flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-[30px] uppercase font-bold text-red-700">
                    Movie
                </h1>
                <nav className="flex space-x-4 items-center">
                    <a href="#" className="text-white" onClick={onHomeClick}>
                        Home
                    </a>
                    <a
                        href="#"
                        className="text-white"
                        onClick={() => onSelectGenre("Movie")}
                    >
                        Movies
                    </a>
                    <a
                        href="#"
                        className="text-white"
                        onClick={() => onSelectGenre("TV Show")}
                    >
                        TV Shows
                    </a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-3 rounded-md bg-gray-700 text-white"
                    onChange={(e) => setTextSearch(e.target.value)}
                    value={textSearch}
                />
                <button
                    className="bg-red-700 text-white p-2 rounded-md"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

Header.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSelectGenre: PropTypes.func.isRequired,
    onHomeClick: PropTypes.func.isRequired,
};

export default Header;
