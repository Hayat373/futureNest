import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css'

const Login=()=>{

     const [profileImage, setProfileImage] = useState(null);
    
        const handleImageUpload = (e) => {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setProfileImage(imageUrl);
            }
        };

    return(
        <div className="conatiner">
            <div className="profile-plate">
                <div className="profile-circle">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-image" />
                    ) : (
                        <div className="profile-placeholder"></div>
                    )}
                    <label className="plus-icon">
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
    <input type="text" className="form_field" placeholder="User Name" required />
    <label htmlFor="name" className="form_label">User Name</label>
    <br/>
    <input  id="passwordinput"type="password" className="form_field" placeholder="password" required />
    <label id="password" htmlFor="password" className="form_label">Password</label>

</div>

 <div className="links">
                <a href="#" className="link">Forgot Password?</a>
               <Link to="/signup" className="link" id="signup">
          Sign Up
        </Link>
            </div>

             <button className="submit_button">Login</button>
           
            
        </div>
    )
};

export default Login;