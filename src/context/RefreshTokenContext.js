import React, { createContext, useState } from 'react';

export const RefreshTokenContext = createContext();

export const RefreshTokenContextProvider = ({ children }) => {
    const [refreshToken, setRefreshTokenState] = useState(() => {
        // Retrieve token from localStorage on initialization
        return localStorage.getItem("refreshToken") || null;
    });

    // Update localStorage whenever refreshToken changes
    const setRefreshToken = (token) => {
        setRefreshTokenState(token);
        if (token) {
            localStorage.setItem("refreshToken", token);
        } else {
            localStorage.removeItem("refreshToken");
        }
    };

    return (
        <RefreshTokenContext.Provider value={{ refreshToken, setRefreshToken }}>
            {children}
        </RefreshTokenContext.Provider>
    );
};
