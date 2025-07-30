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
      <div className="droupdown-hold">
        <button
          className="lock-button "
          onClick={handleToggle}
        >
          {lockState}
          <svg
            className="w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div
            className="droupdouns-holding"
            style={{ zIndex: 10 }}
          >
            <div className="py-1">
              <button
                className="locked-droupdown-hold"
                onClick={() => handleSelect("Locked")}
              >
                Locked
              </button>
              <button
                className="unloked-droupdown-hold"
                onClick={() => handleSelect("Unlocked")}
              >
                Unlocked
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;