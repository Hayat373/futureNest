import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../css/Timecapsule.css";

const TimeCapsule = ({ capsules, searchTerm }) => { // capsuleId is now a destructured prop
    const navigate = useNavigate();
    

    const handleUnlock = (capsuleId) => {
        // Add unlock functionality here
        alert("Capsule unlocked!");
    };

    const handleShare = () => {
        navigate('/share');
    };

    const handleNavigateToDetails = (capsuleId) => {
         navigate(`/capsule/${capsuleId}`); // Navigate to the detail page for the specific capsule
    };

     // Format unlock date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Format as desired
    };

    // Filter capsules based on searchTerm
    const filteredCapsules = capsules.filter(capsule =>
        capsule.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle loading state
    if (capsules.length === 0) {
        return <div>Loading...</div>;
    }

return (
        <div className="time-capsule-container">
            {filteredCapsules.map((capsule) => (
                <div className="capsule-card" key={capsule.id} onClick={() => handleNavigateToDetails(capsule.id)}>
                    <div className="capsule-header">
                        <span className="capsule-name">{capsule.title}</span>
                        <span className="capsule-time">{formatDate(capsule.unlockDateTime)}</span>
                    </div>
                    <div className="capsule-hold">
                        <div className="capsule-note">{capsule.description}</div>
                        <div className="capsule-actions">
                            <button className="unlock-button" onClick={() => handleUnlock(capsule.id)}>
                                Unlock
                            </button>
                            <button className="share-button" onClick={handleShare}>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TimeCapsule;