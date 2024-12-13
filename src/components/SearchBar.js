import React from 'react';

export default function SearchBar({ search, setSearch, placeholder }) {
    return (
        <div className="search-bar--container">
            <span className="material-symbols-outlined">
                search
            </span>
            <input
                placeholder={placeholder}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
        </div>
    )
}