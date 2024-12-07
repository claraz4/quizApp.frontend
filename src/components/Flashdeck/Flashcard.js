import React from 'react';
import BackArrow from '../BackArrow';
import ReactFlipCard from 'reactjs-flip-card';

export default function Flashcard() {
    const difficulty = "easy";
    const difficultyElement = (
        <div>
            <span className={`material-symbols-outlined ${difficulty}-difficulty`}>
                local_fire_department
            </span>
            <span className={`material-symbols-outlined ${difficulty}-difficulty`}>
                local_fire_department
            </span>
            <span className={`material-symbols-outlined ${difficulty}-difficulty`}>
                local_fire_department
            </span>
        </div>
    );

    return (
        <div className="flashcard--page">
            <BackArrow 
                to="/my-notebooks/1/djskjsd"
            />
            <ReactFlipCard 
                frontComponent={
                    <div>
                        <div className="flashcard-header--container">
                            <p>Title of the flashcard</p>
                            {difficultyElement}
                        </div>
                        <div className="flashcard--question-container">
                            <h1>
                                <span className="material-symbols-outlined">arrow_forward_ios</span>
                                <span> This is for the question of the flashcard. The user can write whatever he wants. I don't know how much we'll limit it.</span>
                            </h1>
                        </div>
                    </div>
                }
                backComponent={
                    <div className="flashcard-back--container">
                        <div className="flashcard-header--container">
                            <p>Title of the flashcard</p>
                            {difficultyElement}
                        </div>
                        <div className="flashcard--answer-container">
                            <h1>
                                This is the answer to the question. The user can write whatever he wants to. The length needs to be decided.
                            </h1>
                        </div>
                    </div>
                }
                containerCss="flashcard--container"
                flipTrigger="onClick"
            />    
        </div>
    )
}