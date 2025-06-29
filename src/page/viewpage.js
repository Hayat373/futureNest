import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; // Add this import

import AppHeader from '../components/AppHeader.js'; 
import '../css/viewpage.css';
import Search from "../components/search.js";
import TimeCapsule from "../components/TimeCapsule.js";

const Viewpage = () => {

     const navigate = useNavigate(); 
    const handleAddClick = () => {
      navigate('/create');
    };
   

    return (
        <div className="container-view">
           
            <AppHeader />
            <Search />
            <TimeCapsule />

            <button className="add-button" onClick={handleAddClick}>
            <span className="plus-icon-add">+</span> ADD
        </button>

                    
        </div>
    );
}

export default Viewpage;