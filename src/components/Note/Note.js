import React from 'react';
import BackArrow from '../BackArrow';
import PDFViewer from './PDFViewer';

export default function Note() {
    const date = new Date();

    return (
        <div className="note--container">
            <BackArrow 
                to="/my-notebooks/1"
            />
            <div className="note--info">
                <h1>Note Title</h1>
                <p>{`Created on ${new Intl.DateTimeFormat('en-GB').format(date).replaceAll('/', '-')}`}</p>
            </div>

            <PDFViewer />
        </div>
    )
}