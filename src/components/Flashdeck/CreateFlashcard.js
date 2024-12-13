import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotebookTitle from '../NotebookTitle';

export default function CreateFlashcard({ setShowCreateFlashcard }) {
    const emptyFormData = {
        title: "",
        prompt: "",
        answer: "",
        difficulty: 0
    };
    const [formData, setFormData] = useState(emptyFormData);
    
    // Handle the user inputs
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Change the difficulty
    function handleDifficulty(level) {
        setFormData(prev => {
            return {
                ...prev,
                difficulty: level
            }
        })
    }

    // Reset the form
    function resetForm() {
        setFormData(emptyFormData);
    }

    return (
        <div className="page--container create-flashcard--container">
                <NotebookTitle 
                    title1={"Flashdeck Name"}
                    link1={"/my-notebooks/1/flashdeck-name"}
                    title2={"Create Flashcard"}
                />
                
                <div className="create-flashcard--input-container">
                    <label htmlFor="title" className="label--create-notebook">Title:</label>
                    <input
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="input--create-new-notebook"
                    />
                </div>

                <div className="create-flashcard--input-container">
                    <label htmlFor="question" className="label--create-notebook">Question:</label>
                    <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        className="textarea--create-flashcard"
                    />
                </div>

                <div className="create-flashcard--input-container">
                    <label htmlFor="answer" className="label--create-notebook">Answer:</label>
                    <textarea
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        className="textarea--create-flashcard"
                    />
                </div>
            
                <div className="create-flashcard--input-container">
                    <label htmlFor="difficulty" className="label--create-notebook">Difficulty:</label>

                    <div className="create-flashcard--chips-container">
                        <button 
                            className={`purple-chip${formData.difficulty === 0 ? " purple-chip--selected" : ""}`}
                            onClick={() => handleDifficulty(0)}
                        >Easy</button>
                        <button 
                            className={`purple-chip${formData.difficulty === 1 ? " purple-chip--selected" : ""}`}
                            onClick={() => handleDifficulty(1)}
                        >Medium</button>
                        <button 
                            className={`purple-chip${formData.difficulty === 2 ? " purple-chip--selected" : ""}`}
                            onClick={() => handleDifficulty(2)}
                        >Hard</button>
                    </div>
                </div>
                
                <div className="create-flashcard--buttons-container">
                    <Link to={`/my-notebooks/1/flashdeck-name`} className="purple-button">Save Flashcard</Link>
                    <Link 
                        to={"/my-notebooks/1/flashdeck-name/create-card"} 
                        className="purple-button"
                        onClick={resetForm}
                    >Save and Create Another</Link>
                </div>
        </div>
    )
}