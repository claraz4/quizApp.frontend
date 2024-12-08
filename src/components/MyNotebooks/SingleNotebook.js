import React, { useEffect, useState } from 'react';
import NotebookTitle from './NotebookTitle';
import AddButton from './AddButton';
import Select from 'react-select';
import api from '../../apis/api';
import { useLocation, Link } from 'react-router-dom';

export default function SingleNotebook() {
    const [showUpload, setShowUpload] = useState(false);
    const [showCreateFlashdeck, setShowCreateFlashdeck] = useState(false);
    const [showCreateNote, setShowCreateNote] = useState(false);

    // States used to keep track of the hovered element
    const [noteHover, setNoteHover] = useState(-1);
    const [quizHover, setQuizHover] = useState(-1);
    const [deckHover, setDeckHover] = useState(-1);
    
    const { state } = useLocation();
    const { notebook } = state || {};
    
    const [coursesOptions, setCoursesOptions] = useState([]);

    const typeOptions = [
        { value: 'all', label: 'All' },
        { value: 'notes', label: 'Notes' },
        { value: 'quizzes', label: 'Quizzes' },
        { value: 'flashdecks', label: 'Flashdecks' }
    ]

    // Fetch all courses related to the notebook
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get("/courses?search_entry=");
                const courses = data.map(course => {
                    return {
                        value: course.id,
                        label: course.name
                    }
                });

                const filteredCourses = courses.filter(course => notebook.courses.includes(course.id));
                setCoursesOptions([
                    { value: "all", label: "All" },
                    ...filteredCourses
                ]);
            } catch (error) {
                console.log(error);
            }
        }

        if (notebook.courses.length !== 1) fetchCourses();
    }, [notebook.courses]);

     // to convert the hex colors into rgba and be able to change the opacity
     const darkenHex= (hex, amount) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        // Subtract the amount and use Math.max to avoid going below 0
        const newR = Math.max(0, r - amount);
        const newG = Math.max(0, g - amount);
        const newB = Math.max(0, b - amount);

        // Convert the new values back to hex and pad them to 2 digits
        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    };

    // Close the add window when clicking anywhere on the screen
    function handleClose() {
        if (!showCreateFlashdeck && !showCreateNote) {
            setShowUpload(false);
        } 
    }

    return (
        <div className="page--container" onClick={handleClose}>
            <NotebookTitle 
                title1={"My Notebooks"}
                link1={"/my-notebooks"}
                title2={notebook.title}
                title2Color={notebook.color}
            />

            <AddButton 
                showCreateFlashdeck={showCreateFlashdeck}
                showCreateNote={showCreateNote}
                showUpload={showUpload}
                setShowCreateFlashdeck={setShowCreateFlashdeck}
                setShowCreateNote={setShowCreateNote}
                setShowUpload={setShowUpload}
                buttonColor={notebook.color}
            />
            {/* if no elements in the notebook display that it's empty */}
            <div className="notebook-selects">
                <div className="select-notebook--container">
                    <Select 
                        options={typeOptions}
                        isSearchable={false} 
                        defaultValue={typeOptions[0]}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                            ...theme.colors,
                            primary25: darkenHex(notebook.color, -60),
                            primary: notebook.color,
                            },
                        })}
                    />
                    {notebook.courses.length !== 1 && 
                    <Select 
                        options={coursesOptions}
                        defaultValue={coursesOptions[0]}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                            ...theme.colors,
                            primary25: '#D6BBFB',
                            primary: '#9E77ED',
                            },
                        })}
                    />}
                </div>

                <div className="notebook-visibility--container" style={{ borderColor: notebook.color, color: notebook.color }}>
                    <p>{notebook.public_access ? "Public" : "Private"}</p>
                </div>
            </div>

            <div className="notebook--container">
                <div>
                    <h2 className="notebook-type--label">Notes</h2>
                    <div className="type--container-my-notebooks">
                        <div className="type--box-my-notebook">
                            <Link 
                                to={`/my-notebooks/${notebook.id}/note/note-name`} 
                                state={{ notebook }}
                            >
                                <span 
                                    className="material-symbols-outlined" 
                                    style={{ color: noteHover === 0 ? darkenHex(notebook.color, 25) : notebook.color }}
                                    onMouseEnter={() => setNoteHover(0)}
                                    onMouseLeave={() => setNoteHover(-1)}
                                >
                                    news
                                </span>
                            </Link>
                            <p>Note name</p>
                        </div>
                        <div className="type--box-my-notebook">
                            <span className="material-symbols-outlined" style={{ color: notebook.color }}>
                                news
                            </span>
                            <p>Note name</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="notebook-type--label">Quizzes</h2>
                    <div className="type--container-my-notebooks">
                        <div className="type--box-my-notebook">
                            <span 
                                className="material-symbols-outlined" 
                                style={{ color: quizHover === 0 ? darkenHex(notebook.color, 25) : notebook.color }}
                                onMouseEnter={() => setQuizHover(0)}
                                onMouseLeave={() => setQuizHover(-1)}
                            >
                                help_center
                            </span>
                            <p>Quiz name</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="notebook-type--label">Flashdecks</h2>
                    <div className="type--container-my-notebooks">
                        <div className="type--box-my-notebook">
                            <span 
                                className="material-symbols-outlined" 
                                style={{ color: deckHover === 0 ? darkenHex(notebook.color, 25) : notebook.color }}
                                onMouseEnter={() => setDeckHover(0)}
                                onMouseLeave={() => setDeckHover(-1)}
                            >
                                sticky_note_2
                            </span>
                            <p>Flashdeck name</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}