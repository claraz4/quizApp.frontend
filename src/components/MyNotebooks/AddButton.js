import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateFlashdeck from './CreateFlashdeck';
import CreateNote from './CreateNote';

export default function AddButton({ buttonColor, showCreateFlashdeck, showCreateNote, showUpload, setShowCreateFlashdeck, setShowCreateNote, setShowUpload }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // to convert the hex colors into rgba and be able to change the opacity
    const darkenHex= (hex, amount) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        // Subtract the amount and use Math.max to avoid going below 0
        const newR = Math.max(0, r - amount);
        const newG = Math.max(0, g - amount);
        const newB = Math.max(0, b - amount);

        // Convert the new values back to hex and pad them to 2 digits
        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    };
    
    // Handle the click of the add button
    function handleClick(event) {
        event.stopPropagation();
        setShowUpload(prev => !prev);
    } 

    // Handle the click of any of the upload
    function handleUpload(event, component) {
        event.stopPropagation();

        if (component === "note") {
            setShowCreateNote(true);
        } else if (component === "flashdeck") {
            setShowCreateFlashdeck(true);
        }
    }

    return (
        <div>            
            <button 
                className="add-button" 
                onClick={handleClick} 
                style={{ 
                    backgroundColor: isHovered ? darkenHex(buttonColor, 25) : buttonColor
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <p>+</p>
            </button>
            {showUpload && 
                <div className="upload-options--container">
                    <button className="upload-option--container" onClick={(event) => handleUpload(event, "note")}>
                        <span className="material-symbols-outlined">note</span>
                        <p>Upload Note</p>
                    </button>
                    <Link to="/create-quiz" className="upload-option--container">
                        <span className="material-symbols-outlined">quiz</span>
                        <p>Create Quiz</p>
                    </Link>
                    <button className="upload-option--container" onClick={(event) => handleUpload(event, "flashdeck")}>
                        <span className="material-symbols-outlined">note_stack</span>
                        <p>Create Flashdeck</p>
                    </button>
    
                    {showCreateFlashdeck &&
                        <CreateFlashdeck 
                            setShowCreateFlashdeck={setShowCreateFlashdeck}
                        />
                    }
    
                    {showCreateNote &&
                        <CreateNote 
                            setShowCreateNote={setShowCreateNote}
                        />
                    }
                </div>
            }
        </div>
    )
}