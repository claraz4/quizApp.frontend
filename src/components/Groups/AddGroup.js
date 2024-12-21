import React, { useState } from 'react';
import apiPrivate from '../../apis/apiPrivate';

export default function AddGroup({ setGroupAdded }) {
    const [showAdd, setShowAdd] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState(null);

    // Handle title change
    function handleChange(event) {
        setError(null);
        setName(event.target.value);
    }

    // Create a group
    const createGroup = async () => {
        try {
            await apiPrivate.post("/user/createTeam", {
                name
            });
            setGroupAdded(true);
            setShowAdd(false);
            setName("");
        } catch (error) {
            setError("This team name already exists.");
        }
    }

    return (
        <div>
            <button 
                className="add-button" 
                onClick={() => setShowAdd(true)} 
            >
                <p>+</p>
            </button>

            {showAdd && 
            <div className="create-flashdeck--background">
                <div className="create-flashdeck--container">
                    <div className="create-flashdeck--title">
                        <h2>Create a new group</h2>
                        <button 
                            className="close-button" 
                            onClick={() => setShowAdd(false)}
                        >✕</button>
                    </div>
    
                    <div className="create-flashdeck--input-container">
                        <label htmlFor="title" className="label--create-notebook">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleChange}
                            className={`input--create-new-notebook${error ? " border-error" : ""}`}
                        />
                    </div>
                    {error && <p className="error-p" style={{ marginTop: "-15px" }}>{error}</p>}
                    
                    <button 
                        className={`purple-button${name === "" ? " disabled-purple-button" : ""}`} 
                        style={{ alignSelf: "center" }}
                        onClick={createGroup}
                    >Create</button>
                </div>
            </div>
            }
        </div>
    )
}