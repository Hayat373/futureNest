import React, { useState } from "react";
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