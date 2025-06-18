import React from "react";

const Header=()=>{
    return(
         <div className="logo">
                <img src={require('../assets/logo.png')} alt="logo"></img>
                <p>Future Nest</p>
                </div>
    )
};

export default Header;