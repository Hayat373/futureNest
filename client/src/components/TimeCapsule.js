import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Timecapsule.css";

const TimeCapsule = ({ capsules, searchTerm }) => {
    const navigate = useNavigate();

    const handleUnlock = (capsuleId) => {
        navigate(`/capsule/${capsuleId}`);
    };

    const handleShare = () => {
        navigate('/share');
    };

    const handleNavigateToDetails = (capsuleId, countdown) => {
        if (countdown === 0) {
            navigate(`/capsule/${capsuleId}`);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // Memoize filteredCapsules to prevent re-creation on every render
    const filteredCapsules = useMemo(() => {
        return capsules.filter(capsule =>
            capsule.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [capsules, searchTerm]); // Depend on capsules and searchTerm

    // State to hold countdowns
    const [countdowns, setCountdowns] = useState([]);

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
                <div
                    className="capsule-card"
                    key={capsule.id}
                    onClick={() => handleNavigateToDetails(capsule.id, countdowns[index])}
                >
                    <div className="capsule-header">
                        <span className="capsule-name">{capsule.title}</span>
                        <span className="capsule-time">
                            {countdowns[index] > 0
                                ? `Unlocks in ${countdowns[index]} seconds`
                                : `Unlocked at: ${formatDate(capsule.unlockDateTime)}`}
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