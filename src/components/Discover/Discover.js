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

    const [coursesSelected, setCoursesSelected] = useState({ value: "all", label: "All Courses" });
    const [majorSelected, setMajorSelected] = useState({ value: "all", label: "All Majors"});
    const [ratingSelected, setRatingSelected] = useState({ value: "all", label: "Any Rating"});
    
    // Fetch all notebooks
    useEffect(() => {
        const fetchAllNotebooks = async () => {
            try {
                const { data } = await apiPrivate.get("/user/notebooks");
                setNotebooks(data);
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchAllNotebooks();
    }, []);

    // Create the notebook element
    useEffect(() => {
        if (notebooks) {
            setNotebookElements(notebooks.map(notebook => {
                return (
                    <Link 
                        to={`/my-notebooks/${notebook.id}`} 
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
    }, [notebooks, coursesSelected]);

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
                        coursesSelected={coursesSelected}
                        ratingSelected={ratingSelected}
                        majorSelected={majorSelected}
                        setCoursesSelected={setCoursesSelected}
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