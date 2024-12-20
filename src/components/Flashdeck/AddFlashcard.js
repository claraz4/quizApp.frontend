import React from 'react';
import { Link } from 'react-router-dom';

export default function AddFlashcard({ deckID, deckTitle, notebook }) {
    return (
        <Link to={`/my-notebooks/deck/${deckID}/create-card`} state={{ deckID, deckTitle, notebook }} className="flashcard-box--container add-flashcard">
            <p>+</p>
        </Link>
    )
}