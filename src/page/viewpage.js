import React, { useState } from "react";
import AppHeader from '../components/AppHeader.js'; 
import '../css/viewpage.css';
import Search from "../components/search.js";

const Viewpage = () => {
   

    return (
        <div className="container">
           
            <AppHeader />
            <Search />

                    
        </div>
    );
}

export default Viewpage;