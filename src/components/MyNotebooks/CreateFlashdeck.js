import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiPrivate from "../../apis/apiPrivate";

export default function CreateFlashdeck({ setShowCreateFlashdeck, color, notebook }) {
    const [title, setTitle] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    // Create flashdeck
    const createFlashdeck = async () => {
        try {
            const { data } = await apiPrivate.post("/createFlashDeck", {
                notebook_id: notebook.id,
                title
            });
            navigate(`/my-notebooks/deck/${data.flashdeck_id}`, {
                state: { deckID: data.flashdeck_id, notebook, deckTitle: title },
            })
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    // Handle the change of the form
    function handleChange(event) {
        setError(null);
        setTitle(event.target.value)
    }
    
    return (
        <div className="create-flashdeck--background">
            <div className="create-flashdeck--container">
                <div className="create-flashdeck--title">
                    <h2 style={{ color }}>Create a new flashdeck</h2>
                    <button 
                        style={{ color }} 
                        className="close-button" 
                        onClick={() => setShowCreateFlashdeck(false)}
                    >✕</button>
                </div>

                <div className="create-flashdeck--input-container">
                    <label htmlFor="title" className="label--create-notebook">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleChange}
                        className={`input--create-new-notebook${error ? " border-error" : ""}`}
                        style={{ outlineColor: isFocused ? color : "" }}
                        onFocus={() => setIsFocused(true)}
                    />
                </div>
                {error && <p className="error-p" style={{ marginTop: "-15px" }}>{error}</p>}
                
                <button 
                    className="purple-button disabled-purple-button" 
                    style={{ backgroundColor: title !== "" ? color : darkenHexColor(color, 0.4) }}
                    onClick={createFlashdeck}
                >Create</button>
            </div>
        </div>
    )
}