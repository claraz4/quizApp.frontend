import React, { useEffect, useState } from 'react';
import Flashcard from './Flashcard';
import apiPrivate from '../../apis/apiPrivate';
import { useLocation } from 'react-router-dom';

export default function ViewFlashdeck() {
    const location = useLocation();
    const { state } = location;
    const [flashcards, setFlashcards] = useState(null);
    const [currentFlashcard, setCurrentFlashcard] = useState(0);

    // Fetch the flashcards
    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const { data } = await apiPrivate.get(`/flashdeck/flashcards?flashdeck_id=${state.deckID}`);
                setFlashcards(data);
            } catch (error) {   
                console.log(error);
            }
        }
        if (state && state.deckID) fetchFlashcards();
    }, [state]);

    // Go to previous deck
    function prevDeck() {
        if (currentFlashcard !== 0) setCurrentFlashcard(prev => prev - 1);
    }

    // Go to next deck
    function nextDeck() {
        if (currentFlashcard !== flashcards.length - 1) setCurrentFlashcard(prev => prev + 1);
    }

    return (
        flashcards ? (
            <div className="view-flashdeck--page">
                <Flashcard 
                    isViewDeck={true}
                    title={flashcards[currentFlashcard].title}
                    difficulty={flashcards[currentFlashcard].difficulty}
                    question={flashcards[currentFlashcard].question}
                    answer={flashcards[currentFlashcard].answer}
                    from={location.pathname.substring(0, location.pathname.indexOf("/view"))}
                    prevState={{ notebook: state.notebook, deckID: state.deckID }}
                />

                {currentFlashcard !== 0 &&
                <span className="material-symbols-outlined back-arrow--deck" onClick={prevDeck}>
                    arrow_left
                </span>}

                {currentFlashcard !== flashcards.length - 1 &&
                <span className="material-symbols-outlined forward-arrow--deck" onClick={nextDeck}>
                    arrow_right
                </span>}
            </div>
        ) : (
            <div></div>
        )
    )
}