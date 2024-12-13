import React, { useEffect, useMemo, useState } from 'react';
import api from "../../apis/api";
import useRefreshTokenContext from '../../hooks/useRefreshTokenContext';
import validators from '../../helpers/validators';
import { Link } from 'react-router-dom';

export default function SignIn({ isSignIn }) {
    const emptyForm = useMemo(() => {
        return {
            login_credential: "",
            password: ""
        }
    }, []); // for it to avoid rerendering the useEffect every time

    const [formData, setFormData] = useState(emptyForm);
    const { setRefreshToken } = useRefreshTokenContext();
    const [error, setError] = useState(null);
    const errorMessage = "Invalid email or password.";
    const [areEmptyFieldsValue, setAreEmptyFieldsValue] = useState(false);

    const { isValidPassword, areEmptyFields } = validators;

    // Reset the form every time we switch to sign up
    useEffect(() => {
        if(!isSignIn) {
            setFormData(emptyForm);
            setError(null);
            setAreEmptyFieldsValue(false);
        };
    }, [isSignIn, emptyForm]);

    // API to sign in
    const signIn = async () => {
        try {
            const { data } = await api.post("/login", formData);
            setRefreshToken(data.refresh);
        } catch (error) {
            setError(error.response.data);
        }
    }

    function handleChange(event) {
        setError(null);
        setAreEmptyFieldsValue(false);
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

        if (areEmptyFields(formData, setError, setAreEmptyFieldsValue)) return;

        if (isValidPassword(formData.password, formData.password, {}, false)) {
            await signIn();
        } else {
            setError(errorMessage);
        }
    }

    return (
        <div className="form-container--sign-in-up sign-in-container">
            <form className="form--sign-in-up">
                <h1 className="sign-in-up-title">Sign in</h1>
                <div className="form-section">
                    <label className="form-label" htmlFor="login_credential">Email or Phone Number:</label>
                    <input 
                        className={`input--sign-in-up${error ? " border-error" : ""}`} 
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
                        className={`input--sign-in-up${error ? " border-error" : ""}`} 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}    
                        />
                        <Link to="/forgot-password" id="forgot-password">Forgot password?</Link>
                </div>
                {(areEmptyFieldsValue || error) && <p className="error-p error-p-sign-in">{areEmptyFieldsValue ? error[Object.keys(error)[0]] : error}</p>}
                <button className="button--sign-in-up" onClick={handleSubmit}>Sign In</button>
            </form>
        </div>
    )
}