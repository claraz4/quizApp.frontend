import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSignout from '../hooks/useSignout';
import useUserContext from '../hooks/useUserContext';

export default function Dashboard() {
    const location = useLocation();
    const { signOut } = useSignout(); 
    const { userInfo } = useUserContext();

    return (
        <div className="dashboard--container">
            <div className="dashboard--content">
                <div className="logo--dashboard">
                    <h2>Quiz App</h2>
                </div>

                <div className="user-info--dashboard">
                    <p>{`${userInfo && userInfo.first_name} ${userInfo && userInfo.last_name}`}</p>
                    <p className="email--dashboard">{userInfo && userInfo.email}</p>
                </div>

                <div className="dashboard-sections--container">
                    <Link to="/discover" className={`dashboard-section--container${location.pathname.includes("/discover") ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-outlined">
                            language
                        </span>
                        <p>Discover</p>
                    </Link>
                    <Link to="/my-notebooks" className={`dashboard-section--container${location.pathname.includes("/my-notebooks") ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-outlined">
                            folder
                        </span>
                        <p>My Notebooks</p>
                    </Link>
                    <Link to="/groups" className={`dashboard-section--container${location.pathname.includes("/groups") ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-rounded">
                            group
                        </span>
                        <p>My Groups</p>
                    </Link>
                    <Link to="/bookmarks" className={`dashboard-section--container${location.pathname.includes("/bookmarks") ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-rounded">
                            bookmark
                        </span>
                        <p>Bookmarks</p>
                    </Link>
                    <Link to="/create-notebook" className={`dashboard-section--container${location.pathname.includes("/create-notebook") ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-rounded">
                            new_window
                        </span>
                        <p>Create Notebook</p>
                    </Link>
                    <Link to="/settings" className={`dashboard-section--container${location.pathname.includes("/settings") ? " dashboard-section--selected" : ""}`}>
                        <span className="material-symbols-outlined">
                            settings
                        </span>
                        <p>Settings</p>
                    </Link>
                </div>
            </div>
            
            <button className="logout-button" onClick={signOut}>
                <span className="material-symbols-rounded">
                    logout
                </span>
                <p>Log Out</p>
            </button>
        </div>
    )
}