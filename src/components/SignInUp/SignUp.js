import React, { useState } from 'react';

export default function SignUp() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: ""
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
        <div className="form-container--sign-in-up sign-up-container">
            <form className="form--sign-in-up">
                <h1>Sign Up</h1>
                {/* <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span> */}
                <input 
                    className="input--sign-in-up" 
                    type="text" 
                    placeholder="First Name" 
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    />
                <input 
                    className="input--sign-in-up" 
                    type="text" 
                    name="last_name"
                    placeholder="Last Name" 
                    value={formData.last_name}
                    onChange={handleChange}
                />
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
                    type="username" 
                    name="username"
                    placeholder="Username" 
                    value={formData.username}
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
                <input 
                    className="input--sign-in-up" 
                    type="password" 
                    name="confirm_password"
                    placeholder="Confirm Password" 
                    value={formData.confirm_password}
                    onChange={handleChange}
                />
                <button className="button--sign-in-up">Sign Up</button>
            </form>
        </div>
    )
}