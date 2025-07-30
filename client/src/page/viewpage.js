import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"; // Add this import

import AppHeader from '../components/AppHeader.js'; 
import '../css/viewpage.css';
import Search from "../components/search.js";
import axios from 'axios';
import TimeCapsule from "../components/TimeCapsule.js";

const Viewpage = () => {

    const [searchTerm, setSearchTerm] = useState("");
  const [capsules, setCapsules] = useState([]);
     const navigate = useNavigate(); 
     
    const handleAddClick = () => {
      navigate('/create');
    };

    useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const response = await axios.get("http://localhost:3000/capsules");
        setCapsules(response.data);
      } catch (error) {
        console.error("Error fetching capsules:", error);
      }
    };

    fetchCapsules();
  }, []);
   

    return (
        <div className="container-view">
           
            <AppHeader />
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TimeCapsule capsules={capsules} searchTerm={searchTerm} />

            <button className="add-button" onClick={handleAddClick}>
            <span className="plus-icon-add">+</span> ADD
        </button>

                    
        </div>
    );
}

export default Viewpage;