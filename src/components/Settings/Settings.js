import React, { useState } from 'react';
import NotebookTitle from '../NotebookTitle';
import validators from '../../helpers/validators';
import useUserContext from '../../hooks/useUserContext';
import apiPrivate from '../../apis/apiPrivate';
import useSignout from '../../hooks/useSignout';

export default function Settings() {
    const [error, setError] = useState(null);
    const { userInfo, setUserInfo } = useUserContext();
    const [formData, setFormData] = useState({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        phone_number: userInfo.phone_number,
        old_password: "",
        password: "",
        confirm_password: ""
    });
    const [areEmptyFieldsProfile, setAreEmptyFieldsProfile] = useState(false);
    const [areEmptyFieldsPassword, setAreEmptyFieldsPassword] = useState(false);
    const { areEmptyFields, isValidPassword, isValidNumber } = validators;
     const { signOut } = useSignout(); 

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

    // Change name
    const changeName = async () => {
        const params = {};

        if (userInfo.first_name !== formData.first_name) {
            params.first_name = formData.first_name;
        }

        if (userInfo.last_name !== formData.last_name) {
            params.last_name = formData.last_name;
        }

        if (Object.entries(params).length !== 0) {
            try {
                await apiPrivate.put(`/user/changeName`, {}, { params });
                const updatedInfo = {
                    first_name: formData.first_name,
                    last_name: formData.last_name
                };
                setUserInfo(prev => {
                    return {
                        ...prev,
                        ...updatedInfo
                    }
                });         
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Change phone number
    const changePhoneNumber = async () => {
        if (userInfo.phone_number !== formData.phone_number) {
            try {
                await apiPrivate.put(`/user/changePhoneNumber`, {
                    "phone_number": formData.phone_number          
                });
    
                setUserInfo(prev => {
                    return {
                        ...prev,
                        phone_number: formData.phone_number
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Change password
    const changePassword = async () => {
        try {
            await apiPrivate.put(`/user/changePassword`, {
                "old_password": formData.old_password,
                "new_password": formData.password,
                "confirm_password": formData.confirm_password                
            });
            signOut();
        } catch (error) {
            setError({ password: "Incorrect Password." });
        }
    }

    // Handle the saving of the profile section
    async function handleProfileSave(event) {
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
        
        if (!areEmpty && Object.entries(errorObj).length === 0) {
            await changeName();
            await changePhoneNumber();
        }
    }
    
    // Handle the saving of the password section
    async function handlePasswordSave(event) {
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

        if (!areEmpty && Object.entries(errorObj).length === 0) {
            await changePassword();
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