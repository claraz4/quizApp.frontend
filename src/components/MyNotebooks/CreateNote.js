import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreateNote({ setShowCreateNote }) {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const fileRef = useRef(null);

    // Check that all the information are inputted
    useEffect(() => {
        setIsReady(title !== "" && selectedFile);
    }, [selectedFile, title])

    // Choose the inputed file
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    // Handle choose file click
    function handleClick(event) {
        event.preventDefault();
        if (fileRef) {
            fileRef.current.click();
        }
    }
    
    return (
        <div className="create-flashdeck--background">
            <div className="create-flashdeck--container">
                <div className="create-flashdeck--title">
                    <h2>Upload a new note</h2>
                    <button className="close-button" onClick={() => setShowCreateNote(false)}>✕</button>
                </div>

                <div className="create-flashdeck--input-container">
                    <label htmlFor="title" className="label--create-notebook">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input--create-new-notebook"
                    />
                </div>

                <div className="create-flashdeck--input-container">
                    <label htmlFor="pdf-upload" className="label--create-notebook">Note:</label>
                    <input
                        type="file"
                        id="pdf-upload"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="input--create-new-notebook"
                        style={{ display: "none" }}
                        ref={fileRef}
                    />
                    <div className="choose-file-button--container">
                        <button onClick={handleClick}>Choose a file</button>
                        <p>{selectedFile ? selectedFile.name : "No file chosen" }</p>
                    </div>
                </div>
                
                {isReady 
                    ?
                    <Link 
                        to={`/my-notebooks/1/${title.replace(' ', '-')}`} 
                        className="purple-button"
                    >Create</Link>
                    :
                    <button className="purple-button disabled-purple-button">Create</button>
                }
            </div>
        </div>
    )
}