import React from 'react';
import BackArrow from '../BackArrow';
import PDFViewer from './PDFViewer';
import { useLocation } from 'react-router-dom';

export default function Note() {
    const date = new Date();

    const { state } = useLocation();
    const { notebook } = state || {};

    return (
        <div className="note--container">
            <BackArrow 
                to="/my-notebooks/1"
                state={{ notebook }}
            />
            <div className="note--info">
                <h1>Note Title</h1>
                <p>{`Created on ${new Intl.DateTimeFormat('en-GB').format(date).replaceAll('/', '-')}`}</p>
            </div>

            <PDFViewer />
        </div>
    )
}