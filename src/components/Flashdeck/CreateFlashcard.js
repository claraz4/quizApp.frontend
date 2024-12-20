import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotebookTitle from '../NotebookTitle';
import apiPrivate from '../../apis/apiPrivate';

export default function CreateFlashcard() {
    const emptyFormData = {
        title: "",
        question: "",
        answer: "",
        difficulty: 0
    };
    const [formData, setFormData] = useState(emptyFormData);
    const { state } = useLocation();

    // Create a flashcard
    const createFlashcard = async () => {
        try {
            await apiPrivate.post("/createFlashCard", {
                flashdeck_id: state.deckID,
                ...formData,
                difficulty: formData.difficulty === 0 ? "Easy" : formData.difficulty === 1 ? "Medium" : "Hard"
            })
        } catch (error) {
            console.log(error);
        }
    }
    
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

    // Handle the creation of the card
    function handleCreate(reset) {
        createFlashcard();
        if (reset) setFormData(emptyFormData);
    }

    return (
        <div className="page--container create-flashcard--container">
                <NotebookTitle 
                    title1={state.deckTitle}
                    link1={`/my-notebooks/deck/${state.deckID}`}
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
                    <Link 
                        to={`/my-notebooks/deck/${state.deckID}`} 
                        state={{ deckID: state.deckID, deckTitle: state.deckTitle, notebook: state.notebook }}
                        className="purple-button"
                        onClick={() => handleCreate(false)}
                    >Save Flashcard</Link>
                    <Link 
                        to={`/my-notebooks/deck/${state.deckID}/create-card`} 
                        state={{ ...state }}
                        className="purple-button"
                        onClick={() => handleCreate(true)}
                    >Save and Create Another</Link>
                </div>
        </div>
    )
}