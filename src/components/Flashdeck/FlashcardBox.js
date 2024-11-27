import React from 'react';
import ReactFlipCard from 'reactjs-flip-card';

export default function FlashcardBox() {
    const difficulty = "medium";
    
    // if it bugs a lot, remove the classname from individual components and add containerCss="flashcard-box--container" as attribute
    return (
        <ReactFlipCard 
            frontComponent={
                <div>
                    <h3>Flashcard Title</h3>
                    <p className={`${difficulty}-difficulty difficulty`}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()}</p>
                </div>
            }
            backComponent={
                <div className="flashcard-box--buttons">
                    <button className="purple-button flashcard-box-button">View</button>
                    <button className="purple-button flashcard-box-button">Edit</button>
                </div>
            }
            containerCss="flashcard-box--container"
        />    
    )
}