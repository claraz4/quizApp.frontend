import React, { useState, useEffect } from 'react';
import NotebookTitle from '../NotebookTitle';
import AddFlashcard from './AddFlashcard';
import FlashcardBox from './FlashcardBox';
import { useLocation, Link } from 'react-router-dom';
import apiPrivate from '../../apis/apiPrivate';

export default function Flashdeck() {
    const location = useLocation();
    const { state } = location;
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
    }, [flashcards, state])

    return (
        <div className="page--container">
            <div className="flashdeck-title--container">
                <NotebookTitle 
                    title1={state.notebook.title}
                    link1={`/my-notebooks/${state.notebook.id}`}
                    title2={state.deckTitle}
                    state={{ notebook: state.notebook }}
                    />
                <Link 
                    to={`${location.pathname}/view`} 
                    className="purple-button"
                    state={{ notebook: state.notebook, deckID: state.deckID }}
                >View Deck</Link>
            </div>

            <div className="flashcards--container">
                <AddFlashcard 
                    deckID={state.deckID}
                    deckTitle={state.deckTitle}
                    notebook={state.notebook}
                />
                {flashcardsElement}
            </div>
{/* 
            {showCreateFlashcard &&
                <CreateFlashcard 
                    deckTitle={state.deckTitle}
                    deckID={state.deckID}
                    setShowCreateFlashcard={setShowCreateFlashcard}
                />
            } */}
        </div>
    )
}