import React from 'react';
import { RefreshTokenContext } from '../context/RefreshTokenContext';

export default function useRefreshTokenContext() {
    const context = React.useContext(RefreshTokenContext);

    if (!context) {
        throw Error('useRefreshTokenContext must be used inside a RefreshTokenContextProvider');
    }

    return context;
}