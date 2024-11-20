import React from 'react';
import { ShowDashboardContext } from '../context/ShowDashboardContext';

export default function useShowDashboardContext() {
    const context = React.useContext(ShowDashboardContext);

    if (!context) {
        throw Error('useShowDashboardContext must be used inside a ShowDashboardContextProvider');
    }

    return context;
}