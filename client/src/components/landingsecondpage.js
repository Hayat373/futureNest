import React from "react";
import RobotReact from "./robot";
import '../css/landingsecondpage.css';
import { useNavigate } from "react-router-dom";

const Landingseconpage=() =>{
  
    const navigate = useNavigate(); // Initialize useNavigate

    const handleJoinUsClick = () => {
        navigate("/signup"); // Navigate to signup page
    };
    return(
        <div className="Container">

            <div className="paragraph">
                <h1> Welcome to<span> Future Nest,</span> </h1>
                
                 <p className="line">
            _________________________________________ 
        </p>
                <p>
                     Your personal digital time capsule. Capture moments, heartfelt messages, photos, and dreams today, and set them to be revealed at a future date. Whether you're commemorating special occasions, leaving messages for loved ones, or simply preserving your journey through life, Future Nest  ensures your memories are safely stored and beautifully preserved for tomorrow.
                </p>

                            <p id="paragraph-moto">Start creating your timeless vault now and watch your stories unfold in the perfect moment.</p>

                            <button onClick={handleJoinUsClick} className="more">  JOIN US   </button>

            </div>
            
            <RobotReact/>

        </div>
    )
};

export default Landingseconpage;