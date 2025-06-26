import React, { useState } from "react";
import Calendar from "react-calendar";
import "../css/create.css";

const Create= () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(new Date()); // Combined date and time
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleDateChange = (newDate) => {
    const updatedDateTime = new Date(dateTime);
    updatedDateTime.setFullYear(newDate.getFullYear());
    updatedDateTime.setMonth(newDate.getMonth());
    updatedDateTime.setDate(newDate.getDate());
    setDateTime(updatedDateTime);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    const [hours, minutes] = time.split(":");
    const updatedDateTime = new Date(dateTime);
    updatedDateTime.setHours(parseInt(hours, 10));
    updatedDateTime.setMinutes(parseInt(minutes, 10));
    updatedDateTime.setSeconds(0);
    setDateTime(updatedDateTime);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleUpload = () => {
    console.log("Uploading:", { title, description, dateTime, files });
    // Add upload logic here
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDateTime(new Date());
    setFiles([]);
  };

  return (
    <div className="upload-container">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        className="input-field"
      />
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Description"
        className="input-field"
      />
      <div className="date-time-section">
        <div className="date-display">
          {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
        </div>
        <div className="date-time-inputs">
          <Calendar onChange={handleDateChange} value={dateTime} />
          <input
            type="time"
            value={dateTime.toTimeString().slice(0, 5)} // Format as HH:MM
            onChange={handleTimeChange}
            className="time-input"
          />
        </div>
        <div className="date-buttons">
          <button className="date-button">Cancel</button>
          <button className="date-button">Save</button>
        </div>
      </div>
      <div
        className={`drop-zone ${isDragging ? "dragging" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <span className="upload-icon">↑</span>
        <p id="add_paragrah">Drag and drop file or choose files</p>
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="file-input-label">
          Choose Files
        </label>
      </div>
      <div className="file-preview">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            {file.name}
          </div>
        ))}
      </div>
      <div className="action-buttons">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </div>
      <input
      id="text_create"
        type="text"
        value=""
        placeholder="Text"
        className="input-field"
        disabled
      />
      <button className="add-button">Add</button>
    </div>
  );
};

export default Create;