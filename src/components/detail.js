import React, { useState } from "react";
import "../css/detail.css";

const Detailview = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [content] = useState({
    title: "Title",
    description: "List",
    images: [
      { id: 1, src: "https://via.placeholder.com/150?text=Image+1" },
      { id: 2, src: "https://via.placeholder.com/150?text=Image+2" },
      { id: 3, src: "https://via.placeholder.com/150?text=Image+3" },
    ],
    files: [
      { id: 1, name: "File1.pdf" },
      { id: 2, name: "File2.pdf" },
    ],
  });

  const handleItemClick = (item) => {
    setSelectedItem(item);
    // Here you can add logic to display details (e.g., modal or new page)
    console.log("Selected:", item);
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="content-container">
        <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
      <div className="title-box" onClick={() => handleItemClick({ type: "title", text: content.title })}>
        {content.title}
      </div>
      <div className="description-box" onClick={() => handleItemClick({ type: "description", text: content.description })}>
        {content.description}
      </div>
      <div className="image-grid">
        {content.images.map((image) => (
          <div
            key={image.id}
            className="image-box"
            onClick={() => handleItemClick({ type: "image", ...image })}
          >
            <img src={image.src} alt={`Image ${image.id}`} />
          </div>
        ))}
      </div>
      <div className="file-section">
        {content.files.map((file) => (
          <div
            key={file.id}
            className="file-box"
            onClick={() => handleItemClick({ type: "file", ...file })}
          >
            <span className="file-icon"></span>
            {file.name}
          </div>
        ))}
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