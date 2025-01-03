import React, { useEffect, useState, useMemo } from 'react';
import apiPrivate from '../../apis/apiPrivate';
import NotebookTitle from '../NotebookTitle';
import { Link, useLocation } from 'react-router-dom';
import Select from "react-select";
import MembersButton from '../Groups/MembersButton';
import SearchBar from '../SearchBar';
import AddMember from '../Groups/AddMember';

export default function MyNotebooks() {
    const [notebooks, setNotebooks] = useState(null);
    const [notebookElements, setNotebookElements] = useState(null);
    const [showMembers, setShowMembers] = useState(false);
    const [isGroup, setIsGroup] = useState(null);
    const [group, setGroup] = useState({});
    const [search, setSearch] = useState("");
    const location = useLocation();
    const [showAddMember, setShowAddMember] = useState(false);

    const coursesAllOption = useMemo(() => {
        return { value: "all", label: "All Courses" }
    }, []);

    const [coursesOptions, setCoursesOptions] = useState([]);
    const [courseSelected, setCourseSelected] = useState(coursesAllOption);

    // Get all courses for the selected majors if any
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const params = {
                    search_entry: search || undefined, 
                    course_id: courseSelected.value !== "all" ? courseSelected.value : undefined
                };
        
                const { data } = await apiPrivate.get(`/courses`, { params });
                
                const coursesOptionsArr = data.map(course => {
                    return { value: course.id, label: course.name }
                });
                setCoursesOptions([ coursesAllOption, ...coursesOptionsArr ]);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCourses();
    }, [coursesAllOption, search, courseSelected.value])

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

    const visibilityOptions = [
        { value: "all", label: "Any Visibility" },
        { value: "private", label: "Private" },
        { value: "public", label: "Public" },
    ]
    const [visibilitySelected, setVisibilitySelected] = useState(visibilityOptions[0]);

    // Fetch all notebooks
    useEffect(() => {
        const fetchAllNotebooks = async () => {
            try {
                const url = isGroup ? `/team/notebooks?team_id=${group.id}&search_entry=${search}` : `/user/myNotebooks?search_entry=${search}`;
                const { data } = await apiPrivate.get(url);
                setNotebooks(data);
            } catch (error) {
                console.log(error);
            }
        }
        
        if (isGroup !== null) fetchAllNotebooks();
    }, [group.id, isGroup, search]);

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
    }, [notebooks, courseSelected, isGroup, group]);

    // useEffect(() => {
    //     if (Array.isArray(coursesSelected) && checkObjectInArray(coursesSelected, "value", "all")) {
    //         setCoursesSelected(prev => prev.filter(object => object.value !== "all"));
    //     }
    // }, [coursesSelected]);

    // Check that an array contains an object with a specific attribute
    // function checkObjectInArray(array, attributeName, value) {
    //     let isObject;
    //     if (Array.isArray(array)) {
    //         isObject = array.some((obj) => obj[attributeName] === value);
    //     } else {
    //         isObject = array[attributeName] === value;
    //     }

    //     return isObject;
    // }

    // Handle the change of courses
    // function handleCoursesChange(options) {
    //     if (Array.isArray(coursesSelected) && coursesSelected.length !== 1 && checkObjectInArray(options, "value", "all")) {
    //         setCoursesSelected(allOption);
    //     } else {
    //         setCoursesSelected(options);
    //     }
    // }

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
            <div>
                <MembersButton 
                    members={group.members}
                    showMembers={showMembers}
                    setShowMembers={setShowMembers}
                />
                <button className="add-member--button purple-button" onClick={() => setShowAddMember(true)}>Add Member</button>

                {showAddMember &&
                    <AddMember 
                        group={group}
                        setShowAddMember={setShowAddMember}
                    />
                }
            </div>
            }

            <div>
                <div className="searching-container--discover">
                    <SearchBar 
                        placeholder="Search notebooks"
                        search={search}
                        setSearch={setSearch}
                    />
                    <div className="select-container--my-notebooks">
                        <Select 
                            options={coursesOptions}
                            defaultValue={coursesOptions[0]}
                            value={courseSelected}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                ...theme.colors,
                                primary25: '#D6BBFB',
                                primary: '#9E77ED',
                                },
                            })}
                            // isMulti={!(coursesSelected && checkObjectInArray(coursesSelected, "value", "all"))}
                            onChange={value => setCourseSelected(value)}
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