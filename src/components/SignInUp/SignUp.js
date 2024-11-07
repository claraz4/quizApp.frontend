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
                <h1 className="sign-in-up-title">Sign Up</h1>

                <div className="form-section">
                    <label className="form-label">Name:</label>
                    <div className="name--container">
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
                    </div>
                </div>
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
                    <label className="form-label" htmlFor="username">Username:</label>
                    <input 
                        className="input--sign-in-up" 
                        type="username" 
                        name="username"
                        placeholder="Username" 
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-section">
                    <label className="form-label">Password:</label>
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
                </div>
                <button className="button--sign-in-up">Sign Up</button>
            </form>
        </div>
    )
}