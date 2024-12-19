import React, { useEffect, useState } from 'react';
import apiPrivate from '../../apis/apiPrivate';
import NotebookTitle from '../NotebookTitle';
import { Link, useLocation } from 'react-router-dom';
import Select from "react-select";
import MembersButton from '../Groups/MembersButton';
import SearchBar from '../SearchBar';

export default function MyNotebooks() {
    const [notebooks, setNotebooks] = useState(null);
    const [notebookElements, setNotebookElements] = useState(null);
    const [showMembers, setShowMembers] = useState(false);
    const [isGroup, setIsGroup] = useState(null);
    const [group, setGroup] = useState({});
    const [search, setSearch] = useState("");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("groups")) {
            setIsGroup(true);

            if (location.state) {
                setGroup({ ...location.state.group });
            }
        } else {
            setIsGroup(false);
        }
    }, [location])

    const allOption = { value: "all", label: "All" };
    
    const coursesOptions = [
        { value: "all", label: "All Courses" },
        { value: "Computer Engineering", label: "Computer Engineering" },
        { value: "Electrical Engineering", label: "Electrical Engineering" },
    ]

    const visibilityOptions = [
        { value: "all", label: "Any Visibility" },
        { value: "private", label: "Private" },
        { value: "public", label: "Public" },
    ]
    const [coursesSelected, setCoursesSelected] = useState(coursesOptions[0]);
    const [visibilitySelected, setVisibilitySelected] = useState(visibilityOptions[0]);

    // Fetch all notebooks
    useEffect(() => {
        const fetchAllNotebooks = async () => {
            try {
                const url = isGroup ? `/team/notebooks?team_id=${group.id}` : "/user/myNotebooks";
                const { data } = await apiPrivate.get(url);
                setNotebooks(data);
            } catch (error) {
                console.log(error);
            }
        }
        
        if (isGroup !== null) fetchAllNotebooks();
    }, [group.id, isGroup]);

    // Create the notebook element
    useEffect(() => {
        if (notebooks) {
            setNotebookElements(notebooks.map(notebook => {
                let state = { notebook };

                if (isGroup) {
                    state = {
                        ...state,
                        isGroup, 
                        group
                    }
                }

                return (
                    <Link 
                        to={isGroup ? `/groups/${group.id}/${notebook.id}` : `/my-notebooks/${notebook.id}`} 
                        state={{ ...state }}
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
                            {isGroup ? "folder_shared" : "folder"}
                        </span>
                        <p>{notebook.title}</p>
                    </Link>
                )
            }));
        }
    }, [notebooks, coursesSelected, isGroup, group]);

    useEffect(() => {
        if (Array.isArray(coursesSelected) && checkObjectInArray(coursesSelected, "value", "all")) {
            setCoursesSelected(prev => prev.filter(object => object.value !== "all"));
        }
    }, [coursesSelected]);

    // Check that an array contains an object with a specific attribute
    function checkObjectInArray(array, attributeName, value) {
        let isObject;
        if (Array.isArray(array)) {
            isObject = array.some((obj) => obj[attributeName] === value);
        } else {
            isObject = array[attributeName] === value;
        }

        return isObject;
    }

    // Handle the change of courses
    function handleCoursesChange(options) {
        if (Array.isArray(coursesSelected) && coursesSelected.length !== 1 && checkObjectInArray(options, "value", "all")) {
            setCoursesSelected(allOption);
        } else {
            setCoursesSelected(options);
        }
    }

    // Handle the change of visibility
    function handleVisibilityChange(option) {
        setVisibilitySelected(option);
    }

    return (
        <div className="page--container">
            <NotebookTitle
                title2={`${!isGroup ? "My " : ""}Notebooks`}
            />

            {isGroup &&
                <MembersButton 
                    members={group.members}
                    showMembers={showMembers}
                    setShowMembers={setShowMembers}
                />
            }

            <div>
                <div className="searching-container--discover">
                    <SearchBar 
                        placeholder="Search Notebooks"
                        search={search}
                        setSearch={setSearch}
                    />
                    <div className="select-container--my-notebooks">
                        <Select 
                            options={coursesOptions}
                            defaultValue={coursesOptions[0]}
                            value={coursesSelected}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                ...theme.colors,
                                primary25: '#D6BBFB',
                                primary: '#9E77ED',
                                },
                            })}
                            isMulti={!(coursesSelected && checkObjectInArray(coursesSelected, "value", "all"))}
                            onChange={(options) => handleCoursesChange(options)}
                        />
                        <Select 
                            options={visibilityOptions}
                            defaultValue={visibilityOptions[0]}
                            value={visibilitySelected}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                ...theme.colors,
                                primary25: '#D6BBFB',
                                primary: '#9E77ED',
                                },
                            })}
                            onChange={(option) => handleVisibilityChange(option)}
                        />
                    </div>
                </div>
                <div className="notebooks--container">
                    <Link to="/create-notebook">
                        <div className="create-notebook--my-notebooks">
                            <p>+</p>
                        </div>
                    </Link>

                    {notebookElements}
                </div>
            </div>
        </div>
    )
}