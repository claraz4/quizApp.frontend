import React from 'react';
import BackArrow from '../BackArrow';
import ReactFlipCard from 'reactjs-flip-card';
import { useLocation } from 'react-router-dom';

export default function Flashcard() {
    const { state } = useLocation();
    const { title, difficulty, question, answer, from, state:prevState }  = state;
    
    const difficultyElement = (
        <div>
            <span className={`material-symbols-outlined ${difficulty.toLowerCase()}-difficulty`}>
                local_fire_department
            </span>
            <span className={`material-symbols-outlined ${difficulty.toLowerCase()}-difficulty`}>
                local_fire_department
            </span>
            <span className={`material-symbols-outlined ${difficulty.toLowerCase()}-difficulty`}>
                local_fire_department
            </span>
        </div>
    );

    return (
        <div className="flashcard--page">
            <BackArrow 
                to={from}
                state={{ ...prevState }}
            />
            {state && 
            <ReactFlipCard 
                frontComponent={
                    <div>
                        <div className="flashcard-header--container">
                            <p>{title}</p>
                            {difficultyElement}
                        </div>
                        <div className="flashcard--question-container">
                            <h1>
                                <span className="material-symbols-outlined">arrow_forward_ios</span>
                                <span>{question}</span>
                            </h1>
                        </div>
                    </div>
                }
                backComponent={
                    <div className="flashcard-back--container">
                        <div className="flashcard-header--container">
                            <p>{title}</p>
                            {difficultyElement}
                        </div>
                        <div className="flashcard--answer-container">
                            <h1>{answer}</h1>
                        </div>
                    </div>
                }
                containerCss="flashcard--container"
                flipTrigger="onClick"
            />}
        </div>
    )
}