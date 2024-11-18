import React from "react";

export default function CheckboxOption({ name, handleCheckbox, courseInfo }) {
    const event = {
        target : { 
            value : courseInfo 
        }
    }

    return (
        <div id="course-option--container">
           <p>{name}</p>
           <span 
                onClick={() => handleCheckbox(event)}
                className="material-symbols-outlined delete-course-button"
            >
                close
            </span>
        </div>
    )
}