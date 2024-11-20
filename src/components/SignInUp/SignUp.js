import React, { useState, useMemo, useEffect } from 'react';
import api from '../../apis/api';
import validators from '../../helpers/validators';

export default function SignUp({ isSignIn }) {
    const emptyForm = useMemo(() => {
        return {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            phone_number: "",
            confirm_password: ""
        }
    }, []); // for it to avoid rerendering the useEffect every time

    const [formData, setFormData] = useState(emptyForm);
    const [error, setError] = useState(null);
    const [areEmptyFieldsValue, setAreEmptyFieldsValue] = useState(null);
    const { validateForm } = validators;

    // Reset the form every time we switch to sign in
    useEffect(() => {
        if(!isSignIn) {
            setFormData(emptyForm);
            setError(null);
        };
    }, [isSignIn, emptyForm]);

    // API to sign up
    const signUp = async () => {
        try {
            await api.post('/signup', formData);
        } catch (error) {
            console.log(error.response.data)
            setError(error.response.data);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Handle the submission of the form
    async function handleSubmit(event) {
        event.preventDefault();

        if (validateForm(formData, setError, setAreEmptyFieldsValue)) {
            await signUp();
        }
    }

    return (
        <div className="form-container--sign-in-up sign-up-container">
            <form className="form--sign-in-up">
                <h1 className="sign-in-up-title">Sign Up</h1>

                <div className="form-section">
                    <label className="form-label">Name:</label>
                    <div className="name--container">
                        <input 
                            className={`input--sign-in-up${ error && error.first_name ? " border-error" : ""}`} 
                            type="text" 
                            placeholder="First Name" 
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <input 
                            className={`input--sign-in-up${ error && error.last_name ? " border-error" : ""}`} 
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
                        className={`input--sign-in-up${ error && error.email ? " border-error" : ""}`} 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {error && error.email && <p className="error-p error-p-sign-in">{error.email}</p>}
                </div>
                <div className="form-section">
                    <label className="form-label" htmlFor="phone_number">Phone Number:</label>
                    <input 
                        className={`input--sign-in-up${ error && error.phone_number ? " border-error" : ""}`} 
                        type="number" 
                        name="phone_number"
                        placeholder="Number" 
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                    {error && error.phone_number && <p className="error-p error-p-sign-in">{error.phone_number}</p>}
                </div>
                <div className="form-section">
                    <label className="form-label" htmlFor="username">Username:</label>
                    <input 
                        className={`input--sign-in-up${ error && error.username ? " border-error" : ""}`} 
                        type="username" 
                        name="username"
                        placeholder="Username" 
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {error && error.username && <p className="error-p error-p-sign-in">{error.username}</p>}
                </div>
                <div className="form-section">
                    <label className="form-label">Password:</label>
                    <input 
                        className={`input--sign-in-up${ error && error.password ? " border-error" : ""}`} 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}    
                    />
                    <input 
                        className={`input--sign-in-up${ error && error.confirm_password ? " border-error" : ""}`} 
                        type="password" 
                        name="confirm_password"
                        placeholder="Confirm Password" 
                        value={formData.confirm_password}
                        onChange={handleChange}
                    />
                    {error && error.password && <p className="error-p error-p-sign-in">{error.password}</p>}
                </div>
                {error && areEmptyFieldsValue && <p className="error-p error-p-sign-in">{error[Object.keys(error)[0]]}</p>}
                <button className="button--sign-in-up" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}