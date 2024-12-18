import React, { useEffect, useState } from 'react';
import NotebookTitle from "../NotebookTitle";
import SearchBar from '../SearchBar';
import apiPrivate from '../../apis/apiPrivate';
import { Link } from 'react-router-dom';

export default function MyGroups() {
    const [search, setSearch] = useState("");
    const [groups, setGroups] = useState([]);
    const [groupsElement, setGroupsElement] = useState([]);

    // Fetch groups
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const { data } = await apiPrivate.get("/user/teams");
                setGroups(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchGroups();
    }, []);

    // Create the group elements to render
    useEffect(() => {
        if (groups) {
            setGroupsElement(groups.map(group => {
                const creationDate = new Date(group.creation_date);
                
                return (
                    <Link to={`/groups/${group.id}`} state={{ group }} className="group-row--container" key={group.id}>
                        <p>{group.name}</p>
                        <div className="group-row--info">
                            <div className="group-row--members">
                                <span className="material-symbols-outlined">
                                    group
                                </span>
                                <p>{group.members.length}</p>
                            </div>
                            <p>{`Created on ${getFormattedDate(creationDate)}`}</p>
                        </div>
                    </Link>
                )
            }))
        }
    }, [groups]);

    // Get the date formatted 
    function getFormattedDate(currDate) {
        const date = new Date(currDate);
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
        
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="page--container">
            <NotebookTitle 
                title2="My Groups"
            />

            <div className="searching-container--discover">
                <SearchBar 
                    search={search}
                    setSearch={setSearch}
                    placeholder={"Search groups"}
                />
            </div>

            <div className="groups-list--container">
                {groupsElement}
            </div>
        </div>
    )
}