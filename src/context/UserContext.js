import { createContext, useState, useEffect } from 'react';
import apiPrivate from '../apis/apiPrivate';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null); // State to store the user info
    
    // Fetch user info if it's empty
    useEffect(() => {
        // Check if user info is not already fetched
        if (!userInfo) {
            const fetchUserInfo = async () => {
                try {
                    const response = await apiPrivate.get('/user/getInfo');
                    setUserInfo(response.data); // Set the user info from API response
                } catch (error) {
                    console.log(error);
                }
            };

            fetchUserInfo();
        }
    }, [userInfo]);

    // Provide the user info, loading, and error states to the rest of the app
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};
