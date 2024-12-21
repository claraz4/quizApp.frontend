import React, { useState, useEffect } from 'react';
import NotebookTitle from '../NotebookTitle';
import SearchBar from '../SearchBar';
import apiPrivate from '../../apis/apiPrivate';
import { Link } from 'react-router-dom';

export default function Bookmarks() {
    const [search, setSearch] = useState("");
    const [bookmarkedNotebooks, setBookmarkedNotebooks] = useState(null);
    const [bookmarkedElement, setBookmarkedElement] = useState(null);

    // Fetch all bookmarked notebooks
    useEffect(() => {
        const fetchBookmarked = async () => {
            try {
                const { data } = await apiPrivate.get(`/user/bookmarkedNotebooks?search_entry=${search}`);
                setBookmarkedNotebooks(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchBookmarked();
    }, [search]);

    // Render the bookmarked notebooks
    useEffect(() => {
        if (bookmarkedNotebooks) {
            setBookmarkedElement(bookmarkedNotebooks.map(notebook => {
                return (
                    <Link 
                        to={`/bookmarks/${notebook.id}`} 
                        className="notebook-container--my-notebooks" 
                        key={notebook.id}
                        state={{ isGroup: false, notebook }}
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
            }))
        }
    }, [bookmarkedNotebooks])

    return (
        <div className="page--container">
            <NotebookTitle 
                title2="Bookmarks"
            />

            <div className="searching-container--discover">
                <SearchBar 
                    search={search}
                    setSearch={setSearch}
                    placeholder={"Search notebooks"}
                />
            </div>

            <div className="notebooks--container">
                {bookmarkedElement}
            </div>
        </div>
    )
}