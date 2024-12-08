import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BackArrow({ to, state = {} }) {
    const [showClass, setShowClass] = useState(false);

    return (
        <div className="back-arrow--container">
            <Link 
                to={to} 
                state={state}
                className="back-arrow--first-container" 
                onMouseEnter={() => setShowClass(true)} onMouseLeave={() => setShowClass(false)}
            >
                <span className="material-symbols-rounded back-arrow--icon">
                    arrow_back
                </span>
            </Link>
            <div className={`back-arrow--second-container${showClass ? " back-arrow--second-container--hover" : ""}`}>
                BACK
            </div>
        </div>
    )
}