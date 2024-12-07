import React, { useEffect, useState } from 'react';
import apiPrivate from '../../apis/apiPrivate';
import NotebookTitle from './NotebookTitle';
import { Link } from 'react-router-dom';
import Select from "react-select";

export default function MyNotebooks() {
    const [notebooks, setNotebooks] = useState(null);
    const [notebookElements, setNotebookElements] = useState(null);
    const allOption = { value: "all", label: "All" };
    
    const coursesOptions = [
        { value: "all", label: "All" },
        { value: "Computer Engineering", label: "Computer Engineering" },
        { value: "Electrical Engineering", label: "Electrical Engineering" },
    ]
    const [coursesSelected, setCoursesSelected] = useState(coursesOptions[0]);

    // Fetch all notebooks
    useEffect(() => {
        const fetchAllNotebooks = async () => {
            try {
                const { data } = await apiPrivate.get("/user/myNotebooks");
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

    function handleCoursesChange(options) {
        if (Array.isArray(coursesSelected) && coursesSelected.length !== 1 && checkObjectInArray(options, "value", "all")) {
            setCoursesSelected(allOption);
        } else {
            setCoursesSelected(options);
        }
    }

    return (
        <div className="page--container">
            <NotebookTitle
                title2={"My Notebooks"}
            />

            <div>
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