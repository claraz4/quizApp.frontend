import React, { useState } from 'react';
import NotebookTitle from '../NotebookTitle';
import validators from '../../helpers/validators';

export default function Settings() {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        old_password: "",
        password: "",
        confirm_password: ""
    });
    const [areEmptyFieldsProfile, setAreEmptyFieldsProfile] = useState(false);
    const [areEmptyFieldsPassword, setAreEmptyFieldsPassword] = useState(false);
    const { areEmptyFields, isValidPassword, isValidNumber } = validators;

    // Handle form change
    function handleChange(event) {
        const { name, value } = event.target;

        setAreEmptyFieldsProfile(false);
        setAreEmptyFieldsPassword(false);
        setError(null);
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Handle the saving of the profile section
    function handleProfileSave(event) {
        event.preventDefault();
        const profileData = { ...formData };
        delete profileData.old_password;
        delete profileData.password;
        delete profileData.confirm_password;

        const areEmpty = areEmptyFields(profileData, setError, setAreEmptyFieldsProfile); // Check that there are no empty fields
        const errorObj = {};

        if (!areEmpty) {
            isValidNumber(formData.phone_number, errorObj);
            setError(errorObj);
        }
    }
    
    // Handle the saving of the password section
    function handlePasswordSave(event) {
        event.preventDefault();
        const passwordData = { ...formData };
        delete passwordData.first_name;
        delete passwordData.last_name;
        delete passwordData.phone_number;
    
        const areEmpty = areEmptyFields(passwordData, setError, setAreEmptyFieldsPassword); // Check that there are no empty fields
        
        const errorObj = {};

        if (!areEmpty) {
            isValidPassword(formData.password, formData.confirm_password, errorObj, true);
            setError(errorObj);
        }
    }

    return (
        <div className="page--container" id="settings-page--container">
            <NotebookTitle 
                title2="Settings"
            />

            <form id="form-settings--container">
                <h2>Profile</h2>
                <hr></hr>
                <div className="sub-section--settings">
                    <div className="form-section--settings">
                        <label className="label--create-notebook">Name:</label>
                        <div className="name-container--setings">
                            <input 
                                className={`input--create-new-notebook${ error && error.first_name ? " border-error" : ""}`} 
                                type="text" 
                                placeholder="First Name" 
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            <input 
                                className={`input--create-new-notebook${ error && error.last_name ? " border-error" : ""}`} 
                                type="text" 
                                name="last_name"
                                placeholder="Last Name" 
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                
                    <div className="form-section--settings">
                        <label className="label--create-notebook" htmlFor="phone_number">Phone Number:</label>
                        <input 
                            className={`input--create-new-notebook${ error && error.phone_number ? " border-error" : ""}`} 
                            type="number" 
                            name="phone_number"
                            placeholder="Number" 
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </div>

                    {error && !areEmptyFieldsProfile && error.phone_number && <p className="error-p error-p-settings">{error.phone_number}</p>}
                    {error && areEmptyFieldsProfile && <p className="error-p error-p-settings">{error[Object.keys(error)[0]]}</p>}
                    <button className="purple-button save-button--settings" onClick={handleProfileSave}>Save Changes</button>
                </div>
        
                <div>
                    <h2>Security</h2>
                    <hr></hr>
                    <div className="sub-section--settings">
                        <div className="form-section--settings">
                            <label className="label--create-notebook">Password:</label>
                            <div className="password-inputs--container">
                                <input 
                                    className={`input--create-new-notebook${ error && (error.password || error.confirm_password) ? " border-error" : ""}`} 
                                    type="password" 
                                    name="old_password"
                                    placeholder="Old Password" 
                                    value={formData.old_password}
                                    onChange={handleChange}    
                                />
                                <input 
                                    className={`input--create-new-notebook${ error && (error.password || error.confirm_password) ? " border-error" : ""}`} 
                                    type="password" 
                                    name="password"
                                    placeholder="New Password" 
                                    value={formData.password}
                                    onChange={handleChange}    
                                />
                                <input 
                                    className={`input--create-new-notebook${ error && (error.password || error.confirm_password) ? " border-error" : ""}`} 
                                    type="password" 
                                    name="confirm_password"
                                    placeholder="Confirm Password" 
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {error && !areEmptyFieldsPassword && (error.password || error.confirm_password) && <p className="error-p error-p-settings">{error.password || error.confirm_password}</p>}
                        {error && areEmptyFieldsPassword && <p className="error-p error-p-settings">{error[Object.keys(error)[0]]}</p>}
                        <button className="purple-button save-button--settings" onClick={handlePasswordSave}>Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    )
}