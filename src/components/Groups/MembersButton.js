import React, { useState } from 'react';

export default function MembersButton({ members, showMembers, setShowMembers }) {
    // const [membersElement, setMembersElement] = useState([]);

    // NEED THE API TO GET THE MEMBERS
    // useEffect(() => {
    //     if (members) {
    //         setMembersElement(members.map(member => {

    //         }))
    //     }
    // }, [members])

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
                    <div className="group-members--option">
                        <p>Member 1</p>
                    </div>
                    <div className="group-members--option">
                        <p>Member 1</p>
                    </div>
                    <div className="group-members--option">
                        <p>Member 1</p>
                    </div>
                </div>
            }
        </div>
    )
}