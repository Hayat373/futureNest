import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Timecapsule.css"; 

const TimeCapsule = () => {
    const [capsuleName] = useState("My First Time Capsule");
    const [note] = useState("Remember this moment...");
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
    const navigate = useNavigate();

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

    const handleUnlock = () => {
        // Add unlock functionality here
        alert("Capsule unlocked!");
    };

    const handleShare = () => {
     navigate('/share');
    };

    const handleNavigateToDetails = () => {
        // navigate(`/capsule/${encodeURIComponent(capsuleName)}`);
        navigate('/detail')
    };

    return (
        <div className="time-capsule-container" onClick={handleNavigateToDetails}>
            <div className="capsule-header">
                <span className="capsule-name">{capsuleName}</span>
                <span className="capsule-time">{formatTime(timeLeft)}</span>
            </div>
            <div className="capsule-hold">
                <div className="capsule-note">{note}</div>
                <div className="capsule-actions">
                    <button className="unlock-button" onClick={handleUnlock}>
                        Unlock
                    </button>
                    <button className="share-button" onClick={handleShare}>
                        Share

                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeCapsule;