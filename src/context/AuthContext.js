import React, { createContext, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import api from '../apis/api';
import apiPrivate from '../apis/apiPrivate';
import useRefreshTokenContext from '../hooks/useRefreshTokenContext';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const { refreshToken } = useRefreshTokenContext();

    const refreshAccessToken = useCallback(async () => {
        try {
            const { data } = await api.post("/token/refresh", {
                refresh: refreshToken
            });
            setToken(data.access);
        } catch (error) {
            setToken(null);
        }
    }, [refreshToken]);

    useEffect(() => {
        refreshAccessToken();

        const expirationDate = 900 - 60; // refresh a minute before it expires
        const interval = setInterval(() => {
            refreshAccessToken();
        }, expirationDate * 1000); 

        return () => clearInterval(interval); 
    }, [refreshAccessToken]);

    useLayoutEffect(() => {
        // Add the bearer token to all requests
        apiPrivate.interceptors.request.use(
            config => {
                if (token) {
                    config.headers.Authorization = `Token ${token}`;
                }

                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        // Handle 401 errors and refresh the token if necessary
        apiPrivate.interceptors.response.use(
            response => response,
            async error => {
            const originalRequest = error.config;
        
            // If the access token is expired (401 Unauthorized), try to refresh it
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;  // Prevent infinite retries
        
                // Call refreshAccessToken() from AuthContext to refresh the token
                await refreshAccessToken();
        
                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Token ${token}`;
                return apiPrivate(originalRequest);
            }
        
            return Promise.reject(error);
            }
        );
    }, [token, refreshAccessToken])

    return (
        <AuthContext.Provider value={{ token, setToken, refreshAccessToken }}>
            { children }
        </AuthContext.Provider>
    )
}