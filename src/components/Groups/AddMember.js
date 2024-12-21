import React, { useState } from 'react';
import apiPrivate from "../../apis/apiPrivate";

export default function AddMember({ group, setShowAddMember }) {
    const [member, setMember] = useState("");
    const [error, setError] = useState(null);
    
    // Handle the change of the form
    function handleChange(event) {
        setError(null);
        setMember(event.target.value)
    }

    // Add the member
    const addMember = async () => {
        if (member !== "") {
            try {
                await apiPrivate.post(`/team/addMember?email=${member}&team_id=${group.id}`)
            } catch (error) {
                setError("User not found.");
            }
        }
    }
    
    return (
        <div className="create-flashdeck--background">
            <div className="create-flashdeck--container">
                <div className="create-flashdeck--title">
                    <h2>Add a Member</h2>
                    <button 
                        className="close-button" 
                        onClick={() => setShowAddMember(false)}
                    >✕</button>
                </div>

                <div className="create-flashdeck--input-container">
                    <label htmlFor="title" className="label--create-notebook">Email:</label>
                    <input
                        type="text"
                        value={member}
                        onChange={handleChange}
                        className={`input--create-new-notebook${error ? " border-error" : ""}`}
                    />
                </div>
                {error && <p className="error-p" style={{ marginTop: "-14px" }}>{error}</p>}
                
                <button 
                    className={`purple-button${member !== "" ? "" : " disabled-purple-button"}`} 
                    onClick={addMember}
                    style={{ alignSelf: "center" }}
                >Send Invitation</button>
            </div>
        </div>
    )
}