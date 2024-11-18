import React from 'react';
import { Link } from 'react-router-dom';

export default function NotebookTitle({ title1, link1, title2 }) {
    return (
        <div className="single-notebook--title">
            <Link to={link1} className="my-notebooks--title weight-500">
                <p>{title1}</p>
                <span className="material-symbols-outlined greater-than">
                    arrow_forward_ios
                </span>
            </Link>
            <h1 className="notebook-name--title">{title2}</h1> 
        </div>
    )
}