import React, { useState } from 'react';
import NotebookTitle from '../NotebookTitle';
import SearchBar from '../SearchBar';

export default function Bookmarks() {
    const [search, setSearch] = useState("");

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
        </div>
    )
}