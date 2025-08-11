import React from "react";
import Header from "../components/header";
import '../css/loginpage.css';
import Login from "../components/login";


const Loginpage=()=>{
    return(
        <div>
        <Header/>
        <div className="loginpage">
        <Login />
        <div className="image-holder">
            <img className="Hello-image"  src={require('../assets/hello.png')} />
        </div>
        </div>
        </div>
    )
}

export default Loginpage;