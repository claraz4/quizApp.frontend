import React, { useEffect, useRef, useState } from 'react';
import apiPrivate from '../../apis/apiPrivate';

export default function CreateNote({ notebook, setShowCreateNote, setFetchAgain }) {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const fileRef = useRef(null);
    const { color } = notebook;
    const [isFocused, setIsFocused] = useState(false);
    const [isHoveredChoose, setIsHoveredChoose] = useState(false);
    const [isHoveredCreate, setIsHoveredCreate] = useState(false);
    const [error, setError] = useState(null);
    
    function darkenHexColor(hex, factor = 0.2) {
        // Ensure the hex color is in the correct format
        hex = hex.replace('#', '');
    
        // If it's shorthand hex (e.g., #FFF), expand it to full form (#FFFFFF)
        if (hex.length === 3) {
            hex = hex.split('').map(x => x + x).join('');
        }
    
        // Extract red, green, blue components
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
    
        // Darken the colors by the factor (range from 0 to 1, 0 = no darkening, 1 = completely dark)
        const darken = (color) => Math.max(0, Math.min(255, color * (1 - factor)));
    
        const darkenedR = darken(r);
        const darkenedG = darken(g);
        const darkenedB = darken(b);
    
        // Return the rgba value with the specified alpha
        return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
    }

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

    // Create the note
    const createNote = async (event) => {
        event.preventDefault();
        if (isReady) {
            try {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('file_link', selectedFile); 
                formData.append('notebook', notebook.id);
    
                // Send FormData as the request body
                await apiPrivate.post("create_note/", formData);
                setFetchAgain(true);
                setShowCreateNote(false); // Close the form on success
            } catch (error) {
                setError(error.response?.data?.error || "An unexpected error occurred.");
            }
        }
    };    
    
    return (
        <div className="create-flashdeck--background">
            <form className="create-flashdeck--container" encType="multipart/form-data">
                <div className="create-flashdeck--title">
                    <h2 style={{ color: notebook.color }}>Upload a new note</h2>
                    <button style={{ color: notebook.color }} className="close-button" onClick={() => setShowCreateNote(false)}>✕</button>
                </div>

                <div className="create-flashdeck--input-container">
                    <label htmlFor="title" className="label--create-notebook">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input--create-new-notebook"
                        style={{ outlineColor: isFocused ? color : "" }}
                        onFocus={() => setIsFocused(true)}
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
                        <button 
                            onClick={handleClick} 
                            style={{ backgroundColor: isHoveredChoose ? darkenHexColor(color, 0.4) : color }}
                            onMouseEnter={() => setIsHoveredChoose(true)}
                            onMouseLeave={() => setIsHoveredChoose(false)}
                        >Choose a file</button>
                        <p>{selectedFile ? selectedFile.name : "No file chosen" }</p>
                    </div>
                </div>
                {error && <p className="error-p" style={{ marginTop: "-15px" }}>{error}</p>}
                
                <button 
                    className="purple-button disabled-purple-button" 
                    onClick={createNote}
                    style={{ backgroundColor: (!isReady || isHoveredCreate) ? darkenHexColor(color, 0.4) : color }}
                    onMouseEnter={() => setIsHoveredCreate(true)}
                    onMouseLeave={() => setIsHoveredCreate(false)}
                >Create</button>
            </form>
        </div>
    )
}