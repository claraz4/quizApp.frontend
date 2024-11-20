import React, { useState } from 'react';
import api from "../../apis/api";
import useRefreshTokenContext from '../../hooks/useRefreshTokenContext';

export default function SignIn() {
    const [formData, setFormData] = useState({
        login_credential: "",
        password: ""
    });
    const { setRefreshToken } = useRefreshTokenContext();

    // API to sign in
    const signIn = async () => {
        try {
            const { data } = await api.post("/login", formData);
            setRefreshToken(data.refresh);
        } catch (error) {
            console.log(error);
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

    // Handle the submit of the form
    async function handleSubmit(event) {
        event.preventDefault();
        await signIn();
    }

    return (
        <div className="form-container--sign-in-up sign-in-container">
            <form className="form--sign-in-up">
                <h1 className="sign-in-up-title">Sign in</h1>
                <div className="form-section">
                    <label className="form-label" htmlFor="login_credential">Email or Phone Number:</label>
                    <input 
                        className="input--sign-in-up" 
                        type="text" 
                        name="login_credential"
                        placeholder="Email or Number" 
                        value={formData.login_credential}
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
                <button className="button--sign-in-up" onClick={handleSubmit}>Sign In</button>
            </form>
        </div>
    )
}