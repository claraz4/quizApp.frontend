import React, { useState, useRef } from 'react';
import ColorSelect from './ColorSelect';
import MultiCheckbox from './MultiCheckbox.js';
import { Switch } from '@mui/material'
import NotebookTitle from '../NotebookTitle.js';
import apiPrivate from '../../apis/apiPrivate.js';
import colors from '../../data/colors.js';

export default function CreateNotebook() {
    const [formData, setFormData] = useState({
        title: "",
        color: colors[0],
        courses: [],
        groups: []
    });
    const [isShared, setIsShared] = useState(false);
    const [isPersonal, setIsPersonal] = useState(true);
    const [isPublic, setIsPublic] = useState(false);

    // These are the references to each input for when an error occurs
    const refs = {
        title: useRef(null),
        courses: useRef(null),
        groups: useRef(null)
      };
    const [error, setError] = useState(null)
    
    // Create user notebook
    const createUserNotebook = async () => {
        try {
            await apiPrivate.post("/user/createNotebook", { ...formData, is_public: isPublic });
        } catch (error) {
            console.log(error);
        }
    }

    // Create group notebook
    const createGroupNotebook = async (form) => {
        try {
            await apiPrivate.post("/team/createNotebook", form);
        } catch (error) {
            console.log(error);
        }
    }

    // Check that the form data is filled
    function isValidNotebook(formData) {
        const { title, courses, groups } = formData;
        const errorCopy = {};
        const errorMessage = "All required fields must be filled.";
        let isValid = true;

        if (title === "") {
            errorCopy["title"] = errorMessage;
            isValid = false;
        };
        
        if (courses.length === 0) {
            errorCopy["courses"] = errorMessage;
            isValid = false;
        };
        
        if (isShared && groups.length === 0) {
            errorCopy["groups"] = errorMessage;
            isValid = false;
        }
        setError(errorCopy);

        if (!isValid) {
            // scroll to the first error you find
            const firstError = Object.keys(errorCopy)[0];
            refs[firstError].current.scrollIntoView({ behavior: "smooth", block: "center" });
            refs[firstError].current.focus();
        }

        return isValid;
    }

    // Handle the sharing of the notebook
    function handleSharing() {
        setError(null);

        if (isShared) {
            // it was previously shared, it won't be anymore
            setIsPersonal(true);
        }

        setIsShared(prev => !prev);
    }

    // Handle the change in the form data
    function handleChange(event) {
        const { name, value } = event.target;
        setError(null);
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
        setError(null);
    }

    // Create the notebook
    async function handleCreate(event) {
        event.preventDefault();

        // Check the form data first
        if (isValidNotebook(formData)) {
            if (isPersonal) {
                await createUserNotebook();
            }
    
            if (isShared) {
                const formDataCopy = { ...formData };
                delete formDataCopy.groups;
    
                formData.groups.forEach(group => {
                    createGroupNotebook({
                        ...formDataCopy,
                        team_id: group
                    })
                })
            }
        }
    }

    return (
        <div className="page--container"> 
            <NotebookTitle 
                title2="Create a New Notebook"
            />

            <div className="sections--create-new-notebook">
                <div className="section--create-new-notebook flex-row" ref={refs.title}>
                    <label htmlFor="title" className="label--create-notebook">Title:</label>
                    <input
                        type="text"
                        value={formData.title}
                        placeholder="Notebook title"
                        onChange={handleChange}
                        name="title"
                        className={`input--create-new-notebook${error && error.title ? " border-error" : ""}`}
                    />
                </div>
                <div className="section--create-new-notebook flex-row">
                    <label htmlFor="visibility" className="label--create-notebook">Public Access:</label>
                    <Switch
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#7F56D9', // Thumb color when checked
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#B692F6', // Track color when checked
                            }
                        }}
                        checked={isPublic}
                        onChange={() => setIsPublic(prev => !prev)}
                    />
                </div>
                <div className="section--create-new-notebook flex-column align-start">
                    <label htmlFor="color" className="label--create-notebook">Color:</label>
                    <ColorSelect 
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
                <div className="section--create-new-notebook flex-column align-start">
                    <label htmlFor="courses" className="label--create-notebook" ref={refs.courses}>Courses:</label>
                    <MultiCheckbox 
                        setFormData={setFormData}
                        keyFormData={"courses"}
                        isCourses={true}
                        isError={error && error.courses ? true : false}
                        setError={setError}
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
                        onChange={handleSharing}
                    />
                </div>
                {isShared &&
                    <div className="section--create-new-notebook" ref={refs.groups}>
                        <p className="light-grey-p group-p-text">Select the groups you want to share this notebook with:</p>
                        <MultiCheckbox 
                            setFormData={setFormData}
                            keyFormData={"groups"}
                            isGroups={true}
                            isError={error && error.groups ? true : false}
                            setError={setError}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={!isPersonal}
                                onChange={() => setIsPersonal(prev => !prev)}
                            />
                            Don't assign to your personal notebooks
                        </label>
                    </div>
                }
                <div>
                    <button className="purple-button" onClick={handleCreate}>Create Notebook</button>
                    {error && <p className="error-p">{error[Object.keys(error)[0]]}</p>}
                </div>
            </div>
        </div>
    )
}