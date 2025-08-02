import React, { useState } from "react";
import Calendar from "react-calendar";
import "../css/create.css";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleDateChange = (newDate) => {
    const updated = new Date(dateTime);
    updated.setFullYear(newDate.getFullYear());
    updated.setMonth(newDate.getMonth());
    updated.setDate(newDate.getDate());
    setDateTime(updated);
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    const updated = new Date(dateTime);
    updated.setHours(parseInt(hours, 10));
    updated.setMinutes(parseInt(minutes, 10));
    updated.setSeconds(0);
    setDateTime(updated);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
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
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("unlockDateTime", dateTime.toISOString());
    formData.append("textInput", textInput);
    files.forEach(file => formData.append("file", file));

    try {
      const response = await axios.post("http://localhost:3000/capsules", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("Capsule created successfully:", response.data);
    } catch (error) {
      alert("Failed to create capsule: " + (error.response?.data.message || error.message));
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDateTime(new Date());
    setFiles([]);
    setTextInput("");
  };

  return (
    <div className="modern-upload-container">
      <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} className="modern-input" />
      <input type="text" placeholder="Description" value={description} onChange={handleDescriptionChange} className="modern-input" />

      <div className="modern-date-time">
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={dateTime} />
        </div>
        <input
          type="time"
          className="modern-time-input"
          value={dateTime.toTimeString().slice(0, 5)}
          onChange={handleTimeChange}
        />
      </div>

      <div
        className={`modern-drop-zone ${isDragging ? "dragging" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <span className="upload-icon">📁</span>
        <p className="drag">Drag & drop your file(s) here</p>
        <input type="file" multiple onChange={handleFileInput} id="fileInput" style={{ display: "none" }} />
        <label htmlFor="fileInput" className="file-label">Choose File</label>
      </div>

      <div className="file-preview">
        {files.map((file, index) => (
          <div key={index} className="file-item">{file.name}</div>
        ))}
      </div>

      <textarea
        className="modern-textarea"
        placeholder="Enter your message or note here..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      <div className="modern-button-row">
        <button className="modern-btn cancel" onClick={handleCancel}>Cancel</button>
        <button className="modern-btn primary" onClick={handleUpload}>Save</button>
      </div>
    </div>
  );
};

export default Create;
