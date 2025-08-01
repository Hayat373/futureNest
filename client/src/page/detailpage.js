import React from "react";
import AppHeader from "../components/AppHeader";
import Detailview from "../components/detail";


const Detailpage=()=>{
    return(
        <div>
        <AppHeader/>
        <div className="detailpage">
        <Detailview/>
        <img className="books" src={require('../assets/detail.png')} />
        </div>
        
        </div>
    )
};

export default Detailpage;