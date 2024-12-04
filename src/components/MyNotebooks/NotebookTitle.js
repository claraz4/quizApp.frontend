import React from 'react';
import { Link } from 'react-router-dom';

export default function NotebookTitle({ title1, link1, title2, title2Color }) {
    return (
        <div className="single-notebook--title">
            {link1 && title1 && <Link to={link1} className="my-notebooks--title weight-500">
                <p>{title1}</p>
                <span className="material-symbols-outlined greater-than">
                    arrow_forward_ios
                </span>
            </Link>}
            <h1 className="notebook-name--title" style={{ color: title2Color || undefined }}>{title2}</h1> 
        </div>
    )
}