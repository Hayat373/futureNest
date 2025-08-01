import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header.js";
import axios from "axios";
import '../css/appheader.css';
import { FaBell } from 'react-icons/fa';
import { Navigate } from "react-router-dom";


const AppHeader=()=>{
     const [profileImage, setProfileImage] = useState(null);
     const navigate = useNavigate(); 
     const userId= JSON.parse(localStorage.getItem('loggedUser')).id
      
     useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}`);
                const userData = response.data;

                 const baseUrl = 'http://localhost:3000/uploads/'; // Adjust this as necessary
                setProfileImage(baseUrl +userData.image.split('\\').pop()); 
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [userId]);

  const handleProfileClick = () => {
        const user = JSON.parse(localStorage.getItem('loggedUser'));

        if (user && user.id && user.username) {
            navigate(`/update/${user.id}?username=${encodeURIComponent(user.username)}`);
        } else {
            console.error("User ID or username is not available");
        }
    };

    return(
        <div className="appheader">
            <Header />

            

                <div className="profile-plate" onClick={ handleProfileClick}>
                <div className="profile-circle">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-image" />
                    ) : (
                        <div className="profile-placeholder"></div>
                    )}
                   
                </div>
            </div>

        </div>
    )
}

export default AppHeader;