import React from 'react';
import ReactFlipCard from 'reactjs-flip-card';
import { useLocation, Link } from 'react-router-dom';

export default function FlashcardBox({ flashcard, notebook, deckID, deckTitle }) {
    const { id, title, difficulty } = flashcard;
    const location = useLocation();

    // If it bugs a lot, remove the classname from individual components and add containerCss="flashcard-box--container" as attribute
    return (
        <ReactFlipCard 
            frontComponent={
                <div>
                    <h3>{title}</h3>
                    <p className={`${difficulty.toLowerCase()}-difficulty difficulty`}>{difficulty}</p>
                </div>
            }
            backComponent={
                <div className="flashcard-box--buttons">
                    <Link 
                        to={`${location.pathname}/${id}`}
                        state={{ ...flashcard, from: location.pathname, state: { notebook, deckID, deckTitle } }}
                        className="purple-button flashcard-box-button"
                    >View</Link>
                    <button className="purple-button flashcard-box-button">Edit</button>
                </div>
            }
            containerCss="flashcard-box--container"
        />    
    )
}