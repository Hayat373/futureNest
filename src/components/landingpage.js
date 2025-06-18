import React from "react";
import '../css/landingpage.css';
import LandingHeader from "./landheader";
import Landinghome from "./landinghome";

const Landingpage =() =>{
    return(
        <div className="landingpage">
        
        <LandingHeader/>
        
           <video autoPlay loop muted className="background-video">
                <source src={require('../assets/baground.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

        <Landinghome/>
         
        
        </div>
    );
};

export default Landingpage;