import React, { useState, useEffect } from "react";
import '../css/sharecomp.css';

const Sharecomponent =()=>{

    const [profileImage, setProfileImage] = useState(null);
        
            const handleImageUpload = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setProfileImage(imageUrl);
                }
            };
        const [capsuleName] = useState("My First Time Capsule");
            const [note] = useState("Remember this moment...");
            const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
        
            useEffect(() => {
                if (timeLeft > 0) {
                    const timer = setInterval(() => {
                        setTimeLeft((prevTime) => prevTime - 1);
                    }, 1000);
                    return () => clearInterval(timer); // Cleanup on unmount
                }
            }, [timeLeft]);
        
            // Format time left as HH:MM:SS
            const formatTime = (seconds) => {
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const secs = seconds % 60;
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            };

    return(
        <div className="share-crard-hold">

             <div className="profile-plate-share">
                <div className="profile-circle-share">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-image-share" />
                    ) : (
                        <div className="profile-placeholder-share"></div>
                    )}
                    
                </div>
            </div>

             <div className="share-header">
                <span className="capsule-share-name">{capsuleName}</span>
                <span className="capsule-share-time">{formatTime(timeLeft)}</span>
            </div>

           
            <div className="share-note">{note}</div>
            
            

        </div>
    )
};

export default Sharecomponent;