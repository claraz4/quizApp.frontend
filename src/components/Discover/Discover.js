import React, { useEffect, useState } from 'react';
import NotebookTitle from '../NotebookTitle';
import { Link } from 'react-router-dom';
import apiPrivate from '../../apis/apiPrivate';
import DiscoverSelects from './DiscoverSelects';
import SearchBar from '../SearchBar';

export default function Discover() {
    const [notebooks, setNotebooks] = useState(null);
    const [notebookElements, setNotebookElements] = useState(null);

    const [search, setSearch] = useState("");

    const [courseSelected, setCourseSelected] = useState({ value: "all", label: "All Courses" });
    const [majorSelected, setMajorSelected] = useState({ value: "all", label: "All Majors"});
    const [ratingSelected, setRatingSelected] = useState({ value: "all", label: "Any Rating"});
    
    // Fetch all notebooks
    useEffect(() => {
        const fetchAllNotebooks = async () => {
            try {
                const params = {
                    search_entry: search || undefined, 
                    major_id: (majorSelected.value !== "all" && courseSelected.value === "all") ? majorSelected.value : undefined,  
                    course_id: courseSelected.value !== "all" ? courseSelected.value : undefined
                };
        
                const { data } = await apiPrivate.get('/user/notebooks', { params });
        
                setNotebooks(data); // Set your state or handle data as needed
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchAllNotebooks();
    }, [search, courseSelected, majorSelected]);

    // Create the notebook element
    useEffect(() => {
        if (notebooks) {
            setNotebookElements(notebooks.map(notebook => {
                return (
                    <Link 
                        to={`/discover/${notebook.id}`} 
                        state={{ notebook }}
                        className="notebook-container--my-notebooks" 
                        key={notebook.id}
                    >
                        <span 
                            className="material-symbols-outlined" 
                            style={{
                                fontVariationSettings: `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48`,
                                color: notebook.color
                            }}
                        >
                            folder
                        </span>
                        <p>{notebook.title}</p>
                    </Link>
                )
            }));
        }
    }, [notebooks, courseSelected]);

    return (
        <div className="page--container">
            <NotebookTitle
                title2={"Browse Notebooks"}
            />

            <div>
                <div className="searching-container--discover">
                    <SearchBar 
                        placeholder="Search Notebooks"
                        search={search}
                        setSearch={setSearch}
                    />
                    <DiscoverSelects 
                        courseSelected={courseSelected}
                        ratingSelected={ratingSelected}
                        majorSelected={majorSelected}
                        setCourseSelected={setCourseSelected}
                        setRatingSelected={setRatingSelected}
                        setMajorSelected={setMajorSelected}
                    />
                </div>
                <div className="notebooks--container">
                    {notebookElements}
                </div>
            </div>
        </div>
    )
}