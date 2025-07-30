import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Timecapsule.css";

const TimeCapsule = ({ capsules, searchTerm }) => {
    const navigate = useNavigate();

    const handleUnlock = (capsuleId) => {
        alert("Capsule unlocked!");
    };

    const handleShare = () => {
        navigate('/share');
    };

    const handleNavigateToDetails = (capsuleId) => {
        navigate(`/capsule/${capsuleId}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // Filter capsules based on searchTerm
    const filteredCapsules = capsules.filter(capsule =>
        capsule.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // State to hold countdowns
    const [countdowns, setCountdowns] = useState(filteredCapsules.map(() => 0));

    useEffect(() => {
        const newCountdowns = filteredCapsules.map((capsule) => {
            const unlockDateTime = new Date(capsule.unlockDateTime);
            return Math.max(0, Math.floor((unlockDateTime - new Date()) / 1000));
        });

        setCountdowns(newCountdowns);

        const timer = setInterval(() => {
            setCountdowns((prevCountdowns) =>
                prevCountdowns.map((countdown) => Math.max(0, countdown - 1))
            );
        }, 1000);

        return () => clearInterval(timer);
    }, [filteredCapsules]);

    // Render loading only when capsules are initially empty
    if (capsules.length === 0) {
        return <div>Loading...</div>;
    }

    // Render message when no capsules match the search
    if (filteredCapsules.length === 0) {
        return <div>No capsules found.</div>;
    }

    return (
        <div className="time-capsule-container">
            {filteredCapsules.map((capsule, index) => (
                <div className="capsule-card" key={capsule.id} onClick={() => handleNavigateToDetails(capsule.id)}>
                    <div className="capsule-header">
                        <span className="capsule-name">{capsule.title}</span>
                        <span className="capsule-time">{formatDate(capsule.unlockDateTime)}</span>
                        <span className="capsule-countdown">
                            {countdowns[index] > 0 ? `Unlocks in ${countdowns[index]} seconds` : "Unlocked!"}
                        </span>
                    </div>
                    <div className="capsule-hold">
                        <div className="capsule-note">{capsule.description}</div>
                        <div className="capsule-actions">
                            <button
                                className="unlock-button"
                                onClick={() => handleUnlock(capsule.id)}
                                disabled={countdowns[index] > 0}
                            >
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