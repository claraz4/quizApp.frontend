import { useCallback } from 'react';
import useRefreshTokenContext from './useRefreshTokenContext';
import useAuthContext from './useAuthContext';

export default function useSignout() {
    const { setRefreshToken } = useRefreshTokenContext();
    const { setToken } = useAuthContext();

    // Define the signout function
    const signOut = useCallback(() => {
        setRefreshToken(null); // Remove the refresh token
        setToken(null); // Remove the access token
        
        // clear local storage from the refresh token
        localStorage.removeItem('refreshToken');
    }, [setRefreshToken, setToken]);

    return { signOut };
}
