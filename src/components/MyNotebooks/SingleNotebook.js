import React, { useEffect, useState } from 'react';
import NotebookTitle from '../NotebookTitle';
import AddButton from './AddButton';
import Select from 'react-select';
import api from '../../apis/api';
import { useLocation, Link } from 'react-router-dom';
import ConfirmationPopUp from '../ConfirmationPopUp';
import apiPrivate from '../../apis/apiPrivate';

export default function SingleNotebook() {
    const [showUpload, setShowUpload] = useState(false);
    const [showCreateFlashdeck, setShowCreateFlashdeck] = useState(false);
    const [showCreateNote, setShowCreateNote] = useState(false);
    const [starsElement, setStarsElement] = useState([]);
    const [isGroup, setIsGroup] = useState(false);
    const [group, setGroup] = useState({});
    const [notebookContent, setNotebookContent] = useState(null);

    // These are the elements of the notebook that are going to be displayed
    const [flashdeckElements, setFlashdeckElements] = useState([]);
    const [noteElements, setNoteElements] = useState([]);
    const [quizElements, setQuizElements] = useState([]);

    // States used to keep track of the hovered element
    const [noteHover, setNoteHover] = useState(-1);
    const [quizHover, setQuizHover] = useState(-1);
    const [deckHover, setDeckHover] = useState(-1);

    // States used to keep track of the edit feature
    const [editNote, setEditNote] = useState(false);
    const [editQuiz, setEditQuiz] = useState(false);
    const [editDeck, setEditDeck] = useState(false);

    // States used for the rendering of the pop up
    const [showDeleteNotebook, setShowDeleteNotebook] = useState(false);
    const [showDeleteElement, setShowDeleteElement] = useState({ visibility: false, element: null, id: null });
    const [fetchAgain, setFetchAgain] = useState(false);

    // States used to know whether it's a bookmark, discover or private
    const [isDiscover, setIsDiscover] = useState(null);
    const [isPrivate, setIsPrivate] = useState(null);

    const [bookmarkedStatus, setBookmarkedStatus] = useState(null);
    
    const location = useLocation();
    const { state } = location;
    const { notebook } = state || {};

    // Check if it's a private notebook, a discover notebook, or a bookmarked notebook
    useEffect(() => {
        if (location) {
            const path = location.pathname;

            if (path.includes("discover")) {
                setIsDiscover(true);
                setIsPrivate(false);
                setBookmarkedStatus(false);
            } else if (!path.includes("bookmarks")) {
                setIsDiscover(false);
                setIsPrivate(true);
                setBookmarkedStatus(false);
            } else {
                setIsDiscover(false);
                setIsPrivate(false);
                setBookmarkedStatus(true);
            }
        }
    }, [location])

    // Get the group information if any
    useEffect(() => {
        if (state && state.isGroup) {
            setIsGroup(true);
            setGroup(state.group)
        }
    }, [state]);
    
    const [coursesOptions, setCoursesOptions] = useState([]);

    const typeOptions = [
        { value: 'all', label: 'All' },
        { value: 'notes', label: 'Notes' },
        { value: 'quizzes', label: 'Quizzes' },
        { value: 'flashdecks', label: 'Flashdecks' }
    ]
    const [selectedType, setSelectedType] = useState(typeOptions[0]);

    // Fetch notebook elements
    useEffect(() => {
        const fetchNotebookElements = async () => {
            try {
                const { data } = await apiPrivate.get(`/notebook/elements?notebook_id=${notebook.id}`);
                setNotebookContent(data);

                if (fetchAgain) setFetchAgain(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchNotebookElements();
    }, [notebook.id, fetchAgain]);

    // Render all notebook elements
    useEffect(() => {
        if (notebookContent) {
            if (notebookContent.FlashDecks.length !== 0) {
                setFlashdeckElements(notebookContent.FlashDecks.map(deck => {
                    return (
                        <div className="type--box-my-notebook" key={deck.id}>
                            <div className={`type-box--subcontainer${editDeck ? " type-box--subcontainer-delete" : ""}`}>
                                <Link 
                                    to={`/my-notebooks/deck/${deck.id}`} 
                                    state={{ notebook, deckID: deck.id, deckTitle: deck.title }}
                                >
                                    <span 
                                        className="material-symbols-outlined" 
                                        style={{ color: deckHover === deck.id ? darkenHex(notebook.color, 25) : notebook.color }}
                                        onMouseEnter={() => setDeckHover(deck.id)}
                                        onMouseLeave={() => setDeckHover(-1)}
                                    >
                                        sticky_note_2
                                    </span>
                                </Link>
                                <p>{deck.title}</p>
                                {isPrivate && editDeck && <p className="delete-notebook" onClick={() => setShowDeleteElement({ visibility: true, element: "flashdeck", id: deck.id })}>-</p>}
                            </div>
                        </div>
                    )
                }))
            }

            if (notebookContent.Notes.length !== 0) {
                setNoteElements(notebookContent.Notes.map(note => {
                    return (
                        <div className="type--box-my-notebook" key={note.id}>
                            <div className={`type-box--subcontainer${editNote ? " type-box--subcontainer-delete" : ""}`}>
                                <Link 
                                    to={`/my-notebooks/note/${note.id}`} 
                                    state={{ notebook, note }}
                                >
                                    <span 
                                        className="material-symbols-outlined" 
                                        style={{ color: noteHover === note.id ? darkenHex(notebook.color, 25) : notebook.color }}
                                        onMouseEnter={() => setNoteHover(note.id)}
                                        onMouseLeave={() => setNoteHover(-1)}
                                    >
                                        news
                                    </span>
                                </Link>
                                <p>{note.title}</p>
                                {isPrivate && editNote && <p className="delete-notebook" onClick={() => setShowDeleteElement({ visibility: true, element: "note", id: note.id })}>-</p>}
                            </div>
                        </div>
                    )
                }))
            }

            if (notebookContent.Quizzes.length !== 0) {
                setQuizElements(notebookContent.Quizzes.map(quiz => {
                    return (
                        <div className="type--box-my-notebook" key={quiz.id}>
                            <div className={`type-box--subcontainer${editQuiz ? " type-box--subcontainer-delete" : ""}`}>
                                <Link 
                                    to={`/my-notebooks/note/${quiz.id}`} 
                                    state={{ notebook, quiz }}
                                >
                                    <span 
                                        className="material-symbols-outlined" 
                                        style={{ color: quizHover === quiz.id ? darkenHex(notebook.color, 25) : notebook.color }}
                                        onMouseEnter={() => setQuizHover(quiz.id)}
                                        onMouseLeave={() => setQuizHover(-1)}
                                    >
                                        help_center
                                    </span>
                                </Link>
                                <p>{quiz.name}</p>
                                {isPrivate && editQuiz && <p className="delete-notebook" onClick={() => setShowDeleteElement({ visibility: true, element: "quiz", id: quiz.id })}>-</p>}
                            </div>
                        </div>
                    )
                }))
            }
        }
    }, [notebookContent, editDeck, noteHover, notebook, deckHover, isPrivate, editNote, editQuiz, quizHover])

    // Set up the stars element if public access
    useEffect(() => {
        if (notebook.public_access) {
            let { rating } = notebook;
            // let rating = 4.5
            const starsArr = [];
            let starsCount = 0;
            while(rating >= 1) {
                starsArr.push(
                    <span className="material-symbols-rounded star-filled">star</span>
                )
                rating--;
                starsCount++;
            }
            
            if (rating !== 0) {
                starsCount++;
                starsArr.push(
                    <span className="material-symbols-rounded star-filled">star_half</span>
                )
            }

            while(starsCount !== 5) {
                starsArr.push(
                    <span className="material-symbols-rounded">star</span>
                )
                starsCount++;
            }

            setStarsElement(<div className="stars-container--single-notebook">
                {starsArr}
            </div>);
        }
    }, [notebook])

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

    // Delete an element
    const deleteElement = async (url) => {
        try {
            await apiPrivate.delete(url);
            setShowDeleteElement({ visibility: false, element: null, id: null });
            setFetchAgain(true);
            setEditDeck(false);
            setEditNote(false);
            setEditQuiz(false);
        } catch (error) {
            console.log(error);
        }
    }

    // Handle the confirmation of the deletion of the notebook
    function handleConfirmDelete() {
        let url = "";
        const { element, id } = showDeleteElement
        if (element === "flashdeck") {
            url = `/deleteFlashDeck/${id}`;
        } else if (element === "note") {
            url = `/notes/delete?note_id=${id}`
        } else {
            url = `/deleteQuiz?quiz_id=${id}`
        }

        deleteElement(url);
    }

    // Handle showing the confirmation popup for a specific element
    function setDeleteElement(visibility) {
        setShowDeleteElement({ visibility, element: null })
    }

    // Bookmark a notebook
    const bookmarkNotebook = async () => {
        try {
            await apiPrivate.post("/user/bookmarkNotebook", {
                notebook_id: notebook.id
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Unbookmark a notebook
    const unbookmarkNotebook = async () => {
        try {
            await apiPrivate.delete(`/user/unbookmarkNotebook?notebook_id=${notebook.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    // Handle the bookmark click
    function handleBookmark() {
        const wasBookmarked = bookmarkedStatus;
        setBookmarkedStatus(prev => !prev);

        if (wasBookmarked) unbookmarkNotebook();
        else bookmarkNotebook();
    }

    return (
        <div className="page--container" onClick={handleClose}>
            {showDeleteNotebook &&
            <ConfirmationPopUp 
                message={"Are you sure you want to delete this notebook?"}
                handleConfirm={handleConfirmDelete}
                setShowDelete={setShowDeleteNotebook}
                color={notebook.color}
            />}

            {showDeleteElement.visibility &&
            <ConfirmationPopUp 
                message={`Are you sure you want to delete this ${showDeleteElement.element}?`}
                handleConfirm={handleConfirmDelete}
                setShowDelete={setDeleteElement}
                color={notebook.color}
            />}

            <NotebookTitle 
                title1={isPrivate ? `${isGroup ? "" : "My "}Notebooks` : (isDiscover ? "Discover" : "Bookmarks")}
                link1={isPrivate ? (isGroup ? `/groups/${group.id}` : "/my-notebooks") : (isDiscover ? "/discover" : "/bookmarks")}
                title2={notebook.title}
                title2Color={notebook.color}
                state={{ isGroup, group }}
            />

            <AddButton 
                showCreateFlashdeck={showCreateFlashdeck}
                showCreateNote={showCreateNote}
                showUpload={showUpload}
                setShowCreateFlashdeck={setShowCreateFlashdeck}
                setShowCreateNote={setShowCreateNote}
                setShowUpload={setShowUpload}
                buttonColor={notebook.color}
                notebook={notebook}
                setFetchAgain={setFetchAgain}
            />

            {!isPrivate &&
            <span 
                className={`material-symbols-outlined bookmark-icon${bookmarkedStatus ? " bookmarked-icon" : ""}`}
                style={{ color: notebook.color }}
                onClick={handleBookmark}
            >
                bookmark
            </span>}

            {isPrivate && <button className="delete-button" onClick={() => setShowDeleteNotebook(true)}>Delete</button>}

            {/* if no elements in the notebook display that it's empty */}
            <div className="notebook-selects">
                <div className="select-notebook--container">
                    <Select 
                        options={typeOptions}
                        isSearchable={false} 
                        defaultValue={typeOptions[0]}
                        value={selectedType}
                        onChange={(value) => setSelectedType(value)}
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

                <div className="visibility-stars--container">
                    {notebook.public_access && starsElement}
                    {isPrivate &&
                    <div className="notebook-visibility--container" style={{ borderColor: notebook.color, color: notebook.color }}>
                        <p>{notebook.public_access ? "Public" : "Private"}</p>
                    </div>}
                </div>
            </div>

            <div className="notebook--container">
                {notebookContent && notebookContent.Notes.length !== 0 &&
                (selectedType.value === typeOptions[0].value || selectedType.value === typeOptions[1].value) &&
                <div>
                    <div className="notebook-type--header">
                        <h2 className="notebook-type--label">Notes</h2>
                        {isPrivate && editNote ?
                            <span className="material-symbols-outlined close-icon" onClick={() => setEditNote(false)}>
                                download_done
                            </span>
                            :
                            <span className="material-symbols-outlined" onClick={() => setEditNote(true)}>
                                edit
                            </span>
                        }
                    </div>
                    <div className="type--container-my-notebooks">
                        {noteElements}
                    </div>
                </div>}
                {notebookContent && notebookContent.Quizzes.length !== 0 &&
                (selectedType.value === typeOptions[0].value || selectedType.value === typeOptions[2].value) &&<div>
                    <div className="notebook-type--header">
                        <h2 className="notebook-type--label">Quizzes</h2>
                        {isPrivate && editQuiz ?
                            <span className="material-symbols-outlined close-icon" onClick={() => setEditQuiz(false)}>
                                download_done
                            </span>
                            :
                            <span className="material-symbols-outlined" onClick={() => setEditQuiz(true)}>
                                edit
                            </span>
                        }
                    </div>
                    <div className="type--container-my-notebooks">
                        {quizElements}
                    </div>
                </div>}
                {notebookContent && notebookContent.FlashDecks.length !== 0 &&
                (selectedType.value === typeOptions[0].value || selectedType.value === typeOptions[3].value) &&
                 <div>
                    <div className="notebook-type--header">
                        <h2 className="notebook-type--label">Flashdecks</h2>
                        {isPrivate && editDeck ?
                            <span className="material-symbols-outlined close-icon" onClick={() => setEditDeck(false)}>
                                download_done
                            </span>
                            :
                            <span className="material-symbols-outlined" onClick={() => setEditDeck(true)}>
                                edit
                            </span>
                        }
                    </div>
                    <div className="type--container-my-notebooks">
                        {flashdeckElements}
                    </div>
                </div>}
            </div>
        </div>
    )
}