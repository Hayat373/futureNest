import React, { useState } from "react";
import AppHeader from '../components/AppHeader.js'; 
import '../css/viewpage.css';
import Search from "../components/search.js";
import TimeCapsule from "../components/TimeCapsule.js";

const Viewpage = () => {
   

    return (
        <div className="container">
           
            <AppHeader />
            <Search />
            <TimeCapsule />

                    
        </div>
    );
}

export default Viewpage;