import { useState, useEffect, memo } from "react";
import courses from '../../data/courses';
import groups from '../../data/groups';

export const SmallSearch = memo(({ setOptions, isCourses, isGroups }) => {
    const [search, setSearch] = useState("");

    // Fetch the courses
    useEffect(() => {
        if (isCourses) setOptions(courses);
        if (isGroups) setOptions(groups);
    });

    // Handle the clearing of the field
    function handleClear() {
        setSearch("");
    }
    
    return (
        <div id="search-bar-container--form">
            <input 
                id="search-course--form" 
                placeholder={`Search ${isCourses ? "courses" : isGroups ? "groups" : ""}`} 
            />
            {search !== "" && 
                <span 
                    className="material-symbols-outlined" 
                    id="close-icon--form"
                    onClick={handleClear}
                >close</span>
            }
            <span className="material-symbols-outlined" id="search-icon--form">search</span>
        </div>
    )
})