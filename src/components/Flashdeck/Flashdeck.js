import React, { useState, useEffect } from 'react';
import NotebookTitle from '../NotebookTitle';
import AddFlashcard from './AddFlashcard';
import FlashcardBox from './FlashcardBox';
import CreateFlashcard from './CreateFlashcard';
import { useLocation } from 'react-router-dom';
import apiPrivate from '../../apis/apiPrivate';

export default function Flashdeck() {
    const { state } = useLocation();
    const [showCreateFlashcard, setShowCreateFlashcard] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [flashcardsElement, setFlashcardsElement] = useState([]);

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

    // Render the flashcards element
    useEffect(() => {
        if (flashcards) {
            setFlashcardsElement(flashcards.map(flashcard => {
                return (
                    <FlashcardBox 
                        flashcard={flashcard}
                        notebook={state.notebook}
                        deckID={state.deckID}
                    />
                )
            }))
        }
    }, [flashcards])

    return (
        <div className="page--container">
            <div className="flashdeck-title--container">
                <NotebookTitle 
                    title1={"Notebook Name"}
                    link1={`/my-notebooks/${state.notebook.id}`}
                    title2={"Flashdeck Name"}
                    state={{ notebook: state.notebook }}
                />
                <button className="purple-button">View Deck</button>
            </div>

            <div className="flashcards--container">
                <AddFlashcard 
                    setShowCreateFlashcard={setShowCreateFlashcard}
                />
                {flashcardsElement}
            </div>

            {showCreateFlashcard &&
                <CreateFlashcard 
                    setShowCreateFlashcard={setShowCreateFlashcard}
                />
            }
        </div>
    )
}