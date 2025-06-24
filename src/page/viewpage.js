import React, { useState } from "react";
import AppHeader from '../components/AppHeader.js'; 
import '../css/viewpage.css';
import Search from "../components/search.js";
import TimeCapsule from "../components/TimeCapsule.js";

const Viewpage = () => {

    const handleAddClick = () => {
        // Add your add functionality here
        alert("Add button clicked!");
    };
   

    return (
        <div className="container-view">
           
            <AppHeader />
            <Search />
            <TimeCapsule />

            <button className="add-button" onClick={handleAddClick}>
            <span className="plus-icon">+</span> ADD
        </button>

                    
        </div>
    );
}

export default Viewpage;