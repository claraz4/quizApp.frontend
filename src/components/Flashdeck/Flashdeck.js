import React, { useState } from 'react';
import NotebookTitle from '../MyNotebooks/NotebookTitle';
import AddFlashcard from './AddFlashcard';
import FlashcardBox from './FlashcardBox';
import CreateFlashcard from './CreateFlashcard';

export default function Flashdeck() {
    const [showCreateFlashcard, setShowCreateFlashcard] = useState(false);

    return (
        <div className="page--container">
            <div className="flashdeck-title--container">
                <NotebookTitle 
                    title1={"Notebook Name"}
                    link1={"/my-notebooks/1"}
                    title2={"Flashdeck Name"}
                />
                <button className="purple-button">View Deck</button>
            </div>

            <div className="flashcards--container">
                <AddFlashcard 
                    setShowCreateFlashcard={setShowCreateFlashcard}
                />
                <FlashcardBox />
                <FlashcardBox />
                <FlashcardBox />
                <FlashcardBox />
            </div>

            {showCreateFlashcard &&
                <CreateFlashcard 
                    setShowCreateFlashcard={setShowCreateFlashcard}
                />
            }
        </div>
    )
}