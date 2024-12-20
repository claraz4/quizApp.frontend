import React, { useState, useEffect } from 'react';

export default function MembersButton({ members, showMembers, setShowMembers }) {
    const [membersElement, setMembersElement] = useState(null);

    // Create the rendering of the members
    useEffect(() => {
        if (members) {
            setMembersElement(members.map(member => {
                return (
                    <div className="group-members--option">
                        <p>{`${member.first_name} ${member.last_name}`}</p>
                    </div>
                )
            }))
        }
    }, [members])

    // Handle the click of the members
    function handleClick(event) {
        event.stopPropagation();
        setShowMembers(prev => !prev);
    }

    return (
        <div>
            <span 
                className="material-symbols-outlined members-button"
                onClick={handleClick}
            >
                group
            </span>
            {showMembers &&
                <div className="group-members--container">
                    {membersElement}
                </div>
            }
        </div>
    )
}