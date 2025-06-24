import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css'

const Login=()=>{
    const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login logic (e.g., API call or state check)
    console.log('Login button clicked');
    navigate('/appheader'); // Navigate to AppHeaderPage
  };
  

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

             <button className="submit_button" onClick={handleLogin}>Login</button>
           
            
        </div>
    )
};

export default Login;