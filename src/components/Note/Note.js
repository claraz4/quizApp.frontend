import React from 'react';
import BackArrow from '../BackArrow';
import PDFViewer from './PDFViewer';
import { useLocation } from 'react-router-dom';

export default function Note() {
    const { state } = useLocation();
    const { notebook } = state || {};
    const { note } = state || {};

    return (
        <div className="note--container">
            <BackArrow 
                to={`/my-notebooks/${notebook.id}`}
                state={{ notebook }}
            />
            <div className="note--info">
                <h1>{note.title}</h1>
                <p>{`Created on ${new Intl.DateTimeFormat('en-GB').format(new Date(note.creation_date)).replaceAll('/', '-')}`}</p>
            </div>

            <PDFViewer 
                noteLink={note.file_link}
            />
        </div>
    )
}