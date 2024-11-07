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
                <h1 className="sign-in-up-title">Sign in</h1>
                <div className="form-section">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input 
                        className="input--sign-in-up" 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-section">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input 
                        className="input--sign-in-up" 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}    
                    />
                </div>
                <button className="button--sign-in-up">Sign In</button>
            </form>
        </div>
    )
}