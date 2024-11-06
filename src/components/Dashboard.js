import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Dashboard() {
    const location = useLocation();

    return (
        <div className="dashboard--container">
            <div className="dashboard--content">
                <div className="logo--dashboard">
                    <h2>Quiz App</h2>
                </div>

                <div className="user-info--dashboard">
                    <p>FIRST USER</p>
                    <p className="email--dashboard">first.user@gmail.com</p>
                </div>

                <div className="dashboard-sections--container">
                    <div className={`dashboard-section--container${location.pathname === "/discover" ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-outlined">
                            language
                        </span>
                        <Link to="/discover">Discover</Link>
                    </div>
                    <div className={`dashboard-section--container${location.pathname === "/my-notebooks" ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-outlined">
                            folder
                        </span>
                        <Link to="/my-notebooks">My Notebooks</Link>
                    </div>
                    <div className={`dashboard-section--container${location.pathname === "/groups" ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-rounded">
                            group
                        </span>
                        <Link to="/groups">My Groups</Link>
                    </div>
                    <div className={`dashboard-section--container${location.pathname === "/bookmarks" ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-rounded">
                            bookmark
                        </span>
                        <Link to="/bookmarks">Bookmarks</Link>
                    </div>
                    <div className={`dashboard-section--container${location.pathname === "/create-notebook" ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-rounded">
                            new_window
                        </span>
                        <Link to="/create-notebook">Create Notebook</Link>
                    </div>
                    <div className={`dashboard-section--container${location.pathname === "/settings" ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-outlined">
                            settings
                        </span>
                        <Link to="/settings">Settings</Link>
                    </div>
                </div>
            </div>
            
            <button className="logout-button">
                <span class="material-symbols-rounded">
                    logout
                </span>
                <p>Log Out</p>
            </button>
        </div>
    )
}