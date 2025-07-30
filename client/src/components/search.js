import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import "../css/search.css";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lockState, setLockState] = useState("Locked");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (state) => {
    setLockState(state);
    setIsOpen(false);
    alert(`${state} clicked!`);
  };

  
  return (
    <div className="header-container">
      <div className="search-container">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      </div>
  );
};

export default Search;