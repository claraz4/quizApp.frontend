import React, { useState, useEffect } from 'react';
import NotebookTitle from '../NotebookTitle';
import AddFlashcard from './AddFlashcard';
import FlashcardBox from './FlashcardBox';
import CreateFlashcard from './CreateFlashcard';
import { useLocation, Link } from 'react-router-dom';
import apiPrivate from '../../apis/apiPrivate';

export default function Flashdeck() {
    const location = useLocation();
    const { state } = location;
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
    }, [flashcards, state])

    return (
        <div className="page--container">
            <div className="flashdeck-title--container">
                <NotebookTitle 
                    title1={"Notebook Name"}
                    link1={`/my-notebooks/${state.notebook.id}`}
                    title2={"Flashdeck Name"}
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