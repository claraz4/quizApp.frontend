import React, { useState } from 'react';

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <div className="form-container--sign-in-up sign-in-container">
            <form className="form--sign-in-up">
                <h1>Sign in</h1>
                {/* <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account</span> */}
                <input 
                    className="input--sign-in-up" 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange}
                />
                <input 
                    className="input--sign-in-up" 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange}    
                />
                {/* <a href="#">Forgot your password?</a> */}
                <button className="button--sign-in-up">Sign In</button>
            </form>
        </div>
    )
}