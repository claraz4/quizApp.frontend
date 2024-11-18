import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateFlashdeck from './CreateFlashdeck';
import NotebookTitle from './NotebookTitle';

// ADD THE THING WHERE IF WE CLICK ANYWHERE ON THE PAGE IT WILL CLOSE THE POP UP
export default function SingleNotebook() {
    const [showUpload, setShowUpload] = useState(false);
    const [showCreateFlashdeck, setShowCreateFlashdeck] = useState(false);


    function handleClick(event) {
        event.stopPropagation();
        setShowUpload(prev => !prev);
    } 

    function handleClickFlashdeck(event) {
        event.stopPropagation();
        setShowCreateFlashdeck(true);
    }

    function handleClose() {
        if (!showCreateFlashdeck) {
            setShowUpload(false);
            setShowCreateFlashdeck(false);
        }
    }

    return (
        <div className="page--container" onClick={handleClose}>
            <NotebookTitle 
                title1={"My Notebooks"}
                link1={"/my-notebooks"}
                title2={"Notebook Name"}
            />
            {/* if no elements in the notebook display that it's empty */}
            <div>
                
            </div>
            <button className="add-button" onClick={handleClick}>
                <p>+</p>
            </button>
            {showUpload && 
                <div className="upload-options--container">
                    <Link to="/upload-note" className="upload-option--container">
                        <span className="material-symbols-outlined">note</span>
                        <p>Upload Note</p>
                    </Link>
                    <Link to="/create-quiz" className="upload-option--container">
                        <span className="material-symbols-outlined">quiz</span>
                        <p>Create Quiz</p>
                    </Link>
                    <button className="upload-option--container" onClick={handleClickFlashdeck}>
                        <span className="material-symbols-outlined">note_stack</span>
                        <p>Create Flashdeck</p>
                    </button>

                    {showCreateFlashdeck &&
                        <CreateFlashdeck 
                            setShowCreateFlashdeck={setShowCreateFlashdeck}
                        />
                    }
                </div>

            }
        </div>
    )
}