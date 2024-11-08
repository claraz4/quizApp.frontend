import React, { useState } from 'react';
import ColorSelect from './ColorSelect';
import MultiCheckbox from './MultiCheckbox.js';
import { Switch } from '@mui/material'

export default function CreateNotebook() {
    const [formData, setFormData] = useState({
        name: "",
        courses: [],
        groups: []
    });
    const [isShared, setIsShared] = useState(false);

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
        <div className="page--container"> 
            <h1 className="page--title">Create a new notebook</h1>

            <div className="sections--create-new-notebook">
                <div className="section--create-new-notebook flex-row">
                    <label htmlFor="name" className="label--create-notebook">Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        placeholder="Notebook name"
                        onChange={handleChange}
                        name="name"
                        className="input--create-new-notebook"
                    />
                </div>
                <div className="section--create-new-notebook flex-column align-start">
                    <label htmlFor="color" className="label--create-notebook">Color:</label>
                    <ColorSelect />
                </div>
                <div className="section--create-new-notebook flex-column align-start">
                    <label htmlFor="courses" className="label--create-notebook">Courses:</label>
                    <MultiCheckbox 
                        setFormData={setFormData}
                        keyFormData={"courses"}
                        isCourses={true}
                    />
                </div>
                <div className="section--create-new-notebook flex-row">
                    <label htmlFor="share" className="label--create-notebook">Share with group:</label>
                    <Switch
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#7F56D9', // Thumb color when checked
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#B692F6', // Track color when checked
                            }
                        }}
                        checked={isShared}
                        onChange={() => setIsShared(prev => !prev)}
                    />
                </div>
                {isShared &&
                    <div className="section--create-new-notebook">
                        <p className="light-grey-p group-p-text">Select the groups you want to share this notebook with:</p>
                        <MultiCheckbox 
                            setFormData={setFormData}
                            keyFormData={"groups"}
                            isGroups={true}
                        />
                        <label>
                            <input
                                type="checkbox"
                            />
                            Don't assign to your personal notebooks
                        </label>
                    </div>
                }
                <button className="purple-button">Create Notebook</button>
            </div>
        </div>
    )
}