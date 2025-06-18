import React from "react";
import '../css/landingheader.css';

const LandingHeader=() =>{
    return(
        <div className="container">
            <div className="logo">
                <img src={require('../assets/logo.png')} alt="logo"></img>
                <p>Future Nest</p>
         
            <div className="buttonhold">
            <button className="Login"> Login</button>
            <button className="Signup"> SignUP</button>
            </div>
            </div>
        </div>
    );
};

export default LandingHeader;
