import React, { createContext, useState } from 'react';

export const ShowDashboardContext = createContext();

export const ShowDashboardContextProvider = ({ children }) => {
    const [showDashboard, setShowDashboard] = useState(false);

    return (
        <ShowDashboardContext.Provider value={{ showDashboard, setShowDashboard }}>
            {children}
        </ShowDashboardContext.Provider>
    );
};
