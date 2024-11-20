import React from 'react';
import { Link } from 'react-router-dom';

export default function BackArrow({ to }) {
    return (
        <div className="back-arrow--container">
            <Link to={to} className="back-arrow--first-container">
                <span className="material-symbols-rounded back-arrow--icon">
                    arrow_back
                </span>
            </Link>
            <div className={`back-arrow--second-container`}>
                BACK
            </div>
        </div>
    )
}