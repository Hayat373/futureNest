import React, { useState } from "react";
import Calendar from "react-calendar";
import "../css/create.css";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(new Date()); // Combined date and time
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [textInput, setTextInput] = useState(""); // Initialize here

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

  const handleUpload = async () => {
   const formData = new FormData();

   formData.append("title", title);
   formData.append("description", description); 
   formData.append("unlockDateTime", dateTime.toISOString()); 
   formData.append("textInput", textInput); // Append text input
   // // Convert to ISO string

   files.forEach(file => {
      formData.append("file", file);
    });

    

    try{
      const response= await axios.post ('/api/capsules', formData,{
        headers:{
          'Content-Type':'multipart/form-data',
        },
      });
      console.log ('capsole created successfullt:', response.data);
    }
    catch(error){
      console.log('Error creating capsule:' ,error.response ? error.response.data : error.message)
      alert ('failed to create capsule:'+(error.response ? error.response.data.message : error.message));
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDateTime(new Date());
    setFiles([]);
    setTextInput(""); // Reset text input on cancel
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
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
        value={textInput} // Bind to state
        placeholder="Text"
        className="input-field"
        onChange={handleTextInputChange} // Handle input change
      />
      <button className="add-button" onClick={handleUpload}>Add</button>
    </div>
  );
};

export default Create;