import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import "../css/detail.css";

const Detailview = () => {
  const { capsuleId } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchCapsuleData = async () => {
      try {
        const response = await axios.get(`/api/capsules/${capsuleId}`);
        setContent(response.data); // Assuming response.data contains the capsule details
      } catch (error) {
        console.error('Error fetching capsule data:', error);
        alert('Failed to load capsule data.');
      }
    };
    fetchCapsuleData();
  }, [capsuleId]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    console.log("Selected:", item);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!content) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="content-container">
      <button className="back-button" onClick={handleBackClick}>Back</button>
      <div className="title-box" onClick={() => handleItemClick({ type: "title", text: content.title })}>
        {content.title}
      </div>
      <div className="description-box" onClick={() => handleItemClick({ type: "description", text: content.description })}>
        {content.description}
      </div>
      <div className="image-grid">
        {content.images && content.images.length > 0 ? (
          content.images.map((image) => (
            <div
              key={image.id}
              className="image-box"
              onClick={() => handleItemClick({ type: "image", ...image })}
            >
              <img src={image.src} alt={`Image ${image.id}`} />
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
      <div className="file-section">
        {content.files && content.files.length > 0 ? (
          content.files.map((file) => (
            <div
              key={file.id}
              className="file-box"
              onClick={() => handleItemClick({ type: "file", ...file })}
            >
              <span className="file-icon"></span>
              {file.name}
            </div>
          ))
        ) : (
          <p>No files available.</p>
        )}
      </div>
      {selectedItem && (
        <div className="detail-overlay">
          <div className="detail-box">
            <h3>Details</h3>
            <p>
              {selectedItem.type === "title" && `Title: ${selectedItem.text}`}
              {selectedItem.type === "description" && `Description: ${selectedItem.text}`}
              {selectedItem.type === "image" && `Image ${selectedItem.id} clicked`}
              {selectedItem.type === "file" && `File: ${selectedItem.name}`}
            </p>
            <button onClick={() => setSelectedItem(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detailview;