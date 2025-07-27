import React, { useState } from "react";
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css'

const Login=()=>{
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  const handleLogin = async() => {
    const formData= new FormData();
   

    formData.append('username', username);
        formData.append('password', password);
        if (profileImage) {
            const response = await fetch(profileImage);
            const blob = await response.blob();
            formData.append('profileImage', blob, 'profile.png'); // Append the image
        }

        // Log FormData for debugging
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    
        try {
            const { data } = await axios.post('http://localhost:3000/users/login', formData, {
                headers: {
                   'Content-Type': 'application/json',
                },
            });
            console.log('Login successful:', data);

            // Assuming your backend response includes user ID
        const userId = data.userId; // Adjust based on your actual response structure
        const user = {
            id: userId,
            username: data.username, // Example; adjust as necessary
        };

        // Save user info in local storage
        localStorage.setItem('loggedUser', JSON.stringify(user));

            // Save token or perform further actions
            navigate('/view'); // Navigate to AppHeaderPage
        } catch (error) {
            
            alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
    console.error('Login failed:', error.response ? error.response.data : error.message);
}
    };
  

        const handleImageUpload = (e) => {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setProfileImage(imageUrl);
            }
        };

    return(
        <div className="conatiner">
            <div className="profile-plate-login">
                <div className="profile-circle-login">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-image" />
                    ) : (
                        <div className="profile-placeholder-login"></div>
                    )}
                    <label className="plus-icon-login">
                        <span>+</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
            </div>

            <h1>Login</h1>
            <div className="form_group field">
   <input
    type="text"
    className="form_field"
    placeholder="User Name"
    value={username} // Bind to state
    onChange={(e) => setUsername(e.target.value)} // Update state on input change
    required
/>
    <label htmlFor="name" className="form_label">User Name</label>
    <br/>
<input
    id="passwordinput"
    type="password"
    className="form_field"
    placeholder="password"
    value={password} // Bind to state
    onChange={(e) => setPassword(e.target.value)} // Update state on input change
    required
/>
    <label id="password" htmlFor="password" className="form_label">Password</label>

</div>

 <div className="links">
                <a href="#" className="link">Forgot Password?</a>
               <Link to="/signup" className="link" id="signup">
          Sign Up
        </Link>
            </div>

             <button className="submit_button" onClick={handleLogin}>Login</button>
           
            
        </div>
    )
};

export default Login;