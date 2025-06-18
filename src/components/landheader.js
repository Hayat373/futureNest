import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/landingheader.css';

const LandingHeader = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const handleLoginClick = () => {
        navigate("/login"); // Navigate to login page
    };
    return (
        <div className="container">
            <div className="logo">
                <img src={require('../assets/logo.png')} alt="logo" />
                <p>Future Nest</p>
            </div>
            <div className="buttonhold">
                <button className="Login" onClick={handleLoginClick}>Login</button>
                <button className="Signup">SignUP</button>
            </div>
        </div>
    );
};

export default LandingHeader;