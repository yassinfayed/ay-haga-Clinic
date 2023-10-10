import React from 'react';
import './Register.css';
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
                    <input type="Username" placeholder=' Username' />
                </div>
                <div className="input">
                    <input type="Name" placeholder=' Name' />
                </div>
                <div className="input">
                    <input type="Email" placeholder=' Email'/>
                </div>
                <div className="input">
                    <input type="Password" placeholder=' Password' />
                </div>
                <div className="input">
                    <input type="Password" placeholder=' Educational Background' />
                </div>
                <div className="input">
                    <input type="Password" placeholder=' Affiliation' />
                </div>
                <div className="input">
                    <input type="Password" placeholder=' Hourly rate' />
                </div>
            </div>
            <div className="forgot-password">Lost password?<span> Click Here!</span></div>
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"}>Login</div>
            </div>
       </div>
    );
}

export default Login;
