import React from 'react';
import { Link } from 'react-router-dom';

export default function AddFlashcard() {
    return (
        <Link to="/my-notebooks/1/flashdeck-name/create-card" className="flashcard-box--container add-flashcard">
            <p>+</p>
        </Link>
    )
}