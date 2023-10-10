import React from 'react';
import './Login.css';
//import { Button } from './Register/Button.js';
import { useState } from 'react';

const Login = () => {

    const[action,setAction]= useState("Sign up");

    return (
       <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="Email" placeholder=' Email'/>
                </div>
                <div className="input">
                    <input type="Password" placeholder=' Password' />
                </div>
            </div>
            <div className="forgot-password">Lost password?<span> Click Here!</span></div>
            <div className="submit-container">
                <div className={action==="Sign Up"?"submit gray":"submit"}>Login</div>
            </div>
       </div>
    );
}

export default Login;
