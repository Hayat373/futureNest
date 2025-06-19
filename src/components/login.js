import React from "react";
import '../css/login.css'

const Login=()=>{
    return(
        <div className="conatiner">

            <h1>Login</h1>
            <div className="form_group field">
    <input type="text" className="form_field" placeholder="User Name" required />
    <label htmlFor="name" className="form_label">User Name</label>
    <br/>
    <input  id="passwordinput"type="password" className="form_field" placeholder="password" required />
    <label id="password" htmlFor="password" className="form_label">Password</label>

</div>

 <div className="links">
                <a href="#" className="link">Forgot Password?</a>
                <a  id="sign" href="#" className="link">Sign Up</a>
            </div>

             <button className="submit_button">Login</button>
           
            
        </div>
    )
};

export default Login;