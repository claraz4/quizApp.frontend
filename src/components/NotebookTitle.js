import React from 'react';
import { Link } from 'react-router-dom';

export default function NotebookTitle({ title1, link1, title2, title2Color, additionalClass = "", state = {} }) {
    return (
        <div className={`single-notebook--title${additionalClass !== "" ? " " : ""}${additionalClass}`}>
            {link1 && title1 && 
            <Link to={link1} className="my-notebooks--title weight-500" state={{ ...state }}>
                <p>{title1}</p>
                <span className="material-symbols-outlined greater-than">
                    arrow_forward_ios
                </span>
            </Link>}
            <h1 className="notebook-name--title" style={{ color: title2Color || undefined }}>{title2}</h1> 
        </div>
    )
}