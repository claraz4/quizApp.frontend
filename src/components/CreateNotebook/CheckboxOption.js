import React from "react";

export default function CheckboxOption(props) {
    const event = {
        target : { 
            value : props.courseInfo 
        }
    }

    return (
        <div id="course-option--container">
           <p>{props.name}</p>
           <span 
                onClick={() => props.handleCheckbox(event)}
                className="material-symbols-outlined delete-course-button"
            >
                close
            </span>
        </div>
    )
}