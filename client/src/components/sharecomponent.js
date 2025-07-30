
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/sharecomp.css';

const Share = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { capsuleId, capsuleTitle } = state || {};

    console.log("Share component received:", { capsuleId, capsuleTitle });

    const shareUrl = capsuleId ? `${window.location.origin}/capsule/${capsuleId}` : null;

    const handleShare = () => {
        if (!capsuleId || !capsuleTitle) {
            console.log("Share attempt failed: Invalid capsule data");
            toast.error("Cannot share: Invalid capsule data.");
            return;
        }

        const shareData = {
            title: `Time Capsule: ${capsuleTitle}`,
            text: `Check out this time capsule!`,
            url: shareUrl,
        };

        console.log("Attempting to share:", shareData);

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData)
                .then(() => {
                    console.log("Capsule shared successfully");
                    toast.success("Capsule shared successfully!");
                })
                .catch((error) => {
                    console.error("Error sharing capsule:", error);
                    toast.error("Failed to share. Link copied to clipboard instead.");
                    navigator.clipboard.writeText(shareUrl)
                        .then(() => toast.success("Capsule link copied to clipboard!"))
                        .catch((err) => {
                            console.error("Error copying link:", err);
                            toast.error("Failed to copy link.");
                        });
                });
        } else {
            navigator.clipboard.writeText(shareUrl)
                .then(() => toast.success("Capsule link copied to clipboard!"))
                .catch((error) => {
                    console.error("Error copying link:", error);
                    toast.error("Failed to copy link.");
                });
        }
    };

    return (
        <div className="share-container">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1>Share Time Capsule</h1>
            {capsuleId && capsuleTitle ? (
                <>
                    <p className="share-titile">Share the capsule: {capsuleTitle}</p>
                    <input className="share-input"
                        type="text"
                        value={shareUrl}
                        readOnly
                        style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
                    />
                    <button className="share-link-button" onClick={handleShare}>Share Link</button>
                </>
            ) : (
                <div>No capsule selected for sharing. Please try again.</div>
            )}
            <button className="share-back-button" onClick={() => navigate("/")}>Back</button>
        </div>
    );
};

export default Share;