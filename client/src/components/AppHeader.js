import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header.js";
import '../css/appheader.css';
import { FaBell } from 'react-icons/fa';
import { Navigate } from "react-router-dom";

const AppHeader=()=>{
     const [profileImage, setProfileImage] = useState(null);
     const navigate = useNavigate(); 
      const [notificationCount, setNotificationCount] = useState(3);      
                const handleImageUpload = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setProfileImage(imageUrl);
                    }
                };
   const handleProfileClick = (user) => {
    if (user && user.id) {
        navigate(`/update/${user.id}`); // Pass the user ID to the URL
    } else {
        console.error("User ID is not available");
    }
};
    return(
        <div className="appheader">
            <Header />

            <div className="notification-plate">
                <FaBell className="notification-icon" />
                {notificationCount > 0 && (
                    <span className="notification-badge">{notificationCount}</span>
                )}
            </div>

                <div className="profile-plate" onClick={ handleProfileClick}>
                <div className="profile-circle">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-image" />
                    ) : (
                        <div className="profile-placeholder"></div>
                    )}
                    <label className="plus-icon">
                        <span>+</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
            </div>

        </div>
    )
}

export default AppHeader;