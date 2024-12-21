import React from 'react';

export default function ConfirmationPopUp({ message, handleConfirm, setShowDelete, color }) {
    return (
        <div className="confirmation-pop-up--bg">
            <div className="confirmation-pop-up--container" style={{ backgroundColor: color }}>
                <h1>{message}</h1>
                <div className="confirmation-pop-up--buttons">
                    <button 
                        onClick={handleConfirm} 
                        className="confirm-button--popup"
                        style={{ color }}
                    >Confirm</button>
                    <button 
                        onClick={() => setShowDelete(false)} 
                        className="cancel-button--popup"
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}