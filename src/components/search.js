import React, { useState } from "react";
import "../css/search.css";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLockClick = () => {
        // Add your lock functionality here
        alert("Locked clicked!");
    };

    return (
        <div className="header-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <button className="lock-button" onClick={handleLockClick}>
                Locked
            </button>
        </div>
    );
};

export default Search;