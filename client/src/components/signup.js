import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../css/login.css'

const Signup = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');   
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const formData = {
            username,
            password,
            email,
        };
        try{
            const response=await axios.post('/api/users/signup', formData);
            console.log('Signup successful:', response.data);
            navigate('/login'); // Navigate to login page after successful signup
        }
        catch (error) {
            console.error('Signup failed:', error);
            alert('signup faild:'+ error.response.data.message);
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

            <h1>Sign Up</h1>
            <div className="form_group field">
    <input type="text" className="form_field" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="User Name" required />
    <label htmlFor="name" className="form_label">User Name</label>
    <br/>
    <input  id="passwordinput"type="password" value={password}  onChange={(e)=> setPassword(e.target.value)} className="form_field" placeholder="password" required />
    <label id="password" htmlFor="password" className="form_label">Password</label>
    <br />
    <input  id="emailinput" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="email_field" placeholder="email" required />
    <label id="email" htmlFor="name" className="email_label">Email</label>

    <br />
    <input id="confirminput" type="password" className="confirm_field"  value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="confirm Password" required />
    <label id="confirm" htmlFor="name" className="confirm_label">Confirm Password</label>
    

</div>

 

             <button className="submit_button" onClick={handleSignup}>Sign Up</button>
           <div className="text">
            <p>Already have accout?</p>
            <Link to="/login" className="link" id="login">Login</Link>             </div>
            
        </div>
    )
};

export default Signup;