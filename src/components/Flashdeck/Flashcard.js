import React from 'react';
import BackArrow from '../BackArrow';

export default function Flashcard() {
    return (
        <div className="flashcard--page">
            <BackArrow 
                to="/my-notebooks/1/djskjsd"
            />
            <div className="flashcard--container">
                <h4 className="flashcard-difficulty hard-difficulty">Difficulty</h4>
                <div className="flashcard--question-container">
                    <h1>
                        <span className="material-symbols-outlined">arrow_forward_ios</span>
                        <span> This is for the question of the flashcard. The user can write whatever he wants. I don't know how much we'll limit it.</span>
                    </h1>
                </div>
                <div className="flashcard--answer-container">
                    <h1>
                        This is the answer to the question. The user can write whatever he wants to. The length needs to be decided.
                    </h1>
                </div>
                {/* <button className="purple-button">Reveal Answer</button> */}
            </div>
        </div>
    )
}