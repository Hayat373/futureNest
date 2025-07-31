import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import '../css/update.css'

const Update = () => {
    const {userId} = useParams(); // Get userId from URL parameters
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
    const handleupdate= async (e) => {
        e.preventDefault();

         console.log("Password:", password); // Debugging
        console.log("Confirm Password:", confirmPassword); // Debugging

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;}

            const updateData = {
                username,
                password,
                email,
            };

            try {
                
                await axios.put(`http://localhost:3000/users/${userId}`, updateData); 
                               alert("User update sucesssfully!");
                navigate('/view'); // Navigate to the view page after successful update
            }
            catch (error){
                console.error ("Error updating user:", error);
                alert("Failed to update user. Please try again.");
            }
        };

        const handleLogout = async () => {
            try {
                await axios.post('http://localhost:3000/users/logout');
                localStorage.removeItem('userId'); // Clear userId from local storage
                navigate('/login'); // Redirect to login page after logout
            }
            catch (error) {
                console.error("Error during logout:", error);   
                alert("Failed to logout. Please try again.");
            }
        };

    return(
        <div className="conatiner">
            <div className="profile-plate-login">
                <div className="profile-circle-login">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-image-login" />
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

            <h1>Update</h1>
            <div className="form_group field">
    <input type="text" className="form_field" placeholder="User Name" required value={username} onChange={(e)=> setUsername(e.target.value)} />
    <label htmlFor="name" className="form_label">User Name</label>
    <br/>
    <input  
                        id="passwordinput" 
                        type="password" 
                        className="form_field" 
                        placeholder="Password" 
                        required 
                        value={password} 
                        onChange={(e) => {
                            console.log("Updating password:", e.target.value); // Debugging
                            setPassword(e.target.value); 
                        }} 
                    />
    <label id="password" htmlFor="password" className="form_label">Password</label>
    <br />
    <input  id="emailinput" type="text" className="email_field" placeholder="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
    <label id="email" htmlFor="name" className="email_label">Email</label>

    <br />
    <input id="confirminput" type="password" className="confirm_field" placeholder="confirm Password" required value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} />
    <label id="confirm" htmlFor="name" className="confirm_label">Confirm Password</label>
    

</div>

 
    <div className="button-hold">
             <button type="button" className="logout_button" onClick={handleLogout}>logout</button>
             <button type="submit" onClick={handleupdate} className="update_button">Update</button>
             </div>
            
        </div>
    )
};

export default Update;