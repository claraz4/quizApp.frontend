import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreateFlashdeck({ setShowCreateFlashdeck }) {
    const [title, setTitle] = useState("");

    return (
        <div className="create-flashdeck--background">
            <div className="create-flashdeck--container">
                <div className="create-flashdeck--title">
                    <h2>Create a new flashdeck</h2>
                    <button className="close-button" onClick={() => setShowCreateFlashdeck(false)}>✕</button>
                </div>

                <div className="create-flashdeck--input-container">
                    <label htmlFor="title" className="label--create-notebook">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.value)}
                        className="input--create-new-notebook"
                    />
                </div>
                
                <Link to={`/flashdeck/${title.replace(' ', '-')}`} className="purple-button">Create</Link>
            </div>
        </div>
    )
}