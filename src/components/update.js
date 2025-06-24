import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css'

const Update = () => {
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
    <input type="text" className="form_field" placeholder="User Name" required />
    <label htmlFor="name" className="form_label">User Name</label>
    <br/>
    <input  id="passwordinput"type="password" className="form_field" placeholder="password" required />
    <label id="password" htmlFor="password" className="form_label">Password</label>
    <br />
    <input  id="emailinput" type="text" className="email_field" placeholder="email" required />
    <label id="email" htmlFor="name" className="email_label">Email</label>

    <br />
    <input id="confirminput" type="text" className="confirm_field" placeholder="confirm Password" required />
    <label id="confirm" htmlFor="name" className="confirm_label">Confirm Password</label>
    

</div>

 
    <div className="button-hold">
             <button className="logout_button">logout</button>
             <button className="update_button">Update</button>
             </div>
            
        </div>
    )
};

export default Update;