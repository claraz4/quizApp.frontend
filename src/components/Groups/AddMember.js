import React, { useState } from 'react';
import apiPrivate from "../../apis/apiPrivate";

export default function AddMember({ setShowAddMember }) {
    const [member, setMember] = useState("");
    
    // Handle the change of the form
    function handleChange(event) {
        setMember(event.target.value)
    }

    // Add the member
    const addMember = async () => {
        if (member !== "") {
            try {
                await apiPrivate.post(`/team/addMember?user_id=${2}&team_id=${3}`)
            } catch (error) {
                console.log(error);
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
                        className={`input--create-new-notebook`}
                    />
                </div>
                
                <button 
                    className={`purple-button${member !== "" ? "" : " disabled-purple-button"}`} 
                    onClick={addMember}
                    style={{ alignSelf: "center" }}
                >Send Invitation</button>
            </div>
        </div>
    )
}