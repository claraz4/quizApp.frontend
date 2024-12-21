import React, { useEffect } from 'react';
import noDashboardRoutes from "../data/noDashboardRoutes";
import useShowDashboardContext from '../hooks/useShowDashboardContext';
import { useLocation } from 'react-router-dom';

export default function CheckDashboard() {
    const { pathname } = useLocation();
    const { setShowDashboard } = useShowDashboardContext();

    useEffect(() => {
        let match;

        for (let i = 0; i < noDashboardRoutes.length && !match; i++) {
            const route = noDashboardRoutes[i];
            
            if (typeof route === "object") {
                match = pathname.match(route)
            } else {
                match = pathname === route;
            }
        }

        setShowDashboard(!match);
    }, [pathname, setShowDashboard]);

    return <div></div>; 
}