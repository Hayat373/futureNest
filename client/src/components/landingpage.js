import React from "react";
import '../css/landingpage.css';
import LandingHeader from "./landheader";
import Landinghome from "./landinghome";
import Landingseconpage from "./landingsecondpage";

const Landingpage =() =>{
    return(
        <div className="landingpage">
        
        <LandingHeader/>
        
           {/* <video autoPlay  muted className="background-video">
                <source src={require('../assets/baground.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}

        {/* <Landinghome/> */}
        
         <Landingseconpage/>
        
        </div>
    );
};

export default Landingpage;