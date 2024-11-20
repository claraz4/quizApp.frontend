import { useState, useEffect, memo } from "react";
import api from "../../apis/api";
import apiPrivate from "../../apis/apiPrivate";

export const SmallSearch = memo(({ setOptions, isCourses, isGroups }) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Fetch all courses
        const fecthCourses = async () => {
            try {
                const params = {
                    search_entry: search
                }
                const queryString = new URLSearchParams(params).toString();
                const url = `/courses?${queryString}`;
                const { data } = await api.get(url);
                setOptions(data);
            } catch (error) {
                console.log(error);
            }
        }
    
        // Fetch all grouops
        const fecthGroups = async () => {
            try {
                const params = {
                    search_entry: search
                }
                const queryString = new URLSearchParams(params).toString();
                const url = `/user/teams?${queryString}`;
                const { data } = await apiPrivate.get(url);
                setOptions(data);
            } catch (error) {
                console.log(error);
            }
        }

        if (isCourses) fecthCourses();
        if (isGroups) fecthGroups();
    }, [search, isCourses, isGroups, setOptions]);

    // Handle the clearing of the field
    function handleClear() {
        setSearch("");
    }
    
    return (
        <div id="search-bar-container--form">
            <input 
                id="search-course--form" 
                placeholder={`Search ${isCourses ? "courses" : isGroups ? "groups" : ""}`}
                onChange={(event) => setSearch(event.target.value)} 
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